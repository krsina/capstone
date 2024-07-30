import { useEffect, useState } from 'react';
import axios from 'axios';

function useClubServices(clubName = null, page = 1, limit = 8) {
    const [clubs, setClubs] = useState([]); // Initialize clubs as an empty array (this is for all clubs)
    const [club, setClub] = useState(null); // Initialize club as null (this is for a single club)


    useEffect(() => {
        if (clubName) {
            axios.get(`http://localhost:3001/club/getClubByName/${encodeURIComponent(clubName)}`) // API endpoint for getting a specific club
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
            axios.get(`http://localhost:3001/club/getClubs?offset=${offset}&limit=${limit}`) // API endpoint for getting all clubs, with pagination
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

export default useClubServices;
