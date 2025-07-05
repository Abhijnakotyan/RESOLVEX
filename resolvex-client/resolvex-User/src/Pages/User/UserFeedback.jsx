import React, { useState } from "react";
import axios from "axios";

const UserFeedback = ({ complaintId, onFeedbackSubmitted }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8000/feedback/",
        {
          complaint_id: complaintId,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("✅ Feedback submitted successfully!");
      onFeedbackSubmitted?.(); // trigger refresh or close

      // Optional: reset form
      setRating(5);
      setComment("");
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setMessage("❌ Failed to submit feedback.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-white shadow">
      <h3 className="text-lg font-bold mb-2">Submit Feedback</h3>

      <label className="block mb-2">
        Rating:
        <select
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          className="block mt-1 p-2 border rounded w-full"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} - {["Excellent", "Good", "Okay", "Poor", "Terrible"][5 - r]}
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-4">
        Comment (optional):
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="block mt-1 p-2 border rounded w-full"
          rows={3}
        />
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {submitting ? "Submitting..." : "Submit Feedback"}
      </button>

      {message && <p className="mt-2 text-sm">{message}</p>}
    </form>
  );
};

export default UserFeedback;
