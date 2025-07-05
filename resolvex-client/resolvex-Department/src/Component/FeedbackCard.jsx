import React from 'react';

const FeedbackCard = ({ comment, rating }) => (
  <div className="border p-4 rounded shadow mb-2">
    <p>{comment}</p>
    <p className="text-yellow-500">Rating: {rating}/5</p>
  </div>
);

export default FeedbackCard;
