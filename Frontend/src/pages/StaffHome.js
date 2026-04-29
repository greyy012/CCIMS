import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import { getComplaintsApi } from "../features/complaint/complaintAPI";

export default function StaffHome() {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await getComplaintsApi({
        role: user?.staffRole?.toLowerCase(),
        staff_id: user?.id,
      });
      setData(res.data || []);
    } catch (err) {
      console.log("DASHBOARD ERROR:", err);
    }
  };

  // 📊 Stats
  const total = data.length;
  const pending = data.filter(c => c.Status === "Pending").length;
  const progress = data.filter(c => c.Status === "In Progress").length;
  const resolved = data.filter(c => c.Status === "Resolved").length;

  return (
    <Layout>
      <div className="dashboard">

        <h1>Welcome {user?.name}</h1>
        <p>Complaint management overview</p>

        {/* 📊 STATS */}
        <div className="stats-container">
          <div className="stat-card">
            <h3>{total}</h3>
            <p>Total Complaints</p>
          </div>

          <div className="stat-card red">
            <h3>{pending}</h3>
            <p>Pending</p>
          </div>

          <div className="stat-card orange">
            <h3>{progress}</h3>
            <p>In Progress</p>
          </div>

          <div className="stat-card green">
            <h3>{resolved}</h3>
            <p>Resolved</p>
          </div>
        </div>

        {/* 📋 RECENT */}
        <h3 style={{ marginTop: "30px" }}>Recent Complaints</h3>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {data.slice(0, 5).map((c) => (
              <tr key={c.Complaint_ID}>
                <td>{c.Complaint_ID}</td>
                <td>{c.Description}</td>
                <td>{c.Status}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </Layout>
  );
}