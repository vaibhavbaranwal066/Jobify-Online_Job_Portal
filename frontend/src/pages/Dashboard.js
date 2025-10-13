import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/v1/jobs/get-jobs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(res.data.jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      // If token is invalid or expired, redirect to login
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <button onClick={handleLogout} className="px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700">Logout</button>
      </div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Job Postings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job._id} className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900">{job.position}</h3>
              <p className="text-md text-gray-700">{job.company}</p>
              <p className="mt-2 text-sm text-gray-500">{job.workLocation}</p>
              <span className={`mt-4 inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                job.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                job.status === 'interview' ? 'bg-blue-200 text-blue-800' :
                'bg-red-200 text-red-800'
              }`}>{job.status}</span>
            </div>
          ))
        ) : (
          <p>You have not posted any jobs yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;