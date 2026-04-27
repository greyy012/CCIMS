import React from "react";
import "../styles/a_complaint.css";

function AdminComplaints({ setPage }) {

  const complaints = JSON.parse(localStorage.getItem("complaints")) || [];

  return (
    <div className="inner-content">

      <div className="complaint-box">

        <h2>All Complaints</h2>

        {complaints.length === 0 ? (
          <p style={{ color: "white" }}>No complaints found</p>
        ) : (
          <table className="styled-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Branch</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {complaints.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.type}</td>
                  <td>{c.branch}</td>
                  <td>{c.description}</td>
                  <td>{c.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

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

export default AdminComplaints;