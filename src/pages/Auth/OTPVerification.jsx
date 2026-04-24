import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const OTPVerification = () => {
  const { verifyOTP } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (!email) {
      navigate("/signup");
    }
  }, [email, navigate]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      return setError("Please enter all 6 digits");
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await verifyOTP(email, otpString);
      setSuccess("Email verified successfully! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;

    setResending(true);
    setError("");
    setSuccess("");

    try {
      await api.post("/auth/resend-otp", { email });
      setSuccess("New OTP sent to your email!");
      setTimer(60);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative px-4 py-12"
      style={{ backgroundImage: "url('/images/auth-bg.png')" }}
    >
      <div className="absolute inset-0 bg-gsps-blue/40 backdrop-blur-[2px]"></div>

      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-10 shadow-2xl">
        <div className="text-center mb-8">
          <Link to="/">
            <img src="/logo2.png" alt="GSPS Logo" className="h-12 mx-auto mb-4" />
          </Link>
          <h2 className="text-3xl font-bold text-white mb-2">Verify Email</h2>
          <p className="text-blue-100/80">We've sent a 6-digit code to <br /><span className="text-white font-semibold">{email}</span></p>
        </div>

        {error && <div className="bg-red-500/20 text-red-200 p-3 rounded-xl mb-6 text-center font-bold border border-red-500/30">{error}</div>}
        {success && <div className="bg-gsps-green/20 text-green-200 p-3 rounded-xl mb-6 text-center font-bold border border-gsps-green/30">{success}</div>}

        <form className="space-y-8" onSubmit={handleVerify}>
          <div className="flex justify-between gap-2">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-14 bg-white/10 border border-white/20 rounded-xl text-white text-center text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-gsps-green/50 transition-all"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gsps-green text-white font-bold py-3.5 rounded-xl shadow-lg shadow-gsps-green/20 hover:bg-gsps-green/90 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="text-center mt-8">
          <p className="text-white/70 mb-2">Didn't receive the code?</p>
          <button 
            onClick={handleResend}
            disabled={timer > 0 || resending}
            className={`font-bold transition-all ${timer > 0 ? 'text-white/40' : 'text-gsps-green hover:underline'}`}
          >
            {resending ? "Resending..." : timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
          </button>
        </div>

        <p className="text-center mt-8 text-white/70">
          <Link to="/signup" className="hover:text-white transition-all underline decoration-white/20">
            Back to Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default OTPVerification;
