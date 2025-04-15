import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext'; // Import UserContext
import { useNavigate } from 'react-router-dom'; // To navigate to other pages after logout
import { FaBriefcase, FaSearch, FaUsers, FaUniversity, FaUserAlt } from 'react-icons/fa'; // Icons

function StudentDashBoard() {
  const { logoutUser } = useContext(UserContext); // Get logoutUser function from context
  const navigate = useNavigate(); // To navigate after logout

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header Section */}
      <div className="bg-blue-600 text-white p-4 rounded-lg shadow-md mb-6">
        <h1 className="text-3xl font-bold text-center">Student Dashboard</h1>
      </div>

      {/* Dashboard Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

        {/* View Profile */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <FaUserAlt className="text-teal-600 text-4xl mb-4" />
          <h2 className="text-xl font-semibold text-center mb-4">View Profile</h2>
          <p className="text-gray-600 text-center mb-4">View and update your personal profile.</p>
          <button
            onClick={() => navigate('/student_profile')} // Navigate to the profile page
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg transition duration-300"
          >
            Go to Profile
          </button>
        </div>

        {/* View Alumni Activities */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <FaUniversity className="text-blue-600 text-4xl mb-4" />
          <h2 className="text-xl font-semibold text-center mb-4">View Alumni Activities</h2>
          <p className="text-gray-600 text-center mb-4">Stay updated with alumni events and activities.</p>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition duration-300">
            View Activities
          </button>
        </div>

        {/* Look for a Job */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <FaBriefcase className="text-green-600 text-4xl mb-4" />
          <h2 className="text-xl font-semibold text-center mb-4">Look for a Job</h2>
          <p className="text-gray-600 text-center mb-4">Browse job listings and apply for positions.</p>
          <button
            onClick={() => navigate('/applyjob')} // Navigate to apply jobs page
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition duration-300"
          >
            Explore Jobs
          </button>
        </div>

        {/* Networking */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <FaUsers className="text-indigo-600 text-4xl mb-4" />
          <h2 className="text-xl font-semibold text-center mb-4">Networking</h2>
          <p className="text-gray-600 text-center mb-4">Connect with fellow students and alumni for collaboration.</p>
          <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg transition duration-300">
            Start Networking
          </button>
        </div>

        {/* Search for Alumni */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <FaSearch className="text-purple-600 text-4xl mb-4" />
          <h2 className="text-xl font-semibold text-center mb-4">Search for Alumni</h2>
          <p className="text-gray-600 text-center mb-4">Search the alumni directory and connect with former students.</p>
          <button onClick={() => navigate('/aluminidirectory')} className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg transition duration-300">
            Search Alumni
          </button>
        </div>

      </div>

      {/* Logout Section */}
      <div className="mt-6 text-center">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default StudentDashBoard;
