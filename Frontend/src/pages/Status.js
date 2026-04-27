import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComplaints } from "../features/complaint/complaintSlice";
import Layout from "../components/Layout";

const Status = () => {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);
  const complaints = useSelector((s) => s.complaint.list);

  useEffect(() => {
    dispatch(fetchComplaints({ id: user.id, role: user.role }));
  }, []);

  return (
    <Layout role="student">
      <div className="glass-card">
        <h2>Status</h2>

        <table>
          <tbody>
            {complaints.map((c) => (
              <tr key={c.Complaint_ID}>
                <td>{c.Description}</td>
                <td>{c.Status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Status;