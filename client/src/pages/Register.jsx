import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/register", form);
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="form-wrapper">
      <div className="card">
        <h2 className="card-title">Create your account</h2>
        <p className="card-subtitle">
          Join CineSnap and start booking tickets in a few clicks.
        </p>
        {error && <p className="error-text">{error}</p>}
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <div className="label">Name</div>
            <input
              className="input"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
            />
          </div>
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
              placeholder="Create a strong password"
            />
          </div>
          <button className="btn" type="submit">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
