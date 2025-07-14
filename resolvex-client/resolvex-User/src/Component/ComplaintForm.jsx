import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { submitComplaint } from '../services/complaintService';
import CustomButton from './Button';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const departments = ["CSE", "MCA", "MBA", "ECE", "ISBS", "EEE", "MECH", "Hostel", "CCC", "Administration"];
const categories = ["Academic", "Infrastructure", "Administrative", "Technical", "Other"];
const urgencyLevels = ["Low", "Medium", "High"];

const ComplaintForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const anonymousFromLanding = location.state?.anonymousMode || false;

  const storedRole = localStorage.getItem("role");
  const isUser = storedRole && storedRole !== "anonymous";

  const [anonymous, setAnonymous] = useState(anonymousFromLanding);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');
  const [category, setCategory] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const showNavbar = !isUser || anonymous;
  const showSidebar = isUser && !anonymous;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const validateForm = () => {
    const errors = {};
    if (!anonymous) {
      if (!name.trim()) errors.name = 'Name is required';
      if (!role.trim()) errors.role = 'Role is required';
    }
    if (!department) errors.department = 'Department is required';
    if (!category) errors.category = 'Category is required';
    if (!subject.trim()) errors.subject = 'Subject is required';
    if (!description.trim()) errors.description = 'Description is required';
    if (!urgency) errors.urgency = 'Urgency is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const complaintData = {
      department,
      subDepartment: category,
      subject,
      description,
      urgency,
      anonymous,
    };

    if (!anonymous) {
      complaintData.name = name;
      complaintData.role = role;
    }

    try {
      const response = await submitComplaint(complaintData);
      if (anonymous && response.tracking_token) {
        alert(`✅ Complaint submitted anonymously!\n🔐 Tracking token: ${response.tracking_token}`);
      } else {
        alert("✅ Complaint submitted successfully!");
      }

      // Reset form
      setName('');
      setRole('');
      setDepartment('');
      setCategory('');
      setSubject('');
      setDescription('');
      setUrgency('');
      setAnonymous(anonymousFromLanding);
      setFormErrors({});
    } catch (error) {
      console.error("❌ Complaint submission failed:", error);
      setFormErrors({ submit: "Something went wrong. Please try again." });
    }
  };

  return (
    <div className="relative bg-[#57c999] min-h-screen w-full">
      {/* Conditional Layout */}
      {showNavbar && <Navbar />}
      {showSidebar && <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}

      {/* Main Content */}
      <div
        className={`transition-all duration-300 min-h-screen flex items-center justify-center p-4 sm:p-6
          ${
            windowWidth >= 1024
              ? showSidebar
                ? 'ml-64'
                : 'ml-16'
              : 'ml-0'
          }
        `}
      >
        <form className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Submit a Complaint</h2>

          {formErrors.submit && (
            <p className="text-red-500 text-center mb-4">{formErrors.submit}</p>
          )}

          {/* Anonymous toggle */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              checked={anonymous}
              onChange={(e) => {
                const checked = e.target.checked;
                if (!checked && anonymousFromLanding) {
                  alert("🔒 You must log in to submit complaints with your identity.");
                  navigate("/authCard");
                  return;
                }
                setAnonymous(checked);
              }}
              className="mr-2"
              id="anonymous"
            />
            <label htmlFor="anonymous" className="text-gray-700 font-medium">
              Submit as Anonymous
            </label>
          </div>

          {!anonymous && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Your Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Your Role</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
                {formErrors.role && <p className="text-red-500 text-sm mt-1">{formErrors.role}</p>}
              </div>
            </>
          )}

          {/* Department */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Department</label>
            <select
              className="w-full border border-gray-300 p-2 rounded"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            {formErrors.department && <p className="text-red-500 text-sm mt-1">{formErrors.department}</p>}
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Category</label>
            <select
              className="w-full border border-gray-300 p-2 rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {formErrors.category && <p className="text-red-500 text-sm mt-1">{formErrors.category}</p>}
          </div>

          {/* Subject */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Subject</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            {formErrors.subject && <p className="text-red-500 text-sm mt-1">{formErrors.subject}</p>}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              className="w-full border border-gray-300 p-2 rounded h-32 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {formErrors.description && <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>}
          </div>

          {/* Urgency */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">Urgency</label>
            <select
              className="w-full border border-gray-300 p-2 rounded"
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
            >
              <option value="">Select Urgency</option>
              {urgencyLevels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            {formErrors.urgency && <p className="text-red-500 text-sm mt-1">{formErrors.urgency}</p>}
          </div>

          {/* Submit Button */}
          <CustomButton
            label="Submit"
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          />
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;
