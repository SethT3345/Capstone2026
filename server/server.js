// server/server.js

require('dotenv').config();
const express = require("express");
const path = require("path");
const { Pool } = require("pg");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");

// Database connection
const DB_URL = "postgresql://postgrescapstone_b7f9_user:LWBbdDg3ziJwHTpfFsIHv3y6LYyJLM2g@dpg-d610oupr0fns73cgia7g-a.oregon-postgres.render.com/postgrescapstone_b7f9";
const pool = new Pool({ 
  connectionString: DB_URL,
  ssl: { rejectUnauthorized: false }
});

// Test database connection on startup
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected successfully at:', res.rows[0].now);
  }
});

const PORT = process.env.PORT || 3005;

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Session configuration (add BEFORE passport initialization)
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-development-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production', // Set to true in production with HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport serialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    done(null, result.rows[0]);
  } catch (error) {
    done(error, null);
  }
});

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3005/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user exists
      const email = profile.emails[0].value;
      const checkQuery = "SELECT * FROM users WHERE username = $1";
      const existingUser = await pool.query(checkQuery, [email]);

      if (existingUser.rows.length > 0) {
        // User exists, return it
        return done(null, existingUser.rows[0]);
      } else {
        // Create new user
        const id = Math.floor(10000 + Math.random() * 90000);
        const insertQuery = `
          INSERT INTO users (id, username, password, created_at, updated_at) 
          VALUES ($1, $2, $3, NOW(), NOW()) 
          RETURNING *
        `;
        // Store a placeholder password for OAuth users
        const newUser = await pool.query(insertQuery, [id, email, 'google-oauth']);
        return done(null, newUser.rows[0]);
      }
    } catch (error) {
      return done(error, null);
    }
  }
));

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/dist")));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// Get all courses
app.get("/api/courses", async (req, res) => {
  try {
    console.log('Fetching all courses...');
    const query = "SELECT * FROM classes WHERE capacity > 0 ORDER BY course_title";
    const result = await pool.query(query);
    
    console.log(`Found ${result.rows.length} courses`);
    res.json(result.rows);
  } catch (error) {
    console.error("Database error:", error.message);
    res.status(500).json({ error: "Failed to fetch courses", details: error.message });
  }
});

// Search for a course by name
app.post("/api/search-course", async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    const { courseName } = req.body;
    
    if (!courseName || courseName.trim() === '') {
      return res.status(400).json({ error: "Course name is required" });
    }
    
    // Using parameterized query to prevent SQL injection
    console.log('Searching for course:', courseName);
    const query = "SELECT * FROM classes WHERE LOWER(course_title) LIKE LOWER($1) AND capacity > 0";
    const result = await pool.query(query, [`${courseName.trim()}%`]);
    
    console.log('Query result:', result.rows);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Course not found or is full" });
    }
    
    // Return all matching courses
    res.json({ courses: result.rows });
  } catch (error) {
    console.error("Database error details:", error.message);
    console.error("Full error:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

app.post('/api/loginUser', async (req, res) => {
  try {
    console.log('Received login request:', req.body);
    const username = req.body.email;
    const password = req.body.password;

    // Validate inputs
    if (!username || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Query to find user with matching username and password
    const query = "SELECT * FROM users WHERE username = $1 AND password = $2";
    const result = await pool.query(query, [username, password]);

    console.log('Query result:', result.rows);


    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    res.status(200).json({ 
      message: "Login successful", 
      user: result.rows[0] 
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
})

app.post("/api/createUser", async (req, res) => {
  try {
    console.log('Received create user request:', req.body);
    const id = Math.floor(10000 + Math.random() * 90000);
    const username = req.body.email;
    const password = req.body.password;
    
    // Validate inputs
    if (!username || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    
    const query = 'INSERT INTO users (id, username, password, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *';

    const result = await pool.query(query, [id, username, password]);
    
    console.log('User created:', result.rows[0]);
    
    res.status(201).json({ 
      message: "User created successfully", 
      user: result.rows[0] 
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user", details: error.message });
  }
})

app.post("/api/checkAdmin", async (req, res) => {
  try {
    console.log('Received check admin request:', req.body);
    const admin = req.body.admin;
    const user_id = req.body.user_id;
    
    // Validate inputs
    if (!admin) {
      return res.status(400).json({ error: "Admin code required" });
    }
    
    if (!user_id) {
      return res.status(400).json({ error: "User ID required" });
    }
    
    // Check if admin code is valid
    const query = "SELECT * FROM admins WHERE id = $1";
    const result = await pool.query(query, [admin]);

    console.log('Query result:', result.rows);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid Admin Code" });
    }
    
    // Admin code is valid, now make the user an admin
    console.log('Valid admin code, creating admin for user:', user_id);
    
    // Check if user exists
    const checkUserQuery = 'SELECT * FROM users WHERE id = $1';
    const userCheck = await pool.query(checkUserQuery, [user_id]);

    if (userCheck.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if user is already an admin
    if (userCheck.rows[0].admin === true) {
      return res.status(200).json({ 
        message: "User is already an admin", 
        admin: result.rows[0],
        user: userCheck.rows[0]
      });
    }

    // Make the user an admin
    const createAdminQuery = 'UPDATE users SET admin = true WHERE id = $1 RETURNING *';
    const adminUser = await pool.query(createAdminQuery, [user_id]);
    
    console.log('Admin created successfully:', adminUser.rows[0]);
    
    // Send success response with admin data and updated user
    res.status(200).json({ 
      message: "Admin verified and user promoted to admin successfully", 
      admin: result.rows[0],
      user: adminUser.rows[0]
    });

  } catch (error) {
    console.error("Error getting admin code:", error);
    res.status(500).json({ error: "Failed to get admin code", details: error.message });
  }
})



app.post("/api/enroll", async (req, res) => {
  try {
    console.log('Received enroll request:', req.body);
    const { course_id, user_id } = req.body;
    
    // Validate inputs
    if (!course_id || !user_id) {
      return res.status(400).json({ error: "Course ID and User ID are required" });
    }
    
    // Check if course exists and has capacity
    const checkQuery = "SELECT * FROM classes WHERE id = $1 AND capacity > 0";
    const courseCheck = await pool.query(checkQuery, [course_id]);
    
    if (courseCheck.rows.length === 0) {
      return res.status(404).json({ error: "Course not found or is full" });
    }
    
    // Get current user's classes
    const userQuery = "SELECT classes FROM users WHERE id = $1";
    const userResult = await pool.query(userQuery, [user_id]);
    
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const currentClasses = userResult.rows[0].classes || [];
    
    // Check if user is already enrolled
    if (currentClasses.includes(course_id)) {
      return res.status(400).json({ error: "Already enrolled in this course" });
    }
    
    // Add course_id to the classes array
    // Parse existing classes if stored as JSON string, or use empty array
    let classesArray = [];
    if (typeof currentClasses === 'string') {
      try {
        classesArray = JSON.parse(currentClasses);
      } catch (e) {
        classesArray = [];
      }
    } else if (Array.isArray(currentClasses)) {
      classesArray = currentClasses;
    }
    
    // Add new course_id
    classesArray.push(course_id);
    
    // Store back as JSON string
    const updateQuery = "UPDATE users SET classes = $1 WHERE id = $2 RETURNING *";
    const result = await pool.query(updateQuery, [JSON.stringify(classesArray), user_id]);
    
    // Decrease course capacity
    const capacityQuery = "UPDATE classes SET capacity = capacity - 1 WHERE id = $1";
    await pool.query(capacityQuery, [course_id]);

    console.log('Enrollment successful:', result.rows[0]);
    
    res.status(200).json({ 
      message: "Successfully enrolled in course", 
      user: result.rows[0] 
    });

  } catch (error) {
    console.error("Error enrolling:", error);
    res.status(500).json({ error: "Failed to enroll", details: error.message });
  }
})

//get how many classes a user has enrolled in
app.post('/api/numOfClasses', async (req, res) => {
  try {
    const { user_id } = req.body;

    // Validate input
    if (!user_id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Get user's classes and count them
    // If classes is stored as JSON string, we need to parse it
    const query = "SELECT classes FROM users WHERE id = $1";
    const result = await pool.query(query, [user_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const classes = result.rows[0].classes;
    let numClasses = 0;

    // Handle different storage formats
    if (typeof classes === 'string') {
      try {
        const classesArray = JSON.parse(classes);
        numClasses = classesArray.length;
      } catch (e) {
        numClasses = 0;
      }
    } else if (Array.isArray(classes)) {
      numClasses = classes.length;
    }

    res.status(200).json({ 
      numClasses: numClasses,
      user_id: user_id
    });

  } catch (error) {
    console.error("Error getting number of classes:", error);
    res.status(500).json({ error: "Failed to get class count", details: error.message });
  }
})

app.post('/api/createClass', async (req, res) => {
  try {
    console.log('Received create class request:', req.body);
    
    const id = Math.floor(100 + Math.random() * 900);
    const course_id = req.body.code
    const course_title = req.body.title
    const course_description = req.body.description
    const classroom_number = req.body.classroomNumber
    const capacity = req.body.seats
    const credit_hours = req.body.creditHours
    const tuition_cost = req.body.tuitionCost



    
    // Validate required fields
    if (!course_id || !course_title) {
      return res.status(400).json({ error: "Course ID and Title are required" });
    }
    
    // Insert new class into database
    const query = `
      INSERT INTO classes (id, course_id, course_title, course_description, classroom_number, capacity, credit_hours, tuition_cost, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
      RETURNING *
    `;
    
    const values = [
      id,
      course_id,
      course_title,
      course_description || '',
      classroom_number || '',
      capacity || 0,
      credit_hours || 0,
      tuition_cost || 0
    ];
    
    const result = await pool.query(query, values);
    
    console.log('Class created successfully:', result.rows[0]);
    
    res.status(201).json({ 
      message: "Class created successfully", 
      class: result.rows[0] 
    });
    
  } catch (error) {
    console.error("Error creating class:", error);
    res.status(500).json({ error: "Failed to create class", details: error.message });
  }
})

app.delete('/api/deleteClass/:id', async (req, res) => {
  try {
    console.log('Received delete class request for ID:', req.params.id);
    
    const classId = req.params.id;
    
    // Validate input
    if (!classId) {
      return res.status(400).json({ error: "Class ID is required" });
    }
    
    // Check if class exists
    const checkQuery = "SELECT * FROM classes WHERE id = $1";
    const checkResult = await pool.query(checkQuery, [classId]);
    
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: "Class not found" });
    }
    
    // Delete the class
    const deleteQuery = "DELETE FROM classes WHERE id = $1 RETURNING *";
    const result = await pool.query(deleteQuery, [classId]);
    
    console.log('Class deleted successfully:', result.rows[0]);
    
    res.status(200).json({ 
      message: "Class deleted successfully", 
      class: result.rows[0] 
    });
    
  } catch (error) {
    console.error("Error deleting class:", error);
    res.status(500).json({ error: "Failed to delete class", details: error.message });
  }
})


app.post('/api/unenroll', async (req, res) => {
  try {
    console.log('Received unenroll request:', req.body);
    const { course_id, user_id } = req.body;
    
    // Validate inputs
    if (!course_id || !user_id) {
      return res.status(400).json({ error: "Course ID and User ID are required" });
    }
    
    // Get current user's classes
    const userQuery = "SELECT classes FROM users WHERE id = $1";
    const userResult = await pool.query(userQuery, [user_id]);
    
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const currentClasses = userResult.rows[0].classes || [];
    
    // Parse existing classes if stored as JSON string, or use empty array
    let classesArray = [];
    if (typeof currentClasses === 'string') {
      try {
        classesArray = JSON.parse(currentClasses);
      } catch (e) {
        classesArray = [];
      }
    } else if (Array.isArray(currentClasses)) {
      classesArray = currentClasses;
    }
    
    // Check if user is not in class
    if (!classesArray.includes(course_id)) {
      return res.status(400).json({ error: "User not enrolled in this course" });
    }
    
    // Remove course_id from the classes array
    classesArray = classesArray.filter(id => id !== course_id);
    
    // Store back as JSON string
    const updateQuery = "UPDATE users SET classes = $1 WHERE id = $2 RETURNING *";
    const result = await pool.query(updateQuery, [JSON.stringify(classesArray), user_id]);
    
    // Increase course capacity
    const capacityQuery = "UPDATE classes SET capacity = capacity + 1 WHERE id = $1";
    await pool.query(capacityQuery, [course_id]);

    console.log('Unenrollment successful:', result.rows[0]);
    
    res.status(200).json({ 
      message: "Successfully unenrolled from course", 
      user: result.rows[0] 
    });

  } catch (error) {
    console.error("Error unenrolling:", error);
    res.status(500).json({ error: "Failed to unenroll", details: error.message });
  }
})

app.post('/api/deleteUser', async (req, res) => {
  try {
    console.log('Received delete user request:', req.body);
    const { user_id } = req.body;
    
    // Validate input
    if (!user_id) {
      return res.status(400).json({ error: "User ID is required" });
    }
    
    const squery = "SELECT * FROM users WHERE id = $1";
    const dquery = "DELETE FROM users WHERE id = $1 RETURNING *";

    const squeryResults = await pool.query(squery, [user_id]);

    if (squeryResults.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const dqueryResults = await pool.query(dquery, [user_id]);
    
    console.log('User deleted successfully:', dqueryResults.rows[0]);
    
    res.status(200).json({ 
      message: "User deleted successfully", 
      user: dqueryResults.rows[0] 
    });

  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user", details: error.message });
  }
})

app.get("/api/getUsers", async (req, res) => {
  try {
    console.log('Fetching all users...');
    const query = "SELECT * FROM users ORDER BY id";
    const result = await pool.query(query);
    
    console.log(`Found ${result.rows.length} users`);
    res.json(result.rows);
  } catch (error) {
    console.error("Database error:", error.message);
    res.status(500).json({ error: "Failed to fetch users", details: error.message });
  }
});

// Google OAuth routes
app.get('/api/auth/google',
  (req, res, next) => {
    console.log('Starting Google OAuth flow...');
    next();
  },
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/api/auth/google/callback',
  passport.authenticate('google', { 
    failureRedirect: 'http://localhost:5173/login',
    failureMessage: true 
  }),
  (req, res) => {
    // Successful authentication
    console.log('Google auth successful, user:', req.user);
    
    // Store complete user data in localStorage-compatible format for frontend
    const userData = {
      id: req.user.id,
      username: req.user.username,
      password: req.user.password,
      classes: req.user.classes || '[]',
      created_at: req.user.created_at,
      updated_at: req.user.updated_at
    };
    
    console.log('Storing user data in localStorage:', userData);
    
    // Encode user data as URL parameter so frontend can store it
    const userDataEncoded = encodeURIComponent(JSON.stringify(userData));
    
    // Redirect to frontend with user data
    res.redirect(`http://localhost:5173/auth-success?user=${userDataEncoded}`);
  }
);

// Add error handling route
app.use((err, req, res, next) => {
  console.error('Authentication Error:', err);
  res.status(err.status || 500).json({
    error: err.message,
    details: err.stack
  });
});

// Logout route
app.get('/api/auth/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

// Check authentication status and get updated user data
app.get('/api/auth/current-user', async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      // Fetch fresh user data from database to ensure it's up-to-date
      const query = "SELECT * FROM users WHERE id = $1";
      const result = await pool.query(query, [req.user.id]);
      
      if (result.rows.length > 0) {
        res.json({ user: result.rows[0] });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
      res.status(500).json({ error: 'Failed to fetch user data' });
    }
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

//it works