import { useEffect, useState } from "react";
import { getHistoryApi } from "../features/complaint/complaintAPI";
import Layout from "../components/Layout";

export default function Reports() {
  const [data, setData] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await getHistoryApi({
        role: user?.staffRole?.toLowerCase(),
        staff_id: user?.id,
      });

      setData(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log("REPORT ERROR:", err);
      setData([]);
    }
  };

  // ✅ SAFE STRING (prevents crash)
  const safe = (val) => {
    if (val === null || val === undefined) return "-";
    return String(val);
  };

  // ✅ STATUS FORMAT
  const normalize = (s) =>
    typeof s === "string" ? s.toLowerCase().trim() : "";

  return (
    <Layout>
      <div className="report-card">
        <h2>📊 Complaint Reports</h2>
<div className="report-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student ID</th>
              <th>Description</th>
              <th>Status</th>
              <th>Staff</th>
              <th>Assigned By</th>
              <th>Date</th>
              <th>Assigned Time</th>
              <th>Resolved Time</th>
              {/* <th>Resolution (hrs)</th> */}
            </tr>
          </thead>

          <tbody>
            {data.map((c) => {
              const date = c.Date_Of_Complaint
                ? new Date(c.Date_Of_Complaint).toLocaleDateString()
                : "-";

              const assignedTime = c.Assigned_Time
                ? new Date(c.Assigned_Time).toLocaleString()
                : "-";

              const resolvedTime = c.Resolved_Time
                ? new Date(c.Resolved_Time).toLocaleString()
                : "-";

              let hours = "-";
              if (c.Assigned_Time && c.Resolved_Time) {
                hours = Math.round(
                  (new Date(c.Resolved_Time) -
                    new Date(c.Assigned_Time)) /
                    3600000
                );
              }

              const statusClass = normalize(c.Status).replace(" ", "-");

              return (
                <tr key={safe(c.Complaint_ID)}>
                  <td>{safe(c.Complaint_ID)}</td>
                  <td>{safe(c.PRN_ID)}</td>
                  <td>{safe(c.Description)}</td>

                  <td>
                    <span className={`status ${statusClass}`}>
                      {safe(c.Status)}
                    </span>
                  </td>

                  <td>{safe(c.Staff_Name)}</td>
                  <td>{safe(c.Assigned_By_Name)}</td>
                  <td>{date}</td>
                  <td>{assignedTime}</td>
                  <td>{resolvedTime}</td>
                  {/* <td>{hours}</td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
    </Layout>
  );
}