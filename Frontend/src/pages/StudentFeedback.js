import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getUser } from "../utils/auth";
import { submitFeedbackApi, getMyFeedbackApi } from "../features/feedback/feedbackAPI";
import { getStudentComplaintsApi } from "../features/complaint/complaintAPI";

export default function StudentFeedback() {
  const user = getUser();
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [complaintId, setComplaintId] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!user?.id) return;
    getStudentComplaintsApi(user.id)
      .then((r) => setComplaints(r.data || []))
      .catch(() => setComplaints([]));
    getMyFeedbackApi(user.id)
      .then((r) => setHistory(r.data || []))
      .catch(() => setHistory([]));
  }, [user?.id]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await submitFeedbackApi({
        prn_id: user.id,
        complaint_id: complaintId || null,
        rating: Number(rating),
        message,
      });
      alert("Feedback submitted. Thank you!");
      setMessage("");
      setComplaintId("");
      const res = await getMyFeedbackApi(user.id);
      setHistory(res.data || []);
    } catch (err) {
      alert(err.response?.data?.message || "Could not submit feedback");
    }
  };

  return (
    <Layout>
      <div className="glass-card">
        <h2>Submit Feedback</h2>
        <p className="dashboard-sub">
          Share your experience with the complaint resolution process.
        </p>

        <form className="admin-form" onSubmit={submit}>
          <label>Rating (1–5)</label>
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} — {"★".repeat(n)}
              </option>
            ))}
          </select>

          <label>Related complaint (optional)</label>
          <select value={complaintId} onChange={(e) => setComplaintId(e.target.value)}>
            <option value="">General feedback</option>
            {complaints
              .filter((c) => c.Status === "Resolved")
              .map((c) => (
                <option key={c.Complaint_ID} value={c.Complaint_ID}>
                  #{c.Complaint_ID} — {c.Description?.slice(0, 40)}
                </option>
              ))}
          </select>

          <label>Your comments</label>
          <textarea
            rows={4}
            placeholder="Tell us what went well or what we can improve..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button type="submit" className="login-btn">
            Submit Feedback
          </button>
        </form>

        <h3 style={{ marginTop: "28px" }}>Your past feedback</h3>
        {history.length === 0 ? (
          <p>No feedback submitted yet.</p>
        ) : (
          <ul className="feedback-list">
            {history.map((f) => (
              <li key={f.Feedback_ID} className="feedback-item">
                <span className="stars">{"★".repeat(f.Rating)}</span>
                <p>{f.Message || "—"}</p>
                <small>
                  {f.Complaint_Description
                    ? `Re: ${f.Complaint_Description.slice(0, 50)}`
                    : "General"}{" "}
                  · {new Date(f.Created_At).toLocaleDateString()}
                </small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}
