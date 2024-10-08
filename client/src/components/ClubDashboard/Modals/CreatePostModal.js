import React, { useState, useEffect } from "react";
import FieldCounter from "../../common/FieldCounter";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchUserClubs } from "../../../services/ClubFunctions/clubMemberServices";

function CreatePostModal({ isOpen, closeModal }) {
    const [userClubs, setUserClubs] = useState([]);

    // Fetch the user's membership details
    const userId = JSON.parse(sessionStorage.getItem('userDetails')).id;

    // Fetch the users membership details
    useEffect(() => {
        fetchUserClubs(userId).then((data) => {
            // Filter clubs where the user's role is not 'Member'
            const filteredClubs = data.filter(clubObj => clubObj.role.name !== 'Member');
            setUserClubs(filteredClubs);
        }).catch((error) => console.error('Error fetching user clubs:', error));
    }, [userId]);

    const [image, setImage] = useState(null)
    const [error, setError] = useState("")
    const [event_date, setEventDate] = useState("")
    const [event_start, setEventStart] = useState("")
    const [event_end, setEventEnd] = useState("")
    const [imageFile, setImageFile] = useState(null) // Use state to manage imageFile
    const uuid = uuidv4()
    const [selectedClub, setSelectedClub] = useState("")
    const club_id = selectedClub
    const image_url =
        "https://jpntonekxqgaefpfonsj.supabase.co/storage/v1/object/public/images/" +
        club_id +
        "/" +
        uuid;
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [location, setLocation] = useState("");
    if (!isOpen) return null;

    const parseTimeString = (timeString) => {
        const [hours, minutes] = timeString.split(':').map(Number);
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(0);
        return date;
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type !== "image/png" && file.type !== "image/jpeg") {
            setError("Please upload a valid image file (PNG or JPEG)");
            return;
        }

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
                setImageFile(file);
                setError("");
            };
            reader.readAsDataURL(file);
        }
    };

    //Checking for valid form input
    const validateForm = () => {
        return (
            !error &&
            title.trim() !== "" &&
            body.trim() !== ""
        )
    }

    // Function that validates the form and sends the data to the server
    const handlePost = (event) => {
        event.preventDefault(); // Prevent form from causing a page refresh
        const imageData = new FormData();
        imageData.append('file', imageFile);
        imageData.append('club_id', club_id);
        imageData.append('uuid', uuid);

        if (!validateForm()) {
            setError("Please fill out all fields");
            alert('Please fill out all fields');
            return;
        }

        fetch('http://localhost:3001/upload', { // Adjust the URL to your upload endpoint
            method: 'POST',
            body: imageData, // Send the form data directly without JSON.stringify
        })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                alert('Upload successful');
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Upload failed');
            });

        fetch("http://localhost:3001/posts/createPost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                club_id,
                image_url,
                title,
                body,
                location,
                start_time: format(parseTimeString(event_start), "h:mm a"),
                end_time: format(parseTimeString(event_end), "h:mm a"),
                created_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
                event_date
            }),
        })
            .then((response) => response.text())
            .then((data) => console.log(data))

            .catch((error) => {
                console.error("Error:", error);
            });

        closeModal();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75"
            onClick={handleOverlayClick}
        >
            <div className="bg-white rounded-lg shadow-xl transform py-6 sm:px-12 w-full sm:max-w-3xl sm:ml-40 px-4 max-h-screen overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                    <button
                        type="button"
                        className="text-secondary hover:text-black transition hover:shadow-sm"
                        onClick={closeModal}
                    >
                        &#10005; Close
                    </button>
                </div>
                <div className="w-full mb-8">
                    <h1 className="font-bold text-gray-800">
                        Select club to post to
                    </h1>
                    <select
                        name="club_id"
                        value={selectedClub} // Bind to selectedClub state
                        onChange={(e) => setSelectedClub(e.target.value)} // Update selectedClub state on change
                        className="items-center justify-center w-full py-2 mb-4"
                    >
                        <option value="">Select Club</option>
                        {userClubs.map(clubObj => (
                            <option key={clubObj.club.id} value={clubObj.club.id}>
                                {clubObj.club.name}
                            </option>
                        ))}
                    </select>


                    <div className="relative bg-gray-100 border border-dashed border-gray-300 rounded-lg h-60 flex items-center justify-center hover:border-secondary hover:scale-105 duration-500 transition ease-in-out">
                        {image ? (
                            <img
                                src={image}
                                alt="Uploaded"
                                className="w-full h-full object-cover rounded-lg"
                            />
                        ) : (
                            <label
                                htmlFor="image-upload"
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

                                <span className="text-gray-600">Upload Image</span>
                                <input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4 pb-4">
                    <div>
                        <input
                            type="text"
                            placeholder="UWB Hackathon"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center hover:border-primary transition duration-300 ease-in-out focus:outline-none focus:ring-2  focus:ring-primary"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label className="block text-sm font-medium text-gray-700 mb-1 text-center">
                            Event Name
                        </label>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="DISC 127"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center hover:border-primary transition duration-300 ease-in-out focus:outline focus:outline-none focus:ring-2  focus:ring-primary"
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        <label className="block text-sm font-medium text-gray-700 mb-1 text-center">
                            Event Location
                        </label>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                        <DatePicker
                            selected={event_date}
                            onChange={(date) => {
                                const formattedDate = formatDate(date);
                                setEventDate(formattedDate);
                                console.log(formattedDate);
                            }}
                            dateFormat="MM/dd/yyyy"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center hover:border-primary transition duration-300 ease-in-out focus:outline-none focus:ring-2  focus:ring-primary"
                            placeholderText="MM/DD/YYYY"
                            minDate={new Date()}
                        />
                        <label className="block text-sm font-medium text-gray-700 mb-1 text-center">
                            Event Date
                        </label>
                    </div>
                    <div>
                        <input
                            aria-label="Time"
                            type="time"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center hover:border-primary transition duration-300 ease-in-out focus:outline-none focus:ring-2  focus:ring-primary"
                            value={event_start}
                            onChange={(e) => setEventStart(e.target.value)}
                        />
                        <label className="block text-sm font-medium text-gray-700 mb-1 text-center">
                            Start Time
                        </label>
                    </div>
                    <div>
                        <input
                            aria-label="Time"
                            type="time"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center hover:border-primary transition duration-300 ease-in-out focus:outline-none focus:ring-2  focus:ring-primary"
                            value={event_end}
                            onChange={(e) => setEventEnd(e.target.value)}
                        />
                        <label className="block text-sm font-medium text-gray-700 mb-1 text-center">
                            End Time
                        </label>
                    </div>
                </div>
                <div className="w-full mb-4">
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Description
                    </label>
                    <FieldCounter
                        id="description"
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                        placeholder="Enter Description"
                        type="textarea"
                        maxChar={1200}
                        textareaClassName="h-32"
                    />
                </div>
                <div className="flex justify-center">
                    <button className="px-12 py-2 bg-secondary text-white font-bold rounded-lg hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-300 ease-in-out" onClick={handlePost}>
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreatePostModal;
