import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axiosInstance";

const ResetPassword = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  if (!state) return <p>Invalid access</p>;

  const handleReset = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    try {
      await api.post("/auth/reset-password", {
        email: state.email,
        otp: state.otp,
        newPassword: password,
      });

      setMsg("Password reset successful ✓");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch {
      setError("Reset failed");
    }
  };

  return (
    <div className="form-wrapper">
      <div className="card">
        <h2 className="card-title">Set new password</h2>
        <p className="card-subtitle">
          Your OTP has been verified. Create your new password below.
        </p>

        {msg && <p style={{ color: "lime", fontWeight: "600" }}>{msg}</p>}
        {error && <p className="error-text">{error}</p>}

        <form className="form" onSubmit={handleReset}>
          <input
            className="input"
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn">Update Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
