// src/pages/RecruiterDashboard.js
import React, { useContext } from "react";
import { JobContext } from "../context/JobContext";
import { AuthContext } from "../context/AuthContext";

const RecruiterDashboard = () => {
  const { jobs, applications } = useContext(JobContext);
  const { user } = useContext(AuthContext);

  // --- Access control ---
  if (!user || user.role !== "recruiter") {
    return (
      <div className="p-8 text-center text-red-600 font-semibold">
        🚫 Access Denied – Recruiter privileges required.
      </div>
    );
  }

  // --- Recruiter’s own jobs and applications ---
const myJobs = jobs.filter((job) => String(job.recruiterId) === String(user?.id));
const myApplications = applications.filter((app) => String(app.recruiterId) === String(user?.id));

// debug (remove or comment out later)
console.log("All applications:", applications);
console.log("Recruiter ID:", user?.id);
console.log("Recruiter user:", user);
console.log("My applications (filtered):", myApplications);

  return (
    <div className="p-8 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-4">
        👨‍💼 {user.name || "Recruiter"}’s Dashboard
      </h1>

      {/* --- Posted Jobs Section --- */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">📋 My Posted Jobs</h2>
        {myJobs.length === 0 ? (
          <p className="text-gray-600 dark:text-white/70">
            No jobs posted yet.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border dark:border-gray-700">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Location</th>
                  <th className="p-3 text-left">Posted On</th>
                </tr>
              </thead>
              <tbody>
                {myJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="border-b border-gray-300 dark:border-gray-700"
                  >
                    <td className="p-3">{job.title}</td>
                    <td className="p-3">{job.location}</td>
                    <td className="p-3">
                      {job.createdAt
                        ? new Date(job.createdAt).toLocaleDateString()
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* --- Applications Received Section --- */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">🧑‍💻 Applications Received</h2>
        {myApplications.length === 0 ? (
          <p className="text-gray-600 dark:text-white/70">
            No applications received yet.
          </p>
        ) : (
          myApplications.map((a) => (
            <div
              key={a.id}
              className="border-b border-gray-200 dark:border-gray-700 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <p className="font-semibold text-lg">{a.jobTitle}</p>
              <p>
                Applicant:{" "}
                <span className="font-medium">
                  {a.applicantName} ({a.applicantEmail})
                </span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Applied on: {new Date(a.appliedAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default RecruiterDashboard;
