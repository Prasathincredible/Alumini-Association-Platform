import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaUser, FaBriefcase, FaHandHoldingHeart, FaComments, FaSignOutAlt, 
  FaCalendarAlt, FaDonate, FaChevronDown 
} from "react-icons/fa";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

const apiurl=import.meta.env.VITE_API_URL;

function AlumniDashboard() {
  const { user, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Data
  const [events, setEvents] = useState([]);
  const [donations, setDonations] = useState([]);

  // UI state
  const [jobDropdown, setJobDropdown] = useState(false);
  const [donationDropdown, setDonationDropdown] = useState(false);
  const [showMyDonationsModal, setShowMyDonationsModal] = useState(false);
  const [myDonations, setMyDonations] = useState([]);

  

  // Fetch upcoming events
  useEffect(() => {
    axios
      .get(`${apiurl}/event/events`)
      .then((res) => setEvents(res.data))
      .catch(console.error);
  }, []);

  // Fetch donation *posts*
  useEffect(() => {
    axios
      .get(`${apiurl}/donation/all`)
      .then((res) => setDonations(res.data))
      .catch(console.error);
  }, []);

  // Fetch *your* donation transactions
  const handleViewMyDonations = async () => {
    setDonationDropdown(false);
    try {
      const res = await axios.get(
        `${apiurl}/viewdonations/${user.email}`
      );
      setMyDonations(res.data);
    } catch (err) {
      console.error("Failed to fetch your donations:", err);
      setMyDonations([]);
    }
    setShowMyDonationsModal(true);
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Nav */}
      <header className="w-full flex justify-between items-center p-5 bg-blue-900 text-white shadow-md relative">
        <div className="text-2xl font-bold">AlumniDashboard</div>
        <nav className="flex space-x-6 items-center relative">
          <Link to="/profile" className="flex items-center hover:text-gray-300 transition">
            <FaUser size={20} />
            <span className="ml-1 hidden sm:inline">Profile</span>
          </Link>

          {/* Jobs Dropdown */}
          <div className="relative">
            <button
              onClick={() => setJobDropdown(!jobDropdown)}
              className="flex items-center hover:text-gray-300 transition"
            >
              <FaBriefcase size={20} />
              <span className="ml-1 hidden sm:inline">Jobs</span>
              <FaChevronDown size={12} className="ml-1" />
            </button>
            {jobDropdown && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg py-2 w-40 z-50">
                <Link
                  to="/postjob"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setJobDropdown(false)}
                >
                  Post a Job
                </Link>
                <Link
                  to="/applyjob"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setJobDropdown(false)}
                >
                  Apply for Jobs
                </Link>
              </div>
            )}
          </div>

          {/* Donations Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDonationDropdown(!donationDropdown)}
              className="flex items-center hover:text-gray-300 transition"
            >
              <FaHandHoldingHeart size={20} />
              <span className="ml-1 hidden sm:inline">Donations</span>
              <FaChevronDown size={12} className="ml-1" />
            </button>
            {donationDropdown && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg py-2 w-48 z-50">
                <Link
                  to="/donate"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDonationDropdown(false)}
                >
                  Make a Donation
                </Link>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={handleViewMyDonations}
                >
                  View My Donations
                </button>
              </div>
            )}
          </div>

          <Link to="/networking" className="flex items-center hover:text-gray-300 transition">
            <FaComments size={20} />
            <span className="ml-1 hidden sm:inline">Chat</span>
          </Link>
          <button onClick={handleLogout} className="flex items-center hover:text-red-400 transition">
            <FaSignOutAlt size={20} />
            <span className="ml-1 hidden sm:inline">Logout</span>
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Events */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <FaCalendarAlt className="text-blue-700 mr-2" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Upcoming Events</h2>
          </div>
          {events.length === 0 ? (
            <p className="text-gray-500">No events available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((ev) => (
                <div
                  key={ev._id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  {ev.media && (
                    <img
                      src={ev.media}
                      alt={ev.title}
                      className="w-full h-60 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">{ev.title}</h3>
                    <p className="text-gray-600 mt-1">{ev.description}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      📅 {new Date(ev.date).toLocaleDateString()} | 🕒 {ev.time} | 📍{" "}
                      {ev.venue}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Donation Posts */}
        <section>
          <div className="flex items-center mb-6">
            <FaDonate className="text-green-700 mr-2" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Support Causes</h2>
          </div>
          {donations.length === 0 ? (
            <p className="text-gray-500">No donation posts available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {donations.map((dn) => (
                <div
                  key={dn._id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  {dn.mediaType === "image" ? (
                    <img
                      src={dn.mediaUrl}
                      alt="Donation"
                      className="w-full h-60 object-cover"
                    />
                  ) : (
                    <video
                      controls
                      src={dn.mediaUrl}
                      className="w-full h-60 object-cover"
                    />
                  )}
                  <div className="p-4 flex flex-col justify-between">
                    <p className="text-gray-700">{dn.caption}</p>
                    <Link
                      to="/donate"
                      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition text-center"
                    >
                      Donate Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* My Donations Modal */}
      {showMyDonationsModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/2">
            <h2 className="text-xl font-bold mb-4">My Donations</h2>
            {myDonations.length === 0 ? (
              <p className="text-gray-500">You haven’t made any donations yet.</p>
            ) : (
              <ul className="space-y-3 max-h-64 overflow-y-auto">
                {myDonations.map((d) => (
                  <li key={d._id} className="border-b pb-2">
                    <p>
                      <strong>Cause:</strong> {d.caption}
                    </p>
                    <p>
                      <strong>Amount:</strong> ₹{d.amount}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>On:</strong>{" "}
                      {new Date(d.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => setShowMyDonationsModal(false)}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AlumniDashboard;
