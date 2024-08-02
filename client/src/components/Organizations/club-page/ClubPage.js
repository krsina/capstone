import React, { useState, useEffect } from 'react';
import BackButton from '../../common/BackButton';
import useClubServices from '../../../services/clubServices';
import { useParams } from 'react-router-dom';
import { joinClub, leaveClub, fetchUserClubs } from '../../../services/clubMemberServices';
import { useAuth } from '../../../services/authContext';

function ClubPage() {
    const { clubName } = useParams();
    const decodedClubName = decodeURIComponent(clubName);
    const { club, error, loading } = useClubServices(decodedClubName);
    const { user } = useAuth();

    const [isMember, setIsMember] = useState(false);
    const [actionStatus, setActionStatus] = useState(null);

    // Use effect to check if the user is a member of the club
    useEffect(() => {
        const checkMembership = async () => {
            const storedUserClubs = sessionStorage.getItem('userClubs');
            if (storedUserClubs) {
                const userClubs = JSON.parse(storedUserClubs);
                const isMember = userClubs.some(userClub => userClub.id === club.id);
                setIsMember(isMember);
            } else if (user) {
                const userClubs = await fetchUserClubs(user.id);
                sessionStorage.setItem('userClubs', JSON.stringify(userClubs));
                const isMember = userClubs.some(userClub => userClub.id === club.id);
                setIsMember(isMember);
            }
        };

        if (user && club) {
            checkMembership();
        }
    }, [user, club]);

    const handleJoinClub = async () => {
        try {
            const result = await joinClub(club.id, user.id);
            if (result.success === false) {
                setActionStatus({ success: false, message: result.error });
            } else {
                setIsMember(true);
                setActionStatus({ success: true, message: 'Successfully joined the club!' });
                updateUserClubsSessionStorage(club, true);
            }
        } catch (error) {
            setActionStatus({ success: false, message: 'Joining club failed' });
        }
    };

    const handleLeaveClub = async () => {
        try {
            const result = await leaveClub(club.id, user.id);
            console.log(club.id, user.id); // Log the club id and user id
            console.log('API result:', result); // Log the result of the API call
            if (result.success === true) {
                setIsMember(false);
                setActionStatus({ success: true, message: 'Successfully left the club!' });
                updateUserClubsSessionStorage(club, false);
            } else {
                setActionStatus({ success: false, message: result.error });
            }
        }
        catch (error) {
            setActionStatus({ success: false, message: 'Leaving club failed' })
        }
    };

    const updateUserClubsSessionStorage = (club, isJoining) => {
        const storedUserClubs = sessionStorage.getItem('userClubs');
        console.log('Before update:', JSON.parse(storedUserClubs)); // Log before update
        if (storedUserClubs) {
            const userClubs = JSON.parse(storedUserClubs);
            if (isJoining) {
                userClubs.push(club);
                const index = userClubs.findIndex(userClub => userClub.id === club.id);
                console.log('Index:', index); // Log the index
            } else {
                const index = userClubs.findIndex(userClub => userClub.id === club.id);
                console.log('Index:', index); // Log the index
                userClubs.splice(index, 1)
            }
            sessionStorage.setItem('userClubs', JSON.stringify(userClubs));
        }
        console.log('After update:', JSON.parse(sessionStorage.getItem('userClubs'))); // Log after update
    };

    // Use effect for action status
    useEffect(() => {
        if (actionStatus) {
            const timer = setTimeout(() => {
                setActionStatus(null);
            }, 3000); // 3000ms = 3 seconds

            // Cleanup function to clear the timer if the component unmounts or actionStatus changes
            return () => clearTimeout(timer);
        }
    }, [actionStatus]);



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
        <div className="bg-gray-100 pt-28 flex flex-col items-center sm:ml-80 h-screen">
            <BackButton />
            <div className="sm:w-4/5 bg-white rounded-lg shadow-lg">
                <div className="bg-secondary w-full rounded-t-lg flex flex-row justify-end py-2 px-4">
                    <div className="flex flex-col">
                        {user && (
                            <div className="flex justify-center mt-4">
                                {isMember ? (
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded-lg"
                                        onClick={handleLeaveClub}
                                    >
                                        Leave Club
                                    </button>
                                ) : (
                                    <button
                                        className="bg-white text-green-700 px-2 py-1 rounded-lg"
                                        onClick={handleJoinClub}
                                    >
                                        Join Club
                                    </button>
                                )}
                            </div>
                        )}
                        {actionStatus && (
                            <p className={`${actionStatus.success ? 'text-green-500' : 'text-red-500'}`}>
                                {actionStatus.message}
                            </p>
                        )}
                    </div>
                </div>
                
                <div className="mx-12">


                </div>
            </div>
        </div>
    );
}

export default ClubPage;
