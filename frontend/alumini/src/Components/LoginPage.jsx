import { useState, useContext } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const LoginPage = () => {
  const { loginUser } = useContext(UserContext);
  const [formData, setFormData] = useState({ userInput: "", password: "" }); // single input field for userInput
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.userInput || !formData.password) {
      setError("Please enter both email/username and password.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/login", formData);

      Swal.fire({
        title: "Success!",
        text: "Operation completed",
        icon: "success",
      });

      const { user, token, role } = res.data;

      loginUser(user, token, role);

      // Navigate based on the user role
      if (role === "admin") {
        navigate("/admin_dashboard");
      } else if (role === "student") {
        navigate("/student_dashboard");
      } else {
        navigate("/alumini_dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Input (email or username) */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="userInput" // single field for email or username
              placeholder="Email or Username"
              value={formData.userInput}
              onChange={handleChange}
              className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-gray-600 text-sm text-center mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
