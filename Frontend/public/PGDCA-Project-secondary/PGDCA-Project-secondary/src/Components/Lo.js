import React, { useState } from "react";
import "../styles/lo.css";

function Login() {
  const [role, setRole] = useState("student");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (role === "student") {
      window.location.href = "/student";
    } else if (role === "staff") {
      window.location.href = "/admin";
    } else {
      alert("Invalid Role!");
    }
  };

  return (
    <div className="login-page">

      <div className="glow-bg"></div>

      <div className="login-container">

        <h1 className="title">MSU Portal</h1>

        {/* ROLE SWITCH */}
        <div className="role-switch">
          {["student", "staff"].map((r) => (
            <div
              key={r}
              className={`role-item ${role === r ? "active" : ""}`}
              onClick={() => setRole(r)}
            >
              {r}
            </div>
          ))}
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="form">

          <input
            type="text"
            placeholder={
              role === "student"
                ? "PRN Number"
                : "Employee ID"
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            required
          />

          <button type="submit">Login</button>

        </form>

      </div>

    </div>
  );
}

export default Login;