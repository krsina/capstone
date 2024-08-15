const express = require('express');
const router = express.Router();
const supabase = require('../../supabaseClient');

// Returns the number of members in a club
router.get('/count/:club_id', async (req, res) => {
    const { club_id } = req.params;
    const { data, error, count } = await supabase
        .from('club_membership')
        .select('club_id', { count: 'exact' })
        .eq('club_id', club_id);
    if (error) {
        console.error('Error message:', error.message);
        return res.status(500).send('Error fetching club membership count');
    }

    res.json({ count });
});

// Returns total number of officers in a club
router.get('/officerCount/:club_id', async (req, res) => {
    const { club_id } = req.params;
    const { data, error, count } = await supabase
        .from('club_membership')
        .select('club_id', { count: 'exact' })
        .eq('club_id', club_id)
        .neq('role_id', 1); // Role 1 is a member
    if (error) {
        console.error('Error message:', error.message);
        return res.status(500).send('Error fetching club officer count');
    }

    res.json({ count });
});


// Returns all the clubs' membership and their names
router.get('/getMembers/:club_id', async (req, res) => {
    const { club_id } = req.params;

    const { data, error } = await supabase
        .from('club_membership')
        .select(`
            users:user_id (
                firstname,
                lastname
            ),
            roles:role_id (
                name
            )
        `).eq('club_id', club_id);
    if (error) {
        console.error('Error message:', error.message);
        return res.status(500).send('Error fetching club membership');
    }

    res.json(data);
});

module.exports = router;