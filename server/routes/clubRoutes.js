const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

router.post('/create', async (req, res) => {
    const {name, description} = req.body; 
    if (!name || !description) {
        return res.status(400).send('Club name and description are required');
    }
    const {data, error} = await supabase
        .from('club')
        .insert([{name, description}]); 
    if (error) {
        console.error('Error message:', error.message);
        return res.status(500).send('Error creating club');
    }
    console.log('Inserted data:', data);
    res.status(200).send('Club created successfully');
});

router.delete('/delete', async (req, res) => {
    const {name} = req.body; 
    if (!name) {
        return res.status(400).send('Club name is required'); 
    }
    const {data, error} = await supabase
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

module.exports = router;