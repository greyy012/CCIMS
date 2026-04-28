import { useEffect, useState } from "react";
import {
  getComplaintsApi,
  assignComplaintApi,
  getStaffApi
} from "../features/complaint/complaintAPI";
import Layout from "../components/Layout";

export default function ProcessComplaints() {
  const [data, setData] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [activeRow, setActiveRow] = useState(null); // 🔥 which row is open

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    load();
  }, []);
const load = async () => {
  try {
    console.log("ROLE SENT:", user.staffRole); // debug

    const res = await getComplaintsApi({
      role: user.staffRole?.toLowerCase(),
    });

    setData(res.data);

    const staffRes = await getStaffApi();
    setStaffList(staffRes.data);

  } catch (err) {
    console.log("LOAD ERROR:", err);
    alert("Failed to load ❌");
  }
};

  const assign = async (complaintId, staff) => {
    try {
      await assignComplaintApi({
        complaint_id: complaintId,
        staff_id: staff.Staff_ID,
        staff_name: staff.Name,
        role: user.staffRole,
        assigned_by: user.id,
        assigned_by_name: user.name,
      });

      alert("Assigned ✅");
      setActiveRow(null); // close dropdown
      load();

    } catch (err) {
      console.log("ASSIGN ERROR:", err);
      alert("Assign failed ❌");
    }
  };

  return (
    <Layout>
      <div className="glass-card">
        <h2>New Complaints (Coordinator)</h2>

        {data.length === 0 ? (
          <p>No new complaints 🎉</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Status</th>
                <th>Process</th>
              </tr>
            </thead>

            <tbody>
              {data.map((c) => (
                <tr key={c.Complaint_ID}>
                  <td>{c.Complaint_ID}</td>
                  <td>{c.Description}</td>

                  <td style={{ color: "red" }}>
                    {c.Status}
                  </td>

                  <td>
                    {/* 🔘 PROCESS BUTTON */}
                    {activeRow !== c.Complaint_ID ? (
                      <button
                        onClick={() => setActiveRow(c.Complaint_ID)}
                      >
                        Process
                      </button>
                    ) : (
                      /* 🔽 DROPDOWN AFTER CLICK */
                      <select
                        defaultValue=""
                        onChange={(e) => {
                          const staff = staffList.find(
                            (s) => s.Staff_ID == e.target.value
                          );
                          assign(c.Complaint_ID, staff);
                        }}
                      >
                        <option value="">Select Staff</option>

                        {staffList.map((s) => (
                          <option key={s.Staff_ID} value={s.Staff_ID}>
                            {s.Name}
                          </option>
                        ))}
                      </select>
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