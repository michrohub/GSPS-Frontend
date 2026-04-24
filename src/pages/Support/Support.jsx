import { useState } from "react";

const Support = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqData = [
    {
      question: "How do I make a payment for my tuition?",
      answer: "Making a payment is simple. Navigate to the 'Savings Calculator', calculate your fees, and click 'Pay Now'. You can then choose your preferred payment method and follow the on-screen instructions."
    },
    {
      question: "What currencies are supported?",
      answer: "GSPS supports major global currencies including USD, GBP, EUR, CAD, and AUD, as well as many local currencies from students' home countries."
    },
    {
      question: "How long does it take for the payment to be processed?",
      answer: "Most payments are processed within 24-48 business hours. However, bank transfers might take up to 3-5 business days depending on the banks involved."
    },
    {
      question: "Is GSPS secure for international students?",
      answer: "Yes, GSPS uses industry-standard encryption and security protocols to ensure your data and transactions are always protected. We are fully compliant with global financial regulations."
    },
    {
      question: "Can I cancel a payment once made?",
      answer: "Payments can be cancelled if they haven't been processed by the recipient bank. Please contact our support team immediately if you need to initiate a cancellation."
    }
  ];

  const categories = [
    { id: 1, title: "Getting Started", icon: "🚀", count: "12 articles" },
    { id: 2, title: "Payments & Fees", icon: "💳", count: "25 articles" },
    { id: 3, title: "Account & Security", icon: "🔐", count: "18 articles" },
    { id: 4, title: "Savings Calculator", icon: "📊", count: "10 articles" },
    { id: 5, title: "Compliance & KYC", icon: "📋", count: "8 articles" },
    { id: 6, title: "Refunds & Cancellations", icon: "🔄", count: "14 articles" },
  ];

  return (
    <div className="bg-white min-h-screen pt-4">
      {/* Hero Section */}
      <section className="relative pt-20 pb-28 bg-gsps-bg-light overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-2 lg:items-center gap-16">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-gsps-blue mb-8 leading-[1.1]">
                How Can We <br className="hidden sm:block" /> 
                <span className="text-gsps-green">Help You</span> Today?
              </h1>
              <p className="text-xl text-gsps-blue/70 mb-10 max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed">
                Search our knowledge base or browse help topics below to find the answers you need.
              </p>
              
              <div className="relative max-w-xl group mx-auto lg:mx-0">
                <input 
                  type="text" 
                  placeholder="Ask a question..."
                  className="w-full px-6 py-5 rounded-[24px] bg-white border-2 border-transparent shadow-2xl focus:border-gsps-green/30 focus:outline-none transition-all placeholder:text-gray-400 pl-14 text-lg font-medium"
                />
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gsps-green transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-gsps-green text-white px-8 py-3 rounded-[18px] font-black hover:bg-gsps-green/90 transition-all shadow-xl active:scale-95 hidden sm:block">
                  Search
                </button>
              </div>

              <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
                <span className="text-sm font-bold text-gsps-blue/40 uppercase tracking-widest mr-2 self-center">Popular:</span>
                {["Payments", "Fees", "KYC", "Savings"].map(tag => (
                  <button key={tag} className="text-xs font-black px-4 py-2 bg-white rounded-xl border border-gray-100 text-gsps-blue hover:text-gsps-green hover:border-gsps-green/20 transition-all shadow-sm">
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mt-16 lg:mt-0 relative hidden md:block max-w-md mx-auto lg:max-w-none">
              <div className="relative animate-float">
                <img 
                  src="/images/support-hero.png" 
                  alt="Support Hero" 
                  className="w-full h-auto rounded-[60px] shadow-3xl"
                />
                {/* Decorative floating elements */}
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-gsps-green/10 rounded-full blur-[80px]-z-10"></div>
                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-gsps-blue/10 rounded-full blur-[100px]-z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-gsps-blue mb-6">Browse Help by Category</h2>
            <div className="w-20 h-2 bg-gsps-green mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div 
                key={category.id} 
                className="p-10 rounded-[40px] border border-gray-100 bg-white hover:shadow-2xl hover:border-gsps-green/20 transition-all cursor-pointer group relative overflow-hidden"
              >
                <div className="w-20 h-20 rounded-3xl bg-gsps-bg-light text-gsps-green flex items-center justify-center mb-10 transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 text-4xl">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-black text-gsps-blue mb-4 group-hover:text-gsps-green transition-colors">
                  {category.title}
                </h3>
                <p className="text-gsps-blue/50 text-base mb-6 font-medium leading-relaxed">
                  Find detailed guides and solutions for {category.title.toLowerCase()} in our student handbook.
                </p>
                <div className="flex items-center text-gsps-green font-black text-xs uppercase tracking-widest">
                  <span>View Articles ({category.count})</span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gsps-green/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gsps-bg-light/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-gsps-blue mb-6">Frequently Asked Questions</h2>
            <p className="text-gsps-blue/60 text-lg font-medium">Quick answers to common questions about GSPS.</p>
          </div>

          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white rounded-[32px] overflow-hidden shadow-xl shadow-gsps-blue/5 border border-white group"
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex justify-between items-center p-8 text-left focus:outline-none"
                >
                  <span className="font-black text-gsps-blue text-xl pr-8 group-hover:text-gsps-green transition-colors">{faq.question}</span>
                  <span className={`flex-shrink-0 w-12 h-12 rounded-2xl bg-gsps-bg-light flex items-center justify-center transition-all duration-500 ${activeFaq === index ? "rotate-45 bg-gsps-green text-white" : "text-gsps-green group-hover:bg-gsps-green/10"}`}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>
                <div 
                  className={`px-8 overflow-hidden transition-all duration-500 ease-in-out ${activeFaq === index ? "max-h-[500px] pb-10 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="text-gsps-blue/70 text-lg font-medium leading-relaxed pt-6 border-t border-gray-100">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gsps-blue/5 skew-x-12 translate-x-20 rounded-l-[100px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-6xl font-black text-gsps-blue mb-6">Still Need Help?</h2>
            <p className="text-gsps-blue/60 text-xl font-medium">Our dedicated support team is available 24/7 to assist you.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-12 rounded-[50px] bg-gsps-blue text-white text-center shadow-3xl shadow-gsps-blue/20 transform hover:-translate-y-4 transition-all duration-500 group">
              <div className="w-20 h-20 bg-white/10 rounded-[24px] flex items-center justify-center mx-auto mb-10 group-hover:bg-gsps-green group-hover:rotate-12 transition-all">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-3xl font-black mb-4">Live Chat</h3>
              <p className="text-blue-100/60 mb-10 text-base font-medium">Talk to a support specialist instantly within seconds.</p>
              <button className="w-full bg-gsps-green text-white py-5 rounded-[20px] font-black text-lg hover:bg-opacity-90 transition-all shadow-2xl shadow-gsps-green/20 active:scale-95">
                Start Chatting
              </button>
            </div>

            <div className="p-12 rounded-[50px] bg-white border border-gray-100 text-center shadow-2xl hover:shadow-3xl transform hover:-translate-y-4 transition-all duration-500 group">
              <div className="w-20 h-20 bg-gsps-bg-light rounded-[24px] flex items-center justify-center mx-auto mb-10 group-hover:bg-gsps-blue group-hover:text-white group-hover:-rotate-12 transition-all">
                <svg className="w-10 h-10 text-gsps-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-3xl font-black text-gsps-blue mb-4">Email Us</h3>
              <p className="text-gsps-blue/50 mb-10 text-base font-medium">Send us a message and we'll reply within 2 working hours.</p>
              <button className="w-full bg-gsps-blue text-white py-5 rounded-[20px] font-black text-lg hover:bg-opacity-90 transition-all shadow-2xl shadow-gsps-blue/20 active:scale-95">
                Send Email
              </button>
            </div>

            <div className="p-12 rounded-[50px] bg-white border border-gray-100 text-center shadow-2xl hover:shadow-3xl transform hover:-translate-y-4 transition-all duration-500 group">
              <div className="w-20 h-20 bg-gsps-bg-light rounded-[24px] flex items-center justify-center mx-auto mb-10 group-hover:bg-gsps-green group-hover:text-white group-hover:scale-110 transition-all">
                <svg className="w-10 h-10 text-gsps-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-3xl font-black text-gsps-blue mb-4">Call Us</h3>
              <p className="text-gsps-blue/50 mb-10 text-base font-medium">Available Mon-Fri from 9am to 6pm GMT globally.</p>
              <button className="w-full border-4 border-gsps-blue text-gsps-blue py-4 rounded-[20px] font-black text-lg hover:bg-gsps-blue hover:text-white transition-all active:scale-95">
                +1 (800) GSPS
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;
