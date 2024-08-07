const express = require('express');
const supabase = require('../supabaseClient');
const router = express.Router();

// Function to create a new post
router.post('/createPost', async (req, res) => {
    const { club_id, image_url, title, body, location, created_at, start_time, end_time, event_date } = req.body;

    try {
        const { data, error } = await supabase
            .from('posts')
            .insert([{ club_id, image_url, title, body, location, created_at, start_time, end_time, event_date }]);

        if (error) {
            console.error('Error message:', error.message);
            throw new Error(error.message);
        }

        console.log('Inserted data:', data);
        res.status(200).send('Post created successfully');
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).send('Error creating post');
    }
});

router.get('/getPosts', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('posts')
            .select('*');

        if (error) {
            console.error('Error message:', error.message);
            throw new Error(error.message);
        }

        res.status(200).send(data);
    } catch (error) {
        res.status(500).send('Error getting posts');
    }
});

module.exports = router;