import React from 'react'
import BackButton from '../../common/BackButton'
import useClubServices from '../../../services/clubServices'
import { useParams } from 'react-router-dom'

function ClubPage() {
    const { clubName } = useParams();
    const decodedClubName = decodeURIComponent(clubName);
    const { club, error, loading } = useClubServices(decodedClubName);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching club data: {error.message}</div>;
    }

    if (!club) {
        return <div>No club found with name: {decodedClubName}</div>;
    }

    return (
        <div className="bg-gray-100 pt-28 flex flex-col items-center sm:ml-80 h-screen ">
            <BackButton />
            <div className="sm:w-4/5 bg-white  rounded-lg shadow-lg ">
                <div className="bg-secondary w-full rounded-t-lg h-20 flex items-center justify-center text-white text-4xl">Club Page</div>
                <div className="mx-12">
                    <h1 className="text-black">{club.name}</h1>
                    <p>{club.description}</p>
                    <p>{club.mission}</p>
                </div>

            </div>
        </div>
    )
}

export default ClubPage