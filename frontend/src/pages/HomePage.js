// src/pages/HomePage.js
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import JobCard from "../components/JobCard";
import axios from "axios";

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [savedJobs, setSavedJobs] = useState(
    JSON.parse(localStorage.getItem("savedJobs")) || []
  );
  const [appliedJobs, setAppliedJobs] = useState(
    JSON.parse(localStorage.getItem("appliedJobs")) || []
  );

  // ✅ Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("/api/v1/jobs/get-jobs");
        setJobs(res.data.jobs || res.data || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // ✅ Save Job
  const handleSave = (job) => {
    const updated = [...savedJobs, job];
    setSavedJobs(updated);
    localStorage.setItem("savedJobs", JSON.stringify(updated));
    alert("Job saved successfully!");
  };

  // ✅ Apply Job
  const handleApply = (job) => {
    const updated = [...appliedJobs, job];
    setAppliedJobs(updated);
    localStorage.setItem("appliedJobs", JSON.stringify(updated));
    alert("Job applied successfully!");
  };

  // ✅ Filter by search term
  const filteredJobs = jobs.filter((job) =>
    job.title?.toLowerCase().includes(searchTerm)
  );

  // ✅ Return (no JSX)
  return React.createElement(
    Layout,
    null,
    React.createElement(Hero, { setSearchTerm }),
    React.createElement(
      "div",
      { className: "mb-8" },
      React.createElement(
        "div",
        { className: "rounded-xl p-8 job-card" },
        React.createElement(
          "h1",
          { className: "text-3xl font-bold" },
          "Find jobs that excite you ✨"
        ),
        React.createElement(
          "p",
          { className: "mt-2 text-white/70" },
          "Explore recent openings — tailored to your skills."
        )
      )
    ),
    React.createElement(
      "section",
      { className: "grid grid-cols-1 gap-6" },
      loading
        ? React.createElement(
            "div",
            {
              className:
                "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
            },
            Array.from({ length: 6 }).map((_, i) =>
              React.createElement("div", {
                key: i,
                className: "h-36 shimmer rounded-xl",
              })
            )
          )
        : React.createElement(
            "div",
            {
              className:
                "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
            },
            filteredJobs && filteredJobs.length
              ? filteredJobs.map((job) =>
                  React.createElement(JobCard, {
                    key: job._id || job.id,
                    job,
                    onSave: handleSave,
                    onApply: handleApply,
                  })
                )
              : React.createElement("div", null, "No jobs found")
          )
    )
  );
}
