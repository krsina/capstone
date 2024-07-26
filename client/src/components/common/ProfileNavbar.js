import React from 'react';
import { useAuth } from '../../services/authContext';

export default function ProfileNavbar() {
    const { user } = useAuth();

    return (
        <div className="absolute top-0 right-0 p-6">
            {
                user ? (
                    <div className="text-black font-encode-sans">
                        <p className="text-2xl">Welcome, {user.first_name} {user.last_name}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )
            }
        </div>
    );
}
