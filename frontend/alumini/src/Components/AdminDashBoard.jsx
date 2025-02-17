import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaTasks, FaGraduationCap, FaUserCheck, FaBriefcase, FaSignOutAlt } from "react-icons/fa";
import axios from "axios";

function AdminDashboard() {
  const [pendingAlumni, setPendingAlumni] = useState([]);
  const [pendingJobs, setPendingJobs] = useState([]);
  const [approvedJobs, setApprovedJobs] = useState([]);
  const [selectedSection, setSelectedSection] = useState("alumni"); // Default section
  const navigate = useNavigate();

  // Fetch pending alumni
  useEffect(() => {
    const fetchPendingAlumni = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin/pending-alumni");
        setPendingAlumni(response.data);
      } catch (error) {
        console.error("Error fetching alumni:", error);
      }
    };

    fetchPendingAlumni();
  }, []);

  // Fetch jobs (pending and approved)
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const pendingResponse = await axios.get("http://localhost:3000/pending-jobs");
        setPendingJobs(pendingResponse.data);

        const approvedResponse = await axios.get("http://localhost:3000/approved-jobs");
        setApprovedJobs(approvedResponse.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  // Logout function
  const handleLogout = () => {
     // Remove token (if stored in local storage)
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h2>
        <nav className="space-y-4">
          <button
            className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition ${selectedSection === "alumni" && "bg-gray-700"}`}
            onClick={() => setSelectedSection("alumni")}
          >
            <FaUserCheck />
            <span>Manage Alumni</span>
          </button>
          <button
            className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition ${selectedSection === "jobs" && "bg-gray-700"}`}
            onClick={() => setSelectedSection("jobs")}
          >
            <FaBriefcase />
            <span>Manage Jobs</span>
          </button>
          <button className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition">
            <FaCalendarAlt />
            <span>Post Events</span>
          </button>
          <button className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition">
            <FaTasks />
            <span>Manage Activities</span>
          </button>
          <button className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition">
            <FaGraduationCap />
            <span>Scholarships</span>
          </button>
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center space-x-3 p-3 rounded-lg hover:bg-red-600 transition bg-red-500"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        {selectedSection === "alumni" ? (
          <>
            <h1 className="text-3xl font-bold text-gray-800">Manage Alumni Requests</h1>
            <p className="mt-2 text-gray-600">Review and approve/reject alumni registrations.</p>

            {/* Pending Alumni List */}
            <div className="mt-6 bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Pending Applications</h2>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Email</th>
                    <th className="p-2 border">Batch</th>
                    <th className="p-2 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingAlumni.map((alumni) => (
                    <tr key={alumni._id} className="border">
                      <td className="p-2 border">{alumni.userName}</td>
                      <td className="p-2 border">{alumni.email}</td>
                      <td className="p-2 border">{alumni.batch}</td>
                      <td className="p-2 border">
                        <Link
                          to={`/alumni-details/${alumni._id}`}
                          className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-800">Manage Jobs</h1>
            <p className="mt-2 text-gray-600">Review and approve/reject job postings.</p>

            {/* Pending Jobs List */}
            <div className="mt-6 bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Pending Job Applications</h2>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">Job Title</th>
                    <th className="p-2 border">Company</th>
                    <th className="p-2 border">Posted By</th>
                    <th className="p-2 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingJobs.map((job) => (
                    <tr key={job._id} className="border">
                      <td className="p-2 border">{job.title}</td>
                      <td className="p-2 border">{job.companyName}</td>
                      <td className="p-2 border">{job.postedByName}</td>
                      <td className="p-2 border">
                        <Link
                          to={`/job/${job._id}`}
                          className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Approved Jobs List */}
            <div className="mt-6 bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Approved Jobs</h2>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">Job Title</th>
                    <th className="p-2 border">Company</th>
                    <th className="p-2 border">Posted By</th>
                  </tr>
                </thead>
                <tbody>
                  {approvedJobs.map((job) => (
                    <tr key={job._id} className="border">
                      <td className="p-2 border">{job.title}</td>
                      <td className="p-2 border">{job.companyName}</td>
                      <td className="p-2 border">{job.postedByName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
