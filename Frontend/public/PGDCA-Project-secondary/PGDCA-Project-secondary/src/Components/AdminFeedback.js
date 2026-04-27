import React from "react";
import "../styles/a_feedback.css";

function AdminFeedback({ setPage }) {

  // 🔥 get real feedback data (you must store it from student page)
  const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

  return (
    <div className="feedback-container">

      <div className="feedback-box">

        <h2>Feedback List</h2>

        {feedbacks.length === 0 ? (
          <p style={{ textAlign: "center" }}>No feedback available</p>
        ) : (
          <table className="feedback-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Rating</th>
                <th>Message</th>
              </tr>
            </thead>

            <tbody>
              {feedbacks.map((f) => (
                <tr key={f.id}>
                  <td>{f.id}</td>
                  <td>{f.rating}</td>
                  <td>{f.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* BACK BUTTON */}
        <div className="btn-group">
          <button
            className="back-btn"
            onClick={() => setPage("home")}
          >
            Back
          </button>
        </div>

      </div>

    </div>
  );
}

export default AdminFeedback; 