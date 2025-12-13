import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

const OTP_LENGTH = 6;

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialEmail = location.state?.email || "";

  const [email, setEmail] = useState(initialEmail);
  const [otpDigits, setOtpDigits] = useState(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60);

  const inputsRef = useRef([]);

  const otp = otpDigits.join("");

  // countdown timer
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleDigitChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(0, 1); // only one number
    const newDigits = [...otpDigits];
    newDigits[index] = digit;
    setOtpDigits(newDigits);

    // move focus to next box if a digit was entered
    if (digit && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otpDigits[index]) {
        // clear current digit
        const newDigits = [...otpDigits];
        newDigits[index] = "";
        setOtpDigits(newDigits);
      } else if (index > 0) {
        // go back to previous box
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    const newDigits = pasted.split("");
    while (newDigits.length < OTP_LENGTH) newDigits.push("");
    setOtpDigits(newDigits);
    const lastIndex = Math.min(pasted.length, OTP_LENGTH) - 1;
    inputsRef.current[lastIndex]?.focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    if (otp.length !== OTP_LENGTH) {
      setError("Enter valid 6-digit OTP");
      return;
    }

    try {
      await api.post("/auth/verify-otp", { email, otp });
      navigate("/reset-password", { state: { email, otp } });
    } catch {
      setError("Invalid or expired OTP");
    }
  };

  const handleResend = async () => {
    setError("");
    if (!email) {
      setError("Enter your email to resend OTP");
      return;
    }
    try {
      await api.post("/auth/forgot-password", { email });
      setTimer(60);
    } catch {
      setError("Failed to resend OTP");
    }
  };

  return (
    <div className="form-wrapper">
      <div className="card">
        <h2 className="card-title">Verify OTP</h2>
        <p className="card-subtitle">
          We’ve sent a 6-digit code to your email. Enter it below to continue.
        </p>

        {error && <p className="error-text">{error}</p>}

        <form className="form" onSubmit={handleVerify}>
          <div>
            <div className="label">Email</div>
            <input
              className="input"
              placeholder="Registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <div className="label">Enter OTP</div>
            <div
              className="otp-row"
              onPaste={handlePaste}
            >
              {otpDigits.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  className="otp-input"
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                />
              ))}
            </div>
          </div>

          <button
            className="btn"
            type="submit"
            disabled={otp.length !== OTP_LENGTH || !email}
            style={{
              opacity: otp.length === OTP_LENGTH && email ? 1 : 0.5,
              cursor:
                otp.length === OTP_LENGTH && email ? "pointer" : "not-allowed",
            }}
          >
            Verify OTP
          </button>
        </form>

        <div style={{ marginTop: "12px", textAlign: "center", fontSize: "0.85rem" }}>
          {timer > 0 ? (
            <p style={{ color: "var(--text-muted)" }}>
              Didn’t get the code? Resend in <strong>{timer}s</strong>
            </p>
          ) : (
            <button
              className="btn-outline btn"
              type="button"
              onClick={handleResend}
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
