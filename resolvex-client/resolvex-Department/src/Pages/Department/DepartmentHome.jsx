import React from 'react';
import ComplaintDetails from './ComplaintDetails';
import ComplaintCountCard from '../../Component/ComplaintCountCard';


const DepartmentHome = ({ complaints = [], loading, error }) => {
  const departmentId = localStorage.getItem("department_id");

  // ✅ Sort and slice to get the latest 2 complaints
  const latestTwoComplaints = [...complaints]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 2);

  return (
    <div className="p-4">
      {/* Header */}
      <div className="overflow-hidden rounded-lg mt-0 mb-4 px-4 py-3">
        <h1
          className="text-xl md:text-2xl font-bold text-[rgb(19, 21, 23)] animate-marquee inline-block"
          style={{ fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif" }}
        >
          Welcome to the {localStorage.getItem("department_name")} Dashboard!
        </h1>
      </div>

      {/* Stat Cards */}
      <div className="flex flex-row gap-6 flex-nowrap overflow-x-auto mb-6">
        <ComplaintCountCard departmentId={departmentId} />
        
      </div>

      {/* Latest Two Complaints */}
      <ComplaintDetails
        complaints={latestTwoComplaints}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default DepartmentHome;
