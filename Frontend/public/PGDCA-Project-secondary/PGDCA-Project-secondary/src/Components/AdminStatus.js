import React from "react";
import "../styles/a_statuscheck.css";

function AdminStatus({ setPage }) {

  const complaints = JSON.parse(localStorage.getItem("complaints")) || [];

  // 🔥 UPDATE STATUS FUNCTION
  const updateStatus = (id, newStatus) => {
    const updated = complaints.map((c) =>
      c.id === id ? { ...c, status: newStatus } : c
    );

    localStorage.setItem("complaints", JSON.stringify(updated));

    // reload UI
    window.location.reload();
  };

  return (
    <div className="status-container">

      <div className="status-box">

        <h2>Complaint Status</h2>

        {complaints.length === 0 ? (
          <p>No complaints found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Complaint</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {complaints.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.description}</td>

                  {/* 🔥 STATUS DROPDOWN */}
                  <td>
                    <select
                      value={c.status}
                      onChange={(e) =>
                        updateStatus(c.id, e.target.value)
                      }
                    >
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* BACK BUTTON */}
        <button
          className="back-btn"
          onClick={() => setPage("home")}
        >
          Back
        </button>

      </div>

    </div>
  );
}

export default AdminStatus;