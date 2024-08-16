import React, { useEffect, useState } from 'react';
import { fetchUserDetails } from '../../services/authServices';
import { useParams } from 'react-router-dom';
import BackButton from '../common/BackButton'
import EditProfile from './Modals/editProfile';
import { fetchUserClubs } from '../../services/ClubFunctions/clubMemberServices';
import { NavLink } from 'react-router-dom';

function Profile() {
    const [userDetails, setUserDetails] = useState(null);
    const { userName } = useParams(); // Gets the username from the URL
    const [isModalOpen, setIsModalOpen] = useState(false); // Used to open and close the modal
    const [userClubs, setUserClubs] = useState([]);
    
    const handleOpenModal = () => {
        setIsModalOpen(true); // Opens the modal that's passed in
    }

    const handleCloseModal = () => {
        setIsModalOpen(false); // Closes the modal
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


    // If the user details are not fetched yet, show a loading spinner
    if (!userDetails) {
        return <div role="status" className="flex items-center justify-center h-screen">
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
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

                        </div>
                        <button
                            className="rounded-lg bg-secondary text-white px-2 py-1 w-36 h-12"
                            onClick={handleOpenModal}
                        >Edit Profile</button>
                    </div>
                    <EditProfile isOpen={isModalOpen} closeModal={handleCloseModal} />
                </div>
                <div className="flex flex-col bg-white sm:w-1/3  rounded-lg">
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
                </div>
            </div>

        </div>
    );
}

export default Profile;
