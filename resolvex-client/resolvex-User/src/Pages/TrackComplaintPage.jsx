import React, { useState } from 'react';
import axios from 'axios';

function TrackComplaint() {
  const [token, setToken] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleTrack = async () => {
    setError('');
    setResults([]);
    try {
      const res = await axios.get(`http://localhost:8000/api/complaints/track/${token}`);
      setResults(res.data); // data is an array
    } catch (err) {
      console.error(err);
      setError("❌ Not found or invalid token.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Track Complaint</h2>
      <input
        type="text"
        placeholder="Enter 4-digit token"
        className="w-full border p-2 rounded mb-4"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <button
        onClick={handleTrack}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Track
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {results.length > 0 && (
        <div className="mt-6 space-y-4">
          {results.map((complaint, index) => (
            <div key={index} className="border p-4 rounded bg-gray-50">
              <p><strong>Subject:</strong> {complaint.subject}</p>
              <p><strong>Status:</strong> {complaint.status}</p>
              <p><strong>Department:</strong> {complaint.department || complaint.department_id}</p>
              <p><strong>Submitted On:</strong> {new Date(complaint.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TrackComplaint;
