import React, { useState } from "react";
import "../styles/admindash.css";

import AdminComplaints from "./AdminComplaint";
import AdminStatus from "./AdminStatus";
import AdminFeedback from "./AdminFeedback";

function AdminDashboard() {

  const [page, setPage] = useState("home");

  return (
    <div className="admin-dashboard">

      {/* LEFT SIDEBAR */}
      <div className="admin-sidebar">
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("complaints")}>View Complaints</button>
        <button onClick={() => setPage("status")}>Complaint Status</button>
        <button onClick={() => setPage("feedback")}>Feedback</button>
      </div>

      {/* RIGHT CONTENT */}
      <div className="admin-content">

        {page === "home" && (
          <>
            <h1>Welcome to Admin Panel</h1>
            <p>Manage complaints efficiently.</p>
          </>
        )}

        {page === "complaints" && <AdminComplaints setPage={setPage} />}
        {page === "status" && <AdminStatus setPage={setPage} />}
        {page === "feedback" && <AdminFeedback setPage={setPage} />}

      </div>

    </div>
  );
}

export default AdminDashboard;