import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';

const Wallet = () => {
    const { user, checkAuth } = useAuth();
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState('bKash');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleWithdraw = async (e) => {
        e.preventDefault();
        if (!amount || amount > user?.walletBalance) return alert('Invalid amount');
        
        setLoading(true);
        try {
            // Mocking withdrawal request for demo
            // In a real app: await api.post('/wallet/withdraw', { amount, method, address });
            setTimeout(async () => {
                setMessage({ type: 'success', text: 'Withdrawal request submitted! Our team will process it within 24 hours.' });
                setAmount('');
                setAddress('');
                await checkAuth();
                setLoading(false);
            }, 1500);
        } catch (err) {
            setMessage({ type: 'error', text: 'Error processing withdrawal.' });
            setLoading(false);
        }
    };

    return (
        <div className="space-y-12 max-w-4xl mx-auto">
            <header>
                <h1 className="text-4xl font-black text-gsps-blue mb-2">My <span className="text-gsps-green">Wallet</span></h1>
                <p className="text-gsps-blue/40 font-bold uppercase tracking-widest text-sm">Referral Earnings & Withdrawals</p>
            </header>

            {/* Wallet Card */}
            <div className="bg-gsps-blue rounded-[50px] p-12 md:p-16 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent)]"></div>
                
                <div className="relative z-10 text-center md:text-left">
                    <p className="text-xs font-black opacity-40 uppercase tracking-[0.3em] mb-4">Available Balance</p>
                    <div className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tighter">
                        <span className="text-4xl opacity-40 mr-2">$</span>{user?.walletBalance.toFixed(2)}
                    </div>
                    <p className="text-gsps-green font-bold">Safe & Secured by GSPS FinTech</p>
                </div>

                <div className="relative z-10 w-full md:w-auto h-40 md:h-56 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-xl">🏦</div>
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Wallet Card</span>
                    </div>
                    <div>
                        <p className="text-xs font-mono opacity-60">GSPS-USER-{user?.id?.slice(-8).toUpperCase()}</p>
                        <p className="font-black text-lg mt-1">{user?.fullName}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Withdrawal Form */}
                <div className="bg-white p-8 md:p-12 rounded-[50px] shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-black text-gsps-blue mb-8">Request Withdrawal</h2>
                    
                    {message && (
                        <div className={`p-4 rounded-2xl mb-6 font-bold text-center ${message.type === 'success' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600'}`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleWithdraw} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Withdrawal Method</label>
                            <div className="grid grid-cols-2 gap-4">
                                {['bKash', 'Bank Transfer'].map(m => (
                                    <button 
                                        type="button"
                                        key={m}
                                        onClick={() => setMethod(m)}
                                        className={`py-4 rounded-2xl font-bold transition-all border-2 ${method === m ? 'border-gsps-green bg-gsps-green/5 text-gsps-blue' : 'border-gray-100 text-gsps-blue/40'}`}
                                    >
                                        {m}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Account / Phone Number</label>
                            <input 
                                type="text" 
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder={method === 'bKash' ? '01XXXXXXXXX' : 'Account Number'}
                                required
                                className="w-full px-6 py-4 rounded-2xl bg-gsps-bg-light outline-none font-bold text-gsps-blue" 
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Amount to Withdraw (USD)</label>
                            <input 
                                type="number" 
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                max={user?.walletBalance}
                                required
                                className="w-full px-6 py-4 rounded-2xl bg-gsps-bg-light outline-none font-bold text-gsps-blue text-2xl" 
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading || !amount || amount <= 0 || amount > user?.walletBalance}
                            className="w-full bg-gsps-blue text-white py-5 rounded-3xl font-black text-lg hover:bg-gsps-green transition-all shadow-xl active:scale-[0.98] disabled:opacity-30"
                        >
                            {loading ? 'Processing...' : 'Process Withdrawal'}
                        </button>
                    </form>
                </div>

                {/* Info Column */}
                <div className="space-y-8">
                    <div className="bg-gsps-green/5 p-10 rounded-[40px] border border-gsps-green/10">
                        <h3 className="text-xl font-black text-gsps-blue mb-6">Withdrawal Policy</h3>
                        <ul className="space-y-6 font-bold text-gsps-blue/60 text-sm">
                            <li className="flex items-start space-x-4">
                                <span className="text-gsps-green">☝</span>
                                <span>Minimum withdrawal amount is $10.00</span>
                            </li>
                            <li className="flex items-start space-x-4">
                                <span className="text-gsps-green">✌</span>
                                <span>Processing time is maximum 24 business hours.</span>
                            </li>
                            <li className="flex items-start space-x-4">
                                <span className="text-gsps-green">👌</span>
                                <span>Withdrawals are processed at the daily bank rate for local currency payouts.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wallet;
