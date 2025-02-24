import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { 
  FaBriefcase, FaUsers, FaCalendarAlt, FaTrophy, FaUser, FaPlus, 
  FaClipboardList, FaSuitcase, FaSignOutAlt, FaHandHoldingHeart, FaDonate 
} from "react-icons/fa";
import axios from "axios"; // Import axios for API calls
import { UserContext } from "../contexts/UserContext"; 

function AlumniDashboard() {
  const [showJobOptions, setShowJobOptions] = useState(false);
  const [showDonationOptions, setShowDonationOptions] = useState(false); 
  const { logoutUser } = useContext(UserContext); 
  const navigate = useNavigate(); 

  const [events, setEvents] = useState([]); // State for storing events

  // Fetch Events from Backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/event/events"); // Adjust backend URL
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col p-6 justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Alumni Dashboard</h2>
          <nav className="space-y-4">
            <Link to="/profile" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-700 transition">
              <FaUser />
              <span>View Profile</span>
            </Link>

            <button onClick={() => setShowJobOptions(!showJobOptions)} className="flex items-center space-x-3 p-3 w-full text-left rounded-lg hover:bg-blue-700 transition">
              <FaBriefcase />
              <span>Job Portal</span>
            </button>

            {showJobOptions && (
              <div className="ml-6 space-y-2">
                <Link to="/postjob" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-700 transition">
                  <FaPlus />
                  <span>Post a Job</span>
                </Link>
                <Link to="/applyjob" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-700 transition">
                  <FaSuitcase />
                  <span>Apply for a Job</span>
                </Link>
              </div>
            )}

            <Link to="/networking" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-700 transition">
              <FaUsers />
              <span>Networking</span>
            </Link>

            <Link to="/events" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-700 transition">
              <FaCalendarAlt />
              <span>Event Management</span>
            </Link>

            <Link to="/success-stories" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-700 transition">
              <FaTrophy />
              <span>Success Stories</span>
            </Link>

            <button onClick={() => setShowDonationOptions(!showDonationOptions)} className="flex items-center space-x-3 p-3 w-full text-left rounded-lg hover:bg-blue-700 transition">
              <FaHandHoldingHeart />
              <span>Donation Portal</span>
            </button>

            {showDonationOptions && (
              <div className="ml-6 space-y-2">
                <Link to="/donate" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-700 transition">
                  <FaDonate />
                  <span>Make a Donation</span>
                </Link>
                <Link to="/view-donations" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-700 transition">
                  <FaClipboardList />
                  <span>View Donations</span>
                </Link>
              </div>
            )}
          </nav>
        </div>

        <button onClick={handleLogout} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-600 transition w-full">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content Area - Display Events */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to the Alumni Dashboard</h1>
        <p className="mt-2 text-gray-600">Connect, grow, and stay engaged with your alumni network!</p>

        {/* Events Section */}
        <div className="mt-8">
  <h2 className="text-2xl font-bold text-gray-700">Upcoming Events</h2>
  {events.length === 0 ? (
    <p className="mt-4 text-gray-500">No events available.</p>
  ) : (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <div key={event._id} className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
          {/* Event Media */}
          {event.media && (
            <img
              src={event.media}
              alt={event.title}
              className="w-full h-60 object-cover"
            />
          )}
          
          {/* Event Details */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
            <p className="text-gray-600 mt-1">{event.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              📅 {new Date(event.date).toLocaleDateString()} | 🕒 {event.time} | 📍 {event.venue}
            </p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
      </main>
    </div>
  );
}

export default AlumniDashboard;
