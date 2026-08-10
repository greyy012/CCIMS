import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import { homePath } from "../utils/auth";

export default function Login() {
  const [role, setRole] = useState("student");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!identifier || !password) {
      alert("Please fill all fields");
      return;
    }

    const res = await dispatch(loginUser({ identifier, password, role }));

    if (res.meta.requestStatus === "fulfilled") {
      const user = res.payload?.user;
      if (!user) {
        alert("Invalid credentials");
        return;
      }
      localStorage.setItem("user", JSON.stringify(user));
      navigate(homePath(user));
    } else {
      const err =
        res.payload?.error ||
        res.payload?.message ||
        "Login failed. Check credentials and that the server is running.";
      alert(err);
    }
  };

  const idPlaceholder =
    role === "student"
      ? "PRN Number"
      : role === "admin"
      ? "Admin Username"
      : "Staff ID";

  return (
    <>
      <Header />
      <div className="login-page">
        <div className="login-card">
          <h2>Login</h2>

          <div className="toggle toggle-3">
            <button
              type="button"
              className={role === "student" ? "active" : ""}
              onClick={() => setRole("student")}
            >
              Student
            </button>
            <button
              type="button"
              className={role === "staff" ? "active" : ""}
              onClick={() => setRole("staff")}
            >
              Staff
            </button>
            <button
              type="button"
              className={role === "admin" ? "active" : ""}
              onClick={() => setRole("admin")}
            >
              Admin
            </button>
          </div>

          <input
            value={identifier}
            placeholder={idPlaceholder}
            onChange={(e) => setIdentifier(e.target.value)}
          />

          <input
            value={password}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />

          <button type="button" className="login-btn" onClick={handleLogin}>
            Login
          </button>

          <p className="forgot-link">
            <Link to="/forgot-password">Forgot password?</Link>
          </p>

          {role === "admin" && (
            <p className="forgot-hint">Default: username admin / password admin123</p>
          )}
        </div>
      </div>
    </>
  );
}
