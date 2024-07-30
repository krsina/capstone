import React from 'react';
import { useAuth } from '../../services/authContext';

export default function ProfileNavbar() {
    const { user } = useAuth();

    return (
        <div className="absolute top-0 right-0 p-6">
            {
                user ? (
                    <div className="text-black font-encode-sans">
                        <p className="text-2xl">Welcome, {user.email}</p>
                        <p className="text-sm">Role: {user.role}</p>
                        <p className="text-sm">ID: {user.aud}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )
            }
        </div>
    );
}
