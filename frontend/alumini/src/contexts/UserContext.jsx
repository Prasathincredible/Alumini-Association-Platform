import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create User Context
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(""); // Initialize role from localStorage

  // Function to log in user and store token & role
  const loginUser = (userData, token, userRole) => {
    //console.log(userData);
    setUser(userData);
    setRole(userRole); // Set role
    localStorage.setItem("authToken", token);
    localStorage.setItem("role", userRole);
  };

  // Function to log out user
  const logoutUser = () => {
    setUser(null);
    setRole(""); // Clear role
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
  };

  return (
    <UserContext.Provider value={{ user, role, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
