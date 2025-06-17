// src/services/authService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, {
    email,
    password,
  });
  return response.data; // expected: { access_token, user info, etc. }
};
