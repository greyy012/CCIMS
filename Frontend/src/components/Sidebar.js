import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const navigate = useNavigate();

  const reduxUser = useSelector((state) => state.auth.user);
  const user = reduxUser || JSON.parse(localStorage.getItem("user"));

  if (!user) return null;

  const role = user.role?.toLowerCase();
  const staffRole = user.staffRole?.toLowerCase();

  return (
    <div className="sidebar">
      <button onClick={() => navigate("/")}>Home</button>

      {/* STUDENT */}
      {role === "student" && (
        <>
          <button onClick={() => navigate("/complaint")}>
            Register Complaint
          </button>

          <button onClick={() => navigate("/my")}>
            My Complaints
          </button>
        </>
      )}

      {/* STAFF */}
      {role === "staff" && (
        <>
          {/* HOD */}
          {staffRole === "hod" && (
            <>
              <button onClick={() => navigate("/all")}>
                All Complaints
              </button>

              <button onClick={() => navigate("/history")}>
                Reports / History
              </button>
            </>
          )}

          {/* COORDINATOR */}
          {staffRole === "coordinator" && (
            <>
              <button onClick={() => navigate("/process")}>
                New Complaints
              </button>

              <button onClick={() => navigate("/history")}>
                Complaint History
              </button>
            </>
          )}

          {/* RESOLVER */}
          {staffRole !== "hod" && staffRole !== "coordinator" && (
  <>
    <button onClick={() => navigate("/update")}>
      My Assigned Complaints
    </button>

    <button onClick={() => navigate("/history")}>
      My History
    </button>
  </>
)}
        </>
      )}
    </div>
  );
}