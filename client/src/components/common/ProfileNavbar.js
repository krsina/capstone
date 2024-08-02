import React, { useEffect } from 'react';
import { useAuth } from '../../services/authContext';
import { fetchUserDetails } from '../../services/authServices';

export default function ProfileNavbar() {
    const { user } = useAuth();
    const [userDetails, setUserDetails] = React.useState(null);

    useEffect(() => {
        if (user) {
            fetchUserDetails(user.aud)
                .then((data) => setUserDetails(data))
                .catch((error) => console.error(error));
        }
    }
        , [user]);


    return (
        <div className="absolute top-0 right-0 p-6">
            {
                user ? (
                    <div className="text-black font-encode-sans">
                      
                        {
                            userDetails && (
                                <div className="text-sm">
                                    <p>Name: {userDetails.firstname} {userDetails.lastname}</p>
                                    <p>Student Number: {userDetails.role}</p>
                                </div>
                            )
                        }
                    </div>
                ) : (
                    <p>Loading...</p>
                )
            }
        </div>
    );
}
