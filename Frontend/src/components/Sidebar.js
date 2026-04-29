import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const reduxUser = useSelector((state) => state.auth.user);
  const user = reduxUser || JSON.parse(localStorage.getItem("user"));

  if (!user) return null;

  const role = user.role?.toLowerCase();
  const staffRole = user.staffRole?.toLowerCase();

  const menu = [
    { label: "Home", icon: "🏠", path: "/" },

    ...(role === "student"
      ? [
          { label: "Register", icon: "📝", path: "/complaint" },
          { label: "My Complaints", icon: "📊", path: "/my" },
        ]
      : []),

    ...(role === "staff" && staffRole === "hod"
      ? [
          { label: "All Complaints", icon: "📋", path: "/all" },
          { label: "Reports", icon: "📊", path: "/reports" },
        ]
      : []),

    ...(role === "staff" && staffRole === "coordinator"
      ? [
          { label: "Process", icon: "⚙️", path: "/process" },
          { label: "History", icon: "📜", path: "/history" },
        ]
      : []),

    ...(role === "staff" &&
    staffRole !== "hod" &&
    staffRole !== "coordinator"
      ? [
          { label: "Update Status", icon: "🔄", path: "/update" },
          { label: "My History", icon: "📜", path: "/history" },
        ]
      : []),
  ];

  return (
    <div className={open ? "sidebar" : "sidebar collapsed"}>
      
      {/* Toggle */}
      <div className="toggle-btn" onClick={() => setOpen(!open)}>
        {open ? "⬅" : "➡"}
      </div>

      {/* Menu */}
      <div className="menu">
        {menu.map((item, i) => (
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
      </div>
    </div>
  );
}