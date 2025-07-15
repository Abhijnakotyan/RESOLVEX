import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../Component/Sidebar";
import {
  FaExclamationCircle,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";
import UserFeedback from "./UserFeedback";

function ViewComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeFeedback, setActiveFeedback] = useState(null); // 💡 To track which complaint to show feedback form for

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("⚠️ Please log in to view your complaints.");
          return;
        }

        const res = await axios.get("http://localhost:8000/api/complaints/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setComplaints(res.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
        setError("❌ Failed to load complaints. Please try again.");
      }
    };

    fetchComplaints();
  }, []);

  const renderStatus = (status) => {
    if (status === "Resolved")
      return (
        <span className="text-green-600 inline-flex items-center gap-1 font-medium">
          <FaCheckCircle /> Resolved
        </span>
      );
    if (status === "Rejected")
      return (
        <span className="text-red-600 inline-flex items-center gap-1 font-medium">
          <FaExclamationCircle /> Rejected
        </span>
      );
    return (
      <span className="text-yellow-600 inline-flex items-center gap-1 font-medium">
        <FaClock /> In Progress
      </span>
    );
  };

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
          <div className="bg-white rounded-r-3xl rounded-l-3xl p-6 shadow-lg w-full flex-1 overflow-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
              📋 Your Complaints
            </h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {!error && complaints.length === 0 ? (
              <p className="text-gray-500 text-lg">
                You have not submitted any complaints yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
                  <thead className="bg-[#57c999] text-white">
                    <tr>
                      <th className="px-4 py-2 text-left">Subject</th>
                      <th className="px-4 py-2 text-left">Department</th>
                      <th className="px-4 py-2 text-left">Submitted On</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complaints.map((comp, index) => (
                      <React.Fragment key={index}>
                        <tr className="border-t border-gray-200 hover:bg-gray-50">
                         <td
                            className="px-4 py-2 text-gray-700 font-medium cursor-pointer  hover:text-blue-600"
                            onClick={() => setSelectedComplaint(comp)}
                          >
                            {comp.subject}
                          </td>
                              <td className="px-4 py-2 text-gray-600">
                            {comp.department}
                          </td>
                          <td className="px-4 py-2 text-gray-600">
                            {new Date(comp.created_at).toLocaleString()}
                          </td>
                          <td className="px-4 py-2">{renderStatus(comp.status)}</td>
                          <td className="px-4 py-2">
                            {comp.status === "Resolved" && (
                              <button
                                onClick={() =>
                                  setActiveFeedback((prev) =>
                                    prev === comp.id ? null : comp.id
                                  )
                                }
                                className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                              >
                                {activeFeedback === comp.id ? "Close" : "Give Feedback"}
                              </button>
                            )}
                          </td>
                        </tr>

                        {activeFeedback === comp.id && (
                          <tr>
                            <td colSpan="5" className="px-4 py-4 bg-gray-50">
                              <UserFeedback
                                complaintId={comp.id}
                                onFeedbackSubmitted={() => {
                                  alert("✅ Feedback submitted for complaint ");
                                  setActiveFeedback(null);
                                }}
                              />
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      {selectedComplaint && (  // ✅ now it's outside properly
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full relative">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Complaint Details</h3>

      <div className="space-y-2 text-sm text-gray-700">
        <p><strong>Subject:</strong> {selectedComplaint.subject}</p>
        <p><strong>Department:</strong> {selectedComplaint.department}</p>
        <p><strong>Category:</strong> {selectedComplaint.category || "N/A"}</p>
        <p><strong>Description:</strong> {selectedComplaint.description}</p>
        <p><strong>Urgency:</strong> {selectedComplaint.urgency}</p>
        <p><strong>Status:</strong> {selectedComplaint.status}</p>
        <p><strong>Submitted At:</strong> {new Date(selectedComplaint.created_at).toLocaleString()}</p>
        {selectedComplaint.tracking_token && (
          <p><strong>Tracking Token:</strong> {selectedComplaint.tracking_token}</p>
        )}
      </div>

      <button
        onClick={() => setSelectedComplaint(null)}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full"
      >
        Close
      </button>
    </div>
  </div>
)}
    </div>
    
  );
}

export default ViewComplaints;
