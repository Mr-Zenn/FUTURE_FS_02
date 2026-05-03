import { useNavigate } from "react-router-dom";
import { RiSunLine, RiMoonLine, RiLogoutBoxLine, RiPieChartLine } from "react-icons/ri";
import useTheme from "../hooks/useTheme";

export default function Navbar() {
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <RiPieChartLine className="nav-logo-icon" />
        <span>Mini CRM</span>
        {role === "admin" && <span className="role-badge">Admin</span>}
      </div>

      <div className="nav-actions">
        <button className="btn-icon-nav" onClick={toggle} title="Toggle theme" aria-label="Toggle theme">
          {theme === "light" ? <RiMoonLine size={18} /> : <RiSunLine size={18} />}
        </button>
        <button className="btn btn-ghost" onClick={handleLogout}>
          <RiLogoutBoxLine size={15} />
          Logout
        </button>
      </div>
    </nav>
  );
}
