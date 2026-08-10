import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logout } from "../features/auth/authSlice";
import { getUser, homePath } from "../utils/auth";

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  const reduxUser = useSelector((state) => state.auth.user);
  const user = reduxUser || getUser();

  if (!user) return null;

  const role = user.role?.toLowerCase();
  const staffRole = user.staffRole?.toLowerCase();
  const home = homePath(user);

  const menu = [
    { label: "Dashboard", icon: "🏠", path: home },

    ...(role === "student"
      ? [
          { label: "Register", icon: "📝", path: "/complaint" },
          { label: "My Complaints", icon: "📊", path: "/my" },
          { label: "Feedback", icon: "💬", path: "/feedback" },
        ]
      : []),

    ...(role === "admin"
      ? [{ label: "Control Panel", icon: "⚙️", path: "/admin" }]
      : []),

    ...(role === "staff" && staffRole === "hod"
      ? [
          { label: "Dashboard", icon: "📈", path: "/staff" },
          { label: "All Complaints", icon: "📋", path: "/all" },
          { label: "Reports", icon: "📊", path: "/reports" },
        ]
      : []),

    ...(role === "staff" && staffRole === "coordinator"
      ? [
          { label: "Dashboard", icon: "📈", path: "/staff" },
          { label: "Process", icon: "⚙️", path: "/process" },
          { label: "History", icon: "📜", path: "/history" },
        ]
      : []),

    ...(role === "staff" &&
    staffRole &&
    staffRole !== "hod" &&
    staffRole !== "coordinator"
      ? [
          { label: "Dashboard", icon: "📈", path: "/staff" },
          { label: "Update Status", icon: "🔄", path: "/update" },
          { label: "My History", icon: "📜", path: "/history" },
        ]
      : []),
  ];

  const uniqueMenu = menu.filter(
    (item, i, arr) => arr.findIndex((m) => m.path === item.path) === i
  );

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className={open ? "sidebar" : "sidebar collapsed"}>
      <div className="toggle-btn" onClick={() => setOpen(!open)}>
        {open ? "⬅" : "➡"}
      </div>

      <div className="sidebar-user">
        {open && (
          <>
            <strong>{user.name}</strong>
            <small>
              {role === "admin"
                ? "Administrator"
                : role === "student"
                ? "Student"
                : staffRole || "Staff"}
            </small>
          </>
        )}
      </div>

      <div className="menu">
        {uniqueMenu.map((item, i) => (
          <div
            key={i}
            className="menu-item"
            onClick={() => navigate(item.path)}
          >
            <span className="icon">{item.icon}</span>
            {open && <span className="label">{item.label}</span>}
            {!open && <span className="tooltip">{item.label}</span>}
          </div>
        ))}

        <div className="menu-item logout-item" onClick={handleLogout}>
          <span className="icon">🚪</span>
          {open && <span className="label">Logout</span>}
        </div>
      </div>
    </div>
  );
}
