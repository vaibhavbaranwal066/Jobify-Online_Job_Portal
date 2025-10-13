import React from "react";
import Dashboard from "../components/Dashboard";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <Dashboard />
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-4 text-blue-600">Employer Dashboard</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your posted jobs, applicants, and analytics here.
        </p>
      </div>
    </div>
  );
}
