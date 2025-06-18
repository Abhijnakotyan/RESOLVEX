import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewComplaints() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token"); // Or sessionStorage
        if (!token) {
          console.error("No token found");
          return;
        }
        console.log("Sending token:", localStorage.getItem("token"));

        const res = await axios.get("http://localhost:8000/api/complaints/user", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setComplaints(res.data);
      } catch (error) {
        console.error("Error fetching user complaint:", error);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div>
      <h2>Your Complaints</h2>
      <pre>{JSON.stringify(complaints, null, 2)}</pre>
    </div>
  );
}

export default ViewComplaints;
