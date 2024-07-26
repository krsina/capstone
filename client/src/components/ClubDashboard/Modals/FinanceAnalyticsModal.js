import React from 'react';

function FinanceAnalyticsModal({ isOpen, closeModal }) {
    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    }


    return (
        <div className="sm:fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75"
            onClick={handleOverlayClick}
        >
            <div className="sm:ml-80 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all py-4 sm:max-w-5xl sm:w-full sm:max-h-full sm:h-5/6">
                <div className="px-4 py-3 sm:px-6 sm:flex ">
                    <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-secondary text-base font-medium text-white shadow-sm 
                        hover:bg-primary transition duration-300 ease-in-out sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={closeModal}
                    >
                        Close
                    </button>
                </div>
                <div className="px-20 flex flex-col items-center text-center space-y-2">
                    <h1 className="text-5xl font-bold font-encode-sans text-primary ">Welcome to Finance Analytics!</h1>
                    <p className="text-xl font-open-sans font-light text-secondary"> Track all your club expesnes, and past financial transactions with Club Council</p>
                </div>
            </div>
        </div>
    );
}

export default FinanceAnalyticsModal;
