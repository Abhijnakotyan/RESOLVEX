import React from 'react';

const ComplaintDetails = ({ complaints = [], loading, error }) => {
  if (loading) return <p className="p-4 text-gray-600">Loading complaints...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!complaints || complaints.length === 0) {
    return <p className="p-4 text-gray-500">No complaints found.</p>;
  }

  // Group complaints by status
  const grouped = {
    Pending: [],
    "In Progress": [],
    Resolved: [],
    Rejected: [],
  };

  complaints.forEach((complaint) => {
    grouped[complaint.status]?.push(complaint);
  });

  const renderTable = (complaintsList, status, colorClass = "text-gray-800") => (
    <div key={status} className="mb-10">
      <h2 className={`text-2xl font-bold mb-4 ${colorClass}`}>{status} Complaints</h2>
      <table className="min-w-full border rounded shadow text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Subject</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Urgency</th>
            <th className="border px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {complaintsList.map((complaint) => (
            <tr key={complaint._id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">
                {complaint.anonymous ? "Anonymous" : complaint.name || "Unknown"}
              </td>
              <td className="border px-4 py-2">
                {complaint.anonymous ? "Hidden" : complaint.role || "N/A"}
              </td>
              <td className="border px-4 py-2">{complaint.subject}</td>
              <td className="border px-4 py-2">{complaint.description}</td>
              <td className="border px-4 py-2">{complaint.urgency || "Normal"}</td>
              <td className="border px-4 py-2">
                {complaint.created_at
                  ? new Date(complaint.created_at).toLocaleDateString()
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-4">
      {grouped["Pending"].length > 0 &&
        renderTable(grouped["Pending"], "Pending", "text-yellow-600")}
      {grouped["In Progress"].length > 0 &&
        renderTable(grouped["In Progress"], "In Progress", "text-blue-600")}
      {grouped["Resolved"].length > 0 &&
        renderTable(grouped["Resolved"], "Resolved", "text-green-600")}
      {grouped["Rejected"].length > 0 &&
        renderTable(grouped["Rejected"], "Rejected", "text-red-600")}
    </div>
  );
};

export default ComplaintDetails;
