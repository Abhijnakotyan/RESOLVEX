import React from 'react';

const AnonymousStatusPage = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Anonymous Complaint Status</h2>
      <p>Enter your anonymous complaint ID below:</p>
      <input className="border p-2 mt-2" placeholder="Complaint ID" />
      <button className="bg-blue-600 text-white px-4 py-2 mt-2 rounded">Check Status</button>
    </div>
  );
};

export default AnonymousStatusPage;
