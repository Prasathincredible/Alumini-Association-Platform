import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

const JobDetails = () => {
  const { id } = useParams(); // Get job ID from URL
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);
  const { user } = useContext(UserContext);
  const { role } = useContext(UserContext); // Get logged-in user details

  // Fetch job details
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/job/jobs/${id}`);
        setJob(response.data);

        // Check if the logged-in user has applied
        if (user && response.data.appliedUsers.some((u) => u.userId === user._id)) {
          setApplied(true);
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails();
  }, [id, user]);

  // Handle Apply for Job
  const handleApply = async () => {
    if (!user) {
      alert("You must be logged in to apply for jobs.");
      return;
    }

    if (applied) {
      alert("You have already applied for this job!");
      return;
    }

    try {
      await axios.post("http://localhost:3000/job/apply", {
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

  // Handle Job Approval (Admin)
  const handleApprove = async () => {
    try {
      await axios.put(`http://localhost:3000/job/approve-job/${id}`);
      setJob((prevJob) => ({ ...prevJob, status: "approved" }));
      alert("Job approved successfully!");
    } catch (error) {
      console.error("Error approving job:", error);
      alert("Failed to approve job.");
    }
  };

  // Handle Job Rejection (Admin)
  const handleReject = async () => {
    try {
      await axios.delete(`http://localhost:3000/job/delete-job/${id}`);
      alert("Job rejected and deleted.");
      navigate("/admin/jobs"); // Redirect admin after rejecting the job
    } catch (error) {
      console.error("Error rejecting job:", error);
      alert("Failed to reject job.");
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
      <p className="mt-2">
        <strong>Status:</strong> 
        <span className={job.status === "approved" ? "text-green-500" : "text-yellow-500"}>
          {job.status}
        </span>
      </p>

      {/* Show Apply button for students or users */}
      {(role === "student" || role === "user") && (
        <button
          onClick={handleApply}
          className={`py-2 px-4 rounded-md mt-4 ${applied ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"}`}
          disabled={applied}
        >
          {applied ? "Already Applied" : "Apply"}
        </button>
      )}

      {/* Show Approve & Reject buttons for admin */}
      {role === "admin" && job.status !== "approved" && (
        <div className="mt-4 space-x-4">
          <button
            onClick={handleApprove}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Approve
          </button>
          <button
            onClick={handleReject}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
