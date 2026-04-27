import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";   // 👈 ADD THIS
import StudentHome from "./pages/StudentHome";
import StaffHome from "./pages/StaffHome";
import ComplaintForm from "./pages/ComplaintForm";
import MyComplaints from "./pages/MyComplaints";
import AllComplaints from "./pages/AllComplaints";
import AssignComplaint from "./pages/AssignComplaint";
import ProcessComplaints from "./pages/ProcessComplaints";
import Home from "./pages/Home";
import History from "./pages/History";





function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN FIRST */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* STUDENT */}
        <Route path="/student" element={<StudentHome />} />
        <Route path="/complaint" element={<ComplaintForm />} />
<Route path="/my" element={<MyComplaints />} />
        {/* STAFF */}
        <Route path="/staff" element={<StaffHome />} />
        <Route path="/all" element={<AllComplaints />} />
<Route path="/assign" element={<AssignComplaint />} />
<Route path="/process" element={<ProcessComplaints />} />
<Route path="/history" element={<History />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;