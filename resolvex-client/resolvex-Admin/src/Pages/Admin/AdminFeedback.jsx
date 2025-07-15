import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get("http://localhost:8000/admin/feedbacks");
        setFeedbacks(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch feedbacks");
      }
    };

    fetchFeedbacks();
  }, []);

  const handleViewComplaint = async (complaintId) => {
    try {
      const res = await axios.get(`http://localhost:8000/admin/complaints/${complaintId}`);
      setSelectedComplaint(res.data);
      setShowModal(true);
    } catch (err) {
      console.error("Failed to fetch complaint:", err);
      setSelectedComplaint({ error: "Unable to load complaint details." });
      setShowModal(true);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">User Feedback</h2>
      {error && <p className="text-red-500">{error}</p>}
      {feedbacks.length === 0 ? (
        <p className="text-gray-500">No feedback found.</p>
      ) : (
        <div className="space-y-4">
          {feedbacks.map((fb) => (
            <div key={fb.id} className="bg-white p-4 rounded shadow space-y-1">
              <p>
                <strong>Department:</strong>{" "}
                {fb.department_name || (
                  <span className="text-blue-600 underline cursor-pointer" onClick={() => handleViewComplaint(fb.complaint_id)}>
                    {fb.complaint_subject || "View Complaint"}
                  </span>
                )}
              </p>
              <p><strong>Type:</strong> {fb.feedback_type}</p>
              <p><strong>Rating:</strong> {fb.rating} / 5</p>
              <p><strong>Comment:</strong> {fb.comment || "No comment"}</p>
              <p className="text-sm text-gray-400">
                {new Date(fb.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Complaint Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Complaint Details</h3>
            {selectedComplaint?.error ? (
              <p className="text-red-500">{selectedComplaint.error}</p>
            ) : (
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Subject:</strong> {selectedComplaint.subject}</p>
                <p><strong>Description:</strong> {selectedComplaint.description}</p>
                <p><strong>Status:</strong> {selectedComplaint.status}</p>
                <p><strong>Department:</strong> {selectedComplaint.department_name}</p>
                {/* Add more fields if needed */}
              </div>
            )}
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-[#57cc99] text-white rounded hover:bg-[#45b87e]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFeedback;
