import React, { useState } from "react";
import FieldCounter from "../../common/FieldCounter";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function CreatePostModal({ isOpen, closeModal }) {
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [event_date, setEventDate] = useState("");
  const [event_start, setEventStart] = useState("");
  const [event_end, setEventEnd] = useState("");
  const [imageFile, setImageFile] = useState(null); // Use state to manage imageFile
  const uuid = uuidv4();
  const club_id = "1"; // Replace with actual club ID
  const image_url =
    "https://jpntonekxqgaefpfonsj.supabase.co/storage/v1/object/public/images/" +
    club_id +
    "/" +
    uuid;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [location, setLocation] = useState("");
  if (!isOpen) return null;

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

  const handlePost = (event) => {
    event.preventDefault(); // Prevent form from causing a page refresh
        const imageData = new FormData();
        imageData.append('file', imageFile);
        imageData.append('club_id', club_id);
        imageData.append('uuid', uuid);
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
        start_time: event_start,
        end_time: event_end,
        created_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
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
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all py-6 px-12 w-full max-w-3xl mx-4 sm:mx-auto h-5/6">
        <div className="flex justify-between items-center mb-8">
          <button
            type="button"
            className="text-grey-300 hover:text-secondary transition"
            onClick={closeModal}
          >
            &#10005; Close
          </button>
        </div>
        <div className="w-full mb-8">
          <div className="relative bg-gray-100 border border-dashed border-gray-300 rounded-lg h-60 flex items-center justify-center">
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
        <div className="grid grid-cols-2 gap-4">
        <div>
            <input
              type="text"
              placeholder="UWB Hackathon"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center"
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
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center"
              onChange={(e) => setLocation(e.target.value)}
            />
            <label className="block text-sm font-medium text-gray-700 mb-1 text-center">
              Event Location
            </label>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div>
            <DatePicker
              selected={event_date}
              onChange={(date) => setEventDate(date)}
              dateFormat="MM/dd/yyyy"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center"
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
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center"
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
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center"
              value={event_end}
              onChange={(e) => setEventEnd(e.target.value)}
            />
            <label className="block text-sm font-medium text-gray-700 mb-1 text-center">
              End Time
            </label>
          </div>
        </div>
        <div className="w-full mb-8">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <FieldCounter
            id="description"
            onChange={(e) => setBody(e.target.value)}    
            placeholder="Enter Description"
            type="textarea"
            maxChar={250}
            className="relative"
            textareaClassName="h-32"
        />
        </div>
        <div className="flex justify-center">
          <button className="px-12 py-2 bg-secondary text-white font-bold rounded-lg hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-300 ease-in-out" onClick ={handlePost}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePostModal;
