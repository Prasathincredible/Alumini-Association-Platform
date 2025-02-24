import React, { useState, useContext } from "react";
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

  // Handle Input Change
  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  // Handle Image Selection
  const handleMediaChange = (e) => {
    setMedia(e.target.files[0]);
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    


    const formData = new FormData();
    formData.append("title", eventData.title);
    formData.append("description", eventData.description);
    formData.append("date", eventData.date);
    formData.append("time", eventData.time);
    formData.append("venue", eventData.venue);
    //formData.append("postedBy", user._id); // Attach admin ID
    if (media) {
      formData.append("media", media);
    }

    try {
      const res = await axios.post("http://localhost:3000/event/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
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
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-teal-600">Admin: Create an Event</h2>

      {message && <p className="text-center text-red-500 mt-2">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 mt-4" encType="multipart/form-data">
        <input
          type="text"
          name="title"
          value={eventData.title}
          onChange={handleChange}
          placeholder="Event Title"
          className="w-full p-2 border rounded-lg"
          required
        />

        <textarea
          name="description"
          value={eventData.description}
          onChange={handleChange}
          placeholder="Event Description"
          className="w-full p-2 border rounded-lg"
          required
        ></textarea>

        <input
          type="date"
          name="date"
          value={eventData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          required
        />

        <input
          type="time"
          name="time"
          value={eventData.time}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          required
        />

        <input
          type="text"
          name="venue"
          value={eventData.venue}
          onChange={handleChange}
          placeholder="Event Location"
          className="w-full p-2 border rounded-lg"
          required
        />

        <input type="file" onChange={handleMediaChange} className="w-full p-2 border rounded-lg" required />

        <button type="submit" className="w-full bg-teal-600 text-white p-2 rounded-lg">
          Post Event
        </button>
      </form>
    </div>
  );
}

export default CreateEvent;
