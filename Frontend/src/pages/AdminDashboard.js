import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import PieChartCard from "../components/PieChartCard";
import { getUser } from "../utils/auth";
import {
  getAdminDashboardApi,
  getAdminStatusStatsApi,
  getAdminCategoryStatsApi,
  getAdminStaffApi,
  addAdminStaffApi,
  updateAdminStaffApi,
  deleteAdminStaffApi,
  getAdminCategoriesApi,
  addAdminCategoryApi,
  updateAdminCategoryApi,
  deleteAdminCategoryApi,
  getAdminStudentsApi,
  addAdminStudentApi,
  deleteAdminStudentApi,
  getAdminComplaintsApi,
  getAdminAnnouncementsApi,
  addAdminAnnouncementApi,
  deleteAdminAnnouncementApi,
  getAdminFeedbackApi,
} from "../features/admin/adminAPI";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "staff", label: "Staff" },
  { id: "categories", label: "Categories" },
  { id: "students", label: "Students" },
  { id: "complaints", label: "Complaints" },
  { id: "feedback", label: "Feedback" },
  { id: "announcements", label: "Announcements" },
];

export default function AdminDashboard() {
  const user = getUser();
  const [tab, setTab] = useState("overview");
  const [dash, setDash] = useState({});
  const [statusStats, setStatusStats] = useState([]);
  const [categoryStats, setCategoryStats] = useState([]);
  const [staff, setStaff] = useState([]);
  const [categories, setCategories] = useState([]);
  const [students, setStudents] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  const [staffForm, setStaffForm] = useState({ staff_id: "", name: "", role: "", password: "" });
  const [catName, setCatName] = useState("");
  const [editCat, setEditCat] = useState({ id: "", name: "" });
  const [studentForm, setStudentForm] = useState({
    prn_id: "", name: "", email: "", password: "", course: "",
  });
  const [announceForm, setAnnounceForm] = useState({ title: "", message: "" });

  useEffect(() => {
    loadOverview();
  }, []);

  useEffect(() => {
    if (tab === "staff") loadStaff();
    if (tab === "categories") loadCategories();
    if (tab === "students") loadStudents();
    if (tab === "complaints") loadComplaints();
    if (tab === "feedback") loadFeedback();
    if (tab === "announcements") loadAnnouncements();
  }, [tab]);

  const loadOverview = async () => {
    try {
      const [d, s, c] = await Promise.all([
        getAdminDashboardApi(),
        getAdminStatusStatsApi(),
        getAdminCategoryStatsApi(),
      ]);
      setDash(d.data);
      setStatusStats(s.data);
      setCategoryStats(c.data);
    } catch (e) {
      console.error(e);
    }
  };

  const loadStaff = async () => {
    const res = await getAdminStaffApi();
    setStaff(res.data);
  };
  const loadCategories = async () => {
    const res = await getAdminCategoriesApi();
    setCategories(res.data);
  };
  const loadStudents = async () => {
    const res = await getAdminStudentsApi();
    setStudents(res.data);
  };
  const loadComplaints = async () => {
    const res = await getAdminComplaintsApi();
    setComplaints(res.data);
  };
  const loadFeedback = async () => {
    try {
      const res = await getAdminFeedbackApi();
      setFeedback(res.data || []);
    } catch (e) {
      console.error(e);
      setFeedback([]);
    }
  };
  const loadAnnouncements = async () => {
    const res = await getAdminAnnouncementsApi();
    setAnnouncements(res.data);
  };

  const handleAddStaff = async (e) => {
    e.preventDefault();
    try {
      await addAdminStaffApi(staffForm);
      alert("Staff added");
      setStaffForm({ staff_id: "", name: "", role: "", password: "" });
      loadStaff();
      loadOverview();
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await addAdminCategoryApi({ name: catName });
      setCatName("");
      loadCategories();
      loadOverview();
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    }
  };

  const handleUpdateCategory = async () => {
    try {
      await updateAdminCategoryApi({
        category_id: editCat.id,
        name: editCat.name,
      });
      setEditCat({ id: "", name: "" });
      loadCategories();
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      await addAdminStudentApi(studentForm);
      alert("Student added");
      setStudentForm({ prn_id: "", name: "", email: "", password: "", course: "" });
      loadStudents();
      loadOverview();
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    }
  };

  const handleAnnouncement = async (e) => {
    e.preventDefault();
    try {
      await addAdminAnnouncementApi({
        ...announceForm,
        created_by: user?.name,
      });
      setAnnounceForm({ title: "", message: "" });
      loadAnnouncements();
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    }
  };

  return (
    <Layout>
      <div className="admin-page">
        <h1>Admin Control Panel</h1>
        <p className="dashboard-sub">Welcome, {user?.name}</p>

        <div className="admin-tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={tab === t.id ? "active" : ""}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <>
            <div className="stats-container">
              <div className="stat-card"><h3>{dash.total_complaints || 0}</h3><p>Complaints</p></div>
              <div className="stat-card red"><h3>{dash.pending || 0}</h3><p>Pending</p></div>
              <div className="stat-card orange"><h3>{dash.in_progress || 0}</h3><p>In Progress</p></div>
              <div className="stat-card green"><h3>{dash.resolved || 0}</h3><p>Resolved</p></div>
              <div className="stat-card"><h3>{dash.total_students || 0}</h3><p>Students</p></div>
              <div className="stat-card"><h3>{dash.total_staff || 0}</h3><p>Staff</p></div>
              <div className="stat-card"><h3>{dash.total_feedback || 0}</h3><p>Feedback</p></div>
            </div>

            <div className="charts-row">
              <PieChartCard title="By Status" stats={statusStats} nameKey="Status" useStatusColors />
              <PieChartCard title="By Category" stats={categoryStats} nameKey="Category_Name" />
            </div>
          </>
        )}

        {tab === "staff" && (
          <div className="glass-card admin-section">
            <h3>Add Staff</h3>
            <form className="admin-form" onSubmit={handleAddStaff}>
              <input placeholder="Staff ID" value={staffForm.staff_id} onChange={(e) => setStaffForm({ ...staffForm, staff_id: e.target.value })} required />
              <input placeholder="Name" value={staffForm.name} onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })} required />
              <input placeholder="Role (hod / coordinator / teacher)" value={staffForm.role} onChange={(e) => setStaffForm({ ...staffForm, role: e.target.value })} />
              <input type="password" placeholder="Password" value={staffForm.password} onChange={(e) => setStaffForm({ ...staffForm, password: e.target.value })} required />
              <button type="submit" className="login-btn">Add Staff</button>
            </form>
            <table>
              <thead><tr><th>ID</th><th>Name</th><th>Role</th><th>Action</th></tr></thead>
              <tbody>
                {staff.map((s) => (
                  <tr key={s.Staff_ID}>
                    <td>{s.Staff_ID}</td>
                    <td>{s.Name}</td>
                    <td>{s.Role}</td>
                    <td>
                      <button type="button" className="btn-small" onClick={async () => {
                        const name = prompt("New name", s.Name);
                        const role = prompt("New role", s.Role);
                        if (name !== null) {
                          await updateAdminStaffApi({ staff_id: s.Staff_ID, name, role: role ?? s.Role });
                          loadStaff();
                        }
                      }}>Edit</button>
                      <button type="button" className="btn-danger btn-small" onClick={async () => {
                        if (window.confirm("Delete this staff member?")) {
                          await deleteAdminStaffApi({ staff_id: s.Staff_ID });
                          loadStaff();
                        }
                      }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "categories" && (
          <div className="glass-card admin-section">
            <h3>Add Category</h3>
            <form className="admin-form inline-form" onSubmit={handleAddCategory}>
              <input placeholder="Category name" value={catName} onChange={(e) => setCatName(e.target.value)} required />
              <button type="submit" className="login-btn">Add</button>
            </form>
            <table>
              <thead><tr><th>ID</th><th>Name</th><th>Action</th></tr></thead>
              <tbody>
                {categories.map((c) => (
                  <tr key={c.Category_ID}>
                    <td>{c.Category_ID}</td>
                    <td>{c.Name}</td>
                    <td>
                      <button type="button" className="btn-small" onClick={() => setEditCat({ id: c.Category_ID, name: c.Name })}>Edit</button>
                      <button type="button" className="btn-danger btn-small" onClick={async () => {
                        if (window.confirm("Delete category?")) {
                          await deleteAdminCategoryApi({ category_id: c.Category_ID });
                          loadCategories();
                        }
                      }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {editCat.id && (
              <div className="edit-bar">
                <input value={editCat.name} onChange={(e) => setEditCat({ ...editCat, name: e.target.value })} />
                <button type="button" className="login-btn" onClick={handleUpdateCategory}>Save</button>
              </div>
            )}
          </div>
        )}

        {tab === "students" && (
          <div className="glass-card admin-section">
            <h3>Add Student</h3>
            <form className="admin-form" onSubmit={handleAddStudent}>
              <input placeholder="PRN" value={studentForm.prn_id} onChange={(e) => setStudentForm({ ...studentForm, prn_id: e.target.value })} required />
              <input placeholder="Name" value={studentForm.name} onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })} required />
              <input placeholder="Email" value={studentForm.email} onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })} />
              <input placeholder="Course" value={studentForm.course} onChange={(e) => setStudentForm({ ...studentForm, course: e.target.value })} />
              <input type="password" placeholder="Password" value={studentForm.password} onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })} required />
              <button type="submit" className="login-btn">Add Student</button>
            </form>
            <table>
              <thead><tr><th>PRN</th><th>Name</th><th>Email</th><th>Course</th><th>Action</th></tr></thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.PRN_ID}>
                    <td>{s.PRN_ID}</td>
                    <td>{s.Name}</td>
                    <td>{s.Email}</td>
                    <td>{s.course}</td>
                    <td>
                      <button type="button" className="btn-danger btn-small" onClick={async () => {
                        if (window.confirm("Remove student?")) {
                          await deleteAdminStudentApi({ prn_id: s.PRN_ID });
                          loadStudents();
                        }
                      }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "complaints" && (
          <div className="glass-card admin-section">
            <table>
              <thead>
                <tr><th>ID</th><th>Student</th><th>Category</th><th>Description</th><th>Status</th><th>Staff</th></tr>
              </thead>
              <tbody>
                {complaints.map((c) => (
                  <tr key={c.Complaint_ID}>
                    <td>{c.Complaint_ID}</td>
                    <td>{c.Student_Name}</td>
                    <td>{c.Category_Name}</td>
                    <td>{c.Description}</td>
                    <td><span className={`status ${c.Status?.toLowerCase().replace(/\s+/g, "-")}`}>{c.Status}</span></td>
                    <td>{c.Staff_Name || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "feedback" && (
          <div className="glass-card admin-section">
            <table>
              <thead>
                <tr><th>Student</th><th>Rating</th><th>Message</th><th>Complaint</th><th>Date</th></tr>
              </thead>
              <tbody>
                {feedback.map((f) => (
                  <tr key={f.Feedback_ID}>
                    <td>{f.Student_Name}</td>
                    <td>{"★".repeat(f.Rating)}{"☆".repeat(5 - f.Rating)}</td>
                    <td>{f.Message}</td>
                    <td>{f.Complaint_Description || "General"}</td>
                    <td>{new Date(f.Created_At).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "announcements" && (
          <div className="glass-card admin-section">
            <h3>Publish Announcement</h3>
            <form className="admin-form" onSubmit={handleAnnouncement}>
              <input placeholder="Title" value={announceForm.title} onChange={(e) => setAnnounceForm({ ...announceForm, title: e.target.value })} required />
              <textarea placeholder="Message" value={announceForm.message} onChange={(e) => setAnnounceForm({ ...announceForm, message: e.target.value })} required rows={3} />
              <button type="submit" className="login-btn">Publish</button>
            </form>
            <ul className="announce-list">
              {announcements.map((a) => (
                <li key={a.Announcement_ID} className="announce-item">
                  <strong>{a.Title}</strong>
                  <p>{a.Message}</p>
                  <small>{new Date(a.Created_At).toLocaleString()} — {a.Created_By}</small>
                  <button type="button" className="btn-danger btn-small" onClick={async () => {
                    await deleteAdminAnnouncementApi({ announcement_id: a.Announcement_ID });
                    loadAnnouncements();
                  }}>Remove</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Layout>
  );
}
