import React from "react";
import "../styles/home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">
        
        <h1>Complaint & Issue Management System</h1>
        <p>Raise, Track and Resolve Issues Efficiently</p>

        <div className="hero-buttons">
            <Link to="/login" style={{textDecoration:"none"}}>
            <button>Raise Complaint</button>
            </Link>
            <Link to="/login" style={{textDecoration:"none"}}>
            <button className="secondary">Track Complaint</button>
            </Link> 

          
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Our Features</h2>

        <div className="cards">
          <div className="card">
            <h3>Student Portal</h3>
            <p>Students can submit complaints easily.</p>
          </div>

          <div className="card">
            <h3>Staff Management</h3>
            <p>Staff can manage and resolve complaints.</p>
          </div>

          <div className="card">
            <h3>Admin Dashboard</h3>
            <p>Admin monitors all activities.</p>
          </div>

          <div className="card">
            <h3>Status Tracking</h3>
            <p>Track complaint progress in real-time.</p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="steps">
        <h2>How It Works</h2>

        <div className="step-box">
          <div>1. Login</div>
          <div>2. Submit Complaint</div>
          <div>3. Track Status</div>
          <div>4. Get Resolution</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 Complaint & Issue Management System</p>
      </footer>

    </div>
  );
}

export default Home;