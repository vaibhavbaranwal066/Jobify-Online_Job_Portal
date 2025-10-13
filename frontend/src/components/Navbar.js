// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FiBell,
  FiMenu,
  FiX,
  FiSearch,
  FiBookmark,
  FiBriefcase,
  FiUsers,
  FiMoon,
  FiSun,
} from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Notifications from "./Notifications";

const Navbar = ({ user, onLogin }) => {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [role, setRole] = useState("Candidate");
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");
  const [showNotif, setShowNotif] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Load user role and theme
  useEffect(() => {
    const storedRole = user?.role || localStorage.getItem("role") || "Candidate";
    setRole(storedRole);
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [user, dark]);

  // Search handler
  const handleSearch = (e) => {
    e.preventDefault();
    const query = q.trim();
    if (query) navigate(`/jobs?q=${encodeURIComponent(query)}`);
    setOpen(false);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  // Toggle theme
  const toggleTheme = () => setDark((prev) => !prev);

  // Role-based menus
  const roleMenus = {
    Candidate: [
      { path: "/", label: "Home" },
      { path: "/jobs", label: "Jobs" },
      { path: "/saved", label: "Saved Jobs" },
      { path: "/applications", label: "My Applications" },
    ],
    Recruiter: [
      { path: "/dashboard", label: "Dashboard" },
      { path: "/post", label: "Post Job" },
      { path: "/manage-jobs", label: "Manage Jobs" },
    ],
    Admin: [
      { path: "/admin/dashboard", label: "Admin Dashboard" },
      { path: "/admin/users", label: "Users" },
      { path: "/admin/jobs", label: "All Jobs" },
      { path: "/admin/settings", label: "Settings" },
    ],
  };

  const links = roleMenus[role] || roleMenus.Candidate;

  return (
    <motion.nav
      className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg z-50 border-b border-gray-200 dark:border-gray-700"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Left section: Logo + Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-gray-700 dark:text-gray-200"
            aria-label="Toggle menu"
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>

          <Link to="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 rounded-md bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold shadow"
            >
              J
            </motion.div>
            <span className="text-lg font-bold text-gray-800 dark:text-white hidden sm:block">
              Jobify
            </span>
          </Link>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center flex-1 max-w-xl mx-4"
        >
          <div className="flex items-center w-full bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2">
            <FiSearch className="text-gray-500 dark:text-gray-300 mr-2" />
            <input
              type="text"
              placeholder="Search jobs, companies, or keywords"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full bg-transparent text-gray-800 dark:text-gray-100 placeholder-gray-500 focus:outline-none"
            />
            <button
              type="submit"
              className="ml-3 py-1 px-3 rounded bg-blue-600 hover:bg-blue-700 text-white"
            >
              Search
            </button>
          </div>
        </form>

        {/* Right section: Links, Icons, Theme */}
        <div className="hidden md:flex items-center gap-5">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `font-semibold ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <button
            onClick={() => setShowNotif(!showNotif)}
            className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <FiBell className="text-xl text-gray-700 dark:text-gray-300" />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {dark ? (
              <FiSun className="text-xl text-yellow-400" />
            ) : (
              <FiMoon className="text-xl text-gray-700 dark:text-gray-300" />
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-gray-600 flex items-center justify-center text-blue-700 dark:text-white font-bold">
                  {user.name ? user.name[0].toUpperCase() : "U"}
                </div>
                <span className="hidden lg:block text-gray-700 dark:text-gray-200">
                  {user.name || "Profile"}
                </span>
              </button>
              <button
                onClick={logout}
                className="text-sm text-red-600 dark:text-red-400 hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onLogin}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all"
            >
              <FaUserCircle className="text-lg" /> Login
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-4 pb-4"
          >
            <form onSubmit={handleSearch} className="mb-3">
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg">
                <FiSearch className="text-gray-500 dark:text-gray-300 mr-2" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className="w-full bg-transparent text-gray-800 dark:text-gray-100 placeholder-gray-500 focus:outline-none"
                />
                <button className="ml-3 py-1 px-3 rounded bg-blue-600 text-white">
                  Search
                </button>
              </div>
            </form>

            <div className="flex flex-col gap-2 text-gray-800 dark:text-gray-200">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  toggleTheme();
                  setOpen(false);
                }}
                className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-left"
              >
                Toggle Theme
              </button>
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="px-3 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-left"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    onLogin && onLogin();
                    setOpen(false);
                  }}
                  className="px-3 py-2 text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-left"
                >
                  Login
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notifications dropdown */}
      {showNotif && <Notifications />}
    </motion.nav>
  );
};

export default Navbar;
