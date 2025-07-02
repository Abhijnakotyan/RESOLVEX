import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageComplaints = ({ departmentId }) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUnresolvedComplaints = async () => {
  try {
    console.log("🔍 Fetching unresolved complaints for department:", departmentId);
    const response = await axios.get(`http://localhost:8000/api/complaints/unresolved`, {
      params: { department_id: departmentId }
    });
    console.log("🗂️ Fetched complaints:", response.data);

    if (Array.isArray(response.data)) {
      setComplaints(response.data);
    } else {
      setComplaints([]);
    }
  } catch (error) {
    console.error('❌ Error fetching complaints:', error);
    setComplaints([]);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    if (departmentId) {
      fetchUnresolvedComplaints();
    }
  }, [departmentId]);

  if (loading) return <p className="p-4 text-gray-600">Loading complaints...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Complaints</h2>

      {complaints.length === 0 ? (
        <p className="text-gray-600">No unresolved complaints!</p>
      ) : (
        <table className="min-w-full border rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Subject</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(complaints) && complaints.map((complaint) => (
              <tr key={complaint._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{complaint._id?.slice(-6)}</td>
                <td className="border px-4 py-2">{complaint.subject}</td>
                <td className="border px-4 py-2 text-red-600 font-semibold">{complaint.status}</td>
                <td className="border px-4 py-2">
                  {complaint.created_at
                    ? new Date(complaint.created_at).toLocaleDateString()
                    : 'N/A'}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => markAsResolved(complaint._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Mark as Resolved
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageComplaints;
