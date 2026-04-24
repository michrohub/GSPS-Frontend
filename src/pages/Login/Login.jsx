import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen bg-gsps-bg-light flex items-center justify-center p-4 py-32 sm:py-40">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gsps-green/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gsps-blue/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-xl bg-white rounded-[50px] shadow-3xl p-8 sm:p-16 relative z-10 border border-white">
        <div className="text-center mb-12">
          <Link to="/" className="inline-block mb-8">
            <img src="/logo2.png" alt="GSPS" className="h-10 mx-auto" />
          </Link>
          <h1 className="text-3xl sm:text-4xl font-black text-gsps-blue mb-4">Welcome Back</h1>
          <p className="text-gsps-blue/50 font-medium">Please enter your details to sign in.</p>
        </div>

        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Email Address</label>
            <input 
              type="email" 
              placeholder="name@university.edu"
              className="w-full px-6 py-5 rounded-2xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 focus:outline-none transition-all text-lg font-bold text-gsps-blue shadow-inner"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest">Password</label>
              <Link to="/forgot-password" title="Coming Soon" className="text-xs font-black text-gsps-green hover:underline uppercase tracking-widest">Forgot Password?</Link>
            </div>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full px-6 py-5 rounded-2xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 focus:outline-none transition-all text-lg font-bold text-gsps-blue shadow-inner"
            />
          </div>

          <div className="flex items-center space-x-3 ml-1">
            <input type="checkbox" id="remember" className="w-5 h-5 rounded-lg border-2 border-gsps-bg-light text-gsps-green focus:ring-gsps-green cursor-pointer" />
            <label htmlFor="remember" className="text-sm font-bold text-gsps-blue/60 cursor-pointer">Remember me for 30 days</label>
          </div>

          <button className="w-full bg-gsps-blue text-white py-6 rounded-2xl font-black text-xl hover:bg-opacity-90 transition-all shadow-2xl shadow-gsps-blue/20 active:scale-95">
            Sign In
          </button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <div className="relative flex justify-center text-xs uppercase tracking-[0.2em] font-black text-gsps-blue/20"><span className="bg-white px-4">OR CONTINUE WITH</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center space-x-3 py-4 border-2 border-gray-100 rounded-2xl hover:bg-gsps-bg-light transition-all font-bold text-gsps-blue">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5" alt="Google" />
              <span>Google</span>
            </button>
            <button className="flex items-center justify-center space-x-3 py-4 border-2 border-gray-100 rounded-2xl hover:bg-gsps-bg-light transition-all font-bold text-gsps-blue">
              <img src="https://www.svgrepo.com/show/448234/linkedin.svg" className="h-5" alt="LinkedIn" />
              <span>LinkedIn</span>
            </button>
          </div>
        </form>

        <p className="text-center mt-12 text-gsps-blue/60 font-medium">
          Don't have an account? <Link to="/signup" className="text-gsps-green font-black hover:underline">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
