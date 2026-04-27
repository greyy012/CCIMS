import { useState } from "react";
import { useDispatch } from "react-redux";
import { createComplaint } from "../features/complaint/complaintSlice";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function ComplaintForm() {
  const [form, setForm] = useState({
    type: "",
    branch: "",
    description: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ GET LOGGED-IN USER
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ CATEGORY MAPPING
  const categoryMap = {
    Technical: 1,
    Academic: 2,
    Mess: 3,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // validation
    if (!form.type || !form.branch || !form.description) {
      alert("All fields required ❌");
      return;
    }

    // user check
    if (!user || !user.id) {
      alert("User not logged in ❌");
      return;
    }

    // dispatch API
    dispatch(
      createComplaint({
        description: form.description,
        category_id: categoryMap[form.type], // ✅ dynamic category
        prn_id: user.id,                     // ✅ dynamic PRN
      })
    );

    alert("Complaint Submitted ✅");
    navigate("/student");
  };

  return (
    <Layout>
      <div className="glass-card">
        <h2>File a Complaint</h2>

        <form onSubmit={handleSubmit}>
          {/* TYPE */}
          <select
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
          >
            <option value="">Select Type</option>
            <option>Technical</option>
            <option>Academic</option>
            <option>Mess</option>
          </select>

          {/* BRANCH */}
          <select
            value={form.branch}
            onChange={(e) =>
              setForm({ ...form, branch: e.target.value })
            }
          >
            <option value="">Select Branch</option>
            <option>MCA</option>
            <option>BCA</option>
            <option>MSC</option>
          </select>

          {/* DESCRIPTION */}
          <textarea
            value={form.description}
            placeholder="Describe your issue..."
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <div className="btn-group">
            <button type="submit" className="primary">
              Submit
            </button>

            <button
              type="button"
              className="secondary"
              onClick={() => navigate("/student")}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}