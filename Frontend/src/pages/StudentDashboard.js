import { useEffect, useState } from "react";
import API from "../api/axios";

function StudentDashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    API.get("/student").then(res => setComplaints(res.data));
  }, []);

  return (
    <div>
      <h2>Student Dashboard</h2>

      {complaints.map(c => (
        <div key={c.Complaint_ID}>
          <p>{c.Description}</p>
          <p>Status: {c.Status}</p>
          <p>Assigned: {c.Staff_Name || "Not assigned"}</p>
        </div>
      ))}
    </div>
  );
}

export default StudentDashboard;