import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext"; // Get logged-in user
import { useParams } from "react-router-dom";
import axios from "axios";

function AppliedUsersList() {
  const { jobId } = useParams(); // Get job ID from URL
  const { user } = useContext(UserContext); // Get the current logged-in user
  const [appliedUsers, setAppliedUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return; // Ensure user is logged in

    axios
      .get(`http://localhost:3000/job/${jobId}/applied-users?userId=${user._id}`)
      .then((res) => {
        setAppliedUsers(res.data.appliedUsers);
      })
      .catch((err) => {
        setError(err.response?.data?.error || "Error fetching applied users");
      });
  }, [jobId, user]);
  return (
    <div>
      <h2>Applied Users</h2>
      {error ? <p className="text-red-500">{error}</p> : null}
      <ul>
        {appliedUsers.map((user) => (
          <li key={user.userId}>{user.userName}</li>
        ))}
      </ul>
    </div>
  );
}

export default AppliedUsersList;
