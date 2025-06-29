import React from 'react';
import { Home, AlertTriangle, Star, BarChart2 } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'complaints', label: 'Complaints', icon: AlertTriangle },
  { id: 'feedback', label: 'Feedback', icon: Star },
  { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
  { id: 'rankings', label: 'Rankings', icon: BarChart2 },
];

const SidebarLayout = ({ activeTab, setActiveTab, children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-[#57cc99] text-white p-4 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Resolvex</h2>
        <nav className="flex flex-col space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center px-4 py-2 rounded-lg transition ${
                  isActive ? 'bg-white text-[#57cc99]' : 'hover:bg-[#45b87e]'
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                <span className="text-base font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = '/';
            }}
            className="bg-[#57cc99] text-white px-4 py-2 rounded-lg hover:bg-[#45b87e]"
          >
            Logout
          </button>
        </header>

        {/* Page content */}
        <main className="p-6 bg-gray-100 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default SidebarLayout;
