import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      
      {/* HEADER */}
      {/* <div className="header">
        <h3>MSU Baroda</h3>
        <button onClick={() => navigate("/login")}>Login</button>
      </div> */}
      <Header/>
      {/* CENTER CONTENT */}
      <div className="page">
        <div className="glass-card center-text">
          <h1>Complaint & Issue Management System</h1>

          <p>
            Department of Applied Mathematics, Faculty of Technology and Engineering,
            The Maharaja Sayajirao University of Baroda.
          </p>

          <p style={{ marginTop: "10px" }}>
            This system allows students to register complaints and track their status.
            It ensures proper communication between students and staff for faster and
            transparent resolution of issues.
          </p>

          {/* LOGIN BUTTON */}
          <div style={{ marginTop: "25px" }}>
            <button
              className="primary"
              onClick={() => navigate("/login")}
            >
              Login to Continue
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}