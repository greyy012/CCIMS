 import React from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {

  const { role, userId } = useSelector((state) => state.auth);

  return (
    <nav className="navbar">

      <div className="navbar-right">
        <h2 className="logo-text">
          <i className="fa-solid fa-clipboard-user"></i>
          The Maharaja Sayajirao University of Baroda
        </h2>
      </div>

      <div className="navbar-left">
        <Link to="/">Home</Link>

        {/* 🔥 Show login OR user info */}
        {role ? (
          <span className="user-info">
            {role} ({userId})
          </span>
        ) : (
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        )}
      </div>

    </nav>
  );
}

export default Navbar;