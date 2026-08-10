import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import PieChartCard from "../components/PieChartCard";
import { getUser } from "../utils/auth";
import {
  getComplaintsApi,
  getComplaintStatsApi,
  getCategoryStatsApi,
} from "../features/complaint/complaintAPI";

export default function StaffHome() {
  const reduxUser = useSelector((state) => state.auth.user);
  const user = reduxUser || getUser();
  const [data, setData] = useState([]);
  const [statusStats, setStatusStats] = useState([]);
  const [categoryStats, setCategoryStats] = useState([]);

  const staffRole = user?.staffRole?.toLowerCase() || "";
  const isHod = staffRole === "hod";
  const isCoordinator = staffRole === "coordinator";

  useEffect(() => {
    if (user) load();
  }, [user?.id, user?.staffRole]);

  const load = async () => {
    try {
      const res = await getComplaintsApi({
        role: staffRole,
        staff_id: user?.id,
      });
      setData(res.data || []);

      if (isHod) {
        const [s, c] = await Promise.all([
          getComplaintStatsApi({ role: "hod" }),
          getCategoryStatsApi({ role: "hod" }),
        ]);
        setStatusStats(s.data || []);
        setCategoryStats(c.data || []);
      }
    } catch (err) {
      console.log("DASHBOARD ERROR:", err);
    }
  };

  const total = data.length;
  const pending = data.filter((c) => c.Status === "Pending").length;
  const progress = data.filter((c) => c.Status === "In Progress").length;
  const resolved = data.filter((c) => c.Status === "Resolved").length;
  const withdrawn = data.filter((c) => c.Status === "Withdrawn").length;

  const roleTitle = isHod
    ? "Head of Department"
    : isCoordinator
    ? "Complaint Coordinator"
    : "Faculty / Staff";

  return (
    <Layout>
      <div className="dashboard dashboard-wide">
        <h1>Welcome, {user?.name}</h1>
        <p className="dashboard-sub">{roleTitle} — complaint overview</p>

        <div className="stats-container">
          <div className="stat-card">
            <h3>{total}</h3>
            <p>{isCoordinator ? "New / Unassigned" : "Total"}</p>
          </div>
          <div className="stat-card red">
            <h3>{pending}</h3>
            <p>Pending</p>
          </div>
          {!isCoordinator && (
            <>
              <div className="stat-card orange">
                <h3>{progress}</h3>
                <p>In Progress</p>
              </div>
              <div className="stat-card green">
                <h3>{resolved}</h3>
                <p>Resolved</p>
              </div>
            </>
          )}
          {withdrawn > 0 && (
            <div className="stat-card gray">
              <h3>{withdrawn}</h3>
              <p>Withdrawn</p>
            </div>
          )}
        </div>

        {isHod && (
          <div className="charts-row">
            <PieChartCard
              title="Complaints by Status"
              stats={statusStats}
              nameKey="Status"
              useStatusColors
            />
            <PieChartCard
              title="Complaints by Category"
              stats={categoryStats}
              nameKey="Category_Name"
            />
          </div>
        )}

        {isCoordinator && pending > 0 && (
          <p className="alert-banner">
            {pending} complaint(s) waiting for assignment — go to Process Complaints.
          </p>
        )}

        <h3 className="section-title">Recent complaints</h3>
        <div className="glass-card table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Status</th>
                {isHod && <th>Assigned To</th>}
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={isHod ? 4 : 3}>No complaints</td>
                </tr>
              ) : (
                data.slice(0, 8).map((c) => (
                  <tr key={c.Complaint_ID}>
                    <td>{c.Complaint_ID}</td>
                    <td>{c.Description}</td>
                    <td>
                      <span
                        className={`status ${c.Status?.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {c.Status}
                      </span>
                    </td>
                    {isHod && <td>{c.Staff_Name || "—"}</td>}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
