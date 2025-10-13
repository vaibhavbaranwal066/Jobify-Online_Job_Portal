// src/App.js
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Filters from "./components/Filters";
import JobCard from "./components/JobCard";
import LoginModal from "./components/LoginModal";

// Pages (existing)
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import JobsPage from "./pages/Jobs";
import PostJob from "./pages/PostJob";

// New pages we added earlier
import SavedJobs from "./pages/SavedJobs";
import Profile from "./pages/Profile";

// Context
import { JobProvider } from "./context/JobContext";

// Sample jobs for homepage display (you can replace this with your context/API later)
const sampleJobs = [
  { id: 1, title: "Frontend Developer", company: "Google", type: "Full-time", location: "Remote", description: "Build beautiful UI", salary: "1,20,000", experience: "2+ yrs" },
  { id: 2, title: "Backend Engineer", company: "Microsoft", type: "Part-time", location: "Bangalore", description: "Design scalable APIs", salary: "90,000", experience: "3+ yrs" },
  { id: 3, title: "UI/UX Designer", company: "Adobe", type: "Remote", location: "Hyderabad", description: "Design delightful experiences", salary: "85,000", experience: "2+ yrs" },
  { id: 4, title: "DevOps Engineer", company: "Amazon", type: "Full-time", location: "Pune", description: "Automate infra", salary: "1,10,000", experience: "4+ yrs" },
];

function App() {
  const navigate = useNavigate();

  // UI states
  const [showLogin, setShowLogin] = useState(false);

  // Theme (dark/light) persisted
  const [themeDark, setThemeDark] = useState(() => {
    try {
      return localStorage.getItem("theme") === "dark";
    } catch {
      return false;
    }
  });

  // Current authenticated user (if any) from localStorage
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // Saved / Applied jobs stored in localStorage
  const [savedJobs, setSavedJobs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("savedJobs")) || [];
    } catch {
      return [];
    }
  });
  const [appliedJobs, setAppliedJobs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("appliedJobs")) || [];
    } catch {
      return [];
    }
  });

  // Search term for inline Home page
  const [searchTerm, setSearchTerm] = useState("");

  // Persist theme on change and toggle document class
  useEffect(() => {
    try {
      localStorage.setItem("theme", themeDark ? "dark" : "light");
      if (themeDark) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    } catch (err) {
      // ignore localStorage errors
    }
  }, [themeDark]);

  // Keep user state in sync with localStorage (if other components set it)
  useEffect(() => {
    const handleStorage = () => {
      try {
        const raw = localStorage.getItem("user");
        setUser(raw ? JSON.parse(raw) : null);
      } catch {
        setUser(null);
      }
    };
    // update on mount too
    handleStorage();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Persist savedJobs / appliedJobs whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
    } catch {}
  }, [savedJobs]);

  useEffect(() => {
    try {
      localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));
    } catch {}
  }, [appliedJobs]);

  // Handler: save job (idempotent)
  const saveJob = (job) => {
    setSavedJobs((prev) => {
      const exists = prev.some((j) => j.id === job.id);
      if (exists) return prev;
      return [job, ...prev];
    });
  };

  // Handler: unsave job
  const unsaveJob = (jobId) => {
    setSavedJobs((prev) => prev.filter((j) => j.id !== jobId));
  };

  // Handler: apply job (adds to applied list, prevents duplicates)
  const applyJob = (job) => {
    setAppliedJobs((prev) => {
      const exists = prev.some((j) => j.id === job.id);
      if (exists) return prev;
      return [job, ...prev];
    });
  };

  // Handler: logout (clears auth + user)
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setUser(null);
    navigate("/login");
  };

  // When login modal is closed, pick up user if login saved something
  useEffect(() => {
    if (!showLogin) {
      try {
        const raw = localStorage.getItem("user");
        setUser(raw ? JSON.parse(raw) : null);
      } catch {
        setUser(null);
      }
    }
  }, [showLogin]);

  // Inline Home page (keeps your original look but wired to search/save/apply)
  const HomeInline = () => {
    const filtered = sampleJobs.filter((job) => {
      if (!searchTerm) return true;
      const q = searchTerm.toLowerCase();
      return (
        (job.title && job.title.toLowerCase().includes(q)) ||
        (job.company && job.company.toLowerCase().includes(q)) ||
        (job.location && job.location.toLowerCase().includes(q))
      );
    });

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
        {/* Hero receives setSearchTerm to control search term */}
        <Hero setSearchTerm={setSearchTerm} />

        <div className="container mx-auto px-4 py-8">
          <Filters />
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {filtered.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onSave={saveJob}
                onApply={(j) => {
                  applyJob(j);
                  // optionally: after apply navigate to profile
                  // navigate("/profile");
                }}
              />
            ))}
          </motion.div>
        </div>

        {showLogin && (
          <LoginModal
            onClose={() => {
              setShowLogin(false);
              // after closing login modal, re-read user
              try {
                const raw = localStorage.getItem("user");
                setUser(raw ? JSON.parse(raw) : null);
              } catch {
                setUser(null);
              }
            }}
          />
        )}
      </div>
    );
  };

  return (
    <JobProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        {/* Navbar: pass current user + onLogin + logout + counts */}
        <Navbar
          user={user}
          onLogin={() => setShowLogin(true)}
          onLogout={handleLogout}
          savedCount={savedJobs.length}
          appliedCount={appliedJobs.length}
        />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomeInline />} />
          <Route path="/home" element={<HomePage />} />

          {/* Jobs page: we pass handlers so JobsPage can use them if it accepts props */}
          <Route
            path="/jobs"
            element={<JobsPage onSave={saveJob} onApply={applyJob} />}
          />

          {/* Post Job page (keeps existing) */}
          <Route path="/post" element={<PostJob />} />

          {/* Saved Jobs & Profile pages (frontend-only using localStorage state) */}
          <Route path="/saved" element={<SavedJobs savedJobs={savedJobs} unsaveJob={unsaveJob} />} />
          <Route path="/profile" element={<Profile appliedJobs={appliedJobs} />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Toast notifications */}
        <Toaster position="top-right" />
      </div>
    </JobProvider>
  );
}

export default App;
