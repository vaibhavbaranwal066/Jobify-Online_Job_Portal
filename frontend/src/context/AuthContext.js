// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Load user from localStorage (if any)
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  // Persist user data whenever it changes
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // ✅ Login handler (works for both backend and simulated frontend)
  const login = (userDataOrEmail, password, role = "user", name = "User") => {
    let newUser;

    if (typeof userDataOrEmail === "object") {
      // Backend response case
      const userId = userDataOrEmail.id || `user_${Date.now()}`;
      newUser = { ...userDataOrEmail, id: userId };
    } else {
      // Frontend (manual) login simulation
      const assignedId =
        role === "recruiter"
          ? "recruiter_001" // fixed recruiter ID
          : Date.now().toString();

      newUser = {
        id: assignedId,
        name:
          role === "admin"
            ? "Admin User"
            : role === "recruiter"
            ? "Recruiter Admin"
            : name || "Job Seeker",
        email: userDataOrEmail,
        role,
      };
    }

    // Save to state + localStorage
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("role", newUser.role);

    toast.success(`Welcome, ${newUser.name || "User"} 👋`);

    // Role-based redirect
    if (newUser.role === "recruiter") navigate("/recruiter-dashboard");
    else if (newUser.role === "admin") navigate("/admin-dashboard");
    else navigate("/");
  };

  // ✅ Logout handler
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("appliedJobs");
    toast.success("Logged out successfully 👋");
    navigate("/login");
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
