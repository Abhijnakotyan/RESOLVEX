import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserStats } from '../../api/userApi';
import Sidebar from '../../Component/Sidebar';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const UserDashboard = () => {
  let user = null;
  try {
    const stored = localStorage.getItem("user");
    if (stored && stored !== "undefined") {
      user = JSON.parse(stored);
    }
  } catch (err) {
    console.error("Error parsing user data:", err);
  }

  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, open: 0, resolved: 0, rejected: 0 });
  const [activities, setActivities] = useState([]);
  const [recentComplaints, setRecentComplaints] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const displayName = user?.name || user?.username || 'User';
  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const COLORS = ['#10b981', '#f97316', '#ef4444'];
  const pieData = [
    { name: 'Resolved', value: stats.resolved },
    { name: 'Pending/In Progress', value: stats.open },
    { name: 'Rejected', value: stats.rejected },
  ];
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

 

  useEffect(() => {
    const loadData = async () => {
      try {
        const statsData = await fetchUserStats();
        setStats(statsData);

        const token = localStorage.getItem("token");
        if (token) {
          const response = await fetch("http://localhost:8000/api/complaints/my", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const complaints = await response.json();
          const sorted = complaints.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          setRecentComplaints(sorted.slice(0, 4));
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };
    loadData();
  }, []);

  return (
    <div className="relative bg-[#57c999] min-h-screen w-full">
  {/* Sidebar */}
  <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

  {/* Main Content */}
 <div
  className={`transition-all duration-300 min-h-screen
    ${
      windowWidth >= 1024
        ? sidebarOpen
          ? 'ml-64'
          : 'ml-16'
        : 'ml-0'
    }
  `}
>

    <div className="p-4 sm:p-6">
      <div className="bg-white rounded-r-3xl rounded-l-3xl p-4 sm:p-6 shadow-lg overflow-hidden w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
              Welcome {displayName}!!
            </h1>

            {/* Profile dropdown */}
            <div className="relative group">
              <img
                src="/avatar.jpg"
                alt="Avatar"
                className="h-10 w-10 rounded-full cursor-pointer border-2 border-gray-300"
              />
              <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-md text-sm text-gray-700 py-2 hidden group-hover:block group-focus-within:block z-50">
                <button
                  onClick={() => {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    navigate('/');
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Top cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-500 text-sm mb-2">Total Complaints</p>
              <h2 className="text-3xl font-bold text-gray-800">{stats.total}</h2>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-500 text-sm mb-2">Open Complaints</p>
              <h2 className="text-3xl font-bold text-gray-800">{stats.open}</h2>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-500 text-sm mb-2">Resolved Complaints</p>
              <h2 className="text-3xl font-bold text-gray-800">{stats.resolved}</h2>
            </div>
          </div>

          {/* Bottom grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Recent complaints */}
            <div className="bg-white rounded-lg shadow p-6 lg:col-span-4">
              <h3 className="text-md font-semibold text-gray-700 mb-4">Recent Complaints</h3>
              {recentComplaints.length === 0 ? (
                <p className="text-sm text-gray-500">No complaints found</p>
              ) : (
                recentComplaints.map((complaint, i) => (
                  <div key={i} className="mb-4">
                    <p className="text-sm text-gray-600 font-medium truncate">{complaint.subject}</p>
                    <p className="text-xs text-gray-400">{new Date(complaint.created_at).toLocaleString()}</p>
                    <span
                      className={`inline-block text-xs mt-1 px-2 py-0.5 rounded ${
                        complaint.status === 'Resolved'
                          ? 'bg-green-100 text-green-800'
                          : complaint.status === 'Rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {complaint.status}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Pie chart */}
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center lg:col-span-5">
              <h3 className="text-md font-semibold text-gray-700 mb-4">Complaint Status</h3>
              <div className="flex flex-col sm:flex-row items-center justify-center w-full gap-4">
                <div className="w-full sm:w-[60%] h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={70}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ percent }) =>
                          percent > 0 ? `${(percent * 100).toFixed(0)}%` : ""
                        }
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-sm space-y-1">
                  {pieData.map((entry, index) => (
                    <div key={index} className="flex items-center">
                      <span
                        className="w-3 h-3 inline-block mr-2 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></span>
                      {entry.name}
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => navigate("/viewcomplaints")}
                className="mt-4 text-green-600 font-medium text-sm hover:underline"
              >
                View All
              </button>
            </div>

            {/* Activity */}
            <div className="bg-white rounded-lg shadow p-6 lg:col-span-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-semibold text-gray-700">Activity</h3>
                <button className="text-green-600 font-medium text-sm hover:underline">
                  View All
                </button>
              </div>
              <ul className="space-y-3">
                {activities.map((activity, index) => (
                  <li key={index} className="text-sm text-gray-600 border-l-4 border-green-400 pl-3">
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserDashboard;
