// src/components/Dashboard.js
import React from "react";
import { motion } from "framer-motion";
import { FaHome, FaUsers, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const menu = [
    { name: "Overview", path: "/dashboard", icon: <FaHome /> },
    { name: "Applicants", path: "/dashboard/applicants", icon: <FaUsers /> },
    { name: "Analytics", path: "/dashboard/analytics", icon: <FaChartBar /> },
    { name: "Logout", path: "/logout", icon: <FaSignOutAlt /> },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-[80vh]">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 70 }}
        className="w-full lg:w-64 bg-white dark:bg-gray-800 shadow-lg p-6 space-y-4"
      >
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Employer Dashboard</h1>

        <nav className="flex flex-col gap-2">
          {menu.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors"
            >
              <span className="text-blue-500 dark:text-blue-400">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-inner">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Welcome to your dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Select an option from the sidebar to manage your jobs, view applicants, or analyze performance.
        </p>
      </main>
    </div>
  );
}
