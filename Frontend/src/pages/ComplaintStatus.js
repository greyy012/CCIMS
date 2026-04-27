import Sidebar from "../components/Sidebar";
import "../styles/table.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComplaints } from "../features/complaint/complaintSlice";

export default function ComplaintStatus() {
  const dispatch = useDispatch();
  const { list } = useSelector((s) => s.complaint);

  useEffect(() => {
    dispatch(getComplaints());
  }, []);

  return (
    <div className="container">
      <Sidebar />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {list.map((c) => (
            <tr key={c.Complaint_ID}>
              <td>{c.Complaint_ID}</td>
              <td>{c.Description}</td>
              <td>{c.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}