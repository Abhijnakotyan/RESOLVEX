import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SidebarLayout from '../Components/Sidebar'; // ✅ adjust path if needed

const DepartmentComplaintList = () => {
  const { department } = useParams();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('complaints');
  const navigate = useNavigate();
  const goToTab = (tabId) => {
  localStorage.setItem('admin_active_tab', tabId);
  navigate('/admin/dashboard');
};


  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/admin/complaints/department/${department}`);
        setComplaints(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load complaints.');
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, [department]);

  return (
    <SidebarLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="mb-4">
        <button onClick={() => goToTab('complaints')}>
        ← Back to All Complaints
      </button>

      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{department} Department Complaints</h2>

      {loading ? (
        <p>Loading complaints...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : complaints.length === 0 ? (
        <p className="text-gray-500">No complaints found.</p>
      ) : (
        complaints.map((comp, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-400 mb-4">
            <h3 className="text-lg font-semibold text-gray-700">{comp.subject}</h3>
            <p><strong>Name:</strong> {comp.name || 'Anonymous'}</p>
            <p><strong>Description:</strong> {comp.description}</p>
            <p><strong>Urgency:</strong> {comp.urgency}</p>
            <p><strong>Status:</strong>{comp.status}</p>
            <p><strong>Date Submitted:</strong> {new Date(comp.created_at).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </SidebarLayout>
  );
};

export default DepartmentComplaintList;
