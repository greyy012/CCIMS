import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { getUser } from "../utils/auth";
import { getStudentDashboardApi } from "../features/complaint/complaintAPI";
import API from "../api/api";

export default function StudentHome() {
  const navigate = useNavigate();
  const user = getUser();
  const [stats, setStats] = useState({});
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    if (!user?.id) return;
    getStudentDashboardApi(user.id).then((r) => setStats(r.data || {}));
    API.get("/admin/announcements")
      .then((r) => setAnnouncements((r.data || []).slice(0, 3)))
      .catch(() => {});
  }, [user?.id]);

  return (
    <Layout>
      <div className="dashboard dashboard-wide">
        <h1>Welcome, {user?.name || "Student"}</h1>
        <p className="dashboard-sub">Department of Applied Mathematics — Complaint Portal</p>

        <div className="stats-container">
          <div className="stat-card">
            <h3>{stats.total || 0}</h3>
            <p>My Complaints</p>
          </div>
          <div className="stat-card red">
            <h3>{stats.pending || 0}</h3>
            <p>Pending</p>
          </div>
          <div className="stat-card orange">
            <h3>{stats.in_progress || 0}</h3>
            <p>In Progress</p>
          </div>
          <div className="stat-card green">
            <h3>{stats.resolved || 0}</h3>
            <p>Resolved</p>
          </div>
        </div>

        <div className="card-container">
          <div className="card" onClick={() => navigate("/complaint")}>
            <span className="card-icon">📝</span>
            <h3>Register Complaint</h3>
            <p>File a new grievance with category & details</p>
          </div>
          <div className="card" onClick={() => navigate("/my")}>
            <span className="card-icon">📊</span>
            <h3>Track Complaints</h3>
            <p>View status, withdraw pending items</p>
          </div>
          <div className="card" onClick={() => navigate("/feedback")}>
            <span className="card-icon">💬</span>
            <h3>Give Feedback</h3>
            <p>Rate resolution quality & share suggestions</p>
          </div>
        </div>

        {announcements.length > 0 && (
          <div className="glass-card announce-panel">
            <h3>📢 Announcements</h3>
            <ul className="announce-list">
              {announcements.map((a) => (
                <li key={a.Announcement_ID} className="announce-item">
                  <strong>{a.Title}</strong>
                  <p>{a.Message}</p>
                  <small>{new Date(a.Created_At).toLocaleDateString()}</small>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Layout>
  );
}
