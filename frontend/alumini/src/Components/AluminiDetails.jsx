import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaBuilding,
  FaBriefcase,
  FaFileAlt,
} from "react-icons/fa";

const apiurl=import.meta.env.VITE_API_URL;

const AlumniDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [alumni, setAlumni] = useState(null);
  const [status, setStatus] = useState(null);
  

  useEffect(() => {
    axios
      .get(`${apiurl}/alumni/${id}`)
      .then((response) => setAlumni(response.data))
      .catch((error) => console.error("Error fetching alumni details:", error));
  }, [id]);

  const handleApproval = async (status) => {
    try {
      await axios.put(`${apiurl}/alumni/${id}/status`, { status });
      setStatus(status);
      alert(`Alumni has been ${status}`);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (!alumni) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-gray-700">
          Loading alumni details...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-6">
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-lg p-8 flex flex-col min-h-[85vh]">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          {/* Avatar */}
          {alumni.avatar && (
            <div className="w-32 h-32 bg-gray-300 flex items-center justify-center rounded-full overflow-hidden border">
              <img
                src={alumni.avatar}
                alt="Alumni Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 text-lg">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <FaGraduationCap className="text-gray-600" />
              <span className="text-gray-700 font-medium">
                <strong>Name:</strong> {alumni.userName}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-gray-600" />
              <span className="text-gray-700 font-medium">
                <strong>Email:</strong> {alumni.email}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <FaPhone className="text-gray-600" />
              <span className="text-gray-700 font-medium">
                <strong>Phone:</strong> {alumni.phone || "N/A"}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <FaGraduationCap className="text-gray-600" />
              <span className="text-gray-700 font-medium">
                <strong>Batch & Department:</strong> {alumni.batch} -{" "}
                {alumni.department}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <FaBuilding className="text-gray-600" />
              <span className="text-gray-700 font-medium">
                <strong>Company & Industry:</strong> {alumni.company || "N/A"} (
                {alumni.industry || "N/A"})
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <FaBriefcase className="text-gray-600" />
              <span className="text-gray-700 font-medium">
                <strong>Position:</strong> {alumni.position || "N/A"}
              </span>
            </div>

            {/* Social Links */}
            <div className="space-y-4 mt-4 flex flex-col gap-4">
              {alumni.linkedin && (
                <button
                  onClick={() => window.open(alumni.linkedin, "_blank")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-32 md:w-40"
                >
                  LinkedIn
                </button>
              )}

              {alumni.github && (
                <button
                  onClick={() => window.open(alumni.github, "_blank")}
                  className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition w-32 md:w-40"
                >
                  GitHub
                </button>
              )}
            </div>
          </div>

          {/* Marksheet Section */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
              <FaFileAlt className="text-gray-600" />
              <span>Marksheet</span>
            </h3>
            {alumni.marksheet ? (
              <img
                src={alumni.marksheet}
                alt="Marksheet"
                className="w-full md:w-96 h-72 object-cover border rounded-lg mt-4"
              />
            ) : (
              <p className="text-gray-500 mt-2">No marksheet uploaded</p>
            )}
          </div>
        </div>

        {/* Bottom Section: Approval Buttons */}
        <div className="mt-8 flex justify-center md:justify-between flex-wrap">
          {status === null && (
            <>
              <button
                onClick={() => handleApproval("approved")}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition text-lg font-semibold w-full md:w-1/3 mb-2 md:mb-0"
              >
                Approve
              </button>
              <button
                onClick={() => handleApproval("rejected")}
                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition text-lg font-semibold w-full md:w-1/3"
              >
                Reject
              </button>
            </>
          )}
          {status === "approved" && (
            <p className="text-green-600 font-semibold text-lg w-full text-center">
              Approved ✅
            </p>
          )}
          {status === "rejected" && (
            <p className="text-red-600 font-semibold text-lg w-full text-center">
              Rejected ❌
            </p>
          )}
        </div>

        {/* Back Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/admin_dashboard")}
            className="text-gray-600 hover:text-gray-800 transition font-medium text-lg"
          >
            ← Back to Alumni List
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlumniDetails;
