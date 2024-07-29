import React, { useState } from 'react';
import BackButton from '../../common/BackButton';

function PrintingForm() {
    const [posterImage, setPosterImage] = useState(null);
    const [largePosterImage, setLargePosterImage] = useState(null);
    const [brochureImage, setBrochureImage] = useState(null);
    const [error, setError] = useState(null);

    const handleImageUpload = (e, setImage) => {
        const file = e.target.files[0];
        // Check only if the image is .jpeg
        if (file.type !== 'image/jpeg') {
            setError('Please upload a JPEG image.');
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="bg-gray-100 py-20 flex flex-col items-center sm:ml-80">
            <BackButton />
            <div className="sm:w-4/5 bg-white py-10 px-12 rounded-lg shadow-lg font-encode-sans">
                {/* Header Information */}
                <section className="flex flex-col items-center space-y-2">
                    <div className="w-full bg-primary rounded-t-xl flex flex-col items-center justify-center text-white space-y-8 px-24 py-12">
                        <h1 className="text-5xl text-center">Welcome to the <span className="font-bold"> Printing Form! </span></h1>
                        <p className="text-center text-lg">Please follow the instruction in the form to submit a print request to Club Council. /// Submit everything in .JPEG format. /// Sizes and quantities available for print: * Letter Fliers: 8.5" x 11" - 35 total per event or promotion. * Medium Fliers: 11" x 17" - 35 total per event or promotion. * Large Posters: 24" x 36" - 4 per event or promotion. /// Feel free to email us with any questions at: uwbclubs@uw.edu
                        </p>
                    </div>
                    <div className="w-full bg-primary rounded-b-xl shadow-primary shadow-md flex flex-col items-center justify-center text-white space-y-8 px-24 py-6">
                        <p className="text-center text-lg">
                            Please submit everything in JPEG format. Ensure that your art matches the size that you are designing (we cannot print 8.5 x 11 fliers on an 11 x 17 flier, the ratio is not correct and will distort the image).
                            <br /><br />
                            <span className="font-semibold ">Quantities available for print are: </span>
                            <br /><br />
                            Letter Fliers: 8.5" x 11" and Medium Fliers: 11"x17" - 35 total per event or promotion.
                            <br /><br />
                            Large Posters: 24" x 36" - 4 per event or promotion (Please note that this should be a separate graphic designed to print 24" x 36". Unfortunately 8.5" x 11" nor 11" x 17" scale up to a printable 24" x 36").
                            <br /><br />
                            Please follow the instructions in the form to submit a printing request to Club Council, and feel free to send us an email at uwbclubs@uw.edu should you have any questions.
                        </p>
                    </div>
                </section>

                {/* Form Content */}
                <section className="flex flex-col space-y-4 mt-8 text-secondary">
                    <h1 className="font-bold text-3xl font-open-sans">General Information</h1>
                    <div className="flex flex-row space-x-5 w-full">
                        <input type="text" placeholder="First Name" className="border-gray-300 p-2 rounded w-full border-b border-r" />
                        <input type="text" placeholder="Last Name" className="border-gray-300 p-2 rounded w-full border-b border-r" />
                        <input type="text" placeholder="Club Name" className="border-gray-300 p-2 rounded w-full border-b border-r" />
                    </div>
                    <h1 className="font-bold text-3xl font-open-sans pt-8">Printing Information</h1>
                    <div className="flex flex-col space-y-8 w-full text-sm font-light">
                        <div className="flex flex-col w-1/2">
                            <input type="text" placeholder="Event Title" className="border-gray-300 p-2 rounded w-full border-b border-r h-12" />
                            <label className="text-gray-400 m-2">Event Name</label>
                        </div>
                        <div className="flex flex-col w-1/2">
                            <input type="text" placeholder="Number of Letter Poster" className="border-gray-300 p-2 rounded w-full border-b border-r h-12" />
                            <label className="text-gray-400 m-2">Size 8.5 x 11</label>
                        </div>
                        <div className="flex flex-col w-1/2">
                            <input type="text" placeholder="Number of Medium Poster" className="border-gray-300 p-2 rounded w-full border-b border-r h-12" />
                            <label className="text-gray-400 m-2">Size 11 x 17</label>
                        </div>
                        <div className="flex flex-col w-1/2">
                            <input type="text" placeholder="Number of Large Poster" className="border-gray-300 p-2 rounded w-full border-b border-r h-12" />
                            <label className="text-gray-400 m-2">Size 24 x 36</label>
                        </div>
                        <div className="flex flex-col w-1/2">
                            <input type="text" placeholder="Number of Brochures" className="border-gray-300 p-2 rounded w-full border-b border-r h-12" />
                            <label className="text-gray-400 m-2">Size 8.5 x 11</label>
                        </div>
                    </div>

                    {/* Additional Form Section */}
                    <h1 className="font-bold text-3xl font-open-sans pt-8">Required Content</h1>
                    <div className="flex flex-row space-x-8 text-lg font-open-sans font-light">
                        <div className="flex items-center">
                            <input type="checkbox" className="form-checkbox h-5 w-5 transition transform duration-300 ease-in-out hover:scale-110 hover:animate-pulse" />
                            <label className="ml-1">DRS Statement</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" className="form-checkbox h-5 w-5 transition transform duration-300 ease-in-out hover:scale-110 hover:animate-pulse" />
                            <label className="ml-1">Visible Club Contact Information</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" className="form-checkbox h-5 w-5 transition transform duration-300 ease-in-out hover:scale-110 hover:animate-pulse" />
                            <label className="ml-1">SAF Logo</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" className="form-checkbox h-5 w-5 transition transform duration-300 ease-in-out hover:scale-110 hover:animate-pulse" />
                            <label className="ml-1">Club Council Logo</label>
                        </div>
                    </div>
                    <h1 className="font-bold text-3xl font-open-sans pt-8">Graphic Uploads</h1>
                    <div className="flex flex-row space-x-4">
                        <div className="group flex flex-col items-center">
                            <div className="relative bg-gray-100 border border-dashed border-gray-300 rounded-lg h-60 w-80 flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-200 hover:border-gray-400 hover:shadow-lg">
                                {posterImage ? (
                                    <img
                                        src={posterImage}
                                        alt="Uploaded"
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                ) : (
                                    <label
                                        htmlFor="poster-upload"
                                        className="flex flex-col items-center cursor-pointer"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-12 w-12 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                            />
                                        </svg>
                                        <span className="text-gray-600">Upload File</span>
                                        <input
                                            id="poster-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageUpload(e, setPosterImage)}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>
                            <label className="text-sm mt-2">Poster Attach</label>
                        </div>
                        <div className="flex flex-col items-center w-full">
                            <div className="bg-gray-100 border border-dashed border-gray-300 rounded-lg h-60 w-80 flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-200 hover:border-gray-400 hover:shadow-lg">
                                {largePosterImage ? (
                                    <img
                                        src={largePosterImage}
                                        alt="Uploaded"
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                ) : (
                                    <label
                                        htmlFor="large-poster-upload"
                                        className="flex flex-col items-center cursor-pointer"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-12 w-12 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                            />
                                        </svg>
                                        <span className="text-gray-600">Upload File</span>
                                        <input
                                            id="large-poster-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageUpload(e, setLargePosterImage)}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>
                            <label className="text-sm mt-2">Large Poster</label>
                        </div>
                        <div className="flex flex-col items-center ">
                            <div className="relative bg-gray-100 border border-dashed border-gray-300 rounded-lg h-60 w-80 flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-200 hover:border-gray-400 hover:shadow-lg">
                                {brochureImage ? (
                                    <img
                                        src={brochureImage}
                                        alt="Uploaded"
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                ) : (
                                    <label
                                        htmlFor="brochure-upload"
                                        className="flex flex-col items-center cursor-pointer"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-12 w-12 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                            />
                                        </svg>
                                        <span className="text-gray-600">Upload File</span>
                                        <input
                                            id="brochure-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageUpload(e, setBrochureImage)}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>
                            <label className="text-sm mt-2">Brochure</label>
                        </div>
                    </div>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    <div className="flex justify-end mt-8">
                        <button className="bg-primary text-white py-2 px-6 rounded-lg">Submit</button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default PrintingForm;
