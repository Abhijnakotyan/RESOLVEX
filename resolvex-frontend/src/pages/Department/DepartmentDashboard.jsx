import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../../components/Navbar";

const DepartmentDashboard = () => {
  const { departmentName } = useParams(); // matches route param
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/complaints/${departmentName}`);
        setComplaints(res.data);
      } catch (err) {
        console.error("Failed to fetch complaints:", err);
        setError("Unable to load complaints. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [departmentName]);

  return (
     <>
    <Navbar/>
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#57cc99]">
        {departmentName?.toUpperCase()} Department Dashboard
      </h1>

      <div className="bg-white shadow-md rounded-xl p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Complaints</h2>

        {loading ? (
          <p className="text-gray-600">Loading complaints...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : complaints.length === 0 ? (
          <p className="text-gray-500">No complaints found for this department.</p>
        ) : (
          <div className="space-y-4">
            {complaints.map((c) => (
              <div key={c._id} className="p-4 border border-gray-200 rounded-md">
                <p><strong>Subject:</strong> {c.subject}</p>
                <p><strong>Status:</strong> {c.status}</p>
                <p><strong>Description:</strong> {c.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default DepartmentDashboard;
