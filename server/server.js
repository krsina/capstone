const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Route Imports
const authRoute = require('./routes/auth');
const authVerify = require('./middleware/authVerify');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/', authRoute)

app.get('/protected', authVerify, (req, res) => {
    res.json({ message: 'Protected Route' });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});