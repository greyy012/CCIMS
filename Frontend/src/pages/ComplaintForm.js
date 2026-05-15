import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createComplaint } from "../features/complaint/complaintSlice";
import { getCategoriesApi } from "../features/complaint/complaintAPI";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function ComplaintForm() {
  const [form, setForm] = useState({
    category_id: "",
    branch: "",
    description: "",
  });

  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔥 LOAD CATEGORIES FROM DB
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await getCategoriesApi();

      console.log("CATEGORIES:", res.data); 

     
      setCategories(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log("CATEGORY ERROR:", err);
      setCategories([]);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.category_id || !form.branch || !form.description) {
      alert("All fields required ❌");
      return;
    }

    if (!user || !user.id) {
      alert("User not logged in ❌");
      return;
    }

    dispatch(
      createComplaint({
        description: form.description,
        category_id: form.category_id, 
        prn_id: user.id,
      })
    );

    alert("Complaint Submitted ");
    navigate("/student");
  };

  return (
    <Layout>
      <div className="glass-card">
        <h2>File a Complaint</h2>

        <form onSubmit={handleSubmit}>

          
          <select
            value={form.category_id}
            onChange={(e) =>
              setForm({ ...form, category_id: e.target.value })
            }
          >
            <option value="">Select Category</option>

            {categories.length > 0 ? (
              categories.map((cat) => (
                <option
                  key={cat.Category_ID || cat.category_id}
                  value={cat.Category_ID || cat.category_id}
                >
                  {cat.Name || cat.name}
                </option>
              ))
            ) : (
              <option disabled>Loading...</option>
            )}
          </select>

          {/* BRANCH */}
          <select
            value={form.branch}
            onChange={(e) =>
              setForm({ ...form, branch: e.target.value })
            }
          >
            <option value="">Select Course</option>
            <option>MSC</option>
            <option>PGDCA</option>
            <option>Financial Mathematics</option>
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