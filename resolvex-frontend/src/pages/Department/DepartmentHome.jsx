// src/pages/Department/DepartmentHome.jsx
import React from 'react';
import ComplaintDetails from './ComplaintDetails';

const DepartmentHome = ({ complaints = [], loading, error }) => {
  const latestTwoComplaints = complaints.slice(0, 2); // assume sorted by latest

  console.log("📦 DepartmentHome received complaints:", complaints);
  console.log("📦 Passing latestTwoComplaints to ComplaintDetails:", latestTwoComplaints);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        🏠 Welcome to the {localStorage.getItem("department_name")} Home Dashboard!
      </h1>

      <ComplaintDetails
        complaints={latestTwoComplaints}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default DepartmentHome;
