import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBriefcase, FaUsers, FaDonate, FaTrophy, FaCalendarAlt, FaSignInAlt, FaUserPlus } from "react-icons/fa";
 const apiurl=import.meta.env.VITE_API_URL;

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    { icon: <FaBriefcase className="text-blue-600 text-5xl" />, title: "Job Portal", description: "Explore job opportunities and connect with recruiters." },
    { icon: <FaUsers className="text-green-600 text-5xl" />, title: "Networking", description: "Reconnect with alumni and expand your professional network." },
    { icon: <FaDonate className="text-yellow-600 text-5xl" />, title: "Donation Portal", description: "Support students and contribute to college initiatives." },
    { icon: <FaTrophy className="text-red-600 text-5xl" />, title: "Success Stories", description: "Read inspiring journeys of our alumni." },
    { icon: <FaCalendarAlt className="text-purple-600 text-5xl" />, title: "Register for Events", description: "Participate in alumni meets, seminars, and workshops." },
  ];

  const successStories = [
    { name: "John Doe", year: "Class of 2015", story: "The Alumni Network helped me land my dream job and stay connected with mentors!" },
    { name: "Jane Smith", year: "Class of 2018", story: "I received a scholarship through the donation portal and pursued my higher studies!" }
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-700">Alumni Association</h1>
        <div className="flex gap-4">
          <button onClick={() => navigate("/login")} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <FaSignInAlt /> Login
          </button>
          <button onClick={() => navigate("/signup")} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            <FaUserPlus /> Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-16 bg-blue-700 text-white">
        <h1 className="text-5xl font-bold">Welcome to Our Alumni Association</h1>
        <p className="mt-4 text-lg">Connecting Alumni, Building Futures</p>
      </section>

      {/* Features Section */}
      <section className="py-12 px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="p-8 bg-white shadow-lg rounded-lg text-center flex flex-col items-center transform transition duration-300 hover:scale-105">
            {feature.icon}
            <h3 className="text-2xl font-semibold mt-4">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </div>
        ))}
      </section>

      {/* Success Stories */}
      <section className="py-12 bg-gray-200 text-center">
        <h2 className="text-3xl font-bold">Alumni Success Stories</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {successStories.map((story, index) => (
            <div key={index} className="p-6 bg-white shadow-lg rounded-lg text-center">
              <p className="text-gray-700 italic">"{story.story}"</p>
              <p className="mt-4 font-semibold">- {story.name}, {story.year}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-900 text-white text-center mt-6">
        <p>&copy; {new Date().getFullYear()} Alumni Association | Connect. Inspire. Grow.</p>
      </footer>
    </div>
  );
};

export default HomePage;
