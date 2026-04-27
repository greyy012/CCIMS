import { useEffect, useState } from "react";
import {
  getComplaintsApi,
  updateStatusApi,
} from "../features/complaint/complaintAPI";
import Layout from "../components/Layout";

export default function AllComplaints() {
  const [data, setData] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchData = async () => {
    const res = await getComplaintsApi({
      staff_id: user.id,
      role: user.staffRole,
    });

    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (id, status) => {
    await updateStatusApi({
      complaint_id: id,
      status,
      role: user.staffRole,
    });

    fetchData(); // 🔥 refresh
  };

  return (
    <Layout>
      <div className="glass-card">
        <h2>Complaints</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((c) => (
              <tr key={c.Complaint_ID}>
                <td>{c.Complaint_ID}</td>
                <td>{c.Description}</td>

                <td
                  className={
                    c.Status === "Resolved"
                      ? "resolved"
                      : "pending"
                  }
                >
                  {c.Status}
                </td>

                <td>
                  <select
                    value={c.Status}
                    onChange={(e) =>
                      updateStatus(c.Complaint_ID, e.target.value)
                    }
                  >
                    <option>Pending</option>
                    <option>Resolved</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}