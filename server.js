const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Connect to the SQLite database
const db = new sqlite3.Database('users.db');

// Middleware to parse JSON request bodies
app.use(express.json());

// Endpoint to handle login requests
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Query the database to check if the username and password match
    const query = `SELECT * FROM users WHERE username = ? AND password = ?`;
    db.get(query, [username, password], (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else if (!row) {
            // No user found with the provided username and password
            res.status(401).send('Incorrect username or password');
        } else {
            // User found, send success response
            res.status(200).send('Login successful');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});