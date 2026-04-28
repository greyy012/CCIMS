import { useEffect, useState } from "react";
import {
  getComplaintsApi,
  assignComplaintApi,
} from "../features/complaint/complaintAPI";
import Layout from "../components/Layout";

export default function AssignComplaint() {
  const [data, setData] = useState([]);
  const [staffList, setStaffList] = useState([]);

  const user = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await getComplaintsApi({
        role: user.staffRole || "coordinator",
      });

      setData(res.data || []);

      // TEMP staff (replace later with API)
      setStaffList([
        { id: 201, name: "Rahul" },
        { id: 202, name: "Amit" },
      ]);

    } catch (err) {
      console.log("LOAD ERROR:", err);
      setData([]);
    }
  };

  const assign = async (complaintId, staff) => {
    try {
      if (!staff) return; // safety

      await assignComplaintApi({
        complaint_id: complaintId,
        staff_id: staff.id,
        staff_name: staff.name,
        role: user.staffRole || "coordinator",
        assigned_by: user.id,
        assigned_by_name: user.name, // 🔥 IMPORTANT
      });

      alert("Assigned ✅");
      load();

    } catch (err) {
      console.log("ASSIGN ERROR:", err);
      alert("Assign failed ❌");
    }
  };

  return (
    <Layout>
      <div className="glass-card">
        <h2>Assign Complaints</h2>

        {data.length === 0 ? (
          <p>No new complaints</p>
        ) : (
          data.map((c) => (
            <div key={c.Complaint_ID} style={{ marginBottom: "15px" }}>
              <p><b>{c.Description}</b></p>

              <select
                defaultValue=""
                onChange={(e) => {
                  const selected = staffList.find(
                    (x) => x.id == e.target.value
                  );
                  assign(c.Complaint_ID, selected);
                }}
              >
                <option value="">Select Staff</option>

                {staffList.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}