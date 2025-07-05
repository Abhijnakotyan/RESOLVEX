import API from './api';

export const sendFeedback = async (feedbackData) => {
  const response = await API.post('/feedback', feedbackData);
  return response.data;
};
