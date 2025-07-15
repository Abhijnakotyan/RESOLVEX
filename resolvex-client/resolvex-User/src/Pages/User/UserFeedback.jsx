import React, { useState, useEffect } from "react";
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <div className="relative bg-[#57c999] min-h-screen w-full">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div
        className={`transition-all duration-300 min-h-screen flex items-center justify-center p-4 sm:p-6
          ${
            windowWidth >= 1024
              ? sidebarOpen
                ? 'ml-64'
                : 'ml-16'
              : 'ml-0'
          }
        `}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl rounded-r-3xl rounded-l-3xl shadow-lg w-full max-w-5xl p-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">📝 Submit Feedback</h2>

          {/* Feedback Type */}
          {!complaintId && !departmentName && (
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Feedback Type</label>
              <select
                value={feedbackType}
                onChange={(e) => setFeedbackType(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="department">Department Feedback</option>
                <option value="complaint">Complaint Feedback</option>
              </select>
            </div>
          )}

          {/* Department Dropdown */}
          {feedbackType === "department" && !departmentName && (
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Department</label>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
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
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
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
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              className="w-full border border-gray-300 p-2 rounded"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} - {["Excellent", "Good", "Okay", "Poor", "Terrible"][5 - r]}
                </option>
              ))}
            </select>
          </div>

          {/* Comment */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">Comment (optional)</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded resize-none h-32"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#57c999] hover:bg-green-600 text-white font-semibold py-2 rounded transition"
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
