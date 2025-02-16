import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

const JobDetails = () => {
  const { id } = useParams(); // Get job ID from URL
  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);
  const { user } = useContext(UserContext); // Get logged-in user details

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/jobs/${id}`);
        setJob(response.data);

        // Corrected: Check if the logged-in user's ID exists in appliedUsers array of objects
        if (user && response.data.appliedUsers.some((u) => u.userId === user._id)) {
          setApplied(true);
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails();
  }, [id, user]);

  const handleApply = async () => {
    if (!user) {
      alert("You must be logged in to apply for jobs.");
      return;
    }

    if (applied) {
      alert("You have already applied for this job!"); // Alert when clicking "Apply" again
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/apply", {
        jobId: id,
        userId: user._id,
        userName: user.userName,
      });

      setApplied(true);
      setJob((prevJob) => ({
        ...prevJob,
        appliedUsers: [...prevJob.appliedUsers, { userId: user._id, userName: user.userName }],
      }));
      alert("Successfully applied for the job!");
    } catch (error) {
      console.error("Error applying for job:", error);
      alert(error.response?.data?.error || "Something went wrong!");
    }
  };

  if (!job) return <p>Loading job details...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-6">
      <h2 className="text-2xl font-bold">{job.title}</h2>
      <p className="text-gray-600">{job.companyName} - {job.location}</p>
      <p className="mt-2">{job.description}</p>
      <p className="mt-2"><strong>Skills Required:</strong> {job.skillsRequired.join(", ")}</p>
      <p className="mt-2"><strong>Salary:</strong> {job.salary}</p>
      <p className="mt-2"><strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}</p>

      {!applied ? (
        <button
          onClick={handleApply}
          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 mt-4"
        >
          Apply
        </button>
      ) : (
        <p className="text-green-500 mt-4">You have already applied for this job!</p>
      )}
    </div>
  );
};

export default JobDetails;
