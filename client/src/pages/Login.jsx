import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import api from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from || "/";

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", form);
      login(res.data.user, res.data.token);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="form-wrapper">
      <div className="card">
        <h2 className="card-title">Welcome back</h2>
        <p className="card-subtitle">
          Login to continue booking your favourite movies.
        </p>

        {error && <p className="error-text">{error}</p>}

        <form className="form" onSubmit={handleSubmit}>
          <div>
            <div className="label">Email</div>
            <input
              className="input"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <div className="label">Password</div>
            <input
              className="input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Your password"
            />
          </div>

          {/* Forgot password link */}
          <p
            style={{
              marginTop: "-4px",
              marginBottom: "10px",
              textAlign: "right",
              fontSize: "0.8rem",
            }}
          >
            <Link
              to="/forgot-password"
              style={{ color: "#8b93ff", textDecoration: "none" }}
            >
              Forgot password?
            </Link>
          </p>

          <button className="btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
