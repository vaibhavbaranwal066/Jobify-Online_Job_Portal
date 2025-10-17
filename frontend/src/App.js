// src/App.js
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";

// Context Providers
import { AuthProvider } from "./context/AuthContext";
import { JobProvider, useJobs } from "./context/JobContext";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Filters from "./components/Filters";
import JobCard from "./components/JobCard";
import LoginModal from "./components/LoginModal";

// Pages
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import JobsPage from "./pages/Jobs";
import PostJob from "./pages/PostJob";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import SavedJobs from "./pages/SavedJobs";
import Profile from "./pages/Profile";
import MyApplications from "./pages/MyApplications";

function AppShell() {
  const navigate = useNavigate();
  const { jobs } = useJobs(); // jobs from JobContext

  // Local UI states
  const [showLogin, setShowLogin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Dark mode persisted
  const [themeDark, setThemeDark] = useState(() => {
    try {
      return localStorage.getItem("theme") === "dark";
    } catch {
      return false;
    }
  });

  // Authenticated user
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // Saved & applied jobs persisted
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

  // Sync theme
  useEffect(() => {
    try {
      localStorage.setItem("theme", themeDark ? "dark" : "light");
      if (themeDark) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    } catch {}
  }, [themeDark]);

  // Sync user with localStorage
  useEffect(() => {
    const handleStorage = () => {
      try {
        const raw = localStorage.getItem("user");
        setUser(raw ? JSON.parse(raw) : null);
      } catch {
        setUser(null);
      }
    };
    handleStorage();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Persist saved/applied jobs
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

  // Job handlers
  const saveJob = (job) => {
    setSavedJobs((prev) => {
      const exists = prev.some((j) => j.id === job.id);
      if (exists) return prev;
      return [job, ...prev];
    });
  };

  const unsaveJob = (jobId) => {
    setSavedJobs((prev) => prev.filter((j) => j.id !== jobId));
  };

  const applyJob = (job) => {
    setAppliedJobs((prev) => {
      const exists = prev.some((j) => j.id === job.id);
      if (exists) return prev;
      return [job, ...prev];
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setUser(null);
    navigate("/login");
  };

  // Reload user when modal closes
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

  // Inline Home
  const HomeInline = () => {
    const filtered = jobs.filter((job) => {
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
        <Hero setSearchTerm={setSearchTerm} />

        <div className="container mx-auto px-4 py-8">
          <Filters />
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8"
          >
            {filtered.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onSave={saveJob}
                onApply={applyJob}
              />
            ))}
          </motion.div>
        </div>

        {showLogin && (
          <LoginModal
            onClose={() => {
              setShowLogin(false);
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar
        user={user}
        onLogin={() => setShowLogin(true)}
        onLogout={handleLogout}
        savedCount={savedJobs.length}
        appliedCount={appliedJobs.length}
        onToggleTheme={() => setThemeDark((prev) => !prev)}
        themeDark={themeDark}
      />

      <Routes>
        <Route path="/" element={<HomeInline />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage onSave={saveJob} onApply={applyJob} />} />
        <Route path="/post" element={<PostJob />} />
        <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
        <Route path="/saved" element={<SavedJobs savedJobs={savedJobs} unsaveJob={unsaveJob} />} />
        <Route path="/profile" element={<Profile appliedJobs={appliedJobs} />} />
        <Route path="/applications" element={<MyApplications />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster position="top-right" />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <JobProvider>
        <AppShell />
      </JobProvider>
    </AuthProvider>
  );
}
