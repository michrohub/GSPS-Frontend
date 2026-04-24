import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const query = new URLSearchParams(window.location.search);
const refCode = query.get("ref");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "123456",
    confirmPassword: "123456",
    referredBy: refCode || null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }
    setLoading(true);
    setError("");

    

    try {
      const res = await signup(formData);
      navigate("/verify-otp", { state: { email: formData.email } });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative px-4 py-12"
      style={{ backgroundImage: "url('/images/auth-bg.png')" }}
    >
      <div className="absolute inset-0 bg-gsps-blue/40 backdrop-blur-[2px]"></div>

      <div className="relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-10 shadow-2xl">
        <div className="text-center mb-8">
          <Link to="/">
            <img src="/logo2.png" alt="GSPS Logo" className="h-12 mx-auto mb-4" />
          </Link>
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-blue-100/80">Join thousands of students saving on payments</p>
        </div>

        {error && <div className="bg-red-500/20 text-red-200 p-3 rounded-xl mb-6 text-center font-bold border border-red-500/30">{error}</div>}

        <form className="space-y-5" onSubmit={handleSignup}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/90 ml-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="John Doe"
              required
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gsps-green/50 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90 ml-1">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="student@university.edu"
                required
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gsps-green/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90 ml-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                placeholder="+1 234 567 890"
                required
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gsps-green/50 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90 ml-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                required
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gsps-green/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90 ml-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                required
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gsps-green/50 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gsps-green text-white font-bold py-3.5 rounded-xl shadow-lg shadow-gsps-green/20 hover:bg-gsps-green/90 transition-all active:scale-[0.98] mt-2 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-8 text-white/70">
          Already have an account?{" "}
          <Link to="/login" className="text-gsps-green font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
