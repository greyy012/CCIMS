import { useNavigate } from "react-router-dom";
// import "./styles/main.css";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="header">
      <img src="/msu.png" alt="MSU Logo" />

      <div className="header-text">
        <h1>The Maharaja Sayajirao University of Baroda</h1>
        <p>Faculty of Technology and Engineering</p>
        <p>Department of Applied Mathematics</p>
      </div>
    </div>
  );
}