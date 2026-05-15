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

  <h1>Complaint Management System</h1>

  <p>
    A smart platform for managing student complaints with real-time tracking,
    staff assignment, and performance analytics.
  </p>

  <div className="card-container">

    <div className="card">
      📌 Easy Complaint Registration
    </div>

    <div className="card">
      🔄 Real-time Status Tracking
    </div>

    <div className="card">
      📊 Analytics & Reports
    </div>

  </div>

  <div style={{ marginTop: "25px" }}>
    <button className="primary" onClick={() => navigate("/login")}>
      Get Started →
    </button>
  </div>

</div>
      </div>

    </div>
  );
}