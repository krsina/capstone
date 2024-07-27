const express = require('express');
const supabase = require('../supabaseClient');
const router = express.Router();

// Function to create a new post
async function createPost(club_id, image_url, title, body, location, created_at, start_time, end_time) {
    try {
        const { data, error } = await supabase
            .from('posts')
            .insert([{ club_id, image_url, title, body, location, created_at, start_time, end_time }]);
        
        if (error) {
            console.error('Error message:', error.message);
            throw new Error(error.message);
        }

        console.log('Inserted data:', data);
    } catch (error) {
        console.error('Error creating post:', error);
    }
}

router.post('/createPost', async (req, res) => {
    const { club_id, image_url, title, body, location, created_at, start_time, end_time } = req.body;
    try {
        await createPost(club_id, image_url, title, body, location, created_at, start_time, end_time);
        res.status(200).send('Post created successfully');
    } catch (error) {
        res.status(500).send('Error creating post');
    }
});

module.exports = router;