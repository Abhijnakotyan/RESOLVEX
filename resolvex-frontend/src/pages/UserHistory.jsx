import React from 'react';

const UserHistory = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Your Complaint History</h2>
      <ul>
        <li className="mb-2">Complaint 1 - Status: Solved</li>
        <li className="mb-2">Complaint 2 - Status: Pending</li>
      </ul>
    </div>
  );
};

export default UserHistory;