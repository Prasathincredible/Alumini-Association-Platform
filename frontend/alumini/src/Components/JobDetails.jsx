import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { 
  FaBuilding
} from "react-icons/fa";
import { MdDescription} from "react-icons/md";

const JobDetails = () => {
  const { id } = useParams(); // Get job ID from URL

  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);

  const { user, role } = useContext(UserContext); // Get logged-in user details

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/job/jobs/${id}`);
        setJob(response.data);

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



  if (!job) return <p className="text-center mt-6">Loading job details...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6 border">
      <h2 className="text-3xl font-bold text-gray-800">{job.title}</h2>
      <p className="flex items-center text-gray-600 mt-1">
        <FaBuilding className="mr-2 text-blue-500" /> {job.companyName}
      </p>

      {/* Job Details */}
      <div className="mt-4 space-y-4 text-gray-700">
        <p className="flex items-center">
          <FaGlobe className="mr-2 text-green-500" />
          <strong>Website:</strong> <a href={job.companyWebsite} className="text-blue-600 hover:underline ml-1">{job.companyWebsite}</a>
        </p>
        <p className="flex items-center">
          <FaMapMarkerAlt className="mr-2 text-red-500" />
          <strong>Location:</strong> {job.location}
        </p>
        <div className="flex items-start">
          <MdDescription className="mr-2 text-yellow-500 mt-1" />
          <div>
            <strong>Description:</strong>
            <p className="mt-1 whitespace-pre-line text-justify leading-relaxed">
              {job.description}
            </p>
          </div>
        </div>
        <p className="flex items-center">
          <FaMoneyBillWave className="mr-2 text-green-500" />
          <strong>Salary:</strong> {job.salary}
        </p>
        <p className="flex items-center">
          <FaClock className="mr-2 text-orange-500" />
          <strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}
        </p>
      </div>

      {/* Apply Button */}
      {(role === "student" || role === "user") && (
        <button
          onClick={handleApply}
          className={`w-full py-2 px-4 rounded-md mt-6 text-white text-lg ${
            applied ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
          disabled={applied}
        >
          {applied ? "Already Applied" : "Apply Now"}
        </button>
      )}

    </div>
  );
};

export default JobDetails;