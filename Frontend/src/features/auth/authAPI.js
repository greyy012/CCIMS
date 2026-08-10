import API from "../../api/api";

export const loginApi = (data) => API.post("/login", data);
export const forgotPasswordApi = (data) => API.post("/forgot-password", data);
export const resetPasswordApi = (data) => API.put("/reset-password", data);