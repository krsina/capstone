const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

router.post('/signup', async (req, res) => {
    const { studentNumber, email, password, firstName, lastName } = req.body;
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) return res.status(400).json({ error: error.message });

    // Insert user into users table
    const { user } = data;
    const { error: insertError } = await supabase
        .from('users')
        .insert([{
            id: user.id,
            email: user.email,
            password: password,
            first_name: firstName,
            last_name: lastName,
            created_at: new Date().toISOString()
        }]);

    if (insertError) {
        return res.status(400).json({ error: insertError.message });
    }
    if (!insertError) {
        console.log('User inserted successfully')
    }

    // Insert User into students table
    const { error: studentError } = await supabase
        .from('students')
        .insert([{
            id: user.id,
            student_number: studentNumber,
        }]);

    res.json(data);

})

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Endpoint to check if an email exists
router.post('/check-email', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const { data, error } = await supabase
        .from('auth.users')
        .select('email')
        .eq('email', email)
        .single();

    if (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }

    if (data) {
        return res.status(200).json({ exists: true });
    } else {
        return res.status(200).json({ exists: false });
    }
});

module.exports = router;