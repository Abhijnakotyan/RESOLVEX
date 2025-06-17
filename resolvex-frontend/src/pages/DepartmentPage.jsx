import React from 'react';
import ComplaintForm from '../components/ComplaintForm';
import FeedbackCard from '../components/FeedbackCard';

const DepartmentPage = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Department Dashboard</h2>
      <ComplaintForm />
      <h3 className="mt-6 text-xl">Feedback Summary</h3>
      <FeedbackCard comment="Great response this month!" rating={5} />
    </div>
  );
};

export default DepartmentPage;