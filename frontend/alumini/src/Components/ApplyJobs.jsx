import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { Work, Business, LocationOn } from "@mui/icons-material";

const ApplyJob = () => {
  const [jobs, setJobs] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/job/jobs");
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Available Jobs</h2>
      
      {jobs.length === 0 ? (
        <p className="text-center text-gray-600">No jobs available.</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white shadow-lg rounded-xl p-6 flex flex-col space-y-4 transform transition duration-300 hover:scale-105 hover:shadow-xl">
              <div className="flex items-center space-x-3">
                <Work className="text-gray-600" fontSize="large" />
                <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Business />
                <p className="font-medium">{job.companyName}</p>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <LocationOn />
                <p className="font-medium">{job.location}</p>
              </div>
              <div className="flex justify-between mt-4">
                <Link to={`/job/${job._id}`} className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition">
                  View
                </Link>
                {user && user._id === job.postedBy && (
                  <Link to={`/job/${job._id}/applied-users`} className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition">
                    View Applied Users
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplyJob;