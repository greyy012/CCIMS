import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import StudentHome from "./pages/StudentHome";
import StaffHome from "./pages/StaffHome";
import ComplaintForm from "./pages/ComplaintForm";
import MyComplaints from "./pages/MyComplaints";
import StudentFeedback from "./pages/StudentFeedback";
import AllComplaints from "./pages/AllComplaints";
import AssignComplaint from "./pages/AssignComplaint";
import ProcessComplaints from "./pages/ProcessComplaints";
import Home from "./pages/Home";
import History from "./pages/History";
import UpdateStatus from "./pages/UpdateStatus";
import Reports from "./pages/Reports";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/student"
          element={
            <ProtectedRoute roles={["student"]}>
              <StudentHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/complaint"
          element={
            <ProtectedRoute roles={["student"]}>
              <ComplaintForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my"
          element={
            <ProtectedRoute roles={["student"]}>
              <MyComplaints />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feedback"
          element={
            <ProtectedRoute roles={["student"]}>
              <StudentFeedback />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff"
          element={
            <ProtectedRoute roles={["staff"]}>
              <StaffHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all"
          element={
            <ProtectedRoute roles={["staff"]}>
              <AllComplaints />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assign"
          element={
            <ProtectedRoute roles={["staff"]}>
              <AssignComplaint />
            </ProtectedRoute>
          }
        />
        <Route
          path="/process"
          element={
            <ProtectedRoute roles={["staff"]}>
              <ProcessComplaints />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute roles={["staff"]}>
              <History />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update"
          element={
            <ProtectedRoute roles={["staff"]}>
              <UpdateStatus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute roles={["staff"]}>
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
