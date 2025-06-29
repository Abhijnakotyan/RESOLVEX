import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please log in to view your complaints.");
          return;
        }

        const res = await axios.get("http://localhost:8000/api/complaints/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setComplaints(res.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
        setError("Failed to load complaints. Please try again.");
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">📋 Your Complaints</h2>

      {error && <p className="text-red-500">{error}</p>}

      {complaints.length === 0 && !error && (
        <p className="text-gray-500">You have not submitted any complaints yet.</p>
      )}

      <div className="space-y-4">
        {complaints.map((comp, index) => (
          <div key={index} className="border rounded p-4 bg-white shadow">
            <p><strong>Subject:</strong> {comp.subject}</p>
            <p><strong>Status:</strong> {comp.status}</p>
            <p><strong>Department:</strong> {comp.department}</p>
            <p><strong>Submitted:</strong> {new Date(comp.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewComplaints;
