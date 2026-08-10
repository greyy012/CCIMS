import API from "../../api/api";

export const submitFeedbackApi = (data) => API.post("/feedback", data);
export const getMyFeedbackApi = (prn_id) =>
  API.get(`/feedback/my?prn_id=${prn_id}`);
