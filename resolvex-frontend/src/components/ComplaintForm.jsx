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

  const handleMainDeptChange = (e) => {
    const selected = e.target.value;
    setMainDept(selected);
    setSubDept('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    await submitComplaint(complaintData);
    alert('Complaint submitted');

    // Reset form
    setName('');
    setRole('');
    setMainDept('');
    setSubDept('');
    setSubject('');
    setDescription('');
    setUrgency('');
    setAnonymous(false);
  };

  return (
    <>
    <Navbar/>
    <form
      
      className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md mt-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Submit a Complaint</h2>

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
            <label className="block text-gray-700 font-medium mb-2">Your Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Your Role</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>
        </>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Department</label>
        <select
          className="w-full border border-gray-300 p-2 rounded"
          value={mainDept}
          onChange={handleMainDeptChange}
          required
        >
          <option value="">Select Department</option>
          {Object.keys(departmentOptions).map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {departmentOptions[mainDept]?.length > 0 && (
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Sub Department</label>
          <select
            className="w-full border border-gray-300 p-2 rounded"
            value={subDept}
            onChange={(e) => setSubDept(e.target.value)}
            required
          >
            <option value="">Select Sub Department</option>
            {departmentOptions[mainDept].map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Subject</label>
        <input
          type="text"
          className="w-full border border-gray-300 p-2 rounded"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Description</label>
        <textarea
          className="w-full border border-gray-300 p-2 rounded h-32 resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Urgency</label>
        <select
          className="w-full border border-gray-300 p-2 rounded"
          value={urgency}
          onChange={(e) => setUrgency(e.target.value)}
          required
        >
          <option value="">Select Urgency</option>
          {urgencyLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      <CustomButton
        
        label={"Submit"}
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white font-semibold pr-10 rounded hover:bg-blue-700 transition"
      >
        
      </CustomButton>
    </form>
    </>
  );
};

export default ComplaintForm;
