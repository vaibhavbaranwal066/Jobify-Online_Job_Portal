// src/pages/PostJob.js
import React, { useState } from "react";
import { useJobs } from "../context/JobContext";
import { useNavigate } from "react-router-dom";

export default function PostJob() {
  const { addJob } = useJobs();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    description: "",
    salary: "",
    experience: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.company) {
      alert("Please enter both Job Title and Company Name.");
      return;
    }

    addJob(form);
    setForm({
      title: "",
      company: "",
      location: "",
      type: "Full-time",
      description: "",
      salary: "",
      experience: "",
    });

    navigate("/jobs");
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Post a Job</h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <input
          className="w-full p-3 border rounded-lg"
          placeholder="Job Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          className="w-full p-3 border rounded-lg"
          placeholder="Company Name"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />

        <input
          className="w-full p-3 border rounded-lg"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <select
          className="w-full p-3 border rounded-lg"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Remote</option>
        </select>

        <textarea
          className="w-full p-3 border rounded-lg"
          placeholder="Job Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          className="w-full p-3 border rounded-lg"
          placeholder="Salary (optional)"
          value={form.salary}
          onChange={(e) => setForm({ ...form, salary: e.target.value })}
        />

        <input
          className="w-full p-3 border rounded-lg"
          placeholder="Experience (e.g., 2+ years)"
          value={form.experience}
          onChange={(e) => setForm({ ...form, experience: e.target.value })}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}
