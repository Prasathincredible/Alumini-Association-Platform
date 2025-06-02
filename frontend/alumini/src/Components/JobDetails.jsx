import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

// Icons
import {
  FaBuilding,
  FaGlobe,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
  FaArrowLeft,
} from "react-icons/fa";
import { MdDescription } from "react-icons/md";

const apiurl = import.meta.env.VITE_API_URL;

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);
  const { user, role } = useContext(UserContext);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`${apiurl}/job/jobs/${id}`);
        setJob(response.data);

        if (
          user &&
          response.data.appliedUsers.some((u) => u.userId === user._id)
        ) {
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
      await axios.post(`${apiurl}/job/apply`, {
        jobId: id,
        userId: user._id,
        userName: user.userName,
      });

      setApplied(true);
      setJob((prevJob) => ({
        ...prevJob,
        appliedUsers: [
          ...prevJob.appliedUsers,
          { userId: user._id, userName: user.userName },
        ],
      }));
      alert("Successfully applied for the job!");
    } catch (error) {
      console.error("Error applying for job:", error);
      alert(error.response?.data?.error || "Something went wrong!");
    }
  };

  if (!job)
    return <p className="text-center text-gray-500 mt-6">Loading job details...</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>

      {/* Job Details Card */}
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          {job.title}
        </h1>
        <p className="flex items-center text-gray-600 text-sm mb-4">
          <FaBuilding className="mr-2 text-blue-500" />
          {job.companyName}
        </p>

        {/* Job Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 text-sm md:text-base">
          <div className="flex items-start">
            <FaGlobe className="mr-2 text-green-500 mt-1" />
            <div>
              <strong>Website:</strong>{" "}
              <a
                href={job.companyWebsite}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline ml-1"
              >
                {job.companyWebsite}
              </a>
            </div>
          </div>
          <div className="flex items-start">
            <FaMapMarkerAlt className="mr-2 text-red-500 mt-1" />
            <div>
              <strong>Location:</strong> {job.location}
            </div>
          </div>
          <div className="flex items-start">
            <FaMoneyBillWave className="mr-2 text-green-500 mt-1" />
            <div>
              <strong>Salary:</strong> {job.salary}
            </div>
          </div>
          <div className="flex items-start">
            <FaClock className="mr-2 text-orange-500 mt-1" />
            <div>
              <strong>Deadline:</strong>{" "}
              {new Date(job.deadline).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6 text-gray-700">
          <div className="flex items-start">
            <MdDescription className="mr-2 text-yellow-500 mt-1" />
            <div>
              <strong>Description:</strong>
              <p className="mt-1 whitespace-pre-line text-justify leading-relaxed">
                {job.description}
              </p>
            </div>
          </div>
        </div>

        {/* Apply Button */}
        {(role === "student" || role === "user") && (
          <div className="mt-8">
            <button
              onClick={handleApply}
              disabled={applied}
              className={`w-full py-3 px-6 rounded-lg text-white text-lg font-semibold transition ${
                applied
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {applied ? "Already Applied" : "Apply Now"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
