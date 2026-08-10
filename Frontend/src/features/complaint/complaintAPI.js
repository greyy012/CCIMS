import API from "../../api/api"; 
import axios from "axios";

// 📝 Student create complaint
export const createComplaintApi = (data) =>
  API.post("/complaint", data);

// 📊 Get complaints (role-based)
export const getComplaintsApi = (params) =>
  API.get("/complaints", { params });


export const assignComplaintApi = (data) =>
  API.put("/assign", data);


export const updateStatusApi = (data) =>
  API.put("/status", data);


export const getHistoryApi = (params) =>
  API.get("/history", { params });

export const getStaffApi = () =>
  API.get("/staff");


export const getStudentComplaintsApi = (prn_id) =>
  API.get(`/student/complaints?prn_id=${prn_id}`);

export const getCategoriesApi = () => {
  return API.get("/categories");
};

export const withdrawComplaintApi = (data) => API.put("/withdraw", data);

export const deleteComplaintApi = (data) =>
  API.delete("/complaint", { data });

export const getComplaintStatsApi = (params) =>
  API.get("/complaints/stats", { params });

export const getCategoryStatsApi = (params) =>
  API.get("/complaints/stats/category", { params });

export const getStudentDashboardApi = (prn_id) =>
  API.get(`/student/dashboard?prn_id=${prn_id}`);