import React, { useState, useEffect } from 'react';
import BackButton from '../../common/BackButton';
import useClubServices from '../../../services/clubServices';
import { useParams } from 'react-router-dom';
import { joinClub, leaveClub, fetchUserClubs } from '../../../services/clubMemberServices';
import { useAuth } from '../../../services/authContext';
import { fetchClubMembers, fetchClubOfficerCount, fetchClubMemberCount } from '../../../services/clubInfo';

function ClubPage() {
    const { clubName } = useParams();
    const decodedClubName = decodeURIComponent(clubName);
    const { club, error, loading } = useClubServices(decodedClubName);
    const { user } = useAuth();
    const [isMember, setIsMember] = useState(false);
    const [actionStatus, setActionStatus] = useState(null);
    const [activeTab, setActiveTab] = useState('about us');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [clubMembers, setClubMembers] = useState([]);
    const [officerCount, setOfficerCount] = useState(0);
    const [memberCount, setMemberCount] = useState(0);

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

    // Use effect to fetch the officer count and member count
    useEffect(() => {
        const getClubCounts = async () => {
            if (!club) return;
            try {
                const officerCountData = await fetchClubOfficerCount(club.id);
                const memberCountData = await fetchClubMemberCount(club.id);
                setOfficerCount(officerCountData.count);
                setMemberCount(memberCountData.count);
            } catch (error) {
                console.error('Error fetching club counts:', error);
            }
        };

        getClubCounts();
    }, [club]);

    // Function to join a club
    const handleJoinClub = async () => {
        setIsButtonDisabled(true);
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
        } finally {
            // Set a timer to reduce the abue of the API
            setTimeout(() => setIsButtonDisabled(false), 60000); // 60 second delay
            setActionStatus({ success: false, message: "Please wait 60 seconds" });
        }
    };

    // Function to leave a club
    const handleLeaveClub = async () => {
        setIsButtonDisabled(true);
        const userClub = sessionStorage.getItem('userClubs');

        // Check if the user is an officer or admin of the club, this means 
        if (userClub) {
            const userClubs = JSON.parse(userClub);
            const userClubData = userClubs.find(userClub => userClub.id === club.id);
            if (userClubData && userClubData.role.name !== 'Member') {
                setActionStatus({ success: false, message: `You cannot leave the club as a ${userClubData.role.name}.` });
                setIsButtonDisabled(false); // Re-enable button
                return;
            }
        }

        // If the user isn't an officer, user can leave the club
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
        } finally {
            // Set a timer to reduce the abue of the API
            setTimeout(() => setIsButtonDisabled(true), 60000); // 60 second delay
            setActionStatus({ success: false, message: "Please wait 60 seconds" });
        }
    };


    const updateUserClubsSessionStorage = (club, isJoining) => {
        const storedUserClubs = sessionStorage.getItem('userClubs');
        let userClubs = storedUserClubs ? JSON.parse(storedUserClubs) : [];

        console.log('Before update:', userClubs); // Log before update

        if (isJoining) {
            userClubs.push(club);
            console.log(`Joining club: ${club.name}`);
        } else {
            const index = userClubs.findIndex(userClub => userClub.id === club.id);
            if (index !== -1) {
                userClubs.splice(index, 1);
                console.log(`Leaving club: ${club.name}`);
            } else {
                console.error(`Club with id ${club.id} not found in user clubs.`);
            }
        }

        sessionStorage.setItem('userClubs', JSON.stringify(userClubs));
        console.log('After update:', JSON.parse(sessionStorage.getItem('userClubs'))); // Log after update
    };
    // Fetches all the clubs members and their roles
    useEffect(() => {
        if (activeTab === 'members' && club) {
            const getClubMembers = async () => {
                const members = await fetchClubMembers(club.id);
                // If empty array return no members
                if (members.length === 0) {
                    console.log('No members found');
                    setClubMembers([]);
                    return;
                }
                if (Array.isArray(members)) {
                    setClubMembers(members);
                } else {
                    console.error('Expected an array of members, but received:', members);
                    setClubMembers([]);
                }
            };
            getClubMembers();
        }
    }, [activeTab, club]);




    // Use effect for action status (sets time limit for the message to disappear)
    useEffect(() => {
        if (actionStatus) {
            const timer = setTimeout(() => {
                setActionStatus(null);
            }, 3000); // 3000ms = 3 seconds

            // Cleanup function to clear the timer if the component unmounts or actionStatus changes
            return () => clearTimeout(timer);
        }
    }, [actionStatus]);

    const renderTabContents = (tab) => {
        switch (activeTab) {
            case 'documents':
                return (
                    <div>
                        <h1 className="text-primary text-2xl font-semibold">Documents</h1>
                        <p>Documents</p>
                    </div>
                );
            case 'members':
                return (
                    <div>
                        <h1 className="text-primary text-2xl font-semibold">Members</h1>
                        <div className="flex flex-col pt-6 ">
                            <div className="flex flex-row justify-between px-8 pb-1 text-2xl text-secondary font-open-sans ">
                                <h1>Name</h1>
                                <h1>Roles</h1>
                            </div>
                            <hr className="pb-1 border-secondary" />
                            {clubMembers.length === 0 ? (
                                <div className="flex flex-row space-x-4 space-y-4 justify-between">
                                    <p>No members found</p>
                                </div>
                            ) : (
                                clubMembers.map((member, index) => (
                                    <div
                                        className="flex flex-row space-x-4 space-y-2 justify-between px-8"
                                        key={index}
                                    >
                                        <div className="flex flex-row space-x-2 font-open sans text-lg text-center justify-center items-center ">
                                            <p>{member.users.firstname}</p>
                                            <p>{member.users.lastname}</p>
                                        </div>
                                        <p>{member.roles.name}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                );
            case 'contact us':
                return (
                    <div className="font-open-sans">
                        <h1 className="text-primary text-3xl font-semibold">Contact Us</h1>
                        <p className=" sans fon-tlight text-lg">Fill the form below to email us! </p>
                    </div>
                );
            default:
                return (
                    <div className="font-open-sans">
                        <h1 className="text-primary text-3xl font-semibold">About us</h1>
                        <p className="text-lg">{club.description}</p>
                        <h1 className="text-primary text-3xl pt-4 font-semibold">Mission</h1>
                        <p className="text-lg">{club.mission}</p>
                    </div>
                );

        }
    }

    // Loading, error, and club not found states
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching club data: {error.message}</div>;
    }

    if (!club) {
        return <div>No club found with name: {decodedClubName}</div>;
    }

    const firstAdvisor = club.advisors && club.advisors[0] ? `${club.advisors[0].first_name} ${club.advisors[0].last_name}` : 'N/A';
    const firstAffiliation = club.affiliation && club.affiliation[0] ? club.affiliation[0].affiliation_name : 'N/A';
    const affilationLink = club.affiliation && club.affiliation[0] ? club.affiliation[0].affiliation_url : 'N/A';

    return (
        <div className=" pt-28 flex flex-col items-center sm:ml-80 h-screen px-4 pb-12">
            <BackButton />
            <div className="sm:w-4/5 w-full  bg-gray-100 rounded-lg shadow-lg h-screen">
                <div className="bg-secondary justify-between w-full rounded-t-lg flex flex-row py-2 px-4 h-28">
                    <div className="pt-12 pl-48 flex flex-row space-x-10">
                        <div className=" text-white font-open sans flex flex-col">
                            <h1 className="text-xl text-center">Posts</h1>
                            <h1>Total post</h1>
                        </div>
                        <div className=" text-white font-open sans flex flex-col">
                            <h1 className="text-xl text-center">{officerCount}</h1>
                            <h1>Officers</h1>
                        </div>
                        <div className=" text-white font-open sans flex flex-col">
                            <h1 className="text-xl text-center">{memberCount}</h1>
                            <h1>Total Members</h1>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        {user && (
                            <div className="flex justify-center mt-4 mr-2">
                                {isMember ? (
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-800 transition duration-300 ease-in-out"
                                        onClick={handleLeaveClub}
                                        disabled={isButtonDisabled}
                                    >
                                        Leave Club
                                    </button>
                                ) : (
                                    <button
                                        className="bg-white text-green-700 px-2 py-1 rounded-lg hover:bg-tertiary hover:text-white transiton duration-300 ease-in-out"
                                        onClick={handleJoinClub}
                                        disabled={isButtonDisabled}
                                    >
                                        Join Club
                                    </button>
                                )}
                            </div>
                        )}
                        {actionStatus && (
                            <p className={`${actionStatus.success ? 'text-green-500 absolute  mt-12 right-32' : 'text-red-500 absolute mt-12 right-32'}`}>
                                {actionStatus.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="mx-14 font-open-sans">
                    <img src={club.image_url} alt={club.name} className="absolute top-40 w-32 h-32 rounded-full bg-gray-300 border-white border-2" />
                </div>
                <div className="flex flex-row p-4">
                    <div className="flex flex-col w-1/4 items-center bg-grey mt-12 space-y-8 text-center mr-4">
                        <div>
                            <p className="text-2xl font-semibold text-secondary"> {club.name} </p>
                            <p className="text-xl font-light text-primary"> {club.category_id} </p>
                        </div>
                        <div >
                            <p className="text-2xl font-semibold text-secondary "> Meeting Days </p>
                            <p className="text-xl font-light text-primary "> {club.meeting_days} </p>
                        </div>
                        <div >
                            <p className="text-2xl font-semibold text-secondary "> Meeting times </p>
                            <p className="text-xl font-light text-primary "> {club.meeting_times} </p>
                        </div>
                        <div >
                            <p className="text-2xl font-semibold text-secondary "> Meeting Location </p>
                            <p className="text-xl font-light text-primary "> {club.meeting_location} </p>
                        </div>
                        <div >
                            <p className="text-2xl font-semibold text-secondary "> Advisor </p>
                            <p className="text-xl font-light text-primary "> {firstAdvisor} </p>
                        </div>
                        <div >
                            <p className="text-2xl font-semibold text-secondary "> Affilation </p>
                            <a href={affilationLink.startsWith('http') ? affilationLink : `https://${affilationLink}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xl font-light text-primary hover:underline">
                                <p className="text-xl font-light text-primary "> {firstAffiliation} </p>
                            </a>

                        </div>

                    </div>
                    <div className="flex flex-col px-4 mt-4 font-open-sans space-y-2 w-full">
                        <div className="flex flex-row justify-between text-2xl  text-secondary px-8">
                            <h1 onClick={() => setActiveTab('about us')} className="cursor-pointer hover:text-primary transition duration-300">About us</h1>
                            <h1 onClick={() => setActiveTab('documents')} className="cursor-pointer hover:text-primary transition duration-30">Documents</h1>
                            <h1 onClick={() => setActiveTab('members')} className="cursor-pointer hover:text-primary transition duration-30">Members</h1>
                            <h1 onClick={() => setActiveTab('contact us')} className="cursor-pointer hover:text-primary transition duration-30">Contact Us</h1>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-8">
                            {renderTabContents(activeTab)}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ClubPage;
