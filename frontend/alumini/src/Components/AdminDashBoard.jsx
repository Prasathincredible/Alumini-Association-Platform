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
  FaEdit,
} from "react-icons/fa";
import axios from "axios";

const apiurl=import.meta.env.VITE_API_URL;

function AdminDashboard() {
  const [pendingAlumni, setPendingAlumni] = useState([]);
  const [events, setEvents] = useState([]);
  const [donations, setDonations] = useState([]);
  const [selectedSection, setSelectedSection] = useState("alumni");
  const navigate = useNavigate();
 

  // Fetch pending alumni
  useEffect(() => {
    const fetchPendingAlumni = async () => {
      try {
        console.log(apiurl)
        const response = await axios.get(`${apiurl}/admin/pending-alumni`);
        setPendingAlumni(response.data);
      } catch (error) {
        console.error("Error fetching alumni:", error);
      }
    };
    fetchPendingAlumni();
  }, []);

  // Fetch events when viewing events
  useEffect(() => {
    if (selectedSection === "viewEvents") {
      const fetchEvents = async () => {
        try {
          const res = await axios.get(`${apiurl}/event/events`);
          setEvents(res.data);
        } catch (error) {
          console.error("Failed to fetch events", error);
        }
      };
      fetchEvents();
    }
  }, [selectedSection]);

  // Fetch donations
  useEffect(() => {
    if (selectedSection === "viewDonations") {
      const fetchDonations = async () => {
        try {
          const res = await axios.get(`${apiurl}/viewdonations`);
          setDonations(res.data);
        } catch (error) {
          console.error("Failed to fetch donations", error);
        }
      };
      fetchDonations();
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
            className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition ${selectedSection === "alumni" && "bg-gray-700"}`}
          >
            <FaUserCheck />
            <span>Manage Alumni</span>
          </button>

          <button
            onClick={() => setSelectedSection("manageEvents")}
            className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition ${selectedSection === "manageEvents" && "bg-gray-700"}`}
          >
            <FaCalendarAlt />
            <span>Manage Events</span>
          </button>

          <button
            onClick={() => setSelectedSection("manageDonations")}
            className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition ${selectedSection === "manageDonations" && "bg-gray-700"}`}
          >
            <FaBriefcase />
            <span>Manage Donations</span>
          </button>

          <Link
            to="/aluminidirectory"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition"
          >
            <FaAddressBook />
            <span>Alumni Directory</span>
          </Link>
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
      <main className="flex-1 p-10 overflow-y-auto">
        {/* Manage Alumni Section */}
        {selectedSection === "alumni" && (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Alumni Requests</h1>
            <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto">
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

        {/* Manage Events Section - Show Cards */}
        {selectedSection === "manageEvents" && (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Events</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Post Event Card */}
              <div
                onClick={() => navigate("/create_event")}
                className="cursor-pointer bg-white shadow-lg rounded-xl p-6 flex flex-col items-center hover:bg-gray-100 transition"
              >
                <FaTasks className="text-4xl text-indigo-600 mb-4" />
                <h2 className="text-xl font-semibold text-gray-700">Post an Event</h2>
              </div>

              {/* View Events Card */}
              <div
                onClick={() => setSelectedSection("viewEvents")}
                className="cursor-pointer bg-white shadow-lg rounded-xl p-6 flex flex-col items-center hover:bg-gray-100 transition"
              >
                <FaGraduationCap className="text-4xl text-green-600 mb-4" />
                <h2 className="text-xl font-semibold text-gray-700">View Events</h2>
              </div>

              {/* Edit Events Card */}
              <div
                onClick={() => setSelectedSection("editEvents")}
                className="cursor-pointer bg-white shadow-lg rounded-xl p-6 flex flex-col items-center hover:bg-gray-100 transition"
              >
                <FaEdit className="text-4xl text-yellow-500 mb-4" />
                <h2 className="text-xl font-semibold text-gray-700">Edit Events</h2>
              </div>
            </div>
          </>
        )}

        {/* View Events Section */}
        {selectedSection === "viewEvents" && (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">All Posted Events</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div key={event._id} className="bg-white shadow rounded-lg p-4 flex flex-col">
                  <h2 className="text-xl font-semibold text-teal-600 mb-4">{event.title}</h2>
                  {event.media && (
                    <img
                      src={event.media}
                      alt="Event Media"
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <div className="text-gray-700 flex flex-col space-y-2">
                    <p>{event.description}</p>
                    <p className="text-gray-500">
                      <strong>Venue:</strong> {event.venue}
                    </p>
                    <p className="text-gray-500">
                      <strong>Date:</strong> {event.date} | <strong>Time:</strong> {event.time}
                    </p>
                  </div>
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

        {/* View Donations Section */}
        {selectedSection === "viewDonations" && (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">All Donations</h1>
            <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">Donor Name</th>
                    <th className="p-2 border">Amount</th>
                    <th className="p-2 border">Event Title</th>
                    <th className="p-2 border">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((donation) => (
                    <tr key={donation._id} className="border">
                      <td className="p-2 border">{donation.userEmail}</td>
                      <td className="p-2 border">{donation.amount}</td>
                      <td className="p-2 border">{donation.donationPostId}</td>
                      <td className="p-2 border">{new Date(donation.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}




        {/* Manage Donations Section */}
{selectedSection === "manageDonations" && (
  <>
    <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Donations</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        onClick={() => navigate("/upload_donation")}
        className="cursor-pointer bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center hover:bg-gray-100 transition"
      >
        <FaTasks className="text-4xl text-blue-500 mb-4" />
        <h2 className="text-xl font-semibold text-gray-800">Post for Donations</h2>
      </div>

      <div
        onClick={() => setSelectedSection("viewDonations")}
        className="cursor-pointer bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center hover:bg-gray-100 transition"
      >
        <FaGraduationCap className="text-4xl text-green-500 mb-4" />
        <h2 className="text-xl font-semibold text-gray-800">View Donations</h2>
      </div>
    </div>
  </>
)}

      </main>
    </div>
  );
}

export default AdminDashboard;
