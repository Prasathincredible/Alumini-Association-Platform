import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, TextField, MenuItem } from "@mui/material";
import { Search, ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const apiurl = import.meta.env.VITE_API_URL;

const AlumniDirectory = () => {
  const [alumni, setAlumni] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    industry: "",
    role: "",
    location: "",
    batch: "",
    company: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const response = await axios.get(`${apiurl}/alumni`);
        setAlumni(response.data);
        setFilteredAlumni(response.data);
      } catch (err) {
        console.error("Error fetching alumni:", err);
      }
    };
    fetchAlumni();
  }, []);

  useEffect(() => {
    const filtered = alumni.filter((alumnus) => {
      return (
        (filters.name === "" || alumnus.userName.toLowerCase().includes(filters.name.toLowerCase())) &&
        (filters.industry === "" || alumnus.industry === filters.industry) &&
        (filters.role === "" || alumnus.role === filters.role) &&
        (filters.location === "" || alumnus.location === filters.location) &&
        (filters.batch === "" || alumnus.batch === filters.batch) &&
        (filters.company === "" || alumnus.company.toLowerCase().includes(filters.company.toLowerCase()))
      );
    });
    setFilteredAlumni(filtered);
  }, [filters, alumni]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-100 flex flex-col items-center relative">

      {/* Back Button - Responsive and Stylish */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 flex items-center gap-2 text-gray-700 border border-gray-300 px-4 py-2 rounded-md bg-white hover:bg-gray-100 shadow-sm transition"
      >
        <ArrowBack fontSize="small" />
        <span className="hidden sm:inline">Back</span>
      </button>

      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 mt-12 sm:mt-0 text-center">
        🎓 Alumni Directory
      </h1>

      {/* FILTER SECTION */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-6xl mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            fullWidth
            InputProps={{ startAdornment: <Search className="text-gray-500" /> }}
          />
          <TextField label="Industry" select name="industry" value={filters.industry} onChange={handleFilterChange} fullWidth>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="IT">IT</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
            <MenuItem value="Healthcare">Healthcare</MenuItem>
            <MenuItem value="Automobiles">Automobiles</MenuItem>
          </TextField>
          <TextField label="Role" select name="role" value={filters.role} onChange={handleFilterChange} fullWidth>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Developer">Developer</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
            <MenuItem value="Analyst">Analyst</MenuItem>
            <MenuItem value="Designer">Designer</MenuItem>
          </TextField>
          <TextField label="Location" name="location" value={filters.location} onChange={handleFilterChange} fullWidth />
          <TextField label="Batch" select name="batch" value={filters.batch} onChange={handleFilterChange} fullWidth>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="2023">2023</MenuItem>
            <MenuItem value="2020">2020</MenuItem>
            <MenuItem value="2019">2019</MenuItem>
            <MenuItem value="2018">2018</MenuItem>
          </TextField>
          <TextField label="Company" name="company" value={filters.company} onChange={handleFilterChange} fullWidth />
        </div>
      </div>

      {/* ALUMNI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {filteredAlumni.map((alumnus) => (
          <div
            key={alumnus._id}
            className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4 cursor-pointer hover:shadow-2xl transition transform hover:scale-105"
            onClick={() => navigate(`/profile/${alumnus.userName}`)}
          >
            <Avatar src={alumnus.avatar} sx={{ width: 70, height: 70 }} />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{alumnus.userName}</h2>
              <p className="text-gray-600">{alumnus.role} at {alumnus.industry}</p>
              <p className="text-gray-500">{alumnus.company} | {alumnus.location} | Batch {alumnus.batch}</p>
            </div>
          </div>
        ))}
      </div>

      {/* NO RESULTS */}
      {filteredAlumni.length === 0 && (
        <div className="text-center text-gray-500 mt-6 text-lg">No alumni found matching the filters.</div>
      )}
    </div>
  );
};

export default AlumniDirectory;
