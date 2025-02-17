import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaBuilding,
  FaBriefcase,
  FaLinkedin,
  FaGithub,
  FaFileAlt,
} from "react-icons/fa";

const AlumniDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [alumni, setAlumni] = useState(null);
  const [status, setStatus] = useState(null); // New state for tracking approval/rejection

  useEffect(() => {
    axios
      .get(`http://localhost:3000/alumni/${id}`)
      .then((response) => {
        console.log(response.data); // Check if avatar exists in the response
        setAlumni(response.data);
      })
      .catch((error) => console.error("Error fetching alumni details:", error));
  }, [id]);

  const handleApproval = async (status) => {
    try {
      await axios.put(`http://localhost:3000/alumni/${id}/status`, { status });
      setStatus(status); // Update the status state
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
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6 flex flex-col min-h-[80vh]">
        {/* Top Section: Profile & Marksheet */}
        <div className="flex flex-1 space-x-6">
          {/* Left Side - Profile Details */}
          <div className="w-2/3 flex flex-col">
            {/* Header */}
            <div className="flex items-center space-x-4 border-b pb-4">
              {/* Avatar */}
              <div className="w-20 h-20 bg-gray-300 flex items-center justify-center rounded-full overflow-hidden border">
                {alumni.avatar ? (
                  <img
                    src={alumni.avatar}
                    alt="Alumni Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUser className="text-gray-700 text-3xl" />
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {alumni.name}
                </h1>
                <p className="text-gray-600">@{alumni.userName}</p>
              </div>
            </div>

            {/* Alumni Information */}
            <div className="mt-4 space-y-4">
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-gray-600" />
                <p className="text-gray-700 font-medium">{alumni.email}</p>
              </div>

              <div className="flex items-center space-x-3">
                <FaPhone className="text-gray-600" />
                <p className="text-gray-700 font-medium">
                  {alumni.phone || "N/A"}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <FaGraduationCap className="text-gray-600" />
                <p className="text-gray-700 font-medium">
                  {alumni.batch} - {alumni.department}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <FaBuilding className="text-gray-600" />
                <p className="text-gray-700 font-medium">
                  {alumni.company || "N/A"} ({alumni.industry || "N/A"})
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <FaBriefcase className="text-gray-600" />
                <p className="text-gray-700 font-medium">
                  {alumni.position || "N/A"}
                </p>
              </div>

              {/* Social Links */}
              <div className="flex space-x-6 mt-4">
                {alumni.linkedin && (
                  <a
                    href={alumni.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-lg hover:text-blue-800 transition"
                  >
                    <FaLinkedin />
                  </a>
                )}
                {alumni.github && (
                  <a
                    href={alumni.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 text-lg hover:text-gray-900 transition"
                  >
                    <FaGithub />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Marksheet */}
          <div className="w-1/3 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
              <FaFileAlt className="text-gray-600" />
              <span>Marksheet</span>
            </h3>
            {alumni.marksheet ? (
              <img
                src={alumni.marksheet}
                alt="Marksheet"
                className="w-full h-52 object-cover border rounded-md mt-2"
              />
            ) : (
              <p className="text-gray-500 mt-2">No marksheet uploaded</p>
            )}
          </div>
        </div>

        {/* Bottom Section: Buttons */}
        <div className="mt-auto flex justify-between pt-4">
          {status === null && (
            <>
              <button
                onClick={() => handleApproval("approved")}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition w-1/2 mr-2"
              >
                Approve
              </button>
              <button
                onClick={() => handleApproval("rejected")}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition w-1/2 ml-2"
              >
                Reject
              </button>
            </>
          )}
          {status === "approved" && (
            <p className="text-green-600 font-semibold w-full text-center">Approved</p>
          )}
          {status === "rejected" && (
            <p className="text-red-600 font-semibold w-full text-center">Rejected</p>
          )}
        </div>

        {/* Back Button */}
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/admin/manage-alumni")}
            className="text-gray-600 hover:text-gray-800 transition font-medium"
          >
            Back to Alumni List
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlumniDetails;
