import React, { useEffect } from 'react';
import { useAuth } from '../../services/authContext';
import { fetchUserDetails } from '../../services/authServices';
import { NavLink } from 'react-router-dom';

export default function ProfileNavbar() {
    const { user } = useAuth();
    const [userDetails, setUserDetails] = React.useState(null);

    useEffect(() => {
        if (user) { // If the user is logged in, fetch the user details
            fetchUserDetails(user.aud) // Pass the user id to the fetchUserDetails function
                .then((data) => setUserDetails(data))
                .catch((error) => console.error(error));
        }
    }, [user]);

    return (
        <div className="absolute top-0 right-0 p-6 mr-4">
            {
                user ? (
                    <div className="text-black font-encode-sans">
                        {
                            userDetails && (
                                <div className="flex flex-row items-center space-x-2" >
                                    <NavLink
                                        to={`/${userDetails.id}`}
                                    >
                                        <img className="w-10 h-10 rounded-full bg-gray-800" src={userDetails.user_image} alt="User Avatar" />
                                    </NavLink>
                                    <div className="flex flex-col ont-encode-sans">
                                        <NavLink
                                            to={`/${userDetails.id}`}
                                        >
                                            <p className="text-xl">{userDetails.firstname} {userDetails.lastname}</p>
                                        </NavLink>
                                        <p className="text-primary">{userDetails.year}</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                ) : (
                    <p>Loading...</p>
                )
            }
        </div >
    );
}
