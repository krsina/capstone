import axios from 'axios';
const API_URL = 'http://localhost:3001/club/membership'; // API endpoint for club membership

// Allows users to join clubs
export const joinClub = async (club_id, user_id) => { // takes in the club id and user id
    try {
        const response = await axios.post(`${API_URL}/join`, { club_id, user_id });
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { error: 'Joining club failed' };
    }
}

// Allows users to leave clubs
export const leaveClub = async (club_id, user_id) => { // takes in the club id and user id
    if (!club_id || !user_id) {
        return { success: false, error: 'Invalid club or user id' };
    }

    try {
        const response = await axios.delete(`${API_URL}/leave`,
            { data: { club_id, user_id } });
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response && error.response.data ? error.response.data.error : 'Leaving club failed';
        return { success: false, error: errorMessage };
    }
}

// Returns all the clubs that the user is a member of
export const fetchUserClubs = async (user_id) => {
    try {
        const response = await axios.get(`${API_URL}/getUserClubs`, { params: { user_id } });
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { error: 'Fetching clubs failed' };
    }
}
