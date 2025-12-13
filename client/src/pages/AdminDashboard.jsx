import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="page-title" style={{ fontSize: "1.4rem" }}>
        Welcome, {user?.name}
      </h1>
      <p className="page-subtitle">
        Use the sidebar to manage movies, screens, and shows in CineSnap.
      </p>

      <div
        style={{
          marginTop: "1rem",
          padding: "1rem",
          borderRadius: "16px",
          border: "1px solid rgba(148,163,184,0.5)",
          background: "rgba(15,23,42,0.85)",
        }}
      >
        <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
          This admin area is only visible for users with the <b>ADMIN</b> role.
          You can showcase this in viva as a separate module for staff to manage
          movies & showtimes while students act as end users booking tickets.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
