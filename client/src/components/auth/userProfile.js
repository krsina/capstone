import React, { useEffect, useState } from 'react'
import { } from '../../services/authContext'
import { useAuth } from '../../services/authContext';
import { fetchUserDetails } from '../../services/authServices';
import { useParams } from 'react-router-dom'

function Profile() {
    const { user } = useAuth();
    const [userDetails, setUserDetails] = useState(null);
    const { profile } = useParams();

    useEffect(() => {
        if (user) { // Fetch the user details based on the username in the URL
            fetchUserDetails(profile) // Pass the username to the fetchUserDetails function
                .then((data) => setUserDetails(data))
                .catch((error) => console.error(error));
        }
    }, [user, profile]);

    if (!userDetails) {
        return <div>Loading...</div>;
    }


    return (
        <div className="ml-80 items-center justify-center pt-40">
            <div className="items-center">
                <h1>👋 Hello {userDetails.firstname} {userDetails.lastname}!</h1>
            </div>
        </div>
    )
}

export default Profile