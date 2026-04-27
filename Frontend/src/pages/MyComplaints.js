import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { getStudentComplaintsApi } from "../features/complaint/complaintAPI";

export default function MyComplaints() {
  const [data, setData] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const loadData = async () => {
    try {
      const res = await getStudentComplaintsApi(user.id);
      setData(res.data);
    } catch (err) {
      console.log(err);
      alert("Error loading complaints ❌");
    }
  };

  useEffect(() => {
    if (!user || !user.id) {
      alert("User not logged in ❌");
      return;
    }

    loadData();
  }, []);

  return (
    <Layout>
      <div className="glass-card">
        <h2>My Complaints</h2>

        {data.length === 0 ? (
          <p>No complaints found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Status</th>
                <th>Assigned To</th>
              </tr>
            </thead>

            <tbody>
              {data.map((c) => (
                <tr key={c.Complaint_ID}>
                  <td>{c.Complaint_ID}</td>
                  <td>{c.Description}</td>

                  <td
                    style={{
                      color:
                        c.Status === "Resolved"
                          ? "green"
                          : c.Status === "In Progress"
                          ? "orange"
                          : "red",
                    }}
                  >
                    {c.Status}
                  </td>

                  <td>{c.Staff_Name || "Not Assigned"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}