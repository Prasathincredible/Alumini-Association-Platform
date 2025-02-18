import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/UserContext"; // Get logged-in user context

const ApplyJob = () => {
  const [jobs, setJobs] = useState([]);
  const { user } = useContext(UserContext); // Logged-in alumni user

  useEffect(() => {
    // Fetch all jobs from the backend
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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Available Jobs</h2>
      
      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job._id} className="border-b p-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">{job.title}</h3>
                <p className="text-gray-600">{job.companyName} - {job.location}</p>
              </div>
              <div className="flex space-x-2">
                {/* View Job Details Button */}
                <Link to={`/job/${job._id}`} className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                  View
                </Link>

                {/* View Applied Users Button (Only for job poster) */}
                {user && user._id === job.postedBy && (
                  <Link to={`/job/${job._id}/applied-users`} className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
                    View Applied Users
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApplyJob;
