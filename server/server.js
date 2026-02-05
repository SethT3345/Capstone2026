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


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

//it works