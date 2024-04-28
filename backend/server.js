const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const pool = mysql.createPool({
    user: 'root',
    password: 'Winter.123',
    host: '127.0.0.1',
    database: 'feedback_db'
});

app.post('/feedback', (req, res) => {
    const { question1, question2, question3 } = req.body;
    const query = `INSERT INTO feedback (question1, question2, question3) VALUES (?, ?, ?)`;
    pool.query(query, [question1, question2, question3], (err, results) => {
        if (err) throw err;
        res.send({ status: 'Data saved successfully', data: req.body });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
