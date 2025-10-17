// src/pages/PostJob.js
import React, { useState, useContext } from "react";
import { useJobs } from "../context/JobContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const PostJob = () => {
  const { addJob } = useJobs();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    company: "",
    type: "Full-time",
    location: "",
    description: "",
    salary: "",
    experience: "",
  });

  // ❌ Access check: only recruiter can post
  if (!user || user.role !== "recruiter") {
    return (
      <div className="p-8 text-center text-red-600 font-semibold min-h-screen flex items-center justify-center">
        🚫 Access Denied — Recruiter privileges required.
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!job.title || !job.company || !job.description) {
      toast.error("Please fill in all required fields!");
      return;
    }

    addJob(job);
    toast.success("🎉 Job posted successfully!");

    // Reset form
    setJob({
      title: "",
      company: "",
      type: "Full-time",
      location: "",
      description: "",
      salary: "",
      experience: "",
    });

    // Redirect to recruiter dashboard
    navigate("/recruiter-dashboard");
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">
        📝 Post a New Job
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-4 border dark:border-gray-700"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Job Title *</label>
          <input
            type="text"
            name="title"
            value={job.title}
            onChange={handleChange}
            placeholder="Frontend Developer"
            className="w-full p-3 rounded-lg border dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Company *</label>
          <input
            type="text"
            name="company"
            value={job.company}
            onChange={handleChange}
            placeholder="Google"
            className="w-full p-3 rounded-lg border dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Job Type</label>
            <select
              name="type"
              value={job.type}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Remote</option>
              <option>Internship</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Experience</label>
            <input
              type="text"
              name="experience"
              value={job.experience}
              onChange={handleChange}
              placeholder="2+ yrs"
              className="w-full p-3 rounded-lg border dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Salary</label>
          <input
            type="text"
            name="salary"
            value={job.salary}
            onChange={handleChange}
            placeholder="₹10–15 LPA"
            className="w-full p-3 rounded-lg border dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={job.location}
            onChange={handleChange}
            placeholder="Bangalore / Remote"
            className="w-full p-3 rounded-lg border dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Job Description *
          </label>
          <textarea
            name="description"
            rows={4}
            value={job.description}
            onChange={handleChange}
            placeholder="Describe the role..."
            className="w-full p-3 rounded-lg border dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default PostJob;
