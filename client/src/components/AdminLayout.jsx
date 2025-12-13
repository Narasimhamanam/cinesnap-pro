import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminLayout = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  // simple guard on frontend (backend still protects routes)
  if (!isAdmin) {
    navigate("/");
  }

  return (
    <div className="admin-shell">
      <div className="admin-sidebar">
        <h2 className="admin-title">Admin Panel</h2>
        <nav className="admin-nav">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              "admin-link" + (isActive ? " admin-link-active" : "")
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/movies"
            className={({ isActive }) =>
              "admin-link" + (isActive ? " admin-link-active" : "")
            }
          >
            Movies
          </NavLink>
          <NavLink
            to="/admin/screens"
            className={({ isActive }) =>
              "admin-link" + (isActive ? " admin-link-active" : "")
            }
          >
            Screens
          </NavLink>
          <NavLink
            to="/admin/shows"
            className={({ isActive }) =>
              "admin-link" + (isActive ? " admin-link-active" : "")
            }
          >
            Shows
          </NavLink>
        </nav>
      </div>

      <div className="admin-main">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
