const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: "/HowItWorkIcon/CreateYourAcount.jpeg",
      title: "Create Your Account",
    },
    {
      id: 2,
      icon: "/HowItWorkIcon/verifyYourStudent.jpeg",
      title: "Verify Your Student Status",
    },
    {
      id: 3,
      icon: "/HowItWorkIcon/paytuition.jpeg",
      title: "Pay Tuition Globally",
    },
    {
      id: 4,
      icon: "/HowItWorkIcon/ChooseFlexible.jpeg",
      title: "Choose Flexible Payment",
    },
  ];

  return (
    <section className="py-24 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-gsps-blue mb-4">
            How It Works
          </h2>
          <div className="w-20 h-1.5 bg-gsps-green rounded-full mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-12 lg:gap-4 lg:max-w-none max-w-lg mx-auto">
          {steps.map((step, index) => (
            <div key={step.id} className="flex lg:items-center w-full lg:w-auto">
              <div className="flex flex-col items-center flex-1 bg-gsps-bg-light/40 rounded-[32px] p-10 lg:p-8 border border-gsps-blue/5 hover:shadow-2xl hover:shadow-gsps-blue/5 transition-all duration-500 relative group">
                <div className="absolute -top-5 left-8 mb-4">
                  <span className="w-12 h-12 rounded-2xl bg-gsps-green text-white flex items-center justify-center font-black text-lg border-4 border-white shadow-xl transform group-hover:rotate-12 transition-transform">
                    {step.id}
                  </span>
                </div>
                <div className="flex flex-col items-center text-center mt-4">
                  <div className="flex-shrink-0 mb-6 group-hover:scale-110 transition-transform duration-500">
                    <img
                      src={step.icon}
                      alt={step.title}
                      className="w-24 h-24 lg:w-20 lg:h-20 object-contain drop-shadow-lg"
                    />
                  </div>
                  <h3 className="text-gsps-blue font-bold text-xl lg:text-lg leading-tight">
                    {step.title}
                  </h3>
                </div>
              </div>

              {/* Arrow Connector for Desktop Only */}
              {index !== steps.length - 1 && (
                <div className="hidden lg:flex items-center mx-2 animate-pulse">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gsps-green"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
