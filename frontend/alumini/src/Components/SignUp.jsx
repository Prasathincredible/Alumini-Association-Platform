import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaLinkedin,
  FaGithub,
  FaCamera,
} from "react-icons/fa";
import { MdWork, MdSchool } from "react-icons/md";
import { BsBuilding, BsFileEarmarkImage } from "react-icons/bs";
const apiurl=import.meta.env.VITE_API_URL;

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

  const [loading, setLoading] = useState(false); // ⬅️ Loading state
  const navigate = useNavigate();

  const batches = ["2020", "2021", "2022", "2023", "2024"];
  const departments = ["CSE", "ECE", "MECH", "CIVIL", "EEE"];
  const industries = ["IT", "Finance", "Healthcare", "Education", "Manufacturing"];
  const positions = [
    "Software Engineer",
    "Project Manager",
    "Data Scientist",
    "Designer",
    "Consultant",
  ];

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
    setLoading(true); // ⬅️ Start loading
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });

      await axios.post(`${apiurl}/signup`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Signup successful! Waiting for admin approval.");
      navigate("/login");
    } catch (error) {
      alert("Signup failed. Please try again.");
    } finally {
      setLoading(false); // ⬅️ Stop loading
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#f0f4ff] to-[#e3eafc]">
      <div className="w-4/5 max-w-3xl bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">🎓 Alumni Sign Up</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">

          <div className="flex items-center space-x-2 border rounded p-2 bg-gray-50">
            <FaUser className="text-gray-500" />
            <input type="text" name="userName" placeholder="Full Name" className="w-full bg-transparent outline-none" value={formData.userName} onChange={handleChange} />
          </div>

          <div className="flex items-center space-x-2 border rounded p-2 bg-gray-50">
            <FaEnvelope className="text-gray-500" />
            <input type="email" name="email" placeholder="Email" className="w-full bg-transparent outline-none" value={formData.email} onChange={handleChange} />
          </div>

          <div className="flex items-center space-x-2 border rounded p-2 bg-gray-50">
            <FaLock className="text-gray-500" />
            <input type="password" name="password" placeholder="Password" className="w-full bg-transparent outline-none" value={formData.password} onChange={handleChange} />
          </div>

          <div className="flex items-center space-x-2 border rounded p-2 bg-gray-50">
            <MdSchool className="text-gray-500" />
            <select name="batch" className="w-full bg-transparent outline-none" value={formData.batch} onChange={handleChange}>
              <option value="">Select Batch</option>
              {batches.map((batch) => <option key={batch} value={batch}>{batch}</option>)}
            </select>
          </div>

          <div className="flex items-center space-x-2 border rounded p-2 bg-gray-50">
            <MdSchool className="text-gray-500" />
            <select name="department" className="w-full bg-transparent outline-none" value={formData.department} onChange={handleChange}>
              <option value="">Select Department</option>
              {departments.map((dept) => <option key={dept} value={dept}>{dept}</option>)}
            </select>
          </div>

          <div className="flex items-center space-x-2 border rounded p-2 bg-gray-50">
            <BsBuilding className="text-gray-500" />
            <select name="industry" className="w-full bg-transparent outline-none" value={formData.industry} onChange={handleChange}>
              <option value="">Select Industry</option>
              {industries.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
            </select>
          </div>

          <div className="flex items-center space-x-2 border rounded p-2 bg-gray-50">
            <MdWork className="text-gray-500" />
            <select name="position" className="w-full bg-transparent outline-none" value={formData.position} onChange={handleChange}>
              <option value="">Select Position</option>
              {positions.map((pos) => <option key={pos} value={pos}>{pos}</option>)}
            </select>
          </div>

          <div className="flex items-center space-x-2 border rounded p-2 bg-gray-50">
            <FaPhone className="text-gray-500" />
            <input type="text" name="phone" placeholder="Phone" className="w-full bg-transparent outline-none" value={formData.phone} onChange={handleChange} />
          </div>

          <div className="flex items-center space-x-2 border rounded p-2 bg-gray-50">
            <FaLinkedin className="text-blue-600" />
            <input type="text" name="linkedin" placeholder="LinkedIn Profile" className="w-full bg-transparent outline-none" value={formData.linkedin} onChange={handleChange} />
          </div>

          <div className="flex items-center space-x-2 border rounded p-2 bg-gray-50">
            <FaGithub className="text-gray-800" />
            <input type="text" name="github" placeholder="GitHub Profile" className="w-full bg-transparent outline-none" value={formData.github} onChange={handleChange} />
          </div>

          <div className="flex items-center space-x-2 border rounded p-2 bg-gray-50">
            <BsBuilding className="text-gray-500" />
            <input type="text" name="company" placeholder="Company Name" className="w-full bg-transparent outline-none" value={formData.company} onChange={handleChange} />
          </div>

          <div className="flex items-center space-x-2 border rounded p-2 bg-gray-50">
            <FaCamera className="text-gray-500" />
            <input type="file" name="avatar" className="w-full bg-transparent outline-none" onChange={handleFileChange} />
          </div>

          <div className="flex items-center space-x-2 border rounded p-2 bg-gray-50">
            <BsFileEarmarkImage className="text-gray-500" />
            <input type="file" name="marksheet" className="w-full bg-transparent outline-none" onChange={handleFileChange} />
          </div>

          <div className="col-span-2 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-full max-w-xs font-bold py-2 px-4 rounded-lg transition duration-200 ${
                loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Signup;
