import { useEffect, useState } from 'react';
import axios from 'axios';

// Const for the API endpoint
const API_URL = 'http://localhost:3001/club';

// Custom hook for registering a club 
export function useRegisterClub() {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const registerClub = async (club) => {
        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/create`, club); // API endpoint for registering a club
            setResponse(response.data);
            console.log("Sucessfully registered club");
        } catch (error) {
            setError(error.response ? error.response.data : { error: 'An error occurred' });
        } finally {
            setLoading(false);
        }
    }

    return { registerClub, response, error, loading };
}

// Custom hook for fetching specifically a club
function useClubServices(clubName = null, page = 1, limit = 8) {
    const [clubs, setClubs] = useState([]); // Initialize clubs as an empty array (this is for all clubs)
    const [club, setClub] = useState(null); // Initialize club as null (this is for a single club)
    useEffect(() => {
        if (clubName) {
            axios.get(`${API_URL}/getClubByName/${encodeURIComponent(clubName)}`)
                .then(response => {
                    if (response.data.length === 0) {
                        setClub(null);
                        return;
                    }
                    setClub(response.data[0]);
                })
                .catch(error => {
                    console.error('Error fetching club:', error);
                })

        } else {
            const offset = (page - 1) * limit;
            axios.get(`${API_URL}/getClubs?offset=${offset}&limit=${limit}`) // API endpoint for getting all clubs, with pagination
                .then(response => {
                    setClubs(response.data);
                })
                .catch(error => {
                    console.error('Error fetching clubs:', error);
                });
        }
    }, [clubName, page, limit]);

    return clubName ? { club } : { clubs };
}

// This function is used to return all clubs without any pagniation, used for drop down menus for finding clubs
export function useAllClubs() {
    const [clubs, setClubs] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/club/getAllClubs') // API endpoint for getting all clubs
            .then(response => {
                setClubs(response.data);
            })
            .catch(error => {
                console.error('Error fetching clubs:', error);
            });
    }, []);

    return { clubs };
}

// This functionm is used to find categories for a club
export function useCategories() {
    const [category, setCategory] = useState([]);
    useEffect(() => {
        axios.get(`${API_URL}/getCategories`)
            .then(response => {
                setCategory(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);
    return { category };
}

export default useClubServices;
