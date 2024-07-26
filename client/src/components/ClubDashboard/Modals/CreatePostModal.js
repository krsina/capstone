import React, { useState } from 'react';
import FieldCounter from '../../common/FieldCounter';

function CreatePostModal({ isOpen, closeModal }) {
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file && (file.type !== 'image/png' && file.type !== 'image/jpeg')) {
            setError('Please upload a valid image file (PNG or JPEG)');
            return;
        }

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
                setError('');
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75" onClick={handleOverlayClick}>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all py-6 px-12 w-full max-w-3xl mx-4 sm:mx-auto h-5/6">
                <div className="flex justify-between items-center mb-8">
                    <button
                        type="button"
                        className="text-grey-300 hover:text-secondary transition"
                        onClick={closeModal}
                    >
                        &#10005;
                        Close
                    </button>
                </div>
                <div className="w-full mb-8">
                    <div className="relative bg-gray-100 border border-dashed border-gray-300 rounded-lg h-60 flex items-center justify-center">
                        {image ? (
                            <img src={image} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
                        ) : (
                            <label htmlFor="image-upload" className="flex flex-col items-center cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>

                                <span className="text-gray-600">Upload Image</span>
                                <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                            </label>
                        )}
                    </div>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div>

                        <input type="date" placeholder="MM/DD/YYYY" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center" />
                        <label className="block text-sm font-medium text-gray-700 mb-1 text-center">Event Date</label>
                    </div>
                    <div>
                        <input type="text" placeholder="00:00pm - 00:00pm" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center" />
                        <label className="block text-sm font-medium text-gray-700 mb-1 text-center">Event Time</label>
                    </div>
                    <div>
                        <input type="text" placeholder="DISC 127" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center" />
                        <label className="block text-sm font-medium text-gray-700 mb-1 text-center">Event Location
                        </label>
                    </div>
                </div>
                <div className="w-full mb-8">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <FieldCounter
                        id="description"
                        placeholder="Enter Description"
                        type="textarea"
                        maxChar={250}
                        className="relative"
                        textareaClassName="h-32"
                    />
                </div>
                <div className="flex justify-center">
                    <button className="px-12 py-2 bg-secondary text-white font-bold rounded-lg hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-300 ease-in-out">
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreatePostModal;
