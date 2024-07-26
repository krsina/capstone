import React from 'react'
import EventsIcon from '../styling/Icons/house.svg'
import OrganizationIcon from '../styling/Icons/building.svg'
import ResourceIcon from '../styling/Icons/briefcase.svg'
import ClubDashboardIcon from '../styling/Icons/id-card.svg'
import LogoutIcon from '../styling/Icons/logout.svg'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../services/authContext'
import { useLocation } from 'react-router-dom';

function SideNavbar() {
    const { logout } = useAuth();
    const location = useLocation();

    const handleLogout = () => {
        logout();
    }

    const shouldShowClubButtons = location.pathname.includes('/clubdashboard');

    return (
        <div className="hidden md:block">
            <aside className="fixed top-0 left-0 h-full w-80 bg-primary text-white flex flex-col font-light  ">
                <div className="h-full pt-24 overflow-y-auto flex flex-col justify-between mx-9 ">
                    <ul className="text-2xl space-y-2 font-open-sans">
                        <NavLink className="flex items-center gap-4 pt-4 pb-4 px-3 hover:rounded-2xl hover:bg-secondary  transition ease-in-out duration-500"
                            to="/events"
                        >
                            <img src={EventsIcon} alt="Events" className="h-8 w-8" />
                            <span >Events</span>
                        </NavLink>
                        <NavLink className="flex items-center gap-4 pt-4 pb-4 px-3 hover:bg-secondary hover:rounded-2xl transition ease-in-out duration-500"
                            to="/organization"
                        >
                            <img src={OrganizationIcon} alt="Events" className="h-8 w-8" />
                            <span>Organization</span>
                        </NavLink>
                        <NavLink className="flex items-center gap-4 pt-4 pb-4 px-3 hover:bg-secondary hover:rounded-2xl transition ease-in-out duration-500"
                            to="/resources"
                        >
                            <img src={ResourceIcon} alt="Events" className="h-7 w-7" />
                            <span>Resources</span>
                        </NavLink>
                        <hr className="border-gray-200 w-full self-center" />
                        <NavLink className="flex items-center gap-4 pt-4 pb-4 px-3 hover:bg-secondary hover:rounded-2xl transition ease-in-out duration-500"
                            to="/clubdashboard"
                        >
                            <img src={ClubDashboardIcon} alt="Club Dashboard" className="h-8 w-8" />
                            <span>Club Dashboard</span>
                        </NavLink>
                        {/* Below extra buttons that only laods if the User is in the /clubdashboard */}
                        {shouldShowClubButtons && (
                            <div className="flex flex-col items-center gap-4">
                                <NavLink
                                    className="flex items-center gap-4 pt-4 pb-4 px-3 hover:bg-secondary hover:rounded-2xl transition ease-in-out duration-500"
                                    to="/resources/clubregistration"
                                >
                                    <span>Club Registration</span>
                                </NavLink>
                                <NavLink
                                    className="flex items-center gap-4 pt-4 pb-4 px-3 hover:bg-secondary hover:rounded-2xl transition ease-in-out duration-500"
                                    to="/resources/clubrenewal"
                                >
                                    <span>Club Renewal</span>
                                </NavLink>
                            </div>
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
        </div>

    )
}

export default SideNavbar