import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, isAdmin, logout, isAuthenticated } = useAuth(); // include isAuthenticated
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand */}
        <Link to="/" className="brand">
          <div className="brand-logo">🎬</div>
          <div className="brand-title">CineSnap</div>
        </Link>

        <div className="nav-actions">
          {/* ADMIN LINK */}
          {isAdmin && (
            <Link to="/admin">
              <button className="btn-outline btn">Admin</button>
            </Link>
          )}

          {/* USER NAME */}
          {user && <span className="nav-username">Hi, {user.name}</span>}

          {/* WHEN USER NOT LOGGED IN */}
          {!user && (
            <>
              <Link to="/login">
                <button className="btn-outline btn">Login</button>
              </Link>
              <Link to="/register">
                <button className="btn">Register</button>
              </Link>
            </>
          )}

          {/* WHEN USER LOGGED IN */}
          {user && (
            <>
              {/* My Tickets button */}
              {isAuthenticated && (
                <button
                  className="btn-outline btn"
                  onClick={() => navigate("/my-bookings")}
                >
                  My Tickets
                </button>
              )}

              {/* Logout button */}
              <button className="btn-outline btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
