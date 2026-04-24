import { useState, useEffect } from "react";

const Calculator = () => {
  const [amount, setAmount] = useState(10000);
  const [fromCurrency, setFromCurrency] = useState("NGN");
  const [toCurrency, setToCurrency] = useState("GBP");
  
  // Mock rates relative to USD for logic
  const rates = {
    USD: 1,
    GBP: 0.79,
    EUR: 0.92,
    NGN: 1500,
    CAD: 1.36,
    AUD: 1.52,
  };

  const [results, setResults] = useState({
    bankTotal: 0,
    gspsTotal: 0,
    savings: 0,
    gspsRate: 0,
    bankRate: 0,
  });

  useEffect(() => {
    // Basic logic: Convert 'from' to 'to'
    const baseRate = rates[toCurrency] / rates[fromCurrency];
    
    // GSPS: 0.5% fee hidden in rate
    const currentGspsRate = baseRate * 0.995; 
    const currentGspsTotal = amount * currentGspsRate;

    // Bank: 4% fee hidden in rate + $50 fixed fee (converted to 'to' currency)
    const currentBankRate = baseRate * 0.96;
    const bankFixFee = 50 * rates[toCurrency];
    const currentBankTotal = (amount * currentBankRate) - bankFixFee;
    
    setResults({
      gspsTotal: currentGspsTotal.toFixed(2),
      bankTotal: currentBankTotal.toFixed(2),
      savings: (currentGspsTotal - currentBankTotal).toFixed(2),
      gspsRate: currentGspsRate.toFixed(4),
      bankRate: currentBankRate.toFixed(4),
    });
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed py-20 lg:py-32 px-4"
      style={{ backgroundImage: "url('/images/calculator-bg.png')" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 lg:mb-24">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gsps-blue mb-8 leading-tight">
            Calculate Your <span className="text-gsps-green h-glow">Savings</span>
          </h1>
          <p className="text-xl text-gsps-blue/70 max-w-2xl mx-auto font-medium">
            See exactly how much more reaches your university when you choose GSPS over traditional banks.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: Input Form */}
          <div className="lg:col-span-5 bg-white/90 backdrop-blur-2xl p-8 md:p-12 rounded-[50px] shadow-[0_20px_50px_rgba(0,59,115,0.1)] border border-white">
            <h2 className="text-2xl font-black text-gsps-blue mb-10 flex items-center">
               <span className="w-10 h-10 rounded-2xl bg-gsps-green/10 text-gsps-green flex items-center justify-center mr-4">🔄</span>
               Compare Rates
            </h2>
            
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">You Send</label>
                <div className="flex gap-3">
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="flex-1 px-6 py-5 rounded-2xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 focus:outline-none transition-all text-2xl font-black text-gsps-blue shadow-inner"
                  />
                  <select 
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="w-32 px-4 py-5 rounded-2xl bg-gsps-blue text-white font-black text-lg focus:outline-none cursor-pointer hover:bg-opacity-90 transition-all shadow-xl"
                  >
                    {Object.keys(rates).map(curr => <option key={curr} value={curr}>{curr}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex justify-center -my-4 relative z-10">
                <div className="bg-gsps-green text-white p-4 rounded-2xl shadow-2xl transform rotate-45 group hover:rotate-[225deg] transition-transform duration-700 cursor-pointer">
                  <svg className="w-6 h-6 -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Recipient Gets</label>
                <div className="flex gap-3">
                  <div className="flex-1 px-6 py-5 rounded-2xl bg-gsps-bg-light border-2 border-transparent text-2xl font-black text-gsps-blue shadow-inner flex items-center">
                    {results.gspsTotal}
                  </div>
                  <select 
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="w-32 px-4 py-5 rounded-2xl bg-gsps-blue text-white font-black text-lg focus:outline-none cursor-pointer hover:bg-opacity-90 transition-all shadow-xl"
                  >
                    {Object.keys(rates).map(curr => <option key={curr} value={curr}>{curr}</option>)}
                  </select>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100 flex items-center text-xs font-bold text-gsps-blue/40 italic">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Exchange rates are updated every 5 minutes.
              </div>
            </div>
          </div>

          {/* Right: Results & Comparison */}
          <div className="lg:col-span-7 space-y-10">
            <div className="bg-gsps-green rounded-[50px] p-10 md:p-14 text-white shadow-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="text-center md:text-left">
                  <h3 className="text-sm font-black opacity-60 uppercase tracking-[0.3em] mb-4">Total Savings</h3>
                  <div className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tighter drop-shadow-2xl">
                    {toCurrency} {results.savings}
                  </div>
                  <p className="text-xl md:text-2xl font-bold opacity-90">more reaches your university with GSPS</p>
                </div>
                <button className="w-full md:w-auto bg-white text-gsps-green px-12 py-6 rounded-[24px] font-black text-xl hover:scale-105 transition-all active:scale-95 shadow-2xl whitespace-nowrap">
                  PAY NOW
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/70 backdrop-blur-xl p-10 rounded-[40px] border border-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-full bg-gsps-green group-hover:w-4 transition-all"></div>
                <div className="flex items-center mb-8">
                  <img src="/logo2.png" alt="GSPS" className="h-6 mr-3" />
                  <h4 className="font-black text-gsps-blue text-sm uppercase tracking-widest">GSPS Results</h4>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between">
                    <span className="text-gsps-blue/40 font-bold text-sm uppercase tracking-wider">Rate</span>
                    <span className="font-black text-gsps-blue">1 {fromCurrency} = {results.gspsRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gsps-blue/40 font-bold text-sm uppercase tracking-wider">Fee</span>
                    <span className="font-black text-gsps-green">NO FEES</span>
                  </div>
                  <div className="pt-6 border-t border-gray-100 flex flex-col">
                    <span className="text-gsps-blue/40 font-bold text-xs uppercase tracking-widest mb-2">Total Delivered</span>
                    <span className="text-4xl lg:text-5xl font-black text-gsps-green tracking-tighter">{results.gspsTotal} <span className="text-lg opacity-50">{toCurrency}</span></span>
                  </div>
                </div>
              </div>

              <div className="bg-white/40 backdrop-blur-xl p-10 rounded-[40px] border border-white shadow-xl relative grayscale opacity-60 group">
                <div className="absolute top-0 left-0 w-2 h-full bg-gray-400 group-hover:w-4 transition-all"></div>
                <h4 className="font-black text-gsps-blue text-sm uppercase tracking-widest mb-8">Traditional Bank</h4>
                <div className="space-y-6">
                  <div className="flex justify-between">
                    <span className="text-gsps-blue/40 font-bold text-sm tracking-wider uppercase">Rate</span>
                    <span className="font-black text-gsps-blue">1 {fromCurrency} = {results.bankRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gsps-blue/40 font-bold text-sm tracking-wider uppercase">Fee</span>
                    <span className="font-black text-gsps-blue">$50.00</span>
                  </div>
                  <div className="pt-6 border-t border-gray-100 flex flex-col">
                    <span className="text-gsps-blue/40 font-bold text-xs tracking-widest uppercase mb-2">Total Delivered</span>
                    <span className="text-4xl lg:text-5xl font-black text-gray-500 tracking-tighter">{results.bankTotal} <span className="text-lg opacity-50">{toCurrency}</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Row */}
        <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {[
            { title: "No Hidden Margins", text: "Banks hide 3-5% in the exchange rate. We use the real mid-market rate.", icon: "💎" },
            { title: "Direct to University", text: "We partner with global institutions for instant, confirmed tuition payments.", icon: "🏛️" },
            { title: "Dedicated Support", text: "24/7 assistance tailored specifically for international student needs.", icon: "🤝" }
          ].map((feature, i) => (
            <div key={i} className="bg-white/30 backdrop-blur-md p-10 rounded-[40px] border border-white/50 shadow-sm text-center group hover:bg-white/50 transition-all duration-500">
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform">{feature.icon}</div>
              <h5 className="font-black text-gsps-blue text-xl mb-4 tracking-tight">{feature.title}</h5>
              <p className="text-base text-gsps-blue/60 leading-relaxed font-medium">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
