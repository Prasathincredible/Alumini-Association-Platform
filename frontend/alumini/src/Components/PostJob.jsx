import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { TextField, MenuItem, Button } from "@mui/material";
import { Work, Business, LocationOn, Description, CalendarToday, MonetizationOn, Build, Link } from "@mui/icons-material"; // Add Link icon for website

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
    postedByName: "",
    deadline: "",
    companyWebsite: "", // Add companyWebsite field
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
      const response = await axios.post("http://localhost:3000/job/postjobs", {
        ...jobData,
        skillsRequired: jobData.skillsRequired.split(","),
        postedBy: user._id,
        postedByName: user.userName,
        status: "pending", // Set status as "pending"
      });

      if (response.status === 201) {
        setSuccess("Job posted successfully and is awaiting approval.");
        setTimeout(() => {
          navigate("/applyjob");
        }, 2000);
      }
    } catch (err) {
      setError("Failed to post job");
      console.error(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Post a Job</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        
        {/* Job Title */}
        <div className="flex items-center space-x-2">
          <Work className="text-blue-600" />
          <TextField 
            label="Job Title *" 
            name="title" 
            value={jobData.title} 
            onChange={handleChange} 
            required 
            fullWidth
          />
        </div>

        {/* Company Name */}
        <div className="flex items-center space-x-2">
          <Business className="text-blue-600" />
          <TextField 
            label="Company Name *" 
            name="companyName" 
            value={jobData.companyName} 
            onChange={handleChange} 
            required 
            fullWidth 
          />
        </div>

        {/* Location */}
        <div className="flex items-center space-x-2">
          <LocationOn className="text-blue-600" />
          <TextField 
            label="Location *" 
            name="location" 
            value={jobData.location} 
            onChange={handleChange} 
            required 
            fullWidth 
          />
        </div>

        {/* Job Type Dropdown */}
        <div className="flex items-center space-x-2">
          <Work className="text-blue-600" />
          <TextField
            select
            label="Job Type"
            name="jobType"
            value={jobData.jobType}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="Full-time">Full-time</MenuItem>
            <MenuItem value="Part-time">Part-time</MenuItem>
            <MenuItem value="Internship">Internship</MenuItem>
          </TextField>
        </div>

        {/* Skills Required */}
        <div className="flex items-center space-x-2">
          <Build className="text-blue-600" />
          <TextField 
            label="Skills Required (comma-separated)" 
            name="skillsRequired" 
            value={jobData.skillsRequired} 
            onChange={handleChange} 
            fullWidth 
          />
        </div>

        {/* Salary */}
        <div className="flex items-center space-x-2">
          <MonetizationOn className="text-blue-600" />
          <TextField 
            label="Salary Range" 
            name="salary" 
            value={jobData.salary} 
            onChange={handleChange} 
            fullWidth 
          />
        </div>

        {/* Description */}
        <div className="col-span-2 flex items-center space-x-2">
          <Description className="text-blue-600" />
          <TextField 
            label="Job Description *" 
            name="description" 
            value={jobData.description} 
            onChange={handleChange} 
            required 
            multiline 
            rows={4} 
            fullWidth 
          />
        </div>

        {/* Deadline */}
        <div className="flex items-center space-x-2">
          <CalendarToday className="text-blue-600" />
          <TextField 
            label="Application Deadline *" 
            name="deadline" 
            type="date" 
            value={jobData.deadline} 
            onChange={handleChange} 
            required 
            fullWidth 
            InputLabelProps={{ shrink: true }} 
          />
        </div>

        {/* Company Website */}
        <div className="flex items-center space-x-2">
          <Link className="text-blue-600" />
          <TextField 
            label="Company Website" 
            name="companyWebsite" 
            value={jobData.companyWebsite} 
            onChange={handleChange} 
            fullWidth 
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-2 flex justify-center">
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            className="py-3 px-6"
          >
            Post Job
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
