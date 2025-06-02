import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  FaUserAlt, FaEnvelope, FaRegCalendarAlt, FaSchool, 
  FaGraduationCap, FaArrowLeft 
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const apiurl = import.meta.env.VITE_API_URL;

function StudentProfile() {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await axios.get(`${apiurl}/student_profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudentData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to fetch profile details");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="text-center text-lg text-gray-700 mt-6">Loading...</div>;
  if (error) return <div className="text-center text-red-600 mt-6">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 px-4 py-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition duration-150"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>

      <div className="w-full max-w-4xl mx-auto bg-white border-4 border-indigo-500 rounded-2xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-indigo-600 text-white p-8 flex flex-col items-center">
          <img
            src={studentData.avatar || "https://via.placeholder.com/150"}
            alt="Student Avatar"
            className="w-36 h-36 rounded-full border-4 border-white shadow-xl object-cover"
          />
          <h2 className="text-3xl font-bold mt-4">{studentData.userName}</h2>
          <p className="text-indigo-100 text-sm mt-1">{studentData.rollNo}</p>
        </div>

        {/* Profile Details */}
        <div className="p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-indigo-700 mb-6 border-b pb-3">Profile Details</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Email */}
            <DetailCard icon={<FaEnvelope />} label="Email" value={studentData.email} />
            
            {/* Batch */}
            <DetailCard icon={<FaRegCalendarAlt />} label="Batch" value={studentData.batch} />

            {/* Degree */}
            <DetailCard icon={<FaGraduationCap />} label="Degree" value={studentData.degree} />

            {/* Department */}
            <DetailCard icon={<FaSchool />} label="Department" value={studentData.department} />

            {/* Year */}
            <DetailCard icon={<FaUserAlt />} label="Year" value={studentData.year} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable detail card component
function DetailCard({ icon, label, value }) {
  return (
    <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="text-indigo-600 text-lg mr-4">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-gray-800 font-semibold">{value}</p>
      </div>
    </div>
  );
}

export default StudentProfile;
