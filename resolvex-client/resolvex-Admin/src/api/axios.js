// src/api/axios.js
import axios from 'axios';

const API = axios.create({
  baseURL: "http://localhost:8000",  // Adjust this if you're deploying
});

// Add token to every request if exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
