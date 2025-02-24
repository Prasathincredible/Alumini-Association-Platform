import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  FaUserAlt, FaEnvelope, FaRegCalendarAlt, FaSchool, 
  FaGraduationCap, FaUser
} from "react-icons/fa";

function StudentProfile() {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await axios.get("http://localhost:3000/student_profile", {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-gray-100 p-6">
      <div className="bg-white shadow-2xl rounded-lg overflow-hidden w-full max-w-3xl">
        
        {/* Header - Avatar and Name */}
        <div className="bg-teal-600 text-white p-8 flex flex-col items-center">
          <img
            src={studentData.avatar || "https://via.placeholder.com/150"}
            alt="Student Avatar"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
          <h2 className="text-2xl font-bold mt-4">{studentData.name}</h2>
          <p className="text-gray-200">{studentData.rollNo}</p>
        </div>

        {/* Profile Details */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Profile Details</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Email */}
            <div className="flex items-center">
              <FaEnvelope className="text-teal-600 mr-3" />
              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p className="text-gray-800 font-semibold">{studentData.email}</p>
              </div>
            </div>

            {/* Batch */}
            <div className="flex items-center">
              <FaRegCalendarAlt className="text-teal-600 mr-3" />
              <div>
                <p className="text-gray-500 text-sm">Batch</p>
                <p className="text-gray-800 font-semibold">{studentData.batch}</p>
              </div>
            </div>

            {/* Degree */}
            <div className="flex items-center">
              <FaGraduationCap className="text-teal-600 mr-3" />
              <div>
                <p className="text-gray-500 text-sm">Degree</p>
                <p className="text-gray-800 font-semibold">{studentData.degree}</p>
              </div>
            </div>

            {/* Department */}
            <div className="flex items-center">
              <FaSchool className="text-teal-600 mr-3" />
              <div>
                <p className="text-gray-500 text-sm">Department</p>
                <p className="text-gray-800 font-semibold">{studentData.department}</p>
              </div>
            </div>

            {/* Year */}
            <div className="flex items-center">
              <FaUser className="text-teal-600 mr-3" />
              <div>
                <p className="text-gray-500 text-sm">Year</p>
                <p className="text-gray-800 font-semibold">{studentData.year}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
