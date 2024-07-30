import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useClubServices from '../../services/clubServices';

export default function Organizations() {
    const [page, setPage] = useState(1);
    const limit = 8;
    const { clubs } = useClubServices(null, page, limit);

    if (!clubs || clubs.length === 0) {
        return <div className="justify-center items-center text-center ">Loading...</div>; // Or a more sophisticated loading indicator
    }

    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <div className="sm:ml-80 py-20 md:px-28 flex flex-col gap-y-12">
            <div className="text-secondary text-4xl font-encode-sans font-semibold">
                <h1>Clubs & Organizations</h1>
            </div>
            <div className="flex flex-row flex-wrap gap-x-12 pb-8 gap-y-24">
                {clubs.map(club => (
                    <NavLink to={`/organization/${club.name}`} key={club.id} className="relative rounded">
                        <div className="absolute inset-0 transform translate-x-3 -translate-y-3 bg-quinary rounded w-72 z-10"></div>
                        <div className="relative w-72 h-48 bg-secondary bg-opacity-90 rounded-t-lg"></div>
                        <div className="relative px-8 py-3 bg-secondary bg-opacity-90 z-20 rounded-bl-lg">
                            <div className="font-bold text-xl text-white">{club.name}</div>
                        </div>
                    </NavLink>
                ))}
            </div>
            <div className="flex justify-between mt-8">
                {page > 1 && (
                    <button onClick={handlePreviousPage} className="bg-primary text-white px-4 py-2 rounded">
                        Previous
                    </button>
                )}
                {clubs.length === limit && (
                    <button onClick={handleNextPage} className="bg-primary text-white px-4 py-2 rounded">
                        Next
                    </button>
                )}
            </div>
        </div>
    );
}
