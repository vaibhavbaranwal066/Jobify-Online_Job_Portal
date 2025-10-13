// src/pages/Profile.js
import React from "react";

export default function Profile() {
  const saved = JSON.parse(localStorage.getItem("savedJobs")) || [];
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Guest User", email: "guest@example.com" };

  return React.createElement(
    "div",
    { className: "max-w-5xl mx-auto py-10" },
    React.createElement(
      "h2",
      { className: "text-3xl font-bold mb-6 text-center text-purple-600 dark:text-purple-400" },
      "Profile 👤"
    ),
    React.createElement(
      "div",
      { className: "mb-8 text-center" },
      React.createElement(
        "p",
        { className: "text-gray-800 dark:text-gray-200 font-medium" },
        `Name: ${user.name}`
      ),
      React.createElement(
        "p",
        { className: "text-gray-500 dark:text-gray-400" },
        `Email: ${user.email}`
      )
    ),
    React.createElement(
      "h3",
      { className: "text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400" },
      "Saved Jobs 💾"
    ),
    saved.length === 0
      ? React.createElement(
          "p",
          { className: "text-center text-gray-500" },
          "No saved jobs yet."
        )
      : React.createElement(
          "div",
          { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6" },
          saved.map((job, i) =>
            React.createElement(
              "div",
              {
                key: i,
                className: "p-4 rounded-xl bg-white dark:bg-gray-800 shadow-md",
              },
              React.createElement(
                "h3",
                {
                  className:
                    "font-semibold text-gray-900 dark:text-white",
                },
                job.title
              ),
              React.createElement(
                "p",
                {
                  className:
                    "text-sm text-gray-500 dark:text-gray-400",
                },
                job.company
              )
            )
          )
        )
  );
}
