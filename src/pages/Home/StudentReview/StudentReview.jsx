const StudentReview = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gsps-bg-light/30 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="bg-white/80 backdrop-blur-sm border border-gsps-blue/5 rounded-[40px] p-10 md:p-16 text-center shadow-2xl shadow-gsps-blue/5 relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gsps-green text-white p-4 rounded-2xl shadow-xl">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V3H21.017V15C21.017 17.2091 19.2261 19 17.017 19H14.017V21H14.017ZM3 21L3 18C3 16.8954 3.89543 16 5 16H8C8.55228 16 9 15.5523 9 15V9C9 8.44772 8.55228 8 8 8H5C3.89543 8 3 7.10457 3 6V3H10V15C10 17.2091 8.20914 19 6 19H3V21H3Z" />
            </svg>
          </div>
          
          <blockquote className="text-2xl md:text-3xl font-bold text-gsps-blue leading-relaxed mb-10">
            "Choosing GSPS was the best decision for my study abroad journey. I saved over <span className="text-gsps-green">$400</span> on my first semester tuition alone!"
          </blockquote>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gsps-bg-light border-2 border-gsps-green overflow-hidden mb-4 shadow-lg">
              <div className="w-full h-full bg-blue-100 flex items-center justify-center text-2xl">🎓</div>
            </div>
            <h4 className="text-gsps-blue font-black text-lg tracking-tight">Sarah Jenkins</h4>
            <p className="text-gsps-green text-sm font-bold uppercase tracking-widest">
              International Student, UK
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentReview;
