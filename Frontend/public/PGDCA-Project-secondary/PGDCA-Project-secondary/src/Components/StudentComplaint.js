import React from "react";
import { useState } from "react";
import "../styles/s_complaint.css";
import { useNavigate } from "react-router-dom";

function ComplaintForm({ setPage }) {

  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [branch, setBranch] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newComplaint = {
      id: Date.now(),
      type,
      branch,
      description: desc,
      status: "Pending"
    };

    const oldData = JSON.parse(localStorage.getItem("complaints")) || [];
    oldData.push(newComplaint);
    localStorage.setItem("complaints", JSON.stringify(oldData));

    alert("Complaint Submitted!");
  };


  return (
    <div className="inner-content">

      <div className="complaint-box">

        <h2>File a Complaint</h2>

        <form onSubmit={handleSubmit}>

          {/* Complaint Type */}
          <label>Complaint Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="">Select Type</option>
            <option>Technical</option>
            <option>Hostel</option>
            <option>Mess</option>
            <option>Academic</option>
          </select>

          {/* Branch */}
          <label id="branch">Branch</label>
          <select value={branch} onChange={(e) => setBranch(e.target.value)} required>
            <option value="">Select Branch</option>
            <option>MSc Applied Maths</option>
            <option>PGDCA</option>
            <option>Mechanical</option>
            <option>Civil</option>
          </select>

          {/* Description */}
          <label>Description</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Describe your issue..."
            rows="4"
            required
          />

          {/* Buttons */}
          <div className="btn-group">

            <button type="submit">Submit</button>

            <button
              type="button"
              className="back-btn"
              onClick={() => setPage("home")}
            >
              Back
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default ComplaintForm;