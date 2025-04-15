import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaTasks,
  FaGraduationCap,
  FaUserCheck,
  FaBriefcase,
  FaSignOutAlt,
  FaAddressBook,
} from "react-icons/fa";
import axios from "axios";

function AdminDashboard() {
  const [pendingAlumni, setPendingAlumni] = useState([]);
  const [pendingJobs, setPendingJobs] = useState([]);
  const [approvedJobs, setApprovedJobs] = useState([]);
  const [events, setEvents] = useState([]); // State for events
  const [selectedSection, setSelectedSection] = useState("alumni");
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

  // Fetch pending and approved jobs
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

  // Fetch events when selected section is "viewEvents"
  useEffect(() => {
    if (selectedSection === "viewEvents") {
      const fetchEvents = async () => {
        try {
          const res = await axios.get("http://localhost:3000/event/events");
          setEvents(res.data);
        } catch (error) {
          console.error("Failed to fetch events", error);
        }
      };

      fetchEvents();
    }
  }, [selectedSection]);

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h2>
        <nav className="space-y-4">
          <button
            onClick={() => setSelectedSection("alumni")}
            className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition ${
              selectedSection === "alumni" && "bg-gray-700"
            }`}
          >
            <FaUserCheck />
            <span>Manage Alumni</span>
          </button>
          <button
            onClick={() => setSelectedSection("jobs")}
            className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition ${
              selectedSection === "jobs" && "bg-gray-700"
            }`}
          >
            <FaBriefcase />
            <span>Pending Jobs</span>
          </button>
          <button
            onClick={() => setSelectedSection("approvedJobs")}
            className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition ${
              selectedSection === "approvedJobs" && "bg-gray-700"
            }`}
          >
            <FaBriefcase />
            <span>Approved Jobs</span>
          </button>
          <button
            onClick={() => setSelectedSection("manageEvents")}
            className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition ${
              selectedSection === "manageEvents" && "bg-gray-700"
            }`}
          >
            <FaCalendarAlt />
            <span>Manage Events</span>
          </button>
          {selectedSection === "manageEvents" && (
            <div className="ml-6 space-y-2 text-sm">
              <button
                onClick={() => navigate("/create_event")}
                className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700 transition text-left"
              >
                <FaTasks />
                <span>Post an Event</span>
              </button>
              <button
                onClick={() => setSelectedSection("viewEvents")}
                className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700 transition text-left"
              >
                <FaGraduationCap />
                <span>View Events</span>
              </button>
              <button
                onClick={() => setSelectedSection("editEvents")}
                className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700 transition text-left"
              >
                <FaUserCheck />
                <span>Edit Events</span>
              </button>
            </div>
          )}
          <Link
            to="/aluminidirectory"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition"
          >
            <FaAddressBook />
            <span>Alumni Directory</span>
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center space-x-3 p-3 rounded-lg hover:bg-red-600 transition bg-red-500"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
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
        )}

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
          </>
        )}

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


{selectedSection === "viewEvents" && (
  <>
    <h1 className="text-3xl font-bold text-gray-800">All Posted Events</h1>
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((event) => (
        <div key={event._id} className="bg-white shadow rounded-lg p-4 flex flex-col">
          {/* Event Title */}
          <h2 className="text-xl font-semibold text-teal-600 mb-4">{event.title}</h2>

          {/* Event Image */}
          {event.media && (
            <div className="flex-1">
              <img
                src={event.media}
                alt="Event Media"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            </div>
          )}

          {/* Event Details (Description, Date, Venue) */}
          <div className="text-gray-700 mt-2 flex flex-col space-y-2">
            <p className="text-sm">{event.description}</p>
            <p className="text-sm text-gray-500">
              <strong>Venue:</strong> {event.venue}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Date:</strong> {event.date} | <strong>Time:</strong> {event.time}
            </p>
          </div>

          {/* Edit Button */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => navigate(`/edit_event/${event._id}`)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  </>
)}


 


      </main>
    </div>
  );
}

export default AdminDashboard;
