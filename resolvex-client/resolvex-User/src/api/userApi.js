import API from './axios';

export const fetchUserStats = async () => {
  const res = await API.get('/api/user/dashboard-stats');
  return res.data;
};

// export const fetchUserActivities = async () => {
//   const res = await API.get('/api/user/activity-feed');
//   return res.data.activities;
// };
