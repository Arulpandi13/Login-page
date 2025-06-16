const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// Middleware to log requests

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',       // your MySQL username
  password: 'arul@1311',       // your MySQL password
  database: 'loginPage' // your MySQL database name
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection error:', err);
  } else {
    console.log('✅ Connected to MySQL Database');
  }
});

// Register user
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  console.log('Registration attempt:', { username, email, password });
  // Check for empty fields
  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, password], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json({ message: 'User registered successfully' });
  });
});

// Login user
app.get('/login', (req, res) => {
    const username = req.query.username;
    const password = req.query.password;

    console.log("Login attempt:", username, password);

    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error("SQL Error:", err);
            return res.status(500).send("Server error");
        }

        if (result.length > 0) {
            res.send("success");
        } else {
            res.status(401).send("Invalid username or password");
        }
    });
});


// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

