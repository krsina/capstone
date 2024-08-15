const express = require('express');
const router = express.Router();
const supabase = require('../../supabaseClient');

// Allows users to join clubs
router.post('/join', async (req, res) => {
    const { club_id, user_id } = req.body;
    try {
        const { data, error } = await supabase
            .from('club_membership')
            .insert([{ user_id, club_id, role_id: 1 }]) // Defaults as a member
            .select();

        if (error) throw error;

        res.json(data);
    } catch (error) {
        console.error('Error joining club:', error.message);
        res.status(500).send('Error joining club');
    }
})

// Returns the users clubs that they are a member of
router.get('/getUserClubs', async (req, res) => {
    const { user_id } = req.query;

    if (!user_id) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        // Fetch the club memberships along with the role information
        const { data: memberships, error: membershipError } = await supabase
            .from('club_membership')
            .select(`
                club_id,
                role:role_id (name)
            `)
            .eq('user_id', user_id);

        if (membershipError) throw membershipError;

        if (memberships.length === 0) {
            return res.json([]); // If the user is not a member of any clubs, return an empty array
        }

        // Extract the club IDs from the memberships
        const clubIds = memberships.map((membership) => membership.club_id);

        // Fetch the club details using the extracted club IDs
        const { data: clubs, error: clubError } = await supabase
            .from('club')
            .select('id, name')
            .in('id', clubIds);

        if (clubError) throw clubError;

        // Combine the club details with the role information
        const result = clubs.map((club) => {
            const membership = memberships.find((m) => m.club_id === club.id);
            return {
                id: club.id,
                name: club.name,
                role: membership.role
            };
        });

        res.json(result); // Returns the combined club details with roles
    } catch (error) {
        console.error('Error getting clubs:', error.message);
        res.status(500).send('Error getting clubs');
    }
});

// Allows users to leave clubs
router.delete('/leave', async (req, res) => {
    const { club_id, user_id } = req.body;
    if (!club_id || !user_id) {
        return res.status(400).send('Invalid club or user id');
    }
    try {
        const { data, error } = await supabase
            .from('club_membership')
            .delete()
            .eq('user_id', user_id)
            .eq('club_id', club_id);
        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error('Error leaving club:', error.message);
        res.status(500).send('Error leaving club');
    }
});

// Returns the users club role in a club
router.get('/role', async (req, res) => {
    const { club_id, user_id } = req.query;
    try {
        const { data, error } = await supabase
            .from('club_membership')
            .select('role_id')
            .eq('club_id', club_id)
            .eq('user_id', user_id);
        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error('Error getting role:', error.message);
        res.status(500).send('Error getting role');
    }
})


router.up

module.exports = router;