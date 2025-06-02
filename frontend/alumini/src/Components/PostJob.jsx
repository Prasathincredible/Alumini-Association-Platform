import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import {
  Work,
  Business,
  LocationOn,
  Description,
  CalendarToday,
  MonetizationOn,
  Build,
  Link,
  ArrowBack,
} from "@mui/icons-material";

const apiurl = import.meta.env.VITE_API_URL;

const PostJob = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [jobData, setJobData] = useState({
    title: "",
    companyName: "",
    location: "",
    jobType: "Full-time",
    skillsRequired: "",
    salary: "",
    description: "",
    deadline: "",
    companyWebsite: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!jobData.title || !jobData.companyName || !jobData.location || !jobData.description || !jobData.deadline) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      const response = await axios.post(`${apiurl}/job/postjobs`, {
        ...jobData,
        skillsRequired: jobData.skillsRequired.split(","),
        postedBy: user._id,
        postedByName: user.userName,
      });

      if (response.status === 201) {
        setSuccess("✅ Job posted successfully and is awaiting approval.");
        setTimeout(() => navigate("/applyjob"), 2000);
      }
    } catch (err) {
      setError("❌ Failed to post job. Please try again.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      {/* Back Button */}
      <div className="flex justify-start mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 transition"
        >
          <ArrowBack fontSize="small" />
          Back
        </button>
      </div>

      {/* Job Posting Form */}
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">🚀 Post a Job</h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {success && <p className="text-green-600 text-center mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: "title", icon: Work, placeholder: "Job Title *" },
            { name: "companyName", icon: Business, placeholder: "Company Name *" },
            { name: "location", icon: LocationOn, placeholder: "Location *" },
            { name: "skillsRequired", icon: Build, placeholder: "Skills Required (comma-separated)" },
            { name: "salary", icon: MonetizationOn, placeholder: "Salary Range" },
            { name: "companyWebsite", icon: Link, placeholder: "Company Website" },
          ].map(({ name, icon: Icon, placeholder }) => (
            <div key={name} className="relative">
              <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name={name}
                placeholder={placeholder}
                value={jobData[name]}
                onChange={handleChange}
                className="w-full pl-10 p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ))}

          <div className="relative">
            <CalendarToday className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              name="deadline"
              value={jobData.deadline}
              onChange={handleChange}
              className="w-full pl-10 p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="col-span-1 md:col-span-2 relative">
            <Description className="absolute left-3 top-5 text-gray-400" />
            <textarea
              name="description"
              placeholder="Job Description *"
              value={jobData.description}
              onChange={handleChange}
              className="w-full pl-10 p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
            />
          </div>

          <div className="col-span-1 md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-md text-lg transition duration-300 w-full md:w-auto"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
