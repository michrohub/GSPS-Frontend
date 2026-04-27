import { useState, useEffect } from "react";
import { FaShieldAlt, FaMedal, FaGem, FaCalculator, FaInfoCircle } from "react-icons/fa";

const Calculator = () => {
  const [amount, setAmount] = useState(1000);
  const [tier, setTier] = useState("Silver");
  const [error, setError] = useState("");

  const tiers = {
    Silver: { discount: 0.20, icon: <FaShieldAlt className="text-gray-400" />, color: "border-gray-200 bg-gray-50/50" },
    Gold: { discount: 0.25, icon: <FaMedal className="text-yellow-500" />, color: "border-yellow-200 bg-yellow-50/50" },
    Diamond: { discount: 0.30, icon: <FaGem className="text-blue-500" />, color: "border-blue-200 bg-blue-50/50" },
  };

  const [results, setResults] = useState({
    originalAmount: 0,
    discountPercent: 0,
    savings: 0,
    finalAmount: 0,
  });

  useEffect(() => {
    if (amount === "" || amount === null) {
      setError("Amount is required.");
      setResults({ originalAmount: 0, discountPercent: 0, savings: 0, finalAmount: 0 });
      return;
    }
    if (amount < 0 || isNaN(amount)) {
      setError("Please enter a valid positive amount.");
      setResults({ originalAmount: 0, discountPercent: 0, savings: 0, finalAmount: 0 });
      return;
    }
    setError("");

    const discountRate = tiers[tier].discount;
    const savings = amount * discountRate;
    const finalAmount = amount - savings;

    setResults({
      originalAmount: amount,
      discountPercent: discountRate * 100,
      savings: savings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      finalAmount: finalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    });
  }, [amount, tier]);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed py-20 lg:py-32 px-4"
      style={{ backgroundImage: "url('/images/calculator-bg.png')" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-gsps-blue mb-6 leading-tight">
            Savings <span className="text-gsps-green h-glow">Calculator</span>
          </h1>
          <p className="text-xl text-gsps-blue/70 max-w-2xl mx-auto font-medium">
            Calculate your Payment savings based on our exclusive discount tiers.
          </p>
        </div>

        {/* Tier Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {Object.entries(tiers).map(([name, data]) => (
            <div key={name} className={`flex items-center p-6 rounded-3xl border-2 shadow-sm transition-all hover:shadow-md hover:scale-[1.02] duration-300 backdrop-blur-sm ${data.color}`}>
              <div className="text-4xl mr-4">{data.icon}</div>
              <div>
                <h3 className="font-bold text-gsps-blue text-lg">{name} Tier</h3>
                <p className="text-gsps-green font-black text-2xl">{data.discount * 100}% Discount</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Card */}
        <div className="bg-white/90 backdrop-blur-2xl rounded-[10px] shadow-[0_20px_50px_rgba(0,59,115,0.1)] border border-white overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Input Side */}
            <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-gray-100">
              <h2 className="text-2xl font-black text-gsps-blue mb-8 flex items-center">
                <span className="w-10 h-10 rounded-2xl bg-gsps-green/10 text-gsps-green flex items-center justify-center mr-4">
                  <FaCalculator />
                </span>
                Calculate Savings
              </h2>

              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Select Batch / Tier</label>
                  <div className="relative">
                    <select
                      value={tier}
                      onChange={(e) => setTier(e.target.value)}
                      className="w-full px-6 py-5 rounded-2xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 focus:outline-none transition-all text-xl font-bold text-gsps-blue shadow-inner appearance-none cursor-pointer"
                    >
                      {Object.keys(tiers).map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gsps-blue/40">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Fee Amount</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                      placeholder="0.00"
                      className={`w-full px-6 py-5 rounded-2xl bg-gsps-bg-light border-2 transition-all text-2xl font-black text-gsps-blue shadow-inner focus:outline-none ${error ? 'border-red-300' : 'border-transparent focus:border-gsps-green/30'}`}
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gsps-blue/30 font-bold">
                      USD
                    </div>
                  </div>
                  {error && <p className="text-red-500 text-sm font-bold mt-2 ml-1 flex items-center">
                    <FaInfoCircle className="mr-1" /> {error}
                  </p>}
                </div>

                <div className="pt-8 border-t border-gray-100 flex items-center text-xs font-bold text-gsps-blue/40 italic">
                  <FaInfoCircle className="w-4 h-4 mr-2 text-gsps-green" />
                  Discount is applied to the total fee amount.
                </div>
              </div>
            </div>

            {/* Result Side */}
            <div className="p-8 md:p-12 bg-gsps-bg-light/30">
              <h2 className="text-2xl font-black text-gsps-blue mb-8">Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 rounded-2xl bg-white/50 border border-white shadow-sm">
                  <span className="text-gsps-blue/60 font-bold">Original Amount</span>
                  <span className="font-black text-gsps-blue text-xl">${results.originalAmount.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center p-4 rounded-2xl bg-white/50 border border-white shadow-sm">
                  <span className="text-gsps-blue/60 font-bold">Selected Tier</span>
                  <div className="flex items-center">
                    <span className="mr-2">{tiers[tier].icon}</span>
                    <span className="font-black text-gsps-blue text-xl">{tier}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 rounded-2xl bg-white/50 border border-white shadow-sm">
                  <span className="text-gsps-blue/60 font-bold">Discount Percentage</span>
                  <span className="font-black text-gsps-blue text-xl">{results.discountPercent}%</span>
                </div>

                <div className="flex justify-between items-center p-6 rounded-3xl bg-gsps-green text-white shadow-xl transform hover:scale-[1.02] transition-transform">
                  <div className="flex flex-col">
                    <span className="text-white/70 text-xs font-black uppercase tracking-widest mb-1">Total Savings</span>
                    <span className="text-4xl font-black">${results.savings}</span>
                  </div>
                  <div className="bg-white/20 p-3 rounded-2xl">
                    <FaShieldAlt className="text-2xl" />
                  </div>
                </div>

                <div className="pt-6">
                  <div className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest mb-2">Final Payable Amount</div>
                  <div className="text-5xl font-black text-gsps-blue tracking-tighter">
                    ${results.finalAmount}
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>

        {/* Footer Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Instant Calculation", text: "Get immediate results based on your selected tier and amount.", icon: "⚡" },
            { title: "No Hidden Fees", text: "The amount you see is the final amount you pay.", icon: "🎯" },
            { title: "Secure Payment", text: "All transactions are encrypted and processed securely.", icon: "🔒" }
          ].map((f, i) => (
            <div key={i} className="bg-white/40 backdrop-blur-md p-8 rounded-3xl border border-white/50 text-center group hover:bg-white/60 transition-all">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{f.icon}</div>
              <h4 className="font-black text-gsps-blue text-lg mb-2">{f.title}</h4>
              <p className="text-gsps-blue/60 font-medium text-sm leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
