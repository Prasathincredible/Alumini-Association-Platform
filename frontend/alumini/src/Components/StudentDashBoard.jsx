import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import {
  FaUserAlt,
  FaBriefcase,
  FaUsers,
  FaSearch,
  FaUniversity,
} from 'react-icons/fa';

function StudentDashBoard() {
  const { logoutUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-blue-50 to-white overflow-y-auto p-4 md:p-8">
      {/* Header */}
      <div className="w-full bg-blue-600 text-white rounded-2xl p-6 shadow-lg flex flex-col md:flex-row items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">🎓 Student Dashboard</h1>
          <p className="text-white/80 text-sm">
            Welcome! Manage your career, connect, and explore opportunities.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="mt-4 md:mt-0 bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg font-medium transition"
        >
          Logout
        </button>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          icon={<FaUserAlt className="text-4xl text-teal-600" />}
          title="View Profile"
          description="View and update your personal profile."
          onClick={() => navigate('/student_profile')}
          bgColor="from-teal-100 to-white"
        />

        <DashboardCard
          icon={<FaBriefcase className="text-4xl text-green-600" />}
          title="Look for a Job"
          description="Browse job listings and apply for positions."
          onClick={() => navigate('/applyjob')}
          bgColor="from-green-100 to-white"
        />

        <DashboardCard
          icon={<FaUsers className="text-4xl text-indigo-600" />}
          title="Networking"
          description="Connect with fellow students and alumni."
          onClick={() => navigate('/networking')}
          bgColor="from-indigo-100 to-white"
        />

        <DashboardCard
          icon={<FaSearch className="text-4xl text-purple-600" />}
          title="Search Alumni"
          description="Search the alumni directory and connect."
          onClick={() => navigate('/aluminidirectory')}
          bgColor="from-purple-100 to-white"
        />
      </div>
    </div>
  );
}

const DashboardCard = ({ icon, title, description, onClick, bgColor }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-gradient-to-br ${bgColor} p-6 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all cursor-pointer flex flex-col items-center text-center`}
    >
      <div className="mb-4">{icon}</div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
        Go
      </button>
    </div>
  );
};

export default StudentDashBoard;
