import React from "react";
import "../styles/s_statuscheck.css";
import { useNavigate } from "react-router-dom";

function StatusPage({setPage}) {

  const navigate = useNavigate();

  const complaints = JSON.parse(localStorage.getItem("complaints")) || [];


  return (
    <div className="status-container">

      <div className="status-box">

        <h2>Complaint Status</h2>

        <table>
          <tr>
            <th>ID</th>
            <th>Complaint</th>
            <th>Status</th>
          </tr>

          {complaints.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.title}</td>
              <td className={c.status.toLowerCase().replace(" ", "-")}>
                {c.status}
              </td>
            </tr>
          ))}

        </table>

        {/* Back Button */}
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

export default StatusPage;