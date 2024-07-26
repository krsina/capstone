import React from 'react';
import { useAuth } from '../../services/authContext';
import { useLocation } from 'react-router-dom';

export default function ProfileNavbar() {
    const { user } = useAuth()
    const location = useLocation()

    const routeBgChanges = {
        '/resources/clubregistration': 'Club Registration',
        '/resources/clubrenewal': 'Club Renewal'
    }

    const bgClass = location.pathname in routeBgChanges ? 'bg-gray-300' : 'bg-white';

    return (
        <div className={`absolute top-0 right-0 p-6 ${bgClass}`}>
            {
                user ? (
                    <div className="text-black font-encode-sans" >
                        <p className="text-2xl">Welcome, {user.first_name} {user.last_name}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )
            }
        </div >
    );
}