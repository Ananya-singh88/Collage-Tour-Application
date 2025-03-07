const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db'); // Import the database connection
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); // Middleware to parse JSON requests

// Student Registration Endpoint
app.post('/api/student/register', (req, res) => {
    const { username, password, name, email } = req.body;

    // Check if username or email already exists
    const checkSql = `SELECT * FROM students WHERE username = ? OR email = ?`;
    db.query(checkSql, [username, email], (err, results) => {
        if (err) {
            console.error('Error checking student:', err);
            res.status(500).json({ error: 'Error checking student' });
        } else if (results.length > 0) {
            res.status(400).json({ error: 'Username or email already exists' });
        } else {
            // Insert new student into the database
            const insertSql = `INSERT INTO students (username, password, name, email) VALUES (?, ?, ?, ?)`;
            db.query(insertSql, [username, password, name, email], (err, results) => {
                if (err) {
                    console.error('Error registering student:', err);
                    res.status(500).json({ error: 'Error registering student' });
                } else {
                    res.json({ success: true, message: 'Student registered successfully' });
                }
            });
        }
    });
});

// Student Login Endpoint
app.post('/api/student/login', (req, res) => {
    const { username, password } = req.body;

    // Check if the student exists
    const sql = `SELECT * FROM students WHERE username = ? AND password = ?`;
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error('Error during student login:', err);
            res.status(500).json({ error: 'Error during student login' });
        } else if (results.length > 0) {
            res.json({ success: true, message: 'Student login successful', student: results[0] });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    });
});

// Search Endpoint
app.get('/api/search', (req, res) => {
    const query = req.query.q.toLowerCase(); // Get the search query from the request
    const sql = `SELECT * FROM search_data WHERE name LIKE ? OR description LIKE ?`;
    const searchQuery = `%${query}%`;

    // Use the `db` object to query the database
    db.query(sql, [searchQuery, searchQuery], (err, results) => {
        if (err) {
            console.error('Error fetching search results:', err);
            res.status(500).json({ error: 'Error fetching search results' });
        } else {
            res.json(results); // Send the search results as a JSON response
        }
    });
});

// Import routes
const studentRoutes = require('./routes/studentRoutes');
const eventRoutes = require('./routes/eventRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Use routes
app.use('/api/students', studentRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/reviews', reviewRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});