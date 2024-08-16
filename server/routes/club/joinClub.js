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
    try {
        const { data, error } = await supabase
            .from('club_membership')
            .select(`
                club:club_id (
                    id,
                    name
                ),
                role:role_id (name)
            `)
            .eq('user_id', user_id);

        if (error) throw error;

        res.json(data);
    } catch (error) {
        console.error('Error fetching user clubs:', error.message);
        res.status(500).send('Error fetching user clubs');
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

// Allows the user to set their preferred club
router.post('/setPreferredClub', async (req, res) => {
    const { user_id, club_id } = req.body;
    try {
        const { data, error } = await supabase
            .from('club_preference')
            .upsert({ user_id, club_id }, { onConflict: ['user_id'] })
            .select();
        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error('Error setting preferred club:', error.message);
        res.status(500).send('Error setting preferred club');
    }
})

//Allows the user to get their preferred club
router.get('/getPreferredClub', async (req, res) => {
    const { user_id } = req.query;
    try {
        const { data, error } = await supabase
            .from('club_preference')
            .select(
                `club:club_id (
                    id,
                    name
                )`
            )
            .single()
            .eq('user_id', user_id) // Fetch the name of the club
            .single();
        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error('Error getting preferred club:', error.message);
        res.status(500).send('Error getting preferred club');
    }
})

module.exports = router;