import React, { useEffect, useState } from "react";
import axios from "axios";

const ComplaintCountCard = ({ departmentId }) => {
  const [counts, setCounts] = useState({
    total: 0,
    pending: 0,
    in_progress: 0,
    resolved: 0,
    rejected: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/complaints/department/${departmentId}`);
        const complaints = res.data || [];

        const grouped = {
          total: complaints.length,
          pending: 0,
          in_progress: 0,
          resolved: 0,
          rejected: 0,
        };

        complaints.forEach((c) => {
          switch (c.status) {
            case "Pending":
              grouped.pending++;
              break;
            case "In Progress":
              grouped.in_progress++;
              break;
            case "Resolved":
              grouped.resolved++;
              break;
            case "Rejected":
              grouped.rejected++;
              break;
            default:
              break;
          }
        });

        setCounts(grouped);
      } catch (err) {
        console.error("❌ Failed to fetch complaint counts", err);
      }
    };

    if (departmentId) fetchCounts();
  }, [departmentId]);

  const cardStyle = {
    wrapper:
      "relative h-44 w-full overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-500 bg-white group cursor-pointer",
    background:
      "absolute inset-0 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out opacity-60 bg-green-100",
    content: "relative z-10 p-6 text-center flex flex-col justify-center h-full",
    title:
      "text-base sm:text-lg font-semibold group-hover:text-gray-800 transition-colors duration-300",
    count: "text-4xl font-bold transition-colors duration-300",
  };

  const cards = [
    { label: "Total", value: counts.total, color: "text-blue-600" },
    { label: "Pending", value: counts.pending, color: "text-yellow-600" },
    { label: "In Progress", value: counts.in_progress, color: "text-blue-500" },
    { label: "Resolved", value: counts.resolved, color: "text-green-600" },
    { label: "Rejected", value: counts.rejected, color: "text-red-500" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
        {cards.map(({ label, value, color }) => (
          <div key={label} className={cardStyle.wrapper}>
            {/* Unified hover background */}
            <div className={cardStyle.background} />

            {/* Card content */}
            <div className={cardStyle.content}>
              <h3 className={cardStyle.title}>{label}</h3>
              <p className={`${cardStyle.count} ${color}`}>{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplaintCountCard;
