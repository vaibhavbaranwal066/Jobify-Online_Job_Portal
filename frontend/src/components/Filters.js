// src/components/Filters.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Filters({ selected: selectedProp, onSelect }) {
  const [selected, setSelected] = useState(selectedProp || "All");
  const filters = ["All", "Full-time", "Part-time", "Remote"];

  useEffect(() => {
    if (selectedProp) setSelected(selectedProp);
  }, [selectedProp]);

  const handleClick = (f) => {
    setSelected(f);
    onSelect && onSelect(f);
  };

  return (
    <motion.div className="flex flex-wrap gap-3 justify-center sm:justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
      {filters.map((f) => (
        <button key={f} onClick={() => handleClick(f)} className={`px-4 py-2 rounded-full border text-sm font-medium ${selected === f ? "bg-blue-600 text-white border-blue-600" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
          {f}
        </button>
      ))}
    </motion.div>
  );
}
