import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../Component/Sidebar";

const departments = [
  "CSE", "MCA", "MBA", "ECE", "ISBS", "EEE", "MECH",
  "Hostel", "CCC", "Administration"
];

const categories = [
  "Academic", "Infrastructure", "Administrative", "Technical", "Other"
];

const UserFeedback = ({ complaintId = null, departmentName = null, onFeedbackSubmitted }) => {
  const [feedbackType, setFeedbackType] = useState(complaintId ? "complaint" : "department");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [category, setCategory] = useState("");
  const [selectedDept, setSelectedDept] = useState(departmentName || "");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const payload = {
        rating,
        comment,
        feedback_type: feedbackType,
      };

      if (feedbackType === "complaint") {
        payload.complaint_id = complaintId;
      } else {
        payload.department_name = selectedDept;
        payload.category = category;
      }

      await axios.post("http://localhost:8000/feedback/", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("✅ Feedback submitted successfully!");
      onFeedbackSubmitted?.();
      setRating(5);
      setComment("");
      setCategory("");
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setMessage("❌ Failed to submit feedback.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-[#57c999] min-h-screen w-full flex flex-col items-center justify-center">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 max-w-2xl w-full">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 text-center">
          📝 Submit Feedback
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Feedback Type */}
          {!complaintId && !departmentName && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Feedback Type</label>
              <select
                value={feedbackType}
                onChange={(e) => setFeedbackType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="department">Department Feedback</option>
                <option value="complaint">Complaint Feedback</option>
              </select>
            </div>
          )}

          {/* Department Dropdown */}
          {feedbackType === "department" && !departmentName && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Department</label>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="">-- Choose Department --</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          )}

          {/* Category Dropdown */}
          {feedbackType === "department" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="">-- Choose Category --</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          )}

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} - {["Excellent", "Good", "Okay", "Poor", "Terrible"][5 - r]}
                </option>
              ))}
            </select>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Comment (optional)</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded resize-none"
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#57c999] hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
          >
            {submitting ? "Submitting..." : "Submit Feedback"}
          </button>

          {/* Message */}
          {message && (
            <p className="text-sm text-center mt-2">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserFeedback;
