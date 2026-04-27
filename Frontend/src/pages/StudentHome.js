import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

export default function StudentHome() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="center-text">
        <h1>Welcome Student</h1>

        <div className="card-container">
          <div
            className="card"
            onClick={() => navigate("/complaint")}
          >
            Register Complaint
          </div>

          <div
            className="card"
            onClick={() => navigate("/my")}
          >
            Track Status
          </div>
        </div>
      </div>
    </Layout>
  );
}