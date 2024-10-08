const express = require('express');
const router = express.Router();
const supabase = require('../../supabaseClient');

// Return all categories for clubs used for the dropdown menu in the create club form
router.get('/getCategories', async (req, res) => {
    const { club_id } = req.query; // Get club_id from query parameters
    // This returns the categories for a specific club if club_id is provided
    if (club_id) {
        const { data, error } = await supabase
            .from('club_category')
            .select('category_id, category:category_id (id, name)')
            .eq('club_id', club_id)
            .single();

        if (error) {
            console.error('Error message:', error.message);
            return res.status(500).send('Error fetching categories');
        }
        return res.json(data);
    }

    const { data, error } = await supabase
        .from('club_category')
        .select('*')
    if (error) {
        console.error('Error message:', error.message);
        return res.status(500).send('Error fetching categories');
    }
    res.json(data);
})

// Used to create new clubs
router.post('/create', async (req, res) => {
    const {
        name, category_id, description, mission, meeting_days, meeting_times, meeting_location,
        advisor_first_name, advisor_last_name, advisor_email, // Advisor information
        affiliation_name, affiliation_url // Affiliation information
    } = req.body;

    // Checking if the category exists
    const { data: categories, error: categoryError } = await supabase
        .from('club_category')
        .select('*')
        .eq('id', category_id);
    if (categoryError) {
        console.error('Error message:', categoryError.message);
        return res.status(500).send('Error fetching categories');
    }

    try {
        const { data: clubData, error: clubError } = await supabase
            .from('club')
            .insert([{ name, description, mission, meeting_days, meeting_times, meeting_location, category_id }])
            .select()
            .single();

        if (clubError) throw clubError;

        const club_id = clubData.id;

        // Insert advisor
        if (advisor_first_name && advisor_last_name && advisor_email) {
            const { error: advisorError } = await supabase
                .from('advisors')
                .insert([{ first_name: advisor_first_name, last_name: advisor_last_name, email: advisor_email, club_id }]);

            if (advisorError) throw advisorError;
        }

        // Insert affiliation if only both fields are filled, otherwise skip
        if (affiliation_name && affiliation_url) {
            const { error: affiliationError } = await supabase
                .from('affiliation')
                .insert([{ affiliation_name, affiliation_url, club_id }]);

            if (affiliationError) throw affiliationError;
        }

        console.log('Inserted data:', clubData);
        res.status(200).send('Club, advisor, and affiliation added successfully');
    } catch (error) {
        console.error('Transaction error:', error.message);
        res.status(500).send('Error creating club, advisor, or affiliation');
    }


});

// Insert Club Officer to database
// PARAMS: club_id, email, name, position
router.post('/insertOfficer', async (req, res) => {
    const { club_id, email, first_name, last_name, position } = req.body;
    if (!club_id || !email || !first_name || !last_name || !position) {
        return res.status(400).json({ error: 'Club ID, email, first name, last name, and position are required' });
    }
    try {
        const { data, error } = await supabase
            .from('club_officers')
            .insert([{ club_id, email, first_name, last_name, position }]);
        if (error) {
            console.error('Error message:', error.message);
            return res.status(500).json({ error: 'Error inserting officer' });
        }
        console.log('Inserted data:', data);
        res.status(200).json({ message: 'Officer added successfully', data });
    } catch (error) {
        console.error('Unexpected error:', error.message);
        res.status(500).json({ error: 'Unexpected error occurred' });
    }
});

// Set Club Status
// PARAMS: club_id, status
router.post('/setClubStatus', async (req, res) => {
    const { club_id, status } = req.body;
    if (!club_id || !status) {
        return res.status(400).json({ error: 'Club ID and status are required' });
    }
    try {
        const { data, error } = await supabase
            .from('club')
            .update({ status })
            .eq('id', club_id);
        if (error) {
            console.error('Error message:', error.message);
            return res.status(500).json({ error: 'Error updating club status' });
        }
        console.log('Updated data:', data);
        res.status(200).json({ message: 'Club status updated successfully', data });
    } catch (error) {
        console.error('Unexpected error:', error.message);
        res.status(500).json({ error: 'Unexpected error occurred' });
    }
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
        .eq('status', 'active') // Only return active clubs
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
        .select(
            `
            id,
            name,
            description,
            mission,
            meeting_days,
            meeting_times,
            meeting_location,
            club_category(
                id,
                category_name
            ),
            advisors (
                first_name,
                last_name,
                email
            ),
            affiliation (
                affiliation_name,
                affiliation_url
            )
            `
        )
        .eq('name', name,);
    if (error) {
        console.error('Error message:', error.message);
        return res.status(500).send('Error fetching club');
    }
    console.log('Fetched data:', data);
    res.status(200).send(data);
});

module.exports = router;