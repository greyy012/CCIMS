import { useEffect, useState } from "react";
import API from "../api/axios";

function CoordinatorDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    API.get("/all").then(res => setComplaints(res.data));
    API.get("/staff/list").then(res => setStaff(res.data));
  }, []);

  const assign = (cid, sid) => {
    API.post("/assign", {
      complaint_id: cid,
      staff_id: sid
    }).then(() => alert("Assigned"));
  };

  return (
    <div>
      <h2>Coordinator Dashboard</h2>

      {complaints.map(c => (
        <div key={c.Complaint_ID}>
          <p>{c.Description}</p>

          <select onChange={(e) => assign(c.Complaint_ID, e.target.value)}>
            <option>Select Staff</option>
            {staff.map(s => (
              <option value={s.Staff_ID}>{s.Name}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}

export default CoordinatorDashboard;