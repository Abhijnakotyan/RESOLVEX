import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");  // ✅ Declare here inside the function
      console.log("Sending token:", token);

      const response = await axios.get("http://localhost:8000/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,  // ✅ Correct header format
        },
      });

      setUser(response.data);
    } catch (err) {
      console.error("Error fetching user details:", err);
      setError("Could not load profile. Please log in again.");
    }
  };

  useEffect(() => {
    fetchUserDetails();  // ✅ Only call this inside useEffect
  }, []);

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      {user ? (
        <div className="space-y-2">
          <p><strong>Name:</strong> {user.name || "N/A"}</p>
          <p><strong>Username:</strong> {user.username || "N/A"}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Joined:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default UserProfile;
