import React, { useEffect, useState } from 'react';
import { fetchUserDetails } from '../../services/authServices';
import { useParams } from 'react-router-dom';
import BackButton from '../common/BackButton'
import EditProfile from './Modals/editProfile';
import { fetchUserClubs } from '../../services/ClubFunctions/clubMemberServices';
import { NavLink } from 'react-router-dom';
import { getPreferredClub } from '../../services/ClubFunctions/clubMemberServices';

function Profile() {
    const [userDetails, setUserDetails] = useState(null);
    const { userName } = useParams(); // Gets the username from the URL
    const [isModalOpen, setIsModalOpen] = useState(false); // Used to open and close the modal
    const [userClubs, setUserClubs] = useState([]);
    const [preferredClub, setPreferredClub] = useState(null);
    const [prefferedClubRole, setPreferredClubRole] = useState(null);

    const handleOpenModal = () => {
        setIsModalOpen(true); // Opens the modal that's passed in
    }

    const handleCloseModal = () => {
        setIsModalOpen(false); // Closes the modal
    }

    const handlePreferredClubUpdate = (newPreferredClub) => {
        setPreferredClub(newPreferredClub); // Update the preferred club state in the Profile component
        // Find the role associated with the preferred club
        const clubRole = userClubs.find(club => club.club.id === newPreferredClub.id)?.role.name || 'No role';
        setPreferredClubRole(clubRole); // Update the preferred club role state
    }


    // Returns users id to fetch user details
    useEffect(() => {
        const storedUserDetails = sessionStorage.getItem('userDetails');
        if (storedUserDetails) {
            setUserDetails(JSON.parse(storedUserDetails));
        } else {
            if (userName) {
                fetchUserDetails(userName)
                    .then((data) => {
                        setUserDetails(data);
                        sessionStorage.setItem('userDetails', JSON.stringify(data));
                    })
                    .catch((error) => console.error('Error fetching user details:', error));
            }
        }
    }, [userName]);

    // Fetch the ussers membership details
    useEffect(() => {
        const storedUserClubs = sessionStorage.getItem('userClubs');
        if (storedUserClubs) {
            setUserClubs(JSON.parse(storedUserClubs));
        } else {
            if (userName) {
                fetchUserClubs(userName)
                    .then((data) => {
                        setUserClubs(data);
                        sessionStorage.setItem('userClubs', JSON.stringify(data));
                    })
                    .catch((error) => console.error('Error fetching user clubs:', error));
            }
        }
    }, [userName]);

    // Fetch the users preferred club
    useEffect(() => {
        if (preferredClub === null && userDetails) {
            getPreferredClub(userDetails.id)
                .then((data) => {
                    if (data) {
                        setPreferredClub(data.club);
                        // Set the role of the preferred club
                        const clubRole = userClubs.find(club => club.club.id === data.club.id)?.role.name || 'No role';
                        setPreferredClubRole(clubRole);
                    }
                })
                .catch((error) => console.error('Error fetching preferred club:', error));
        }
    }, [preferredClub, userDetails, userClubs]);

    // If the user details are not fetched yet, show a loading spinner
    if (!userDetails) {
        return <div role="status" className="flex items-center justify-center h-screen">
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* SVG content */}
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    }

    return (
        <div className="sm:ml-80 items-center justify-center pt-36 bg-gray-100 h-screen text-secondary">
            <BackButton />
            <div className="text-center font-encode-sans">
                <h1 className="text-4xl ">👋 Hello {userDetails.firstname} {userDetails.lastname}!</h1>
            </div>
            <div className="flex sm:flex-row flex-col sm:space-x-24 px-24 pt-12 sm:space-y-0 space-y-12 font-open-sans">
                <div className="flex flex-col  bg-white sm:w-1/2 rounded-lg p-6">
                    <div className="flex flex-row justify-between">
                        <div className="space-y-4">
                            <img className="w-36 h-36 rounded-full bg-gray-300" src={userDetails.user_image} alt="User Avatar" />
                            <h1 className="text-2xl"> {userDetails.firstname} {userDetails.lastname}</h1>
                            <div className="flex flex-row space-x-6">
                                <div className="flex flex-row items-center">
                                    {/* Graduate Cap SVG for Year */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary mr-2" viewBox="0 0 64 64" fill="currentColor">
                                        <path d="M32 2L2 18l30 16 30-16L32 2zM32 36.5l-24-12.8v10.6c0 4.8 5.6 9.1 14.5 11.2L32 58l9.5-12.5C50.4 43.4 56 39.1 56 34.3V23.7l-24 12.8z" />
                                        <path d="M38 38.7v6.4c-2 1.1-4 2-6 2s-4-0.9-6-2v-6.4l6 3.2 6-3.2z" />
                                    </svg>
                                    <p className="font-open-sans text-secondary font-semibold ">{userDetails.year}</p>
                                </div>
                                <div className="flex flex-row  items-center">
                                    {/* Club Icon SVG */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary mr-2" viewBox="0 0 64 64" fill="currentColor">
                                        <path d="M32 2a10 10 0 00-10 10v2.7A10 10 0 1016 24v12h32V24a10 10 0 10-6-9.3V12A10 10 0 0032 2zM28 34h8v20a4 4 0 11-8 0V34z" />
                                    </svg>
                                    <p className="font-open-sans text-secondary font-semibold ">{preferredClub ? preferredClub.name : 'No preferred'}</p>
                                    <p className="font-open-sans text-secondary font-semibold ml-2">{prefferedClubRole}</p>
                                </div>
                            </div>
                        </div>
                        <button
                            className="rounded-lg bg-secondary text-white px-2 py-1 w-36 h-12"
                            onClick={handleOpenModal}
                        >Edit Profile</button>
                    </div>
                    <EditProfile
                        isOpen={isModalOpen}
                        closeModal={handleCloseModal}
                        onPreferredClubUpdate={handlePreferredClubUpdate}
                    />
                </div>

                <section className="flex flex-col bg-white sm:w-1/3  rounded-lg">
                    <div className="w-full bg-secondary text-white rounded-t-lg p-3 text-center">
                        <h1 className="text-2xl font-encode-sans">Club Membership</h1>
                    </div>
                    <div className="p-4">
                        {
                            userClubs ? (
                                userClubs.map((club, index) => {
                                    return (
                                        <div key={club.id || index} className="flex flex-row justify-between items-center  border-gray-200 p-2">
                                            <NavLink to={`/organization/${club.club.name}`}>
                                                <h1 className="text-xl hover:text-primary">{club.club.name}</h1>
                                            </NavLink>
                                            <div className="flex flex-row items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 1a7 7 0 110 14 7 7 0 010-14zm0 4a3 3 0 100 6 3 3 0 000-6zm0 1a2 2 0 110 4 2 2 0 010-4z" clipRule="evenodd" />
                                                </svg>
                                                <p className="text-sm ml-2">{club.role.name}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <p>Loading...</p>
                            )
                        }
                    </div>
                </section>
            </div>

        </div>
    );
}

export default Profile;

