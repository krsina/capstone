const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

router.post('/signup', async (req, res) => {
    // Extract the user details from the request body
    const { studentNumber, email, password, firstName, lastName } = req.body;
    // Sign up the user with the email and password
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });
    // If there is an error, return the error message
    if (error) return res.status(400).json({ error: error.message });

    console.log("User Auth Success");

    // If no error, extract the user id from the data object and assign it to the userId variable
    const userId = data.user.id;

    try {
        // Once the user is signed up, insert the user details into the users table
        const { data: user, error: userError } = await supabase
            // Select from Users table
            .from('users')
            .insert([{
                id: userId,
                firstname: firstName,
                lastname: lastName,
                role: 1, // predefined role as 1 for Student
                email: email,
                student_number: studentNumber,
            }]);

        if (userError) {
            return res.status(400).json({ error: userError.message });
        }
        console.log("User Details Inserted");
        res.json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
})

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            return res.status(400).json({ error: error.message });
        }
        console.log("User Auth Success");
        return res.json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Router to return the user details
router.get('/user', async (req, res) => {
    try {
        // Assume the user ID is sent as a query parameter
        const { userId } = req.query
        // Fetch user details from the users table
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single()
        if (error) {
            return res.status(400).json({ error: error.message })
        }
        res.json(user)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error' })
    }
})






module.exports = router;