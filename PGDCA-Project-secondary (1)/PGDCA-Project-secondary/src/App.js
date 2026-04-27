import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { noop } from 'antd/es/_util/warning';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import Login from './Components/Lo';
import Navbar from './Components/Navbar';

import Home from './Components/Home';
import Forgot from "./Components/Forgot";
// import Counter from './Components/Counter';

//Student Components
import StudentDashboard from "./Components/Studentdash";
import ComplaintForm from "./Components/StudentComplaint";
import StatusPage from "./Components/StudentStatuscheck";
import FeedbackPage from "./Components/StudentFeedback";

//Admin Components
import AdminDashboard from "./Components/Admindash";
import AdminStatus from "./Components/AdminStatus";
import AdminFeedback from "./Components/AdminFeedback";
import AdminComplaints from "./Components/AdminComplaint";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        {/* <Login /> */}


        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/login' element={<Login />} /> */}
        <Route path='/login' element={<Login />} />
          <Route path='/forgot' element={<Forgot />} />


          {/* Student Routes */}
          <Route path="/student" element={<StudentDashboard />} />
          <Route path='/complaint' element={<ComplaintForm />} />
          <Route path='/status' element={<StatusPage />} />
          <Route path='/feedback' element={<FeedbackPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/status" element={<AdminStatus />} />
          <Route path="/admin/feedback" element={<AdminFeedback />} />
          <Route path="/admin/complaints" element={<AdminComplaints />} />
        </Routes>

      </Router>

    </>);
}

export default App;
