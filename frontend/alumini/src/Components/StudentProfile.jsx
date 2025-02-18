import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure axios is installed

import { FaUserAlt, FaEnvelope, FaRegCalendarAlt, FaSchool, FaGraduationCap, FaUser } from 'react-icons/fa';

function StudentProfile() {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("authToken");
      //console.log(token);
      try {
        const response = await axios.get('http://localhost:3000/student_profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudentData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to fetch profile details');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="student-profile-container p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6">Student Profile</h2>

      {studentData ? (
        <div className="profile-card bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center mb-6">
            {/* Profile Avatar */}
            <div className="avatar mr-4">
              <img
                src={studentData.avatar || 'https://via.placeholder.com/150'}
                alt="Student Avatar"
                className="w-20 h-20 rounded-full border-4 border-teal-600"
              />
            </div>

            {/* Student Name */}
            <div>
              <h3 className="text-2xl font-semibold text-teal-600">{studentData.name}</h3>
              <p className="text-gray-500">{studentData.rollNo}</p>
            </div>
          </div>

          <div className="profile-details grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Email */}
            <div className="detail-item flex items-center">
              <FaEnvelope className="text-teal-600 mr-2" />
              <span>{studentData.email}</span>
            </div>

            {/* Batch */}
            <div className="detail-item flex items-center">
              <FaRegCalendarAlt className="text-teal-600 mr-2" />
              <span>Batch: {studentData.batch}</span>
            </div>

            {/* Degree */}
            <div className="detail-item flex items-center">
              <FaGraduationCap className="text-teal-600 mr-2" />
              <span>Degree: {studentData.degree}</span>
            </div>

            {/* Department */}
            <div className="detail-item flex items-center">
              <FaSchool className="text-teal-600 mr-2" />
              <span>Department: {studentData.department}</span>
            </div>

            {/* Year */}
            <div className="detail-item flex items-center">
              <FaUser className="text-teal-600 mr-2" />
              <span>Year: {studentData.year}</span>
            </div>
          </div>
        </div>
      ) : (
        <div>No student data available.</div>
      )}
    </div>
  );
}

export default StudentProfile;
