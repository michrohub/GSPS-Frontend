const BuildForStudent = () => {
  const features = [
    {
      icon: "/BuildForStudentWorldwideIcon/PassportVisaVerified.jpeg",
      title: "Passport & Visa Verified",
    },
    {
      icon: "/BuildForStudentWorldwideIcon/UniversityApproved.jpeg",
      title: "University Approved",
    },
    {
      icon: "/BuildForStudentWorldwideIcon/MultiCurrencyWallet.jpeg",
      title: "Multi-Currency Wallet",
    },
    {
      icon: "/BuildForStudentWorldwideIcon/TrackYourPayments.jpeg",
      title: "Track Your Payments",
    },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-gsps-blue mb-4">
            Built for Students Worldwide
          </h2>
          <div className="w-20 h-1.5 bg-gsps-green rounded-full mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16 max-w-lg sm:max-w-none mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative mb-6 p-6 rounded-3xl bg-gsps-bg-light/30 group-hover:bg-gsps-bg-light/60 transition-all duration-500 border border-transparent group-hover:border-gsps-blue/5 shadow-sm group-hover:shadow-xl group-hover:-translate-y-2">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-gsps-blue font-bold text-lg md:text-xl leading-tight px-4 group-hover:text-gsps-green transition-colors">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuildForStudent;
