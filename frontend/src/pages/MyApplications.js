// src/pages/MyApplications.js
import React, { useContext } from "react";
import { JobContext } from "../context/JobContext";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const MyApplications = () => {
  const { appliedJobs } = useContext(JobContext);
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-500 dark:text-gray-400">
        Please login to view your applications.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen text-gray-900 dark:text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">My Applications</h2>

      {appliedJobs.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-lg text-center">
          You haven’t applied for any jobs yet.
        </p>
      ) : (
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {appliedJobs.map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-lg hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
              <p className="text-gray-500 dark:text-gray-300">{job.company}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {job.type} • {job.location || "Location not specified"}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                💰 ₹{job.salary || "Not mentioned"}
              </p>
              <button
                disabled
                className="bg-green-600 text-white px-4 py-2 rounded-lg cursor-not-allowed w-full"
              >
                Applied
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MyApplications;
