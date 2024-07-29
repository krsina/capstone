import React from 'react';

function FinanceAnalyticsModal({ isOpen, closeModal }) {
    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    }


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75"
            onClick={handleOverlayClick}
        >
            <div className="bg-white rounded-lg shadow-xl transform py-6 sm:px-12 w-full sm:max-w-3xl sm:ml-40  px-4">
                <div className="flex justify-between items-center mb-8">
                    <button
                        type="button"
                        className="text-secondary hover:text-black transition hover:shadow-sm"
                        onClick={closeModal}
                    >
                        &#10005; Close
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
