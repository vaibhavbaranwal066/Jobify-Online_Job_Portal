// src/components/JobCard.js
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiClock, FiBookmark } from "react-icons/fi";
import { FaBriefcase } from "react-icons/fa";
import { JobContext } from "../context/JobContext";

const JobCard = ({ job }) => {
  const { applyJob, saveJob } = useContext(JobContext);

  const handleApply = () => {
    applyJob(job); // ✅ Corrected function name
  };

  const handleSave = () => {
    saveJob(job);
  };

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.03, y: -6 }}
      className="p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-200 cursor-pointer"
    >
      <div className="flex justify-between items-start gap-4">
        {/* LEFT SIDE - JOB DETAILS */}
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
              {job.company ? job.company[0] : "C"}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {job.title}
              </h3>
              <div className="text-sm text-blue-600 dark:text-blue-300 font-medium">
                {job.company} • {job.type || "Full-time"}
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          {job.description && (
            <p className="mt-3 text-gray-700 dark:text-white/80 line-clamp-2">
              {job.description}
            </p>
          )}

          {/* JOB INFO */}
          <div className="mt-3 flex items-center gap-3 text-xs text-gray-600 dark:text-white/60">
            <span className="flex items-center gap-1">
              <FiMapPin /> {job.location || "Remote"}
            </span>
            <span className="flex items-center gap-1">
              <FiClock /> {job.postedAt || "2d ago"}
            </span>
            <span className="flex items-center gap-1">
              <FaBriefcase /> {job.type || "Full-time"}
            </span>
          </div>
        </div>

        {/* RIGHT SIDE - ACTIONS */}
        <div className="flex flex-col items-end gap-3">
          <div className="text-right">
            <div className="text-sm text-gray-800 dark:text-white/90 font-semibold">
              ₹{job.salary || "Negotiable"}
            </div>
            <div className="text-xs text-gray-500 dark:text-white/60">
              Experience: {job.experience || "Any"}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={handleApply}
              className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
            >
              Apply Now
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-2 rounded border border-gray-400 dark:border-gray-500 text-gray-800 dark:text-white/90 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
            >
              <FiBookmark />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;
