import API from "../../api/api"; 

// 📝 Student create complaint
export const createComplaintApi = (data) =>
  API.post("/complaint", data);

// 📊 Get complaints (role-based)
export const getComplaintsApi = (params) =>
  API.get("/complaints", { params });

// 📌 Assign complaint (Coordinator)
export const assignComplaintApi = (data) =>
  API.put("/assign", data);

// 🔄 Update status
export const updateStatusApi = (data) =>
  API.put("/status", data);

// 📜 History
export const getHistoryApi = (params) =>
  API.get("/history", { params });

// 🎓 Student complaints
export const getStudentComplaintsApi = (prn_id) =>
  API.get(`/student/complaints?prn_id=${prn_id}`);