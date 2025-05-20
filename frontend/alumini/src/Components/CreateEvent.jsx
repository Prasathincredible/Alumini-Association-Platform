import React, { useState } from "react";
import axios from "axios";

function CreateEvent() {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
  });

  const [media, setMedia] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleMediaChange = (e) => {
    setMedia(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", eventData.title);
    formData.append("description", eventData.description);
    formData.append("date", eventData.date);
    formData.append("time", eventData.time);
    formData.append("venue", eventData.venue);
    if (media) {
      formData.append("media", media);
    }

    try {
      const res = await axios.post("https://campus-bridge-zb03.onrender.com/event/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(res.data.message);
      setEventData({ title: "", description: "", date: "", time: "", venue: "" });
      setMedia(null);
    } catch (error) {
      setMessage("Failed to create event");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-semibold text-center text-teal-600 mb-4">Create an Event</h2>
        {message && <p className="text-center text-red-500 mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={eventData.title}
            onChange={handleChange}
            placeholder="Event Title"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />

          <textarea
            name="description"
            value={eventData.description}
            onChange={handleChange}
            placeholder="Event Description"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          ></textarea>

          <input
            type="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />

          <input
            type="time"
            name="time"
            value={eventData.time}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />

          <input
            type="text"
            name="venue"
            value={eventData.venue}
            onChange={handleChange}
            placeholder="Event Location"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />

          <input
            type="file"
            onChange={handleMediaChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg transition-colors duration-300"
          >
            Post Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
