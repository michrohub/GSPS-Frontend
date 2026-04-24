import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="relative overflow-hidden bg-gsps-bg-light pt-30 pb-16 lg:pt-30 lg:pb-28">
      {/* Background Decorative Shapes */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-blue-100/40 rounded-full blur-[60px] md:blur-[120px] -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_70%_50%,rgba(186,230,253,0.4),transparent_50%)] -z-10" />

      {/* Abstract Cloud Shapes - Hidden on small mobile */}
      <div className="hidden sm:block absolute top-20 right-[20%] w-32 h-16 bg-white/40 rounded-full blur-xl -z-10" />
      <div className="hidden sm:block absolute top-40 right-[10%] w-48 h-20 bg-white/30 rounded-full blur-2xl -z-10" />
      <div className="absolute bottom-20 right-[30%] w-64 h-24 bg-white/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
          {/* Left Column: Content */}
          <div className="text-center lg:text-left lg:col-span-7 xl:col-span-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-gsps-green/10 text-gsps-green font-bold text-xs sm:text-sm mb-6 uppercase tracking-widest">
              Secure Global Student Payments
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[45px] xl:text-[52px] tracking-tight font-black text-gsps-blue leading-[1.2] lg:leading-[1.1] mb-6">
              Pay Your Tuition Globally — <br className="hidden sm:block" />
              <span className="text-gsps-green">Save More</span> as a Student
            </h1>
            <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed mb-10">
              Send tuition payments worldwide with lower fees, better exchange
              rates, and flexible payment options designed for students.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link
                to="/signup"
                className="w-full sm:w-auto rounded-xl text-white text-[16px] px-10 py-4 bg-gsps-green hover:bg-gsps-green/90 transition-all shadow-xl shadow-gsps-green/20 hover:shadow-gsps-green/30 active:scale-95 text-center font-bold"
              >
                Get Started
              </Link>
              <Link
                to="/calculator"
                className="w-full sm:w-auto rounded-xl text-gsps-blue text-[16px] px-10 py-4 bg-white hover:bg-gray-50 transition-all border border-gray-100 shadow-sm active:scale-95 text-center font-bold"
              >
                Calculate Savings
              </Link>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="mt-16 lg:mt-0 lg:col-span-5 xl:col-span-6 relative">
            <div className="relative mx-auto w-full max-w-[320px] sm:max-w-md lg:max-w-none transform hover:scale-[1.02] transition-transform duration-700 ease-out">
              <img
                src="/banner1.png"
                alt="GSPS Mobile Application"
                className="w-full h-auto object-contain "
              />
              {/* Optional Floating Card Highlight */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-2xl hidden md:block animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gsps-green/10 flex items-center justify-center">
                     <svg className="w-6 h-6 text-gsps-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                     </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gsps-blue opacity-50 uppercase">Savings Status</p>
                    <p className="text-sm font-black text-gsps-blue">$2,400 Saved This Year</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
