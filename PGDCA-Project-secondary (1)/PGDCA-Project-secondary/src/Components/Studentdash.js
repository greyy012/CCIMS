import React, { useState } from "react";
import "../styles/studentdash.css";
import { useNavigate } from "react-router-dom";
import ComplaintForm from "./StudentComplaint";
import StatusPage from "./StudentStatuscheck";
import FeedbackPage from "./StudentFeedback";

function StudentDashboard() {
  const [page, setPage] = useState("home");
  return (
    <div className="dashboard-container">

      {/* LEFT SIDEBAR */}
      <div className="sidebar">
        <button onClick={() => setPage("home")}>
          Home
        </button>
        <button onClick={() => setPage("complaint")}>
          Register Complaint
        </button>

        <button onClick={() => setPage("status")}>
          Status Check
        </button>

        <button onClick={() => setPage("feedback")}>
          Feedback
        </button>
      </div>

      {/* RIGHT CONTENT */}
      <div className="content">
        {page === "home" && (
          <div className="home-wrapper">

            <div className="home-header">
              <h2>Welcome to Students</h2>
              <p>
                Manage your complaints efficiently — raise issues, track progress,
                and provide feedback all in one place.
              </p>
            </div>

            <div className="home-cards">

              <div className="card">
                <h3>📌 Register Complaint</h3>
                <p>Submit your academic or technical issues easily.</p>
              </div>

              <div className="card">
                <h3>📊 Track Status</h3>
                <p>Check real-time updates: Pending, In Progress, or Resolved.</p>
              </div>

              <div className="card">
                <h3>💬 Feedback</h3>
                <p>Help improve the system by sharing your experience.</p>
              </div>

            </div>

          </div>
        )}
        {page === "complaint" && <ComplaintForm setPage={setPage} />}
        {page === "status" && <StatusPage setPage={setPage} />}
        {page === "feedback" && <FeedbackPage setPage={setPage} />}
      </div>

    </div>
  );
}

export default StudentDashboard;