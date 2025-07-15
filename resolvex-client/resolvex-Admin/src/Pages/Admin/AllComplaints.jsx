import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SidebarLayout from '../../Components/Sidebar'; 

const AllComplaints = () => {
  const [counts, setCounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('complaints');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaintCounts = async () => {
      try {
        const res = await axios.get('http://localhost:8000/admin/complaints/count-by-department');
        console.log("Complaint counts response:", res.data);

        const data = res.data;

        // Safe assignment based on response structure
        if (Array.isArray(data)) {
          setCounts(data);
        } else if (Array.isArray(data.by_department)) {
          setCounts(data.by_department);
        } else {
          setCounts([]);
        }
      } catch (err) {
        setError('Failed to load complaint counts.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaintCounts();
  }, []);

  if (loading) return <div>Loading complaint statistics...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">All Department Complaints</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {counts.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/admin/complaints/${item.department}`)}
            className="cursor-pointer bg-white shadow-md p-4 rounded-lg border-l-4 border-[#57cc99] hover:bg-gray-50 transition"
          >
            <h3 className="text-lg font-medium text-gray-700">{item.department}</h3>
            <p className="text-3xl font-bold text-[#57cc99]">{item.count}</p>
            <p className="text-sm text-gray-500">Total complaints</p>
          </div>
        ))}
      </div>
    </div>
   
  );
};

export default AllComplaints;
