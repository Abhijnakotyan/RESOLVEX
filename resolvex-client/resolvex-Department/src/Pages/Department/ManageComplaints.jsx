import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageComplaints = ({ departmentId }) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/complaints/unresolved`, {
        params: { department_id: departmentId }
      });
      setComplaints(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('❌ Error fetching complaints:', error);
      setComplaints([]);
    } finally {
      setLoading(false);
    }
  };

  const markAsResolved = async (complaintId) => {
    try {
      await axios.patch(`http://localhost:8000/api/complaints/${complaintId}/resolve`);
      await fetchComplaints();
    } catch (error) {
      console.error("❌ Error resolving complaint:", error);
    }
  };

  const markAsInProgress = async (complaintId) => {
    try {
      await axios.patch(`http://localhost:8000/api/complaints/${complaintId}/progress`);
      await fetchComplaints();
    } catch (error) {
      console.error("❌ Error marking as in progress:", error);
    }
  };

  const markAsRejected = async (complaintId) => {
    try {
      await axios.patch(`http://localhost:8000/api/complaints/${complaintId}/reject`);
      await fetchComplaints();
    } catch (error) {
      console.error("❌ Error rejecting complaint:", error);
    }
  };

  useEffect(() => {
    if (departmentId) {
      fetchComplaints();
    }
  }, [departmentId]);

  if (loading) return <p className="p-4 text-gray-600">Loading complaints...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Pending & In Progress Complaints</h2>
      {complaints.length === 0 ? (
        <p className="text-gray-600">No complaints found!</p>
      ) : (
        <ComplaintTable
          complaints={complaints}
          onResolve={markAsResolved}
          onProgress={markAsInProgress}
          onReject={markAsRejected}
        />
      )}
    </div>
  );
};

const ComplaintTable = ({ complaints, onResolve, onProgress, onReject }) => (
  <table className="min-w-full border rounded shadow text-sm">
    <thead className="bg-gray-100">
      <tr>
        <th className="border px-4 py-2">Name</th>
        <th className="border px-4 py-2">Subject</th>
        <th className="border px-4 py-2">Status</th>
        <th className="border px-4 py-2">Date</th>
        <th className="border px-4 py-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {complaints.map((complaint) => (
        <tr key={complaint._id} className="hover:bg-gray-50">
          <td className="border px-4 py-2">
            {complaint.anonymous ? "Anonymous" : complaint.name || "Unknown"}
          </td>
          <td className="border px-4 py-2">{complaint.subject}</td>
          <td className="border px-4 py-2 font-semibold text-blue-700">{complaint.status}</td>
          <td className="border px-4 py-2">
            {complaint.created_at
              ? new Date(complaint.created_at).toLocaleDateString()
              : 'N/A'}
          </td>
          <td className="border px-4 py-2 space-x-2">
            <button
              onClick={() => onResolve(complaint._id)}
              className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
            >
              Resolve
            </button>
            <button
              onClick={() => onProgress(complaint._id)}
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            >
              In Progress
            </button>
            <button
              onClick={() => onReject(complaint._id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Reject
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ManageComplaints;
