const CTASection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gsps-blue rounded-[50px] p-8 md:p-15 text-center relative overflow-hidden shadow-2xl">
          {/* Decorative background effects */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gsps-green/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-[80px]"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-[45px] font-black text-white mb-6 leading-tight">
              Start Your Global <br className="hidden md:block" /> 
              <span className="text-gsps-green">Payment Journey</span> Today
            </h2>
            <p className="text-blue-100/60 text-lg md:text-xl font-medium mb-12 leading-relaxed">
              Join thousands of students saving money every semester. <br className="hidden sm:block" /> Pay smarter. Save faster. Study anywhere.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <button className="w-full sm:w-auto px-12 py-5 bg-gsps-green hover:bg-gsps-green/90 text-white rounded-2xl font-black text-lg shadow-2xl shadow-gsps-green/40 transition-all active:scale-95">
                Sign Up Free
              </button>
              <button className="w-full sm:w-auto px-12 py-5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl font-black text-lg backdrop-blur-sm transition-all active:scale-95">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
