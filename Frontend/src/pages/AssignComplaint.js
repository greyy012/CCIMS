import { useEffect, useState } from "react";
import {
  getComplaintsApi,
  assignComplaintApi,
} from "../features/complaint/complaintAPI";
import Layout from "../components/Layout";

export default function AssignComplaint() {
  const [data, setData] = useState([]);
  const [staffList, setStaffList] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getComplaintsApi({
      role: "coordinator",
    });

    setData(res.data);

    // dummy staff list (replace with API later)
    setStaffList([
      { id: 201, name: "Rahul" },
      { id: 202, name: "Amit" },
    ]);
  };

  const assign = async (complaintId, staffId, staffName) => {
    await assignComplaintApi({
      complaint_id: complaintId,
      staff_id: staffId,
      staff_name: staffName,
      role: "coordinator",
      assigned_by: user.id,
    });

    alert("Assigned ✅");
    load();
  };

  return (
    <Layout>
      <div className="glass-card">
        <h2>Assign Complaints</h2>

        {data.map((c) => (
          <div key={c.Complaint_ID}>
            <p>{c.Description}</p>

            <select
              onChange={(e) => {
                const s = staffList.find(
                  (x) => x.id == e.target.value
                );
                assign(c.Complaint_ID, s.id, s.name);
              }}
            >
              <option>Select Staff</option>
              {staffList.map((s) => (
                <option value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </Layout>
  );
}