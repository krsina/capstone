{/* Protected.js is used for routing authenticated users protected routes that require an authenticated user */ }

const express = require('express');
const router = express.Router();
const authRouter = require('../middleware/authVerify');

router.get('/', authRouter, (req, res) => {
    res.json({
        message: 'You are authenticated'
    });
});

module.exports = router;