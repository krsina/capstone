const express = require('express');
const cors = require('cors');
const supabase = require('./supabaseClient');

const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

// Health check run for route
app.get('/', (req, res) => {
    res.send('Server is running');
});


// Sign-up routes
app.post('/signup', async (req, res) => {
    const { studentNumber, email, firstName, lastName, password } = req.body;

    try {
        // Sign up user with Supabase auth
        const { data: user, error: authError } = await supabase.auth.signUp({ email, password });
        if (authError) {
            console.error('Signup error:', authError);
            return res.status(400).json({ error: authError.message });
        }

        // Store additional user information in your database
        const { data: userData, error: insertError } = await supabase.from('users').insert([
            { ID: user.id, email, firstName, lastName }
        ]);
        if (insertError) return res.status(400).json({ error: insertError.message });

        // Store additional student information in your database
        const { data: studentData, error: studentInsertError } = await supabase.from('students').insert([
            { userID: user.id, studentID: studentNumber }
        ]);
        if (studentInsertError) return res.status(400).json({ error: studentInsertError.message });

        res.status(201).json({ user });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Sign-in routes
app.post('/api/signin', async (req, res) => {
    const { email, password } = req.body;
    const { user, error } = await supabase.auth.signIn({ email, password });
    if (error) return res.status(400).json({ error: error.message });
    res.json(user);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});