import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

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
  const userName = user?.name || 'User'; 
  const cardData = [
    {
      title: 'Post Complaint',
      description: 'Raise a new complaint to the concerned department.',
      route: '/complaintform',
    },
    {
      title: 'View Complaints',
      description: 'Track status of your past complaints.',
      route: '/viewcomplaints',
    },
    {
      title: 'My Profile',
      description: 'View and update your user profile details.',
      route: '/profile',
    },
  ];

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4  py-10">
        <h2 className="text-3xl font-bold mt-10 mb-10 text-center">
           Welcome {user?.username || 'User'}!!
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardData.map((card, index) => (
            <div
              key={index}
              onClick={() => navigate(card.route)}
              className="cursor-pointer bg-white border border-gray-200 shadow-lg rounded-2xl p-6 hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {card.title}
              </h3>
              <p className="text-gray-600 text-sm">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
