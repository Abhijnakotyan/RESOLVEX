import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SidebarLayout from '../../components/Sidebar';
import Feedback from './DepartmentFeedback';
import Rankings from './DepartmentRankings';
import Home from './DepartmentHome';

const DepartmentDashboard = () => {
  const { departmentName } = useParams();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "department") {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'home') {
      const fetchComplaints = async () => {
        try {
          const res = await axios.get(`http://localhost:8000/complaints/${departmentName}`);
          setComplaints(res.data);
        } catch (err) {
          console.error('Failed to fetch complaints:', err);
          setError('Unable to load complaints. Please try again.');
        } finally {
          setLoading(false);
        }
      };

      fetchComplaints();
    }
  }, [departmentName, activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home complaints={complaints} loading={loading} error={error} />;
      case 'feedback':
        return <Feedback department={departmentName} />;
      case 'rankings':
        return <Rankings department={departmentName} />;
      default:
        return <div className="p-6 text-gray-600">Coming soon...</div>;
    }
  };

  return (
    <SidebarLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </SidebarLayout>
  );
};

export default DepartmentDashboard;
