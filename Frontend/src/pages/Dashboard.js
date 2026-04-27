import { useSelector } from "react-redux";
import Layout from "../components/Layout";

const Dashboard = () => {
  const user = useSelector((s) => s.auth.user);

  return (
    <Layout role={user.role}>
      <div className="center-text">
        <h1>Welcome {user.name}</h1>

        {user.role === "student" && (
          <div className="card-container">
            <div className="card">Register Complaint</div>
            <div className="card">Track Status</div>
          </div>
        )}

        {user.role !== "student" && (
          <div className="card-container">
            <div className="card">View Complaints</div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;