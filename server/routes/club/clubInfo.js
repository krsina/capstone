import { Router } from 'express';
import supabase from '../../supabaseClient';
const router = Router();

// Counts the membership of a club by the club id
router.get('/count/:club_id', async (req, res) => {
    const { club_id } = req.params;
    const { data, error } = await supabase
        .from('club_membership')
        .select('club_id')
        .count('club_id', { as: 'count' })
        .eq('club_id', club_id)
    if (error) {
        console.error('Error message:', error.message);
        return res.status(500).send('Error fetching club membership');
    }
    res.json(data);
});

//

