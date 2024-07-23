// ProfileNavbar.js
import React from 'react';
import { useAuth } from '../../services/authContext';

export default function ProfileNavbar() {
    const { user } = useAuth();

    return (
        <div className="ml-80">
            {user ? (
                <div className="text-black ">
                    <p>Welcome, {user.first_name} {user.last_name}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}