import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create User Context
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  // Fetch logged-in user from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Get token from localStorage
        if (!token) return; // No token, no API call

        const response = await axios.get("http://localhost:3000/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in headers
          },
        });
        //console.log(response.data);
        setUser(response.data);
         // ✅ Correct way to set user
      } catch (error) {
        console.error("Error fetching user:", error.response?.data || error.message);
      }
    };

    fetchUser();
  }, []); // Runs only once when the app starts

  // Function to update user state after login
  const loginUser = (userData, token) => {
    setUser(userData);
    localStorage.setItem("authToken", token); // Store token
  };

  // Function to logout user
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("authToken"); 
    localStorage.removeItem("role");   // Remove token on logout
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children} {/* Ensure children are wrapped */}
    </UserContext.Provider>
  );
};
