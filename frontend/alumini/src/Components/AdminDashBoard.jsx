import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaTasks, FaGraduationCap, FaUserCheck, FaBriefcase, FaSignOutAlt, FaAddressBook } from "react-icons/fa";
import axios from "axios";

function AdminDashboard() {
  const [pendingAlumni, setPendingAlumni] = useState([]);
  const [pendingJobs, setPendingJobs] = useState([]);
  const [approvedJobs, setApprovedJobs] = useState([]);
  const [selectedSection, setSelectedSection] = useState("alumni"); // Default section
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const pendingResponse = await axios.get("http://localhost:3000/job/pending-jobs");
        setPendingJobs(pendingResponse.data);
        const approvedResponse = await axios.get("http://localhost:3000/job/approved-jobs");
        setApprovedJobs(approvedResponse.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h2>
        <nav className="space-y-4">
          <button onClick={() => setSelectedSection("alumni")} className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition ${selectedSection === "alumni" && "bg-gray-700"}`}>
            <FaUserCheck />
            <span>Manage Alumni</span>
          </button>
          <button onClick={() => setSelectedSection("jobs")} className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition ${selectedSection === "jobs" && "bg-gray-700"}`}>
            <FaBriefcase />
            <span>Pending Jobs</span>
          </button>
          <button onClick={() => setSelectedSection("approvedJobs")} className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition ${selectedSection === "approvedJobs" && "bg-gray-700"}`}>
            <FaBriefcase />
            <span>Approved Jobs</span>
          </button>
          <Link to="/aluminidirectory" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition">
            <FaAddressBook />
            <span>Alumni Directory</span>
          </Link>
        </nav>
        <button onClick={handleLogout} className="mt-auto flex items-center space-x-3 p-3 rounded-lg hover:bg-red-600 transition bg-red-500">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        {/* Pending Alumni Section */}
        {selectedSection === "alumni" && (
          <>
            <h1 className="text-3xl font-bold text-gray-800">Manage Alumni Requests</h1>
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
                        <Link to={`/alumni-details/${alumni._id}`} className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600">
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Pending Jobs Section */}
        {selectedSection === "jobs" && (
          <>
            <h1 className="text-3xl font-bold text-gray-800">Pending Jobs</h1>
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
                        <Link to={`/job/${job._id}`} className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600">
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Approved Jobs Section */}
        {selectedSection === "approvedJobs" && (
          <>
            <h1 className="text-3xl font-bold text-gray-800">Approved Jobs</h1>
            <div className="mt-6 bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">List of Approved Jobs</h2>
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
