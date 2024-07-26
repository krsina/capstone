import React from 'react'
import BackIcon from '../styling/Icons/bx-arrow-back.svg';
import { useNavigate, useLocation } from 'react-router-dom'

function BackButton() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBack = () => {
        if (location.pathname.includes('/resources/clubregistration') || location.pathname.includes('/resources/clubrenewal')) {
            navigate('/resources');
        } else if (location.pathname.includes('/financeform1') || location.pathname.includes('/financeform2')) {
            navigate('/finance');
        } else {
            navigate(-1); // Fallback to go back to the previous page
        }
    };

    return (
        <div className="top-0 absolute left-0 sm:ml-80 p-4">
            <button onClick={handleBack}
                className="flex items-center gap-1 text-xl font-encode-sans font-light">
                <img src={BackIcon}
                    alt="Back"
                    className="h-8 w-8"
                /> Back
            </button>

        </div>
    )
}

export default BackButton