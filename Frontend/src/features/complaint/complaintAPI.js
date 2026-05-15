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