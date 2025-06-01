import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaUser, FaEnvelope, FaLock, FaPhone, FaLinkedin, FaGithub, FaCamera,
} from "react-icons/fa";
import { MdWork, MdSchool } from "react-icons/md";
import { BsBuilding, BsFileEarmarkImage } from "react-icons/bs";

const Signup = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    batch: "",
    department: "",
    industry: "",
    position: "",
    phone: "",
    linkedin: "",
    github: "",
    company: "",
    avatar: null,
    marksheet: null,
  });

  const [loading, setLoading] = useState(false); // <-- Added loading state
  const navigate = useNavigate();

  const batches = ["2020", "2021", "2022", "2023", "2024"];
  const departments = ["CSE", "ECE", "MECH", "CIVIL", "EEE"];
  const industries = ["IT", "Finance", "Healthcare", "Education", "Manufacturing"];
  const positions = ["Software Engineer", "Project Manager", "Data Scientist", "Designer", "Consultant"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });

      await axios.post("https://campus-bridge-zb03.onrender.com/signup", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Signup successful! Waiting for admin approval.");
      navigate("/login");
    } catch (error) {
      alert("Signup failed. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#f0f4ff] to-[#e3eafc]">
      <div className="w-4/5 max-w-3xl bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">🎓 Alumni Sign Up</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* ... form fields stay unchanged ... */}

          {/* Submit Button */}
          <div className="col-span-2 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-full max-w-xs ${
                loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
              } text-white font-bold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center`}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
