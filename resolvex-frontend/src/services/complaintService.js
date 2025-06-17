// src/services/complaintService.js
import axios from "axios";
import { API_BASE_URL } from "../config";

export const submitComplaint = async (complaintData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/complaints`, complaintData);
    return response.data;
  } catch (error) {
    console.error("Error submitting complaint:", error);
    throw error;
  }
};
