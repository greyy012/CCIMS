import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import {
  forgotPasswordApi,
  resetPasswordApi,
} from "../features/auth/authAPI";

export default function ForgotPassword() {
  const [role, setRole] = useState("student");
  const [identifier, setIdentifier] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verified, setVerified] = useState(false);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleVerify = async () => {
    if (!identifier) {
      alert("Please enter your PRN or Staff ID ❌");
      return;
    }

    setLoading(true);
    try {
      const res = await forgotPasswordApi({ identifier, role });
      setUserName(res.data.name);
      setVerified(true);
    } catch (err) {
      alert(err.response?.data?.error || "Account not found ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (!newPassword || !confirmPassword) {
      alert("Please fill all password fields ❌");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters ❌");
      return;
    }

    setLoading(true);
    try {
      await resetPasswordApi({ identifier, role, newPassword });
      alert("Password updated successfully ✅");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to reset password ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="login-page">
        <div className="login-card">
          <h2>Forgot Password</h2>

          <div className="toggle toggle-3">
            <button
              type="button"
              className={role === "student" ? "active" : ""}
              onClick={() => { setRole("student"); setVerified(false); }}
            >
              Student
            </button>
            <button
              type="button"
              className={role === "staff" ? "active" : ""}
              onClick={() => { setRole("staff"); setVerified(false); }}
            >
              Staff
            </button>
            <button
              type="button"
              className={role === "admin" ? "active" : ""}
              onClick={() => { setRole("admin"); setVerified(false); }}
            >
              Admin
            </button>
          </div>

          <input
            value={identifier}
            placeholder={
              role === "student"
                ? "PRN Number"
                : role === "admin"
                ? "Admin Username"
                : "Staff ID"
            }
            onChange={(e) => setIdentifier(e.target.value)}
            disabled={verified}
          />

          {!verified ? (
            <button
              type="button"
              className="login-btn"
              onClick={handleVerify}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify Account"}
            </button>
          ) : (
            <>
              <p className="forgot-hint">Hello, {userName}! Set your new password.</p>
              <input
                type="password"
                value={newPassword}
                placeholder="New password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                value={confirmPassword}
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="login-btn"
                onClick={handleReset}
                disabled={loading}
              >
                {loading ? "Updating..." : "Reset Password"}
              </button>
            </>
          )}

          <p className="forgot-link">
            <Link to="/login">← Back to Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}
