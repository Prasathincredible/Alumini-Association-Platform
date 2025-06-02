import { useState, useContext } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import { School } from "@mui/icons-material";
const apiurl=import.meta.env.VITE_API_URL;

const LoginPage = () => {
  const { loginUser } = useContext(UserContext);
  const [formData, setFormData] = useState({ userInput: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // NEW STATE
  const navigate = useNavigate();

  console.log(apiurl)

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

    setLoading(true); // Start loading

    try {
  
      const res = await axios.post(`${apiurl}/login`, formData);
      const { user, token, role } = res.data;
      console.log(user)
      loginUser(user, token, role);
      // Simulate delay (optional for smoother UX)
      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin_dashboard");
        } else if (role === "student") {
          navigate("/student_dashboard");
        } else {
          navigate("/alumini_dashboard");
        }
      }, 800);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <School className="text-blue-600" style={{ fontSize: 72 }} />
          <h1 className="text-3xl font-bold text-gray-900">Alumni Association</h1>
        </div>

        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Welcome Back 👋</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="userInput"
              placeholder="Email or Username"
              value={formData.userInput}
              onChange={handleChange}
              className="w-full px-10 py-3 bg-gray-200 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-10 py-3 bg-gray-200 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
              disabled={loading}
            >
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </button>
          </div>

          <div className="text-right">
            <a href="/forgot-password" className="text-blue-600 text-sm hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-300 disabled:opacity-60"
            disabled={loading}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.372 0 0 5.372 0 12h4z"
                />
              </svg>
            )}
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <p className="text-center text-gray-700 text-sm mt-4">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline font-semibold">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
