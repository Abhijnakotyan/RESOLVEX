import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarLayout from '../../Components/Sidebar';
import AdminHome from './AdminHome';
import AllComplaints from './AllComplaints';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('admin_active_tab') || 'home';
  });
  const navigate = useNavigate();

  
  useEffect(() => {
    localStorage.setItem('admin_active_tab', activeTab);
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return  <AdminHome />;
      case 'complaints':
        return <AllComplaints/>;
      case 'feedback':
        return <h2 className="text-xl">Feedback Summary</h2>;
      case 'alerts':
        return <h2 className="text-xl text-red-600">Department Alerts</h2>;
      case 'rankings':
        return <h2 className="text-xl">Monthly Department Rankings</h2>;
      default:
        return <h2 className="text-gray-500">Coming soon...</h2>;
    }
  };

  return (
    <SidebarLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </SidebarLayout>
  );
};

export default AdminDashboard;
