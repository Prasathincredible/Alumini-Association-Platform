import React, { useState } from "react";
import axios from "axios";
 const apiurl=import.meta.env.VITE_API_URL;

const StudentSignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNo: "",
    batch: "",
    degree: "",
    department: "",
    year: "",
    password: "",
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      if (avatarFile) {
        formDataToSend.append("avatar", avatarFile); // Append avatar file
      }

      const response = await axios.post(`${apiurl}/students/signup`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Account created successfully!");
      setFormData({
        name: "",
        email: "",
        rollNo: "",
        batch: "",
        degree: "",
        department: "",
        year: "",
        password: "",
      });
      setAvatarFile(null);
    } catch (error) {
      console.error("Error signing up:", error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Student Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} className="w-full p-2 border rounded-md" />
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} className="w-full p-2 border rounded-md" />
        <input type="text" name="rollNo" placeholder="Roll Number" required onChange={handleChange} className="w-full p-2 border rounded-md" />
        <input type="text" name="batch" placeholder="Batch (e.g., 2020-2024)" required onChange={handleChange} className="w-full p-2 border rounded-md" />
        <input type="text" name="degree" placeholder="Degree (e.g., B.Tech, M.Tech)" required onChange={handleChange} className="w-full p-2 border rounded-md" />
        <input type="text" name="department" placeholder="Department (e.g., CSE, ECE)" required onChange={handleChange} className="w-full p-2 border rounded-md" />
        <input type="number" name="year" placeholder="Current Year" required onChange={handleChange} className="w-full p-2 border rounded-md" />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} className="w-full p-2 border rounded-md" />

        {/* Avatar Upload */}
        <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded-md" />

        {/* Submit Button */}
        <button type="submit" disabled={loading} className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 w-full">
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default StudentSignUp;
