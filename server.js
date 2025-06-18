const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Enable CORS for Netlify frontend
app.use(cors({
  origin: 'https://login-page-arul.netlify.app',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true // optional, required if using cookies/sessions
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ MySQL connection
const db = mysql.createConnection({
  host: 'bssox6queaw6zfawdfs5-mysql.services.clever-cloud.com',
  user: 'ruissihbbiw1gz24foot',
  password: 'l8k72R7OitvbGxMfib2c@1311',
  database: 'logibssox6queaw6zfawdfs5nPage'
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection error:', err);
  } else {
    console.log('✅ Connected to MySQL Database');
  }
});

// ✅ Register endpoint
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, password], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json({ message: 'User registered successfully' });
  });
});

// ✅ Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, result) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (result.length > 0) {
      res.json({ message: 'success' });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
