import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { Work, Business, LocationOn, Description, CalendarToday, MonetizationOn, Build, Link } from "@mui/icons-material";

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
      const response = await axios.post("https://campus-bridge-zb03.onrender.com/job/postjobs", {
        ...jobData,
        skillsRequired: jobData.skillsRequired.split(","),
        postedBy: user._id,
        postedByName: user.userName
      });

      if (response.status === 201) {
        setSuccess("Job posted successfully and is awaiting approval.");
        setTimeout(() => navigate("/applyjob"), 2000);
      }
    } catch (err) {
      setError("Failed to post job");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg mt-8">
      <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">Post a Job</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[ 
          { name: "title", icon: Work, placeholder: "Job Title *" },
          { name: "companyName", icon: Business, placeholder: "Company Name *" },
          { name: "location", icon: LocationOn, placeholder: "Location *" },
          { name: "skillsRequired", icon: Build, placeholder: "Skills Required (comma-separated)" },
          { name: "salary", icon: MonetizationOn, placeholder: "Salary Range" },
          { name: "companyWebsite", icon: Link, placeholder: "Company Website" }
        ].map(({ name, icon: Icon, placeholder }) => (
          <div key={name} className="relative">
            <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              name={name} 
              placeholder={placeholder} 
              value={jobData[name]} 
              onChange={handleChange} 
              className="w-full pl-10 p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
        ))}
        <div className="relative">
          <CalendarToday className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input 
            type="date" 
            name="deadline" 
            value={jobData.deadline} 
            onChange={handleChange} 
            className="w-full pl-10 p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
        <div className="col-span-2 relative">
          <Description className="absolute left-3 top-5 text-gray-500" />
          <textarea 
            name="description" 
            placeholder="Job Description *" 
            value={jobData.description} 
            onChange={handleChange} 
            className="w-full pl-10 p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-gray-500 h-32"
          />
        </div>
        <div className="col-span-2 flex justify-center">
          <button 
            type="submit" 
            className="bg-gray-700 text-white py-3 px-6 rounded-md text-lg hover:bg-gray-800 transition duration-300"
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
