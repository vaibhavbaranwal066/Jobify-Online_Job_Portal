// src/context/JobContext.js
import React, { createContext, useState, useContext, useMemo } from "react";
import toast from "react-hot-toast";

const JobContext = createContext();
export const useJobs = () => useContext(JobContext);

export const JobProvider = ({ children }) => {
  // seed with your existing jobs if needed
  const [jobs, setJobs] = useState([
    { id: 1, title: "Frontend Developer", company: "Google", type: "Full-time", location: "Remote", description: "Build beautiful UI", salary: "120000", experience: "2+ yrs" },
    { id: 2, title: "Backend Engineer", company: "Microsoft", type: "Part-time", location: "Bangalore", description: "API & infra", salary: "90000", experience: "3+ yrs" },
    { id: 3, title: "UI/UX Designer", company: "Adobe", type: "Remote", location: "Hyderabad", description: "Design products", salary: "85000", experience: "2+ yrs" },
  ]);

  const addJob = (newJob) => {
    const job = { ...newJob, id: Date.now() };
    setJobs((prev) => [job, ...prev]);
    toast.success("Job posted successfully");
  };

  const onSaveJob = (jobId) => {
    // placeholder: integrate with backend or localStorage
    toast.success("Job saved");
  };

  const onApplyJob = (jobId) => {
    // placeholder: integrate with backend apply endpoint
    toast.success("Application sent");
  };

  const filterJobs = (query = "", type = "All") => {
    const q = (query || "").trim().toLowerCase();
    return jobs.filter((job) => {
      const matchesType = type === "All" || job.type === type;
      const matchesQuery =
        q === "" ||
        (job.title && job.title.toLowerCase().includes(q)) ||
        (job.company && job.company.toLowerCase().includes(q)) ||
        (job.location && job.location.toLowerCase().includes(q));
      return matchesType && matchesQuery;
    });
  };

  const value = useMemo(() => ({ jobs, addJob, filterJobs, onSaveJob, onApplyJob }), [jobs]);

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};
