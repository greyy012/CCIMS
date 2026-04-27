import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Login() {
  const [role, setRole] = useState("student");
  const [identifier, setIdentifier] = useState(""); // ✅ PRN or Email
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleLogin = async () => {
  if (!identifier || !password) {
    alert("Please fill all fields ❌");
    return;
  }

  const res = await dispatch(
    loginUser({ identifier, password, role })
  );

  console.log("LOGIN RESPONSE:", res);

  if (res.meta.requestStatus === "fulfilled") {
    const user = res.payload?.user;

    if (!user) {
      alert("Invalid credentials ❌");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));

    if (user.role === "student") {
      navigate("/student");
    } else {
      navigate("/staff");
    }

  } else {
    alert(res.payload?.error || "Login failed ❌");
  }
};

  return (
    <>
    <Header/>
  <div className="login-page">  
    <div className="login-card">
      <h2>Login</h2>

      {/* ROLE TOGGLE */}
      <div className="toggle">
        <button onClick={() => setRole("student")}>Student</button>
        <button onClick={() => setRole("staff")}>Staff</button>
      </div>

      <input
        value={identifier}
        placeholder={role === "student" ? "PRN Number" : "Staff ID"}
        onChange={(e) => setIdentifier(e.target.value)}
      />

      <input
        value={password}
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="login-btn" onClick={handleLogin}>
        Login
      </button>
    </div>
  </div>
  </>
);
}