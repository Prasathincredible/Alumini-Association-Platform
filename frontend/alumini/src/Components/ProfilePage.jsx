import React, { useState, useEffect } from "react";
import axios from "axios";
import { Avatar } from "@mui/material";
import {
  LinkedIn,
  GitHub,
  Email,
  Phone,
  Business,
  School,
  WorkOutline,
  Apartment,
} from "@mui/icons-material";

const ProfilePage = () => {
  const [alumni, setAlumni] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await axios.get("http://localhost:3000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAlumni(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-xl text-gray-700">
        Loading...
      </div>
    );

  if (!alumni)
    return (
      <div className="min-h-screen flex justify-center items-center text-xl text-gray-700">
        User not found
      </div>
    );

  const {
    avatar,
    userName,
    linkedin,
    github,
    email,
    phone,
    batch,
    department,
    industry,
    company, // New field
  } = alumni;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-100 to-gray-300 px-6 py-10">
      <div className="bg-white shadow-2xl rounded-3xl max-w-4xl w-full p-10">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center">
          <Avatar
            src={avatar}
            alt="Profile"
            sx={{ width: 130, height: 130, border: "4px solid #3b82f6" }}
          />
          <h1 className="text-4xl font-bold text-gray-800 mt-4">{userName}</h1>
          <p className="text-lg text-gray-600 mt-2 flex items-center">
            <WorkOutline className="text-blue-500 mr-2" /> {industry}
          </p>
          {company && (
            <p className="text-lg text-gray-600 mt-1 flex items-center">
              <Apartment className="text-blue-500 mr-2" /> {company}
            </p>
          )}
        </div>

        {/* Profile Details */}
        <div className="mt-10 space-y-6">
          {/* Batch, Department & Company */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-gray-800">
            <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg">
              <School className="text-blue-600" />
              <p>
                <span className="font-semibold">Batch:</span> {batch}
              </p>
            </div>
            <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg">
              <Business className="text-blue-600" />
              <p>
                <span className="font-semibold">Department:</span> {department}
              </p>
            </div>
            {company && (
              <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg">
                <Apartment className="text-blue-600" />
                <p>
                  <span className="font-semibold">Company:</span> {company}
                </p>
              </div>
            )}
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 bg-blue-100 hover:bg-blue-200 rounded-lg shadow-md transition transform hover:scale-105"
              >
                <LinkedIn className="text-blue-600" />
                <span className="font-semibold text-blue-600 hover:underline">
                  LinkedIn Profile
                </span>
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 bg-gray-200 hover:bg-gray-300 rounded-lg shadow-md transition transform hover:scale-105"
              >
                <GitHub className="text-gray-800" />
                <span className="font-semibold text-gray-800 hover:underline">
                  GitHub Profile
                </span>
              </a>
            )}
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4 bg-red-100 p-4 rounded-lg shadow-md transition transform hover:scale-105">
              <Email className="text-red-500" />
              <p className="font-semibold">{email}</p>
            </div>
            <div className="flex items-center space-x-4 bg-green-100 p-4 rounded-lg shadow-md transition transform hover:scale-105">
              <Phone className="text-green-500" />
              <p className="font-semibold">{phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
