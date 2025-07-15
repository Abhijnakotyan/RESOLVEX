import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminAlert = () => {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/admin/unresolved-alerts");
        setAlerts(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch alerts");
      }
    };
    fetchAlerts();
  }, []);

  const handleSendAlert = async (complaintId, departmentName) => {
    try {
      await axios.post("http://localhost:8000/admin/alerts/send", {
        complaint_id: complaintId,
        department_name: departmentName,
        message: "Please resolve this complaint as a priority"
        }, {
        headers: {
            "Content-Type": "application/json"  // ✅ Ensures proper format
        }
        });


      alert("Alert sent!");
    } catch (err) {
      console.error(err);
      alert("Failed to send alert");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Department Alerts</h2>
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto border border-gray-200 text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Subject</th>
              <th className="px-4 py-2">Days Pending</th>
              <th className="px-4 py-2">Severity</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert) => (
              <tr
                key={alert.id}
                className={alert.highlight ? "bg-red-50 text-red-800 font-semibold" : ""}
              >
                <td className="border px-4 py-2">{alert.department_name || alert.department}</td>
                <td className="border px-4 py-2">{alert.complaint_subject}</td>
                <td className="border px-4 py-2">{alert.days_pending} days</td>
                <td className="border px-4 py-2">{alert.severity_score}</td>
                <td className="border px-4 py-2">
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleSendAlert(alert.id, alert.department_name || alert.department)}
                  >
                    Send Alert
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAlert;
