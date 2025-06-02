import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Icons
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaFileImage,
} from "react-icons/fa";
import { MdTitle, MdDescription } from "react-icons/md";

const apiurl = import.meta.env.VITE_API_URL;

function CreateEvent() {
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
  });

  const [media, setMedia] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading state

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleMediaChange = (e) => {
    setMedia(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ Start loading

    const formData = new FormData();
    for (let key in eventData) {
      formData.append(key, eventData[key]);
    }
    if (media) {
      formData.append("media", media);
    }

    try {
      const res = await axios.post(`${apiurl}/event/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(res.data.message);
      setEventData({ title: "", description: "", date: "", time: "", venue: "" });
      setMedia(null);
    } catch (error) {
      setMessage("Failed to create event");
      console.error("Error:", error);
    } finally {
      setLoading(false); // ✅ End loading
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-10 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 text-teal-600 hover:text-teal-800 flex items-center font-medium"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>

      {/* Form Container */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8 sm:p-10">
        <h2 className="text-3xl font-bold text-center text-teal-700 mb-6">
          Create a New Event
        </h2>

        {message && <p className="text-center text-red-500 mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <span className="bg-gray-100 p-3 text-gray-600">
              <MdTitle />
            </span>
            <input
              type="text"
              name="title"
              value={eventData.title}
              onChange={handleChange}
              placeholder="Event Title"
              className="w-full p-3 outline-none"
              required
            />
          </div>

          {/* Description */}
          <div className="flex items-start border border-gray-300 rounded-lg overflow-hidden">
            <span className="bg-gray-100 p-3 text-gray-600">
              <MdDescription />
            </span>
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleChange}
              placeholder="Event Description"
              className="w-full p-3 outline-none resize-none min-h-[100px]"
              required
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span className="bg-gray-100 p-3 text-gray-600">
                <FaCalendarAlt />
              </span>
              <input
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
                className="w-full p-3 outline-none"
                required
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span className="bg-gray-100 p-3 text-gray-600">
                <FaClock />
              </span>
              <input
                type="time"
                name="time"
                value={eventData.time}
                onChange={handleChange}
                className="w-full p-3 outline-none"
                required
              />
            </div>
          </div>

          {/* Venue */}
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <span className="bg-gray-100 p-3 text-gray-600">
              <FaMapMarkerAlt />
            </span>
            <input
              type="text"
              name="venue"
              value={eventData.venue}
              onChange={handleChange}
              placeholder="Event Location"
              className="w-full p-3 outline-none"
              required
            />
          </div>

          {/* Media Upload */}
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <span className="bg-gray-100 p-3 text-gray-600">
              <FaFileImage />
            </span>
            <input
              type="file"
              onChange={handleMediaChange}
              className="w-full p-3 text-gray-500"
              required
            />
          </div>


          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold py-3 rounded-lg transition duration-300 flex items-center justify-center ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700 text-white"
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2 text-white">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8z"
                  ></path>
                </svg>
                Posting...
              </span>
            ) : (
              "Post Event"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;

