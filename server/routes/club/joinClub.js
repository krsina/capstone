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
router.get('/getClubs', async (req, res) => {
    const { user_id } = req.query;
    try {
        const { data, error } = await supabase
            .from('club_membership')
            .select('club_id')
            .eq('user_id', user_id)
        if (error) throw error;

        if (data.length === 0) return res.json([]); // If the user is not a member of any clubs, return an empty array

        const clubIds = data.map((club) => club.club_id); // Extracts the club ids from the data

        const { data: clubs, error: clubError } = await supabase // Gets the club details from the club ids
            .from('club')
            .select('*')
            .in('id', clubIds)
        if (clubError) throw clubError;

        res.json(clubs); // Returns the clubs
    } catch (error) {
        console.error('Error getting clubs:', error.message);
        res.status(500).send('Error getting clubs');
    }
})

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


router.up

module.exports = router;