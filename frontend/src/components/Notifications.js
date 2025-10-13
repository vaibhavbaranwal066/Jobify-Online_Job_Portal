// src/components/Notifications.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const messages = [
  "🚀 New openings at Google!",
  "💼 Amazon hiring SDE interns!",
  "🎯 Your profile viewed by HR at Infosys!",
  "🔥 Trending job: React Developer (Remote)",
  "💰 3 new jobs match your skills today!",
];

const Notifications = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const random = messages[Math.floor(Math.random() * messages.length)];
      setAlerts((prev) => [random, ...prev.slice(0, 4)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="absolute right-6 top-20 bg-white dark:bg-gray-800 shadow-xl rounded-lg w-72 p-3 z-50"
    >
      <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
        Notifications
      </h3>
      <div className="flex flex-col gap-2 text-sm text-gray-700 dark:text-gray-300 max-h-60 overflow-y-auto">
        {alerts.length > 0 ? (
          alerts.map((msg, i) => (
            <div key={i} className="p-2 rounded-md bg-gray-100 dark:bg-gray-700">
              {msg}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No notifications yet.</p>
        )}
      </div>
    </motion.div>
  );
};

export default Notifications;
