import React, { useState } from 'react';

function TrackComplaintPage() {
  const [token, setToken] = useState('');
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState('');

  const handleTrack = async () => {
    if (!token.trim()) {
      setError("Please enter a valid token.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/complaints/token/${token}`);
      if (!response.ok) throw new Error("Not Found");

      const data = await response.json();
      setComplaint(data);
      setError('');
    } catch (err) {
      setComplaint(null);
      setError("❌ No complaint found for this token.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow-lg rounded">
      <h2 className="text-2xl font-bold text-center mb-6">Track Your Complaint</h2>

      <input
        type="text"
        placeholder="Enter tracking token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded mb-4"
      />

      <button
        onClick={handleTrack}
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700"
      >
        Track Complaint
      </button>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {complaint && (
        <div className="mt-6 border-t pt-4">
          <p><strong>Department:</strong> {complaint.department}</p>
          <p><strong>Sub Department:</strong> {complaint.sub_department || 'N/A'}</p>
          <p><strong>Subject:</strong> {complaint.subject}</p>
          <p><strong>Description:</strong> {complaint.description}</p>
          <p><strong>Status:</strong> {complaint.status || 'Pending'}</p>
          <p><strong>Urgency:</strong> {complaint.urgency}</p>
          <p><strong>Submitted On:</strong> {new Date(complaint.timestamp).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default TrackComplaintPage;
