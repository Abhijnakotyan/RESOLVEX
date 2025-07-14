import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../Component/Sidebar";

const ViewFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

 useEffect(() => {
  const fetchFeedbacks = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("⚠️ You must be logged in to view feedback.");
      return;
    }

    try {
      const res = await axios.get("http://localhost:8000/feedback/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFeedbacks(res.data);
      setError(""); // clear error if successful
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
      if (err.response?.status === 401) {
        setError("⚠️ Unauthorized. Please log in again.");
      } else {
        setError("❌ Could not load feedbacks.");
      }
    }
  };

  fetchFeedbacks();
}, []);


  return (
    <div className="relative bg-[#57c999] min-h-screen w-full">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`transition-all duration-300 min-h-screen ${
          windowWidth >= 1024
            ? sidebarOpen
              ? "ml-64"
              : "ml-16"
            : "ml-0"
        }`}
      >
        <div className="p-4 sm:p-6 min-h-screen flex flex-col">
          <div className="bg-white rounded-3xl p-6 shadow-lg w-full flex-1 overflow-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
              📝 Your Submitted Feedback
            </h2>

            {error && (
              <div className="bg-red-100 text-red-800 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {feedbacks.length === 0 ? (
              <p className="text-gray-600 text-lg">No feedback submitted yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
                  <thead className="bg-[#57c999] text-white">
                    <tr>
                      <th className="px-4 py-2 text-left">Type</th>
                      <th className="px-4 py-2 text-left">Rating</th>
                      <th className="px-4 py-2 text-left">Comment</th>
                      <th className="px-4 py-2 text-left">Category</th>
                      <th className="px-4 py-2 text-left">Submitted On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feedbacks.map((fb, index) => (
                      <tr
                        key={index}
                        className="border-t border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-4 py-2 font-medium text-gray-700 capitalize">
                          {fb.feedback_type} <br />
                          {fb.feedback_type === "complaint"
                            ? `Complaint ID: ${fb.complaint_id}`
                            : `Dept: ${fb.department_name}`}
                        </td>
                        <td className="px-4 py-2 text-gray-600">
                          ⭐ {fb.rating} / 5
                        </td>
                        <td className="px-4 py-2 text-gray-600">
                          {fb.comment || "—"}
                        </td>
                        <td className="px-4 py-2 text-gray-600">
                          {fb.category || "—"}
                        </td>
                        <td className="px-4 py-2 text-gray-600">
                          {new Date(fb.created_at).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewFeedback;
