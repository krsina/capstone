import React from 'react'

function editProfile({ isOpen, closeModal }) {
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
            <div className="bg-white rounded-lg shadow-xl w-full transform py-6 sm:px-12 sm:max-w-3xl sm:ml-40  px-4">
                <div className="flex justify-between items-center mb-8">
                    <button
                        type="button"
                        className="text-secondary hover:text-black transition hover:shadow-sm"
                        onClick={closeModal}
                    >
                        &#10005; Close
                    </button>
                </div>
                < div className="flex flex-col space-y-4">
                    <div className="w-1/2">
                        <h1 className="text-2xl font-bold ">Year</h1>
                        <input
                            type="text"
                            className="w-full border border-gray-300 p-2 rounded-lg mb-4"
                            placeholder="Year"
                        />
                    </div>
                    <div className="w-1/2">
                        <h1 className="text-2xl font-bold ">Password</h1>
                        <input
                            type="password"
                            className="w-full border border-gray-300 p-2 rounded-lg mb-4"
                            placeholder="Year"
                        />
                    </div>
                    <div className="">
                        <h1>Select your Club</h1>
                        <select
                            className="w-full border border-gray-300 p-2 rounded-lg mb-4"
                        >
                            <option value="1">Club 1</option>
                            <option value="2">Club 2</option>
                            <option value="3">Club 3</option>
                        </select>
                    </div>

                </div>
                <button
                    className="w-full bg-secondary text-white rounded-lg p-2 mt-4"
                >
                    Update
                </button>

            </div>
        </div>
    )
}

export default editProfile;