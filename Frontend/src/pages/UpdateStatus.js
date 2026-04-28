import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  getComplaintsApi,
  updateStatusApi,
} from "../features/complaint/complaintAPI";

export default function UpdateStatus() {
  const [data, setData] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await getComplaintsApi({
        role: "staff",
        staff_id: user.id,
      });

      setData(res.data);
    } catch (err) {
      console.log("LOAD ERROR:", err);
      alert("Failed to load complaints ❌");
    }
  };

  const update = async (id, status) => {
    try {
      await updateStatusApi({
        complaint_id: id,
        status,
      });

      alert("Status Updated ✅");
      load();
    } catch (err) {
      console.log("UPDATE ERROR:", err);
      alert("Failed to update ❌");
    }
  };

  return (
    <Layout>
      <div className="glass-card">
        <h2>My Assigned Complaints</h2>

        {data.length === 0 ? (
          <p>No complaints assigned</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Status</th>
                <th>Update</th>
              </tr>
            </thead>

            <tbody>
              {data.map((c) => (
                <tr key={c.Complaint_ID}>
                  <td>{c.Complaint_ID}</td>
                  <td>{c.Description}</td>

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

                  <td>
                    {c.Status !== "Resolved" && (
                      <select
                        defaultValue=""
                        onChange={(e) =>
                          update(c.Complaint_ID, e.target.value)
                        }
                      >
                        <option value="">Update Status</option>
                        <option value="In Progress">
                          In Progress
                        </option>
                        <option value="Resolved">
                          Resolved
                        </option>
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