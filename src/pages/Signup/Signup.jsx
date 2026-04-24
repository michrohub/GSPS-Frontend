import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="min-h-screen bg-gsps-bg-light flex items-center justify-center p-4 py-32 sm:py-40">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-gsps-green/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-gsps-blue/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-[50px] shadow-3xl p-8 sm:p-16 relative z-10 border border-white">
        <div className="text-center mb-12">
          <Link to="/" className="inline-block mb-8">
            <img src="/logo2.png" alt="GSPS" className="h-10 mx-auto" />
          </Link>
          <h1 className="text-3xl sm:text-4xl font-black text-gsps-blue mb-4">Join GSPS</h1>
          <p className="text-gsps-blue/50 font-medium">Start saving on your global tuition payments today.</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">First Name</label>
              <input 
                type="text" 
                placeholder="John"
                className="w-full px-6 py-4 rounded-2xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 focus:outline-none transition-all text-lg font-bold text-gsps-blue shadow-inner"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Last Name</label>
              <input 
                type="text" 
                placeholder="Doe"
                className="w-full px-6 py-4 rounded-2xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 focus:outline-none transition-all text-lg font-bold text-gsps-blue shadow-inner"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Email Address</label>
            <input 
              type="email" 
              placeholder="name@university.edu"
              className="w-full px-6 py-4 rounded-2xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 focus:outline-none transition-all text-lg font-bold text-gsps-blue shadow-inner"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full px-6 py-4 rounded-2xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 focus:outline-none transition-all text-lg font-bold text-gsps-blue shadow-inner"
            />
            <p className="text-[10px] text-gsps-blue/30 font-bold uppercase tracking-widest ml-1">Must be at least 8 characters with one number.</p>
          </div>

          <div className="flex items-start space-x-3 ml-1 py-2">
            <input type="checkbox" id="terms" className="mt-1 w-5 h-5 rounded-lg border-2 border-gsps-bg-light text-gsps-green focus:ring-gsps-green cursor-pointer" />
            <label htmlFor="terms" className="text-sm font-medium text-gsps-blue/50 cursor-pointer leading-snug">
              I agree to the <Link to="/terms" className="text-gsps-blue font-black hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-gsps-blue font-black hover:underline">Privacy Policy</Link>.
            </label>
          </div>

          <button className="w-full bg-gsps-green text-white py-6 rounded-2xl font-black text-xl hover:bg-opacity-90 transition-all shadow-2xl shadow-gsps-green/20 active:scale-95 mt-4">
            Create Account
          </button>

          <div className="relative py-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <div className="relative flex justify-center text-xs uppercase tracking-[0.2em] font-black text-gsps-blue/20"><span className="bg-white px-4">OR SIGN UP WITH</span></div>
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
          Already have an account? <Link to="/login" className="text-gsps-green font-black hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
