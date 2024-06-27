const express = require('express');
const cors = require('cors');
const supabase = require('./supabaseClient');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Sign-up routes
app.post('/api/signup', async (req, res) => {
    const { studentNumber, uwEmail, firstName, lastName, password } = req.body;
    const { user, error } = await supabase.auth.signUp({ uwEmail, password });
    if (error) return res.status(400).json({ error: error.message });

    //Store additional User information in your database
    const { data: userData, insertError } = await supabase.from('users').insert([
        { ID: user.id, email, password, firstName, lastName }
    ]);
    if (insertError) return res.status(400).json({ error: insertError.message });

    //Store additional student information in your database
    const { data: studentData, studentInsertError } = await supabase.from('students').insert([
        { userID: user.id, studentID: studentNumber }
    ]);
    if (studentInsertError) return res.status(400).json({ error: studentInsertError.message });

    res.status(200).json({ user });
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