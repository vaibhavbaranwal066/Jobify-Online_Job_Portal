import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiSearch, FiPlusCircle, FiBookmark, FiUser } from 'react-icons/fi';

const Sidebar = () => {
  return (
    <aside className="hidden lg:flex flex-col w-64 p-4 gap-4">
      <div className="job-card p-4">
        <div className="text-white font-semibold">Quick Actions</div>
        <div className="mt-3 flex flex-col gap-2">
          <Link to="/post" className="px-3 py-2 rounded hover:bg-white/3">Post a Job</Link>
          <Link to="/jobs" className="px-3 py-2 rounded hover:bg-white/3">Find Jobs</Link>
          <Link to="/saved" className="px-3 py-2 rounded hover:bg-white/3">Saved Jobs</Link>
        </div>
      </div>

      <div className="job-card p-4">
        <div className="text-white font-semibold">Filters</div>
        <div className="mt-3 text-sm text-white/80">
          <div className="mb-2">Type</div>
          <div className="flex gap-2 flex-wrap">
            <button className="px-3 py-1 rounded bg-white/3">Full-time</button>
            <button className="px-3 py-1 rounded bg-white/3">Part-time</button>
            <button className="px-3 py-1 rounded bg-white/3">Remote</button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
