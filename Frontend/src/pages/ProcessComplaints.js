import { useEffect, useState } from "react";
import {
  getComplaintsApi,
  assignComplaintApi,
} from "../features/complaint/complaintAPI";
import Layout from "../components/Layout";

export default function ProcessComplaints() {
  const [data, setData] = useState([]);
  const [staffList, setStaffList] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    load();
  }, []);

  // 🔄 LOAD DATA
  const load = async () => {
    try {
      const res = await getComplaintsApi({
        role: "coordinator",
      });

      setData(res.data);

      // ✅ TEMP STAFF LIST (MATCH DB)
      setStaffList([
        { id: 202, name: "Anita Patel" },
        { id: 203, name: "Vikram Singh" },
        { id: 204, name: "Ramesh Kumar" },
        { id: 205, name: "Suresh Yadav" },
      ]);

    } catch (err) {
      console.log("LOAD ERROR:", err);
      alert("Failed to load complaints ❌");
    }
  };

  // 🔄 ASSIGN FUNCTION
  const assign = async (complaintId, staff) => {
    try {
      if (!staff) return;

      await assignComplaintApi({
        complaint_id: complaintId,
        staff_id: staff.id,
        staff_name: staff.name,
        role: user.staffRole,              // ✅ important
        assigned_by: user.id,
        assigned_by_name: user.name,       // ✅ FIXED (important)
      });

      alert("Assigned successfully ✅");
      load();

    } catch (err) {
      console.log("ASSIGN ERROR:", err);
      alert("Assign failed ❌");
    }
  };

  return (
    <Layout>
      <div className="glass-card">
        <h2>All Complaints (Coordinator)</h2>

        {data.length === 0 ? (
          <p>No complaints found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Assign</th>
              </tr>
            </thead>

            <tbody>
              {data.map((c) => (
                <tr key={c.Complaint_ID}>
                  <td>{c.Complaint_ID}</td>
                  <td>{c.Description}</td>

                  {/* STATUS */}
                  <td
                    style={{
                      color:
                        c.Status === "Resolved"
                          ? "green"
                          : c.Status === "In Progress"
                          ? "orange"
                          : "red",
                    }}
                  >
                    {c.Status}
                  </td>

                  {/* ASSIGNED STAFF */}
                  <td>{c.Staff_Name || "Not Assigned"}</td>

                  {/* ASSIGN ACTION */}
                  <td>
                    {c.Status === "Pending" ? (
                      <select
                        defaultValue=""
                        onChange={(e) => {
                          const selected = staffList.find(
                            (s) => s.id == e.target.value
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
                    ) : (
                      "Assigned"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}