import React, { useState, useEffect } from 'react'
import { fetchUserDetails } from '../../services/authServices';
import { getPreferredClub } from '../../services/ClubFunctions/clubMemberServices';

export default function ClubDashboard() {
    const [user, setUser] = useState(null);
    const [preferedClub, setPreferedClub] = useState(null);

    // Fetch the users details
    useEffect(() => {
        // Retrieve the user's name
        try {
            const user = JSON.parse(sessionStorage.getItem('userDetails'));
            if (user) {
                setUser(user);
            } else {
                fetchUserDetails(user)
                    .then((data) => {
                        setUser(data);
                        sessionStorage.setItem('userDetails', JSON.stringify(data));
                    })
                    .catch((error) => console.error('Error fetching user details:', error));
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }

    }, []);




    return (
        <div className="md:ml-80 py-20 md:px-28 px-6 xl:grid sm:grid-cols-2 sm:grid-rows-2 sm:h-[95vh] flex flex-col gap-4 text-secondary font-encode-sans">
            <div className="flex flex-col">
                {user ? (
                    <>
                        <h1 className="text-6xl font-semibold">Hello, {user.firstname}!</h1>
                        <p className="font-open-sans pt-2">Welcome to the Club Dashboard Page</p>
                    </>
                ) : (
                    <p>Loading or user data not found...</p>
                )}
            </div>
            <div className="flex flex-col space-y-4">
                <h1 className="text-3xl font-semibold">To Do List!</h1>
                <p className="font-open-sans text-xl">No Task for now!</p>
            </div>
            <div className="space-y-4 flex flex-col justify-between">
                <h1 className="text-3xl font-semibold">Club Analytics</h1>
                <div className="grid grid-cols-2 grid-rows-2 gap-8 h-full">
                    <div className="flex flex-col items-center border border-secondary rounded-lg p-2 font-open-sans">
                        <h1 className="text-lg font-light">Total Members</h1>
                        <p className="text-5xl pt-2 font-semibold">3</p>
                    </div>
                    <div className="flex flex-col items-center border border-secondary rounded-lg p-2 font-open-sans">
                        <h1 className="text-lg font-light">General Meetings</h1>
                        <p className="text-5xl pt-2 font-semibold">1</p>
                    </div>

                    <div className="flex flex-col items-center border border-secondary rounded-lg p-2 font-open-sans">
                        <h1 className="text-lg font-light">Total Event Attendees</h1>
                        <p className="text-5xl pt-2 font-semibold">450</p>
                    </div>

                    <div className="flex flex-col items-center border border-secondary rounded-lg p-2 font-open-sans">
                        <h1 className="text-lg font-light">Events This Year</h1>
                        <p className="text-5xl pt-2 font-semibold">4</p>
                    </div>
                </div>
            </div>
            <div className="space-y-6 flex flex-col justify-between h-full sm:pt-[3.25rem] ">
                <div className="flex flex-col items-center border border-secondary rounded-lg p-2 font-open-sans flex-grow">
                    <h1 className="text-lg font-light">Club Event Analytics</h1>
                    <p className="text-5xl pt-4 font-semibold">Events</p>
                </div>
                <div className="flex flex-col items-center border border-secondary rounded-lg p-2 font-open-sans flex-grow">
                    <h1 className="text-lg font-light">Upcoming Events</h1>
                    <p className="text-xl  text-center font-light">09/24/24 | General Meeting | 5:45 pm - 7:45 pm | <span className="font-semibold">Disc 121 </span></p>
                </div>
            </div>
        </div >
    )
}
