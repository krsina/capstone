import axios from 'axios';
const API_URL = 'http://localhost:3001/club/info'; // API endpoint for club membership

// Fetches a specific club's memberships
export const fetchClubMembers = async (club_id) => {
    try {
        const response = await axios.get(`${API_URL}/getMembers/${club_id}`);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { error: 'Fetching club members failed' };
    }
}

// Fetches the officers
export const fetchClubOfficerCount = async (club_id) => {
    try {
        const response = await axios.get(`${API_URL}/officerCount/${club_id}`);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { error: 'Fetching club officer count failed' };
    }
}

// Fetches the total number of members in a club
export const fetchClubMemberCount = async (club_id) => {
    try {
        const response = await axios.get(`${API_URL}/count/${club_id}`);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { error: 'Fetching club member count failed' };
    }
}