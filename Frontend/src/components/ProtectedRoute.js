import { Navigate } from "react-router-dom";
import { getUser } from "../utils/auth";

export default function ProtectedRoute({ children, roles }) {
  const user = getUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles?.length && !roles.includes(user.role)) {
    return <Navigate to={user.role === "student" ? "/student" : user.role === "admin" ? "/admin" : "/staff"} replace />;
  }

  return children;
}
