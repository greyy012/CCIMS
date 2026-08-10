import API from "../../api/api";

export const getAdminDashboardApi = () => API.get("/admin/dashboard");
export const getAdminStatusStatsApi = () => API.get("/admin/stats/status");
export const getAdminCategoryStatsApi = () => API.get("/admin/stats/category");

export const getAdminStaffApi = () => API.get("/admin/staff");
export const addAdminStaffApi = (data) => API.post("/admin/staff", data);
export const updateAdminStaffApi = (data) => API.put("/admin/staff", data);
export const deleteAdminStaffApi = (data) => API.delete("/admin/staff", { data });

export const getAdminCategoriesApi = () => API.get("/admin/categories");
export const addAdminCategoryApi = (data) => API.post("/admin/categories", data);
export const updateAdminCategoryApi = (data) => API.put("/admin/categories", data);
export const deleteAdminCategoryApi = (data) =>
  API.delete("/admin/categories", { data });

export const getAdminStudentsApi = () => API.get("/admin/students");
export const addAdminStudentApi = (data) => API.post("/admin/students", data);
export const deleteAdminStudentApi = (data) =>
  API.delete("/admin/students", { data });

export const getAdminComplaintsApi = () => API.get("/admin/complaints");
export const getAdminAnnouncementsApi = () => API.get("/admin/announcements");
export const addAdminAnnouncementApi = (data) =>
  API.post("/admin/announcements", data);
export const deleteAdminAnnouncementApi = (data) =>
  API.delete("/admin/announcements", { data });

export const getAdminFeedbackApi = () => API.get("/feedback");
