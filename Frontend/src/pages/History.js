import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getHistoryApi } from "../features/complaint/complaintAPI";

export default function History() {
  const [data, setData] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
  try {
    const role =
      user.role === "staff"
        ? user.staffRole?.toLowerCase()
        : user.role;

    const res = await getHistoryApi({
      role,
      staff_id: user.id,
    });

    console.log("HISTORY DATA:", res.data);
    setData(res.data);

  } catch (err) {
    console.log("HISTORY ERROR:", err.response || err);
    alert("FAILED TO FETCH HISTORY ❌");
  }
};

  return (
    <Layout>
      <div className="glass-card">
        <h2>Complaint History</h2>

        {data.length === 0 ? (
          <p>No history found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Assigned By</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {data.map((c) => (
                <tr key={c.Complaint_ID}>
                  <td>{c.Complaint_ID}</td>
                  <td>{c.Description}</td>

                 <td>
  <span className={`status ${c.Status?.toLowerCase().replace(" ", "-")}`}>
    {c.Status}
  </span>
</td>

                  <td>{c.Staff_Name || "Not Assigned"}</td>
                  <td>{c.Assigned_By_Name || "-"}</td>
                  <td>{c.Date_Of_Complaint}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}