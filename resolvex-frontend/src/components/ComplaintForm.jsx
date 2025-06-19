import React, { useState } from 'react';
import { submitComplaint } from '../services/complaintService';
import Navbar from './Navbar';
import CustomButton from './Button';

const departmentOptions = {
  Programs: ['CSE', 'MCA', 'MBA'],
  Hostel: [],
  CCC: [],
  Administration: [],
};

const urgencyLevels = ['Low', 'Medium', 'High'];

const ComplaintForm = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [mainDept, setMainDept] = useState('');
  const [subDept, setSubDept] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleMainDeptChange = (e) => {
    const selected = e.target.value;
    setMainDept(selected);
    setSubDept('');
  };

  const validateForm = () => {
    const errors = {};

    if (!anonymous) {
      if (!name.trim()) errors.name = 'Name is required';
      if (!role.trim()) errors.role = 'Role is required';
    }

    if (!mainDept) errors.mainDept = 'Department is required';
    if (departmentOptions[mainDept]?.length > 0 && !subDept) {
      errors.subDept = 'Sub-department is required';
    }
    if (!subject.trim()) errors.subject = 'Subject is required';
    if (!description.trim()) errors.description = 'Description is required';
    if (!urgency) errors.urgency = 'Urgency level is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const complaintData = {
      department: mainDept,
      subDepartment: subDept || null,
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
      await submitComplaint(complaintData);
      alert('Complaint submitted successfully!');
      setName('');
      setRole('');
      setMainDept('');
      setSubDept('');
      setSubject('');
      setDescription('');
      setUrgency('');
      setAnonymous(false);
      setFormErrors({});
    } catch (error) {
      console.error("Complaint submission failed:", error);
      setFormErrors({ submit: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <>
      <Navbar />
      <form className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Submit a Complaint</h2>

        {formErrors.submit && (
          <p className="text-red-500 text-center mb-4">{formErrors.submit}</p>
        )}

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={anonymous}
            onChange={() => setAnonymous(!anonymous)}
            className="mr-2"
            id="anonymous"
          />
          <label htmlFor="anonymous" className="text-gray-700 font-medium">
            Submit as Anonymous (personal details will not be shared)
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

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Department</label>
          <select
            className="w-full border border-gray-300 p-2 rounded"
            value={mainDept}
            onChange={handleMainDeptChange}
          >
            <option value="">Select Department</option>
            {Object.keys(departmentOptions).map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          {formErrors.mainDept && <p className="text-red-500 text-sm mt-1">{formErrors.mainDept}</p>}
        </div>

        {departmentOptions[mainDept]?.length > 0 && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Sub Department</label>
            <select
              className="w-full border border-gray-300 p-2 rounded"
              value={subDept}
              onChange={(e) => setSubDept(e.target.value)}
            >
              <option value="">Select Sub Department</option>
              {departmentOptions[mainDept].map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
            {formErrors.subDept && <p className="text-red-500 text-sm mt-1">{formErrors.subDept}</p>}
          </div>
        )}

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

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            className="w-full border border-gray-300 p-2 rounded h-32 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          {formErrors.description && <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>}
        </div>

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

        <CustomButton
          label={"Submit"}
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        />
      </form>
    </>
  );
};

export default ComplaintForm;
