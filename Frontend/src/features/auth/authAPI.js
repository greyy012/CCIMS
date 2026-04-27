import API from "../../api/api"; 

export const loginApi = (data) => API.post("/login", data);