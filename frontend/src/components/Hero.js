// src/components/Hero.js
import React from "react";
import { motion } from "framer-motion";

const Hero = ({ setSearchTerm }) => {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white overflow-hidden">
      <motion.h1
        className="text-5xl sm:text-6xl font-extrabold drop-shadow-md"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Find Work You Love ❤️
      </motion.h1>

      <motion.p
        className="mt-4 text-lg text-white/80 max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        Discover exciting opportunities that match your skills and passion.
      </motion.p>

      <motion.input
        type="text"
        placeholder="Search jobs, companies, or keywords..."
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        className="mt-8 px-5 py-3 w-80 sm:w-96 rounded-full text-gray-800 shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-300"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: 'spring' }}
      />
    </section>
  );
};

export default Hero;
