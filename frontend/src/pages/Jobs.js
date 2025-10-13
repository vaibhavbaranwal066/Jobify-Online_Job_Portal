// src/pages/Jobs.js
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useJobs } from "../context/JobContext";
import Filters from "../components/Filters";
import JobCard from "../components/JobCard";

export default function Jobs() {
  const { filterJobs } = useJobs();
  const [searchParams] = useSearchParams();
  const qFromUrl = searchParams.get("q") || "";

  const [query, setQuery] = useState(qFromUrl);
  const [type, setType] = useState("All");
  const [results, setResults] = useState([]);

  // Update job list when query/type changes
  useEffect(() => {
    const filteredResults = filterJobs(query, type);
    setResults(filteredResults);
  }, [query, type, filterJobs]);

  // Sync input with URL query parameter
  useEffect(() => {
    setQuery(qFromUrl);
  }, [qFromUrl]);

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          value={query}
          placeholder="Search by title or company..."
          onChange={(e) => setQuery(e.target.value)}
          className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-lg shadow 
          focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6 
          dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      {/* Filters */}
      <div className="mb-6">
        <Filters selected={type} onSelect={setType} />
      </div>

      {/* Job cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {results.length ? (
          results.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <div className="text-gray-500 dark:text-gray-400">No jobs found</div>
        )}
      </div>
    </div>
  );
}
