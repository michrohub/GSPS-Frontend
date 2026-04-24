const CheckIcon = () => (
  <svg
    className="text-gsps-green w-6 h-6 flex-shrink-0"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

const PayNow = () => {
  return (
    <section className="py-24 bg-gsps-bg-light overflow-hidden relative">
      {/* Decorative blurred element */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gsps-green/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Content */}
          <div className="space-y-8 text-center lg:text-left">
            <h2 className="text-3xl md:text-[45px] font-black text-gsps-blue leading-tight">
              Pay Now, <span className="text-gsps-green">Complete Later</span>
            </h2>
            <p className="text-[16px] text-gray-500 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              We understand that managing tuition can be stressful. Our flexible payment plans allow you to focus on your studies while we handle the rest.
            </p>
            <div className="border-t border-gray-200 pt-8">
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-gsps-blue font-bold text-lg">
                <div className="flex items-center space-x-3">
                  <CheckIcon />
                  <span>Pay 60% Now</span>
                </div>
                <div className="hidden sm:block border-l border-gray-300 h-8" />
                <div className="flex items-center space-x-3">
                  <CheckIcon />
                  <span>40% Within 4 Weeks</span>
                </div>
              </div>
              <p className="mt-4 text-gsps-green text-sm uppercase tracking-widest font-black">
                Flexible, Student-Friendly Plan
              </p>
            </div>
            <button className="mt-4 px-10 py-4 bg-gsps-blue hover:bg-gsps-blue/90 text-white rounded-xl font-bold shadow-xl shadow-gsps-blue/20 transition-all active:scale-95">
              Check Eligibility
            </button>
          </div>

          {/* Right Column: Comparison Card */}
          <div className="relative w-full max-w-lg mx-auto lg:ml-auto group">
             {/* Main Card */}
            <div className="bg-white rounded-[40px] shadow-2xl p-8 sm:p-12 relative overflow-hidden border border-gray-100 transition-transform duration-500 group-hover:scale-[1.01]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gsps-bg-light rounded-full -translate-y-16 translate-x-16 -z-0"></div>
              
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6">
                {/* Traditional Bank */}
                <div className="space-y-6">
                  <p className="text-center text-xs font-black text-gsps-blue/40 uppercase tracking-widest leading-none h-4">
                    Traditional Bank
                  </p>
                  <div className="bg-gsps-bg-light/40 rounded-3xl py-10 text-center border-2 border-transparent transition-all">
                    <span className="text-3xl font-black text-gsps-blue/30">$10,500</span>
                  </div>
                </div>

                {/* GSPS */}
                <div className="space-y-6">
                  <p className="text-center text-xs font-black text-gsps-green uppercase tracking-widest leading-none h-4">
                    With GSPS
                  </p>
                  <div className="bg-gsps-green rounded-3xl py-10 text-center shadow-2xl shadow-gsps-green/20 transform sm:scale-110 border-2 border-green-400">
                    <span className="text-3xl font-black text-white">$9,700</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="mt-12 flex justify-center">
                <button className="w-full bg-gsps-blue hover:bg-gsps-blue/90 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-gsps-blue/20 transition-all active:scale-95">
                  Try Savings Calculator
                </button>
              </div>
            </div>
            
            {/* Background floating decor */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gsps-green/10 rounded-full blur-[80px] -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PayNow;
