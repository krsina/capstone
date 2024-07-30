const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

router.post('/create', async (req, res) => {
    const { name, description, mission } = req.body;
    if (!name || !description) {
        return res.status(400).send('Club name and description are required');
    }
    const { data, error } = await supabase
        .from('club')
        .insert([{ name, description, mission }]);
    if (error) {
        console.error('Error message:', error.message);
        return res.status(500).send('Error creating club');
    }
    console.log('Inserted data:', data);
    res.status(200).send('Club created successfully');
});

router.delete('/delete', async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).send('Club name is required');
    }
    const { data, error } = await supabase
        .from('club')
        .delete()
        .eq('name', name);
    if (error) {
        console.error('Error message:', error.message);
        return res.status(500).send('Error deleting club');
    }
    console.log('Deleted data:', data);
    res.status(200).send('Club deleted successfully');
});

// Return all clubs
// Return all clubs with pagination
router.get('/getClubs', async (req, res) => {
    const offset = parseInt(req.query.offset, 10) || 0; // Offset the number of clubs returned
    const limit = parseInt(req.query.limit, 10) || 8;   // Limit the number of clubs returned

    const { data, error } = await supabase
        .from('club')
        .select('*')
        .range(offset, offset + limit - 1); // Supabase uses a range method for pagination

    if (error) {
        console.error('Error message:', error.message);
        return res.status(500).send('Error fetching clubs');
    }
    res.json(data);
});

// Return a specific club by name
router.get('/getClubByName/:name', async (req, res) => {
    const { name } = req.params;
    if (!name) {
        return res.status(400).send('Club name is required');
    }
    const { data, error } = await supabase
        .from('club')
        .select('*')
        .eq('name', name);
    if (error) {
        console.error('Error message:', error.message);
        return res.status(500).send('Error fetching club');
    }
    console.log('Fetched data:', data);
    res.status(200).send(data);
});

module.exports = router;