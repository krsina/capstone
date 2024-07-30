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

function MobileNavBar() {
    const { logout } = useAuth();
    const location = useLocation();
    const [activeModal, setIsModalOpen] = useState(null);

    const handleModalOpen = (modal) => {
        setIsModalOpen(modal);
    }

    const handleModalClose = () => {
        setIsModalOpen(null);
    }

    return (
        <div className="sm:hidden block">
            <nav className=" fixed bottom-0 left-0 w-full bg-primary text-white flex justify-around items-center py-2 z-50">
                <NavLink to="/events" className="flex flex-col items-center">
                    <img src={EventsIcon} alt="Events" className="h-8 w-8" />
                </NavLink>
                <NavLink to="/organization" className="flex flex-col items-center">
                    <img src={OrganizationIcon} alt="Organization" className="h-8 w-8" />
                </NavLink>
                <NavLink to="/resources" className="flex flex-col items-center">
                    <img src={ResourceIcon} alt="Resources" className="h-8 w-8" />
                </NavLink>
                <NavLink to="/clubdashboard" className="flex flex-col items-center">
                    <img src={ClubDashboardIcon} alt="Club Dashboard" className="h-8 w-8" />
                </NavLink>
                <button onClick={logout} className="flex flex-col items-center">
                    <img src={LogoutIcon} alt="Logout" className="h-8 w-8" />
                </button>
            </nav>

            {/* Modals for the mobile navbar */}
            {activeModal === 'createPost' && (
                <CreatePostModal isOpen={true} closeModal={handleModalClose} />
            )}
            {activeModal === 'financeAnalytics' && (
                <FinanceAnalyticsModal isOpen={true} closeModal={handleModalClose} />
            )}
        </div>
    );
}

export default MobileNavBar;
