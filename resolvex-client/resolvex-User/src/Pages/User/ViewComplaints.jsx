import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { FaExclamationCircle, FaCheckCircle, FaClock } from "react-icons/fa";

function ViewComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");

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

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 mt-10 text-gray-800">
            📋 Your Complaints
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {!error && complaints.length === 0 && (
            <p className="text-gray-500 text-lg">
              You have not submitted any complaints yet.
            </p>
          )}

          <div className="space-y-6">
            {complaints.map((comp, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow p-5 border-l-4 border-blue-500 hover:shadow-md transition"
              >
                <p className="text-xl font-semibold text-gray-800 mb-2">
                  📝 {comp.subject}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 text-sm">
                  <p>
                    <strong>📂 Department:</strong> {comp.department}
                  </p>
                  <p>
                    <strong>🕒 Submitted:</strong>{" "}
                    {new Date(comp.created_at).toLocaleString()}
                  </p>
                  <p className="col-span-2 mt-1">
                    <strong>
                      {comp.status === "Resolved" ? (
                        <span className="text-green-600 inline-flex items-center gap-1">
                          <FaCheckCircle /> Status:
                        </span>
                      ) : (
                        <span className="text-yellow-600 inline-flex items-center gap-1">
                          <FaClock /> Status:
                        </span>
                      )}
                    </strong>{" "}
                    {comp.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewComplaints;
