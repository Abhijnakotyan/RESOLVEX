import axios from "axios";

const API_BASE_URL = 'http://localhost:8000';
export const fetchComplaintCountByDept=async(departmentId)=>{
    const response=await axios.get(
        `${API_BASE_URL}/auth/department/${departmentId}/complaints/count`
    );
    return response.data.total_complaints;
};

export const fetchResolvedCountByDept=async(departmentId)=>{
    const response=await axios.get(
        `${API_BASE_URL}/auth/department/${departmentId}/complaints/resolved-count`
    );
    return response.data.resolved_count;
};
export const fetchPendingCountByDept = async (departmentId) => {
  const response = await axios.get(
    `${API_BASE_URL}/auth/department/${departmentId}/complaints/pending-count`
  );
  return response.data.pending_count;
};
