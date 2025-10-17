// src/context/JobContext.js
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const JobContext = createContext();
export const useJobs = () => useContext(JobContext);

const defaultJobsSeed = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Google",
    type: "Full-time",
    location: "Remote",
    description: "Build beautiful UI components with React and Tailwind CSS.",
    salary: "₹12–15 LPA",
    experience: "2+ yrs",
    recruiterId: "101",
    recruiterName: "Default Recruiter",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "Microsoft",
    type: "Part-time",
    location: "Bangalore",
    description: "Design and build scalable APIs with Node.js.",
    salary: "₹10–13 LPA",
    experience: "3+ yrs",
    recruiterId: "101",
    recruiterName: "Default Recruiter",
  },
];

export const JobProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  // --- Load jobs from localStorage or use defaults ---
  const [jobs, setJobs] = useState(() => {
    try {
      const storedJobs = JSON.parse(localStorage.getItem("jobs"));
      if (Array.isArray(storedJobs) && storedJobs.length) {
        return storedJobs.map((j) => ({
          ...j,
          recruiterId: j.recruiterId ? String(j.recruiterId) : "unknown",
        }));
      }
    } catch (e) {
      console.warn("Error loading jobs:", e);
    }
    return defaultJobsSeed;
  });

  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [applications, setApplications] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("applications")) || [];
    } catch {
      return [];
    }
  });

  // --- Load user-specific data on login/logout ---
  useEffect(() => {
    if (user?.id) {
      try {
        const saved = JSON.parse(localStorage.getItem(`savedJobs_${user.id}`)) || [];
        const applied =
          JSON.parse(localStorage.getItem(`appliedJobs_${user.id}`)) || [];
        setSavedJobs(saved);
        setAppliedJobs(applied);
      } catch {
        setSavedJobs([]);
        setAppliedJobs([]);
      }
    } else {
      setSavedJobs([]);
      setAppliedJobs([]);
    }

    // normalize global applications
    try {
      const allApplicationsRaw =
        JSON.parse(localStorage.getItem("applications")) || [];
      const normalized = allApplicationsRaw.map((a) => ({
        ...a,
        recruiterId: a?.recruiterId ? String(a.recruiterId) : "unknown",
        applicantId: a?.applicantId ? String(a.applicantId) : "",
        jobId: a?.jobId ? String(a.jobId) : "",
      }));
      setApplications(normalized);
    } catch {
      setApplications([]);
    }
  }, [user]);

  // --- Persist all data ---
  useEffect(() => {
    try {
      localStorage.setItem("jobs", JSON.stringify(jobs));
    } catch {}
  }, [jobs]);

  useEffect(() => {
    if (user?.id) {
      try {
        localStorage.setItem(`savedJobs_${user.id}`, JSON.stringify(savedJobs));
        localStorage.setItem(`appliedJobs_${user.id}`, JSON.stringify(appliedJobs));
      } catch {}
    }
    try {
      localStorage.setItem("applications", JSON.stringify(applications));
    } catch {}
  }, [savedJobs, appliedJobs, applications, user]);

  // --- Add Job (Recruiters/Admin only) ---
  const addJob = (newJob) => {
    if (!user) return toast.error("Please login to post a job!");
    if (user.role !== "recruiter" && user.role !== "admin")
      return toast.error("Only recruiters or admins can post jobs!");

    const job = {
      ...newJob,
      id: Date.now(),
      recruiterId: String(user.id),
      recruiterName: user.name || "Recruiter",
      createdAt: new Date().toISOString(),
    };

    setJobs((prev) => [job, ...prev]);
    toast.success("Job posted successfully 🎉");
  };

  // --- Delete Job ---
  const deleteJob = (jobId) => {
    if (!user) return toast.error("Please login first!");
    const jobToDelete = jobs.find((j) => j.id === jobId);
    if (!jobToDelete) return toast.error("Job not found!");
    if (user.role !== "admin" && String(jobToDelete.recruiterId) !== String(user.id))
      return toast.error("You don’t have permission to delete this job!");
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
    toast.success("Job deleted successfully 🗑️");
  };

  // --- Save Job ---
  const saveJob = (job) => {
    if (!user) return toast.error("Please login to save jobs!");
    if (savedJobs.find((j) => j.id === job.id))
      return toast.error("Job already saved!");
    setSavedJobs((prev) => [...prev, job]);
    toast.success("Job saved 💾");
  };

  const removeSavedJob = (jobId) => {
    setSavedJobs((prev) => prev.filter((j) => j.id !== jobId));
    toast.success("Removed from saved jobs 🗑️");
  };

  // --- Apply for a Job ---
  const applyJob = (job) => {
    if (!user) return toast.error("Please login to apply!");
    if (user.role === "recruiter")
      return toast.error("Recruiters cannot apply for jobs!");
    if (appliedJobs.find((j) => j.id === job.id))
      return toast.error("You already applied for this job!");

    // add to applied list
    setAppliedJobs((prev) => {
      const updated = [...prev, job];
      try {
        localStorage.setItem(`appliedJobs_${user.id}`, JSON.stringify(updated));
      } catch {}
      return updated;
    });

    toast.success("Application sent successfully ✅");

    const newApplication = {
      id: Date.now(),
      jobId: String(job.id),
      jobTitle: job.title,
      recruiterId: String(job.recruiterId ?? "unknown"),
      applicantId: String(user.id),
      applicantName: user.name,
      applicantEmail: user.email,
      appliedAt: new Date().toISOString(),
    };

    setApplications((prev) => {
      const updated = [...prev, newApplication];
      try {
        localStorage.setItem("applications", JSON.stringify(updated));
      } catch {}
      console.log("New application created:", newApplication);
      return updated;
    });
  };

  const applyToJob = applyJob; // alias for compatibility

  // --- Filter Jobs ---
  const filterJobs = (query = "", type = "All") => {
    const q = query.trim().toLowerCase();
    return jobs.filter((job) => {
      const matchesType = type === "All" || job.type === type;
      const matchesQuery =
        q === "" ||
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q);
      return matchesType && matchesQuery;
    });
  };

  // --- Context Value ---
  const value = useMemo(
    () => ({
      jobs,
      savedJobs,
      appliedJobs,
      applications,
      setJobs,
      addJob,
      deleteJob,
      saveJob,
      removeSavedJob,
      applyJob,
      applyToJob,
      filterJobs,
    }),
    [jobs, savedJobs, appliedJobs, applications]
  );

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};
