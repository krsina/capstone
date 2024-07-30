const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

// Return all categories for clubs used for the dropdown menu in the create club form
router.get('/getCategories', async (req, res) => {
    const { data, error } = await supabase
        .from('club_category')
        .select('*')
    if (error) {
        console.error('Error message:', error.message);
        return res.status(500).send('Error fetching categories');
    }
    res.json(data);
})

// Adds Advisor to the club
router.post('/addAdvisor', async (req, res) => {
    const { first_name, last_name, email, club_id } = req.body;
    if (!first_name || !last_name || !email || !club_id) {
        return res.status(400).send('Advisor first name, last name, email, and club_id are required');
    }

    const { data, error } = await supabase
        .from('advisors')
        .insert([{ name, email, club_id, start_date, end_date }])
    if (error) {
        console.error('Error message:', error.message)
        return res.status(500).send('Error adding advisor')
    }
    res.status(200).send('Advisor added successfully')
})

// Adds if only the club is Affiliated with another organization
router.post('/addAffiliation', async (req, res) => {
    const { club_id, affiliation_name, affiliati_url, } = req.body;

})

// Used to create new clubs
router.post('/create', async (req, res) => {
    const { name, category_id, description, mission, meeting_days, meeting_times, meeting_location } = req.body;
    if (!name || !description) {
        return res.status(400).send('Club name and description are required');
    }

    // Checking if the category exists
    const { data: categories, error: categoryError } = await supabase
        .from('club_category')
        .select('*')
        .eq('id', category_id);
    if (categoryError) {
        console.error('Error message:', categoryError.message);
        return res.status(500).send('Error fetching categories');
    }


    const { data, error } = await supabase
        .from('club')
        .insert([{ name, description, mission, meeting_days, meeting_times, meeting_location, category_id,  }]); // Also add the current timestamp of when the club was submitted
    if (error) {
        console.error('Error message:', error.message);
        return res.status(500).send('Error creating club');
    }
    console.log('Inserted data:', data);
    res.status(200).send('Club created successfully');
});

// Used to Delete a club
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

// Return all clubs with pagination used for the Orgs page
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

// Returns all clubs without any pagination, used for drop down menus for finding clubs
router.get('/getAllClubs', async (req, res) => {
    const { data, error } = await supabase
        .from('club')
        .select('id ,name'); // Return id and name
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