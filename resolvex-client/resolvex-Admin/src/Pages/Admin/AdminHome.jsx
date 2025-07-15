import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SidebarLayout from '../../Components/Sidebar';

const AdminHome = () => {
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:8000/admin/complaints/count-by-department');
        setTotal(res.data.total);
      } catch (err) {
        setError('Failed to load total complaint count.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

 return (
  <div className="p-6">
    <h2 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h2>
    <div className="mt-6 bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
      <h3 className="text-lg text-gray-700">Total Complaints</h3>
      <p className="text-4xl font-bold text-blue-500">{total}</p>
    </div>
  </div>
);
};

export default AdminHome;
