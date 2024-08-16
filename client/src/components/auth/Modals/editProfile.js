import React, { useState, useEffect, useCallback } from 'react';
import { setPreferedClub, getPreferredClub } from '../../../services/ClubFunctions/clubMemberServices';

function EditProfile({ isOpen, closeModal }) {
    const [clubs, setClubs] = useState([]);
    const [user, setUser] = useState(null);
    const [selectedClub, setSelectedClub] = useState(null);
    const [preferredClub, setPreferredClub] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch the user's club membership and user ID when the modal is open
    useEffect(() => {
        if (isOpen) {
            const storedUserClubs = sessionStorage.getItem('userClubs');
            const storedUser = sessionStorage.getItem('userDetails');

            if (storedUserClubs) {
                const clubsData = JSON.parse(storedUserClubs);
                setClubs(clubsData);
            }

            if (storedUser) {
                const userData = JSON.parse(storedUser);
                setUser(userData);
            }
        }
    }, [isOpen]);

    // Fetch preferred club and set initial selected club
    useEffect(() => {
        if (isOpen && user) {
            setLoading(true);
            getPreferredClub(user.id)
                .then((data) => {
                    if (data) {
                        const club = data.club
                        setPreferredClub(club);
                        setSelectedClub(club.club_id); // Pre-select the current preferred club
                    } else if (clubs.length > 0) {
                        setPreferredClub(null);
                        setSelectedClub(clubs[0].club.id); // Default to first club if no preferred club
                    }
                })
                .catch((error) => {
                    console.error('Error fetching preferred club:', error)
                })
                .finally(() => setLoading(false));
        }
    }, [isOpen, user, clubs]);

    // Handle form submission
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        if (!user || !selectedClub) {
            alert('Please select a club and try again.');
            return;
        }

        const clubId = String(selectedClub);
        const userId = String(user.id);
        // Check if the selected club is already the preferred club
        if (String(clubId) === String(preferredClub?.id)) {
            alert('This club is already set as your preferred club.');
            return;
        }

        try {
            await setPreferedClub(clubId, userId); // Set the preferred club
            alert('Club preference updated');
            closeModal();
        } catch (error) {
            console.error('Error setting preferred club:', error);
        }
    }, [selectedClub, user, preferredClub, closeModal]);

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75"
            onClick={handleOverlayClick}
        >
            <div className="bg-white rounded-lg shadow-xl w-full transform py-6 sm:px-12 sm:max-w-3xl sm:ml-40 px-4">
                <div className="flex justify-between items-center mb-8">
                    <button
                        type="button"
                        className="text-secondary hover:text-black transition hover:shadow-sm"
                        onClick={closeModal}
                    >
                        &#10005; Close
                    </button>
                </div>
                <div className="flex flex-col space-y-4">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div>
                            <h1>Select your Club Preference</h1>
                            <form onSubmit={handleSubmit}>
                                <select
                                    name="clubSelect"
                                    className="w-full border border-gray-300 p-2 rounded-lg mb-4"
                                    value={selectedClub || ''}  // Ensure value is an empty string initially
                                    onChange={(e) => {
                                        setSelectedClub(e.target.value);
                                    }}
                                >
                                    <option value="" disabled>Select a club</option> {/* Add a disabled option to prompt selection */}
                                    {clubs.length > 0 ? (
                                        clubs.map(({ club }) => (
                                            <option value={club.id} key={club.id}>
                                                {club.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>No Clubs</option>
                                    )}

                                </select>
                                <button
                                    type="submit"
                                    className="w-full bg-secondary text-white rounded-lg p-2 mt-4"
                                >
                                    Update
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
