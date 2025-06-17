import React, { useState } from 'react';
import { submitComplaint } from '../services/complaintService';

const ComplaintForm = () => {
  const [content, setContent] = useState('');
  const [anonymous, setAnonymous] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitComplaint({ content, department: 'IT', anonymous });
    alert('Complaint submitted');
    setContent('');
    setAnonymous(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <textarea
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Enter your complaint"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="mt-2">
        <label>
          <input type="checkbox" checked={anonymous} onChange={() => setAnonymous(!anonymous)} /> Submit Anonymously
        </label>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default ComplaintForm;