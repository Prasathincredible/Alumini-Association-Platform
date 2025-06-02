import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { Work, Business, LocationOn, Search } from "@mui/icons-material";
import { ArrowBack } from "@mui/icons-material";

const apiurl = import.meta.env.VITE_API_URL;

const ApplyJob = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${apiurl}/job/jobs`);
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4"
      >
        <ArrowBack className="mr-2" />
        Back
      </button>

      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Available Jobs</h2>

      {/* Search Bar */}
      <div className="flex items-center bg-gray-100 p-3 rounded-lg shadow-md mb-6">
        <Search className="text-gray-600 mr-2" />
        <input
          type="text"
          placeholder="Search by Title, Location, or Company"
          className="w-full bg-transparent focus:outline-none text-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredJobs.length === 0 ? (
        <p className="text-center text-gray-600">No jobs available.</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col space-y-4 transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="flex items-center space-x-3">
                <Work className="text-purple-600" fontSize="large" />
                <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Business className="text-green-600" />
                <p className="font-medium">{job.companyName}</p>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <LocationOn className="text-red-600" />
                <p className="font-medium">{job.location}</p>
              </div>
              <div className="flex justify-between mt-4">
                <Link
                  to={`/job/${job._id}`}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition"
                >
                  View
                </Link>
                {user && user._id === job.postedBy && (
                  <Link
                    to={`/job/${job._id}/applied-users`}
                    className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-500 transition"
                  >
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
