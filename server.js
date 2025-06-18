const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin: 'https://login-page-arul.netlify.app',
  methods: ['POST'],
  credentials: true
}));
// Middleware to log requests

// Create MySQL connection
const db = mysql.createConnection({
  host: 'bssox6queaw6zfawdfs5-mysql.services.clever-cloud.com',
  user: 'ruissihbbiw1gz24foot',       // your MySQL username
  password: 'l8k72R7OitvbGxMfib2c@1311',       // your MySQL password
  database: 'logibssox6queaw6zfawdfs5nPage' // your MySQL database name
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
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, result) => {
    if (err) return res.status(500).send("Server error");
    if (result.length > 0) {
      res.send("success");
    } else {
      res.status(401).send("Invalid username or password");
    }
  });
});


app.options('*', cors());


// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

