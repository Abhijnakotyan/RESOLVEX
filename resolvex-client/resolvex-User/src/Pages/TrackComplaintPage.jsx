import React, { useState } from 'react';
import axios from 'axios';

function TrackComplaint() {
  const [token, setToken] = useState('');
  const [result, setResult] = useState(null);

  const handleTrack = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/complaints/track/${token}`);
      setResult(res.data);
    } catch (err) {
      setResult({ error: "Not found or invalid token." });
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
      {result && (
        <div className="mt-4">
          {result.error ? (
            <p className="text-red-500">{result.error}</p>
          ) : (
            <div>
              <p><strong>Subject:</strong> {result.subject}</p>
              <p><strong>Status:</strong> {result.status}</p>
              <p><strong>Department:</strong> {result.department}</p>
              <p><strong>Submitted On:</strong> {new Date(result.submitted_on).toLocaleString()}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TrackComplaint;
