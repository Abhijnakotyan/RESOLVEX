import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageComplaints = ({ departmentId }) => {
  const [complaints, setComplaints] = useState([]);
  const [resolvedComplaints, setResolvedComplaints] = useState([]);
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
    setLoading(false); // ✅ Important for hiding "Loading..." message
  }
};


  const fetchResolvedComplaints = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/complaints/resolved`, {
      params: { department_id: departmentId }
    });
    console.log("✅ Resolved complaints fetched:", response.data);
    if (Array.isArray(response.data)) {
      setResolvedComplaints(response.data);
    } else {
      setResolvedComplaints([]);
    }
  } catch (error) {
    console.error('❌ Error fetching resolved complaints:', error);
    setResolvedComplaints([]);
  }
};

 const markAsResolved = async (complaintId) => {
  try {
    await axios.patch(`http://localhost:8000/api/complaints/${complaintId}/resolve`);
    console.log(`✅ Complaint ${complaintId} marked as resolved`);

    // Fetch updated complaints from backend
    await fetchUnresolvedComplaints();
    await fetchResolvedComplaints();
  } catch (error) {
    console.error("❌ Error resolving complaint:", error);
  }
};


 useEffect(() => {
  if (departmentId) {
    fetchUnresolvedComplaints();
    fetchResolvedComplaints();
  }
}, [departmentId]);


  if (loading) return <p className="p-4 text-gray-600">Loading complaints...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Unresolved Complaints</h2>

      {complaints.length === 0 ? (
        <p className="text-gray-600">No unresolved complaints!</p>
      ) : (
        <ComplaintTable
          complaints={complaints}
          onResolve={markAsResolved}
          showActions={true}
        />
      )}

      {resolvedComplaints.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-green-600">Resolved Complaints</h2>
          <ComplaintTable
            complaints={resolvedComplaints}
            onResolve={() => {}}
            showActions={false}
          />
        </>
      )}
    </div>
  );
};

const ComplaintTable = ({ complaints, onResolve, showActions }) => (
  <table className="min-w-full border rounded shadow">
    <thead className="bg-gray-100">
      <tr>
        <th className="border px-4 py-2">ID</th>
        <th className="border px-4 py-2">Subject</th>
        <th className="border px-4 py-2">Status</th>
        <th className="border px-4 py-2">Date</th>
        {showActions && <th className="border px-4 py-2">Actions</th>}
      </tr>
    </thead>
    <tbody>
      {complaints.map((complaint) => (
        <tr key={complaint._id} className="hover:bg-gray-50">
          <td className="border px-4 py-2">{complaint._id?.slice(-6)}</td>
          <td className="border px-4 py-2">{complaint.subject}</td>
          <td className="border px-4 py-2 font-semibold text-blue-700">{complaint.status}</td>
          <td className="border px-4 py-2">
            {complaint.created_at
              ? new Date(complaint.created_at).toLocaleDateString()
              : 'N/A'}
          </td>
          {showActions && (
            <td className="border px-4 py-2">
              <button
                onClick={() => onResolve(complaint._id)}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Mark as Resolved
              </button>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  </table>
);

export default ManageComplaints;
