import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { FaBriefcase, FaUsers, FaCalendarAlt, FaTrophy, FaUser, FaPlus, FaClipboardList, FaSuitcase, FaSignOutAlt } from "react-icons/fa";
import { UserContext } from "../contexts/UserContext"; // Ensure correct import path

function AlumniDashboard() {
  const [showJobOptions, setShowJobOptions] = useState(false);
  const { logoutUser } = useContext(UserContext); 
  const navigate = useNavigate(); // Initialize navigate

  const handleLogout = () => {
    logoutUser(); // Clear user session
    navigate("/", { replace: true }); // Redirect to login page
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

            {/* Job Portal - Toggle job options instead of navigating */}
            <button onClick={() => setShowJobOptions(!showJobOptions)} className="flex items-center space-x-3 p-3 w-full text-left rounded-lg hover:bg-blue-700 transition">
              <FaBriefcase />
              <span>Job Portal</span>
            </button>

            {/* Conditionally Show Job Options */}
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
                <Link to="/applied-list" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-700 transition">
                  <FaClipboardList />
                  <span>Applied Persons List</span>
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
          </nav>
        </div>

        {/* Logout Button */}
        <button onClick={handleLogout} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-600 transition w-full">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to the Alumni Dashboard</h1>
        <p className="mt-2 text-gray-600">Connect, grow, and stay engaged with your alumni network!</p>
      </main>
    </div>
  );
}

export default AlumniDashboard;
