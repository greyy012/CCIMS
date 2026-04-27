import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="main-container">
      <Header />

      <div className="content">
        <Sidebar />
        <div className="page">{children}</div>
      </div>
    </div>
  );
}