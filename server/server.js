// server/server.js

const express = require("express");
const path = require("path");
const { Pool } = require("pg");

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
    
    if (!courseName) {
      return res.status(400).json({ error: "Course name is required" });
    }
    
    // Using parameterized query to prevent SQL injection
    console.log('Searching for course:', courseName);
    const query = "SELECT * FROM classes WHERE course_title = $1 and capacity > 0";
    const result = await pool.query(query, [courseName]);
    
    console.log('Query result:', result.rows);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Course not found or is full" });
    }
    
    res.json({ course: result.rows[0] });
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
    
    // Validate inputs
    if (!admin) {
      return res.status(400).json({ error: "Admin code required" });
    }
    
    const query = "SELECT * FROM admins WHERE id = $1";
    const result = await pool.query(query, [admin]);

    console.log('Query result:', result.rows);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid Admin Code" });
    }
    
    // Send success response with admin data
    res.status(200).json({ 
      message: "Admin verified successfully", 
      admin: result.rows[0] 
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


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

//it works