import React from "react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      id: "01",
      title: "Create Your Account",
      description: "Sign up in minutes with your basic details. Our secure platform ensures your data is encrypted from the start.",
      icon: (
        <svg className="w-12 h-12 text-gsps-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
      details: [
        "Verified email and phone required",
        "Set up your secure PIN",
        "Multiple device support"
      ]
    },
    {
      id: "02",
      title: "Verify Student Status",
      description: "Upload your student ID or university acceptance letter. We verify status quickly to unlock student-exclusive rates.",
      icon: (
        <svg className="w-12 h-12 text-gsps-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      details: [
        "Accepts offer letters",
        "Valid student ID proof",
        "Verification within 2 hours"
      ]
    },
    {
      id: "03",
      title: "Pay Tuition Globally",
      description: "Enter your university details and the amount. Choose from multiple payment methods and lock in your exchange rate.",
      icon: (
        <svg className="w-12 h-12 text-gsps-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      details: [
        "Direct to University bank accounts",
        "Mid-market exchange rates",
        "No hidden intermediary fees"
      ]
    },
    {
      id: "04",
      title: "Choose Flexible Payment",
      description: "Optionally pay 60% now and the remaining 40% within 4 weeks. Manage your student budget with ease.",
      icon: (
        <svg className="w-12 h-12 text-gsps-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      details: [
        "0% interest on split payments",
        "Transparent schedule",
        "Automatic reminders"
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gsps-bg-light overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-100/20 skew-x-12 translate-x-20 rounded-l-[100px]-z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gsps-green/10 text-gsps-green font-bold text-sm mb-6 uppercase tracking-wider">
              Simplicity at scale
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gsps-blue mb-8 leading-tight">
              The Journey to <span className="text-gsps-green">Financial Freedom</span>
            </h1>
            <p className="text-xl text-gsps-blue/70 mb-10 leading-relaxed">
              We've redesigned international tuition payments from the ground up. Fast, secure, and built specifically for the needs of global students.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup" className="bg-gsps-green text-white px-10 py-4 rounded-xl font-bold shadow-xl shadow-gsps-green/20 hover:bg-gsps-green/90 transition-all active:scale-95">
                Create Free Account
              </Link>
              <Link to="/calculator" className="bg-white text-gsps-blue px-10 py-4 rounded-xl font-bold border border-gray-200 hover:border-gsps-green transition-all shadow-sm">
                View Savings
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Steps Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {steps.map((step, index) => (
              <div key={step.id} className={`flex flex-col lg:flex-row items-center gap-16 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Visual Side */}
                <div className="flex-1 w-full">
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-gsps-bg-light rounded-[40px] transform group-hover:scale-105 transition-transform duration-500 -z-10"></div>
                    <div className="bg-white p-12 rounded-[32px] shadow-2xl border border-gray-100 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 text-8xl font-black text-gsps-blue/5">
                        {step.id}
                      </div>
                      <div className="w-24 h-24 rounded-3xl bg-gsps-bg-light flex items-center justify-center mb-8">
                        {step.icon}
                      </div>
                      <h3 className="text-3xl font-bold text-gsps-blue mb-6">{step.title}</h3>
                      <ul className="space-y-4">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-center text-gsps-blue/70">
                            <svg className="w-5 h-5 text-gsps-green mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="flex-1 text-center lg:text-left">
                  <span className="text-6xl font-black text-gsps-green/20 mb-6 block font-sans">{step.id}</span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-gsps-blue mb-6 leading-tight">
                    {step.title}
                  </h2>
                  <p className="text-lg text-gsps-blue/60 leading-relaxed max-w-xl">
                    {step.description}
                  </p>
                  <button className="mt-8 text-gsps-green font-bold flex items-center hover:translate-x-2 transition-transform mx-auto lg:mx-0">
                    Learn more about this step
                    <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Comparison Section */}
      <section className="py-24 bg-gsps-blue text-white overflow-hidden relative">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gsps-green/10 rounded-full blur-[100px] -mb-48 -mr-48"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black mb-6">GSPS vs. Traditional Banks</h2>
            <p className="text-blue-200/80 text-xl max-w-2xl mx-auto">See why thousands of students switch to GSPS every month.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-10 rounded-[40px]">
              <h4 className="text-2xl font-bold mb-8 text-blue-200">Traditional Bank</h4>
              <ul className="space-y-6">
                <li className="flex items-start text-blue-100/70">
                   <span className="text-red-400 mr-4 font-bold">✕</span>
                   Hidden 3-5% exchange rate margins
                </li>
                <li className="flex items-start text-blue-100/70">
                   <span className="text-red-400 mr-4 font-bold">✕</span>
                   $30-$50 fixed swift fees
                </li>
                <li className="flex items-start text-blue-100/70">
                   <span className="text-red-400 mr-4 font-bold">✕</span>
                   3-5 business days processing
                </li>
                <li className="flex items-start text-blue-100/70">
                   <span className="text-red-400 mr-4 font-bold">✕</span>
                   Complex paperwork required
                </li>
              </ul>
            </div>

            <div className="bg-gsps-green p-10 rounded-[40px] shadow-2xl transform hover:scale-105 transition-all duration-300">
              <h4 className="text-2xl font-bold mb-8 text-white">GSPS Student Plan</h4>
              <ul className="space-y-6">
                <li className="flex items-start text-white">
                   <span className="text-white mr-4 font-bold">✓</span>
                   Real mid-market exchange rates
                </li>
                <li className="flex items-start text-white">
                   <span className="text-white mr-4 font-bold">✓</span>
                   Zero processing fees for students
                </li>
                <li className="flex items-start text-white">
                   <span className="text-white mr-4 font-bold">✓</span>
                   Under 24-hour confirmations
                </li>
                <li className="flex items-start text-white">
                   <span className="text-white mr-4 font-bold">✓</span>
                   Fully digital, ID-only verification
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Summary for How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-gsps-blue mb-4">Common Questions</h2>
             <div className="w-16 h-1 bg-gsps-green mx-auto rounded-full"></div>
          </div>
          <div className="space-y-8">
            <div>
              <h4 className="text-xl font-bold text-gsps-blue mb-2">How do I lock in a rate?</h4>
              <p className="text-gsps-blue/60 leading-relaxed">Once you initiate the payment process and verify your student status, the exchange rate is locked for 48 hours to give you time to fund the transaction.</p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gsps-blue mb-2">Can I pay from any country?</h4>
              <p className="text-gsps-blue/60 leading-relaxed">GSPS currently supports payments from over 50 countries across Africa, Asia, and the Middle East, with more being added every month.</p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gsps-blue mb-2">Is the split payment mandatory?</h4>
              <p className="text-gsps-blue/60 leading-relaxed">No, split payment is an optional feature. You can choose to pay 100% upfront if you prefer, saving even more on exchange rates.</p>
            </div>
          </div>
          <div className="mt-16 text-center">
             <Link to="/support" className="text-gsps-green font-bold decoration-2 underline-offset-4 hover:underline">
               Visit Support Center for more FAQ
             </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto bg-gsps-bg-light rounded-[48px] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-gsps-green/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-gsps-blue mb-8">Ready to save on your tuition?</h2>
            <p className="text-xl text-gsps-blue/60 mb-12 max-w-2xl mx-auto">Join 10,000+ students who trust GSPS for their international education journey.</p>
            <Link to="/signup" className="inline-block bg-gsps-blue text-white px-12 py-5 rounded-2xl font-bold shadow-2xl hover:bg-gsps-blue/90 transition-all active:scale-95 text-lg">
              Get Started Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
