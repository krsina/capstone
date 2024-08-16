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

// Custom hook for fetching clubs and storing seen clubs in session storage
function useClubServices(clubName = null, page = 1, limit = 8) {
    const [clubs, setClubs] = useState([]); // Initialize clubs as an empty array (this is for all clubs)
    const [club, setClub] = useState(null); // Initialize club as null (this is for a single club)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClubs = async () => {
            setLoading(true);
            try {
                const offset = (page - 1) * limit;
                const response = await axios.get(`${API_URL}/getClubs?offset=${offset}&limit=${limit}`);
                setClubs(response.data);
            } catch (error) {
                setError(error);
                console.error('Error fetching clubs:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchClubByName = async () => {
            setLoading(true);
            try {
                const seenClubs = JSON.parse(sessionStorage.getItem('seenClubs')) || {}; // Get seen clubs from session storage
                if (seenClubs[clubName]) {
                    setClub(seenClubs[clubName]); // If the club is already seen, set the club to the seen club
                    return; // Return to prevent the API call
                } else {
                    const response = await axios.get(`${API_URL}/getClubByName/${encodeURIComponent(clubName)}`);
                    if (response.data.length === 0) {
                        setClub(null);
                    } else {
                        setClub(response.data[0]);
                        seenClubs[clubName] = response.data[0];
                        sessionStorage.setItem('seenClubs', JSON.stringify(seenClubs));
                    }
                }
            } catch (error) {
                setError(error);
                console.error('Error fetching club:', error);
            } finally {
                setLoading(false);
            }
        };

        if (clubName) {
            fetchClubByName();
        } else {
            fetchClubs();
        }
    }, [clubName, page, limit]);

    return { club, clubs, loading, error };
}

// This function is used to return all clubs without any pagniation, used for drop down menus for finding clubs
export function useAllClubs() {
    const [clubs, setClubs] = useState([]);
    useEffect(() => {
        axios.get(`${API_URL}/getAllClubs`) // API endpoint for getting all clubs
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
