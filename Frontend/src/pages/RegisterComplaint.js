import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComplaint } from "../features/complaint/complaintSlice";
import Layout from "../components/Layout";

const RegisterComplaint = () => {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState(1);

  const handleSubmit = () => {
    dispatch(
      createComplaint({
        description: desc,
        category_id: category,
        prn_id: user.id
      })
    );
  };

  return (
    <Layout role="student">
      <div className="glass-card">
        <h2>File Complaint</h2>

        <textarea
          onChange={(e) => setDesc(e.target.value)}
        />

        <button onClick={handleSubmit}>Submit</button>
      </div>
    </Layout>
  );
};

export default RegisterComplaint;