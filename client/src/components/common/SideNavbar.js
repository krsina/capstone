import React, { useState } from 'react';
import EventsIcon from '../styling/Icons/house.svg';
import OrganizationIcon from '../styling/Icons/building.svg';
import ResourceIcon from '../styling/Icons/briefcase.svg';
import ClubDashboardIcon from '../styling/Icons/id-card.svg';
import LogoutIcon from '../styling/Icons/logout.svg';
import CreatePost from '../styling/Icons/create.svg';
import FinanceForm from '../styling/Icons/form.svg';
import Finance from '../styling/Icons/finance.svg';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../services/authContext';
import { useLocation } from 'react-router-dom';
import FinanceAnalyticsModal from '../ClubDashboard/Modals/FinanceAnalyticsModal';
import CreatePostModal from '../ClubDashboard/Modals/CreatePostModal';

function SideNavbar() {
    const { logout } = useAuth(); // Used to get the logout function from the authContext
    const location = useLocation(); // Used to get the current location of the user
    const [activeModal, setIsModalOpen] = useState(null); // Used to open and close the modal

    const handleLogout = () => {
        logout(); // Calls the logout function from the authContext
    }

    // Takes in the modal that needs to be opened
    const handleModalOpen = (modal) => {
        setIsModalOpen(modal); // Opens the modal that's passed in
    }

    // Set the modal to null to close it
    const handleModalClose = () => {
        setIsModalOpen(null); // Closes the modal
    }

    // Used to check if the user is exactly in the /clubdashboard page
    const shouldShowClubButtons = location.pathname.split('/')[1] === 'clubdashboard';

    return (
        <div className="hidden md:block">
            <aside className="fixed top-0 left-0 h-full w-80 bg-primary text-white flex flex-col font-light">
                <div className="h-full pt-24 overflow-y-auto flex flex-col justify-between px-7">
                    <ul className="text-2xl space-y-2 font-open-sans">
                        <NavLink className="flex items-center gap-4 pt-4 pb-4 px-3 hover:rounded-2xl hover:bg-secondary  transition ease-in-out duration-500"
                            to="/events"
                        >
                            <img src={EventsIcon} alt="Events" className="h-8 w-8" />
                            <span>Events</span>
                        </NavLink>
                        <NavLink className="flex items-center gap-4 pt-4 pb-4 px-3 hover:bg-secondary hover:rounded-2xl transition ease-in-out duration-500"
                            to="/organization"
                        >
                            <img src={OrganizationIcon} alt="Organization" className="h-8 w-8" />
                            <span>Organization</span>
                        </NavLink>
                        <NavLink className="flex items-center gap-4 pt-4 pb-4 px-3 hover:bg-secondary hover:rounded-2xl transition ease-in-out duration-500"
                            to="/resources"
                        >
                            <img src={ResourceIcon} alt="Resources" className="h-7 w-7" />
                            <span>Resources</span>
                        </NavLink>
                        <hr className="border-gray-200 w-full self-center" />
                        <NavLink className="flex items-center gap-4 pt-4 pb-4 px-3 hover:bg-secondary hover:rounded-2xl transition ease-in-out duration-500"
                            to="/clubdashboard"
                        >
                            <img src={ClubDashboardIcon} alt="Club Dashboard" className="h-8 w-8" />
                            <span>Club Dashboard</span>
                        </NavLink>

                        {/* Below extra buttons that only load if the User is in the /clubdashboard directory */}
                        {shouldShowClubButtons && (
                            <>
                                <button
                                    className="flex items-center gap-4 pt-4 pb-4 px-3 hover:bg-secondary hover:rounded-2xl transition ease-in-out duration-500"
                                    onClick={() => handleModalOpen('createPost')} // On click opens the createPost modal
                                >
                                    <img src={CreatePost} alt="Create Post" className="h-7 w-7" />
                                    <span>Create Post</span>
                                </button>
                                <button
                                    className="flex items-center gap-4 pt-4 pb-4 px-3 hover:bg-secondary hover:rounded-2xl transition ease-in-out duration-500"
                                    onClick={() => handleModalOpen('financeAnalytics')} // On click opens the financeAnalytics modal
                                >
                                    <img src={Finance} alt="Finance Analytics" className="h-7 w-7" />
                                    <span>Finance Analytics</span>
                                </button>
                                <NavLink
                                    className="flex items-center  gap-4 pt-4 pb-4 px-3 hover:bg-secondary hover:rounded-2xl transition ease-in-out duration-500"
                                    to="/clubdashboard/finance"
                                >
                                    <img src={FinanceForm} alt="Finance Form" className="h-7 w-7" />
                                    <span>Finance Form</span>
                                </NavLink>
                            </>
                        )}
                    </ul>
                </div>
                <div className="p-6">
                    <NavLink
                        className="flex items-center gap-4"
                        onClick={handleLogout}
                        to="/"
                    >
                        <img src={LogoutIcon} alt="Logout" className="h-6 w-6" />
                        <span className="text-2xl">Logout</span>
                    </NavLink>
                </div>
            </aside >

            {/* Below are the modals that are opened when the user clicks on the buttons */}
            {activeModal === 'createPost' && (
                <CreatePostModal isOpen={true} closeModal={handleModalClose} /> // Opens the CreatePostModal
            )}
            {activeModal === 'financeAnalytics' && (
                <FinanceAnalyticsModal isOpen={true} closeModal={handleModalClose} /> // Opens the FinanceAnalyticsModal
            )}

        </div>
    )
}

export default SideNavbar;
