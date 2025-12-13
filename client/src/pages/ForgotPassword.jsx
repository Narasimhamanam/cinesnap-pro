import { useState } from "react";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const navigate = useNavigate();

  const handleSend = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    try {
      await api.post("/auth/forgot-password", { email });

      // success message (optional – you also redirect)
      setInfo("OTP sent to your email");
      navigate("/verify-otp", { state: { email } });
    } catch (err) {
      const status = err.response?.status;
      const msgFromServer = err.response?.data?.message;

      if (status === 404) {
        setError("This email is not registered");
      } else if (msgFromServer) {
        setError(msgFromServer);
      } else {
        setError("Failed to send OTP");
      }
    }
  };

  return (
    <div className="form-wrapper">
      <div className="card">
        <h2 className="card-title">Forgot Password?</h2>
        <p className="card-subtitle">Enter your registered email.</p>

        {info && <p style={{ color: "lime", fontSize: "0.85rem" }}>{info}</p>}
        {error && <p className="error-text">{error}</p>}

        <form className="form" onSubmit={handleSend}>
          <input
            className="input"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="btn" type="submit">
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
