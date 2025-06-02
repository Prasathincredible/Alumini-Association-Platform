import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext"; // Get logged-in user
import { useParams, useNavigate } from "react-router-dom"; // useNavigate for redirection
import axios from "axios";
const apiurl=import.meta.env.VITE_API_URL;

function AppliedUsersList() {
  const { jobId } = useParams(); // Get job ID from URL
  const { user } = useContext(UserContext); // Get the current logged-in user
  const navigate = useNavigate(); // Hook for navigation
  const [appliedUsers, setAppliedUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return; // Ensure user is logged in

    axios
      .get(`${apiurl}/job/job/${jobId}/applied-users?userId=${user._id}`)
      .then((res) => {
        setAppliedUsers(res.data.appliedUsers);
      })
      .catch((err) => {
        setError(err.response?.data?.error || "Error fetching applied users");
      });
  }, [jobId, user]);

  

  // Function to navigate to user profile
  const handleUserClick = (userName) => {
    navigate(`/profile/${userName}`); // Adjust the route as per your app
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Applied Users</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {appliedUsers.map((appliedUser) => (
          <div
            key={appliedUser.userId}
            onClick={() => handleUserClick(appliedUser.userName)}
            className="cursor-pointer p-4 border rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 bg-white flex items-center space-x-4"
          >
            {/* User Avatar */}
            <img
              src={appliedUser.avatar || "/default-avatar.png"} // Use a default avatar if none exists
              alt="User Avatar"
              className="w-14 h-14 rounded-full object-cover"
            />

            {/* User Name */}
            <div>
              <h3 className="text-lg font-medium text-gray-800">
                {appliedUser.userName}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AppliedUsersList;
