import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";

export default function StaffHome() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  return (
    <Layout>
      <div className="center-text">
        <h1>Welcome {user?.name}</h1>
        <p>Manage complaints efficiently</p>

        <div className="card-container">

          {/* VIEW COMPLAINTS (ALL / ASSIGNED) */}
          <div
            className="card"
            onClick={() => navigate("/staff/complaints")}
          >
            📋 View Complaints
          </div>

          {/* STATUS UPDATE */}
          <div
            className="card"
            onClick={() => navigate("/staff/status")}
          >
            🔄 Update Status
          </div>

          {/* ASSIGN (ONLY COORDINATOR) */}
          {user?.role === "coordinator" && (
            <div
              className="card"
              onClick={() => navigate("/staff/assign")}
            >
              📌 Assign Complaint
            </div>
          )}

          {/* REPORTS (ONLY HOD) */}
          {user?.role === "hod" && (
            <div
              className="card"
              onClick={() => navigate("/staff/reports")}
            >
              📊 View Reports
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
}