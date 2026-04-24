const WhyChoos = () => {
  const features = [
    {
      icon: "/WhyChooseIcon/batterexchangerate.jpeg",
      title: "Better Exchange Rates",
      subtext: "Save up to 15% on transfers compared to major banks.",
    },
    {
      icon: "/WhyChooseIcon/lowfee.jpeg",
      title: "Low Fees",
      subtext: "Transparent pricing with no hidden intermediary costs.",
    },
    {
      icon: "/WhyChooseIcon/buildforstudent.jpeg",
      title: "Built for Students",
      subtext: "Tailored specifically for international tuition payments.",
    },
    {
      icon: "/WhyChooseIcon/secureVerified.jpeg",
      title: "Secure & Verified",
      subtext: "Advanced bank-level encryption and KYC verification.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center lg:text-left mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gsps-blue mb-4">
            Why Choose GSPS?
          </h2>
          <div className="w-20 h-1.5 bg-gsps-green rounded-full mx-auto lg:mx-0"></div>
        </div>

        <div className="pt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 lg:px-8 ${
                  index !== features.length - 1
                    ? "lg:border-r lg:border-gray-100"
                    : ""
                }`}
              >
                <div className="flex-shrink-0 p-4 bg-gsps-bg-light/50 rounded-2xl border border-gsps-blue/5 shadow-sm group hover:bg-gsps-green/10 transition-colors">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-14 h-14 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gsps-blue leading-tight mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-[200px] mx-auto lg:mx-0">
                    {feature.subtext}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoos;
