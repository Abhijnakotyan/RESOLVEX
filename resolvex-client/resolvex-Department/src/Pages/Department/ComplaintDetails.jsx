import React, { useState } from 'react';

const ComplaintDetails = ({ complaints = [], loading, error }) => {
  const [expandedId, setExpandedId] = useState(null);

  if (loading) return <div>Loading complaints...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  if (!complaints || complaints.length === 0) {
    return <div className="text-gray-500">No complaints found.</div>;
  }

  // Sort by date (newest first)
  const sortedComplaints = [...complaints].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const latestTwo = sortedComplaints.slice(0, 2);
  const remaining = sortedComplaints.slice(2);

  const toggleExpand = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const renderComplaint = (complaint) => (
    <li
      key={complaint.id || complaint._id}
      className="bg-white p-4 rounded shadow cursor-pointer"
      onClick={() => toggleExpand(complaint.id || complaint._id)}
    >
      <h3 className="font-bold text-lg">{complaint.subject}</h3>
      <p className="text-gray-600">{complaint.description}</p>
      <p className="text-sm mt-2">Status: <strong>{complaint.status}</strong></p>
      <p className="text-xs text-gray-500">
        Date: {complaint.created_at ? new Date(complaint.created_at).toLocaleString() : "Invalid date"}
      </p>

      {expandedId === (complaint.id || complaint._id) && (
        <div className="mt-4 border-t pt-2 text-sm text-gray-700 space-y-1">
          <p><strong>Name:</strong> {complaint.anonymous ? "Anonymous" : complaint.name}</p>
          <p><strong>Role:</strong> {complaint.anonymous ? "Hidden" : complaint.role}</p>
          <p><strong>Urgency:</strong> {complaint.urgency}</p>
        </div>
      )}
    </li>
  );

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Latest Complaints</h2>
      <ul className="space-y-4 mb-6">
        {latestTwo.map(renderComplaint)}
      </ul>

      {remaining.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-2">All Previous Complaints</h2>
          <ul className="space-y-4">
            {remaining.map(renderComplaint)}
          </ul>
        </>
      )}
    </div>
  );
};

export default ComplaintDetails;
