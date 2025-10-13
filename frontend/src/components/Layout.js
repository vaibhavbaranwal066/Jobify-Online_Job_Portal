import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#071129] to-[#07112a] text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-6">
        <Sidebar />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
