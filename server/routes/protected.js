{/* Protected.js is used for routing authenticated users protected routes that require an authenticated user */ }

const express = require('express');
const router = express.Router();
const authRouter = require('../middleware/authVerify');
const supabase = require('../supabaseClient');

router.get('/', authRouter, (req, res) => {
    res.json({
        message: 'You are authenticated'
    });
});

router.get('/profile', authRouter, async (req, res) => {
    const userId = req.user.id;
    const { data, error } = await supabase
        .from('profile')
        .select('first_name, last_name, email, id')
        .eq('id', userId)
        .single();

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.json(data);
});

module.exports = router;