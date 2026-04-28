import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';
import { toast } from 'react-hot-toast';
import { FaCopy, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

import QR_USDT_BNB_20 from '../../../../public/USDT-BNB_20.jpg';
import QR_USDT_SOL from '../../../../public/USDT-SOL.jpg';
import QR_USDT_TRC_20 from '../../../../public/USDT-TRC-20.jpg';

const Wallet = () => {
    const { user, setUser } = useAuth();
    const [activeTab, setActiveTab] = useState('withdraw');
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState('Bank Transfer');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);

    // Deposit states
    const [payMethod, setPayMethod] = useState('USDT-BNB20');
    const [txId, setTxId] = useState('');
    const [screenshot, setScreenshot] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const cryptoWallets = {
        'USDT-BNB20': {
            address: '0x1c07f48c7Af167914032133Dd8C6E84de1d55CAa',
            qr: QR_USDT_BNB_20
        },
        'USDT-SOL': {
            address: 'HpgVQKtYDvMtCoDqqZdsDTLxh9Eu9u4u38FBcreuav4k',
            qr: QR_USDT_SOL
        },
        'USDT-TRC20': {
            address: 'TPtSN6dVxuNGnA2KNPojDLKJXQ3TR6hu6S',
            qr: QR_USDT_TRC_20
        }
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Address copied!');
    };

    const handleWithdraw = async (e) => {
        e.preventDefault();
        if (!amount || amount <= 0) return toast.error('Please enter a valid amount');
        if (amount > user?.walletBalance) return toast.error('Insufficient balance');
        
        setLoading(true);
        try {
            // Mocking withdrawal request
            await new Promise(resolve => setTimeout(resolve, 1500));
            toast.success('Withdrawal request submitted! Processing within 24h.');
            setAmount('');
            setAddress('');
        } catch (err) {
            toast.error('Error processing withdrawal.');
        } finally {
            setLoading(false);
        }
    };

    const handleDepositSubmit = async (e) => {
        e.preventDefault();
        if (!txId || !screenshot) return toast.error('Please provide TXID and Screenshot');
        
        setSubmitting(true);
        try {
            const data = new FormData();
            data.append('transactionId', txId);
            data.append('paymentType', 'Wallet Deposit');
            data.append('amount', 0); // User enters amount later or we verify it
            data.append('currency', 'USD');
            data.append('purpose', `Deposit to Wallet via ${payMethod}`);
            data.append('invoice', screenshot);

            await api.post('/payments/request', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success('Deposit submitted for verification');
            setTxId('');
            setScreenshot(null);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error submitting deposit');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-12 max-w-5xl mx-auto">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl lg:text-6xl font-black text-gsps-blue mb-4">My <span className="text-gsps-green">Wallet</span></h1>
                    <p className="text-xl text-gsps-blue/40 font-bold max-w-xl italic">Manage your earnings, deposits and fast withdrawals in one place.</p>
                </div>
                <div className="bg-gsps-blue p-8 rounded-[35px] text-white min-w-[280px] relative overflow-hidden group shadow-2xl shadow-gsps-blue/20">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-gsps-green/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                    <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.3em] mb-2">Total Balance</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl text-gsps-green font-black">$</span>
                        <span className="text-5xl font-black text-white tracking-tighter">{user?.walletBalance?.toLocaleString() || '0.00'}</span>
                    </div>
                </div>
            </header>

            <div className="flex gap-4 p-2 bg-gsps-bg-light rounded-[25px] w-fit mx-auto md:mx-0">
                {['withdraw', 'deposit'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-10 py-4 rounded-[20px] font-black uppercase tracking-widest text-sm transition-all ${
                            activeTab === tab 
                            ? 'bg-gsps-blue text-white shadow-xl shadow-gsps-blue/20 scale-105' 
                            : 'text-gsps-blue/30 hover:text-gsps-blue'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {activeTab === 'withdraw' ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-[50px] shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-black text-gsps-blue mb-8">Request Withdrawal</h2>
                        <form onSubmit={handleWithdraw} className="space-y-8">
                            <div className="grid grid-cols-2 gap-4">
                                {['Bank Transfer', 'Crypto'].map(m => (
                                    <button 
                                        type="button"
                                        key={m}
                                        onClick={() => setMethod(m)}
                                        className={`py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border-2 ${method === m ? 'border-gsps-green bg-gsps-green/5 text-gsps-blue' : 'border-gray-50 text-gsps-blue/20 hover:border-gsps-blue/10'}`}
                                    >
                                        {m}
                                    </button>
                                ))}
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Account Detail</label>
                                <input 
                                    type="text" 
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder={method === 'Crypto' ? 'Wallet Address (USDT)' : 'Account Number / Details'}
                                    required
                                    className="w-full px-8 py-5 rounded-2xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 outline-none font-bold text-gsps-blue text-lg transition-all" 
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Amount to Withdraw (USD)</label>
                                <div className="relative">
                                    <span className="absolute left-8 top-1/2 -translate-y-1/2 text-2xl font-black text-gsps-blue/20">$</span>
                                    <input 
                                        type="number" 
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0.00"
                                        max={user?.walletBalance}
                                        required
                                        className="w-full pl-14 pr-8 py-5 rounded-2xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 outline-none font-black text-gsps-blue text-3xl transition-all" 
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading || !amount || amount <= 0 || amount > user?.walletBalance}
                                className="w-full bg-gsps-blue text-white py-6 rounded-[30px] font-black text-lg uppercase tracking-widest hover:bg-gsps-green transition-all shadow-2xl shadow-gsps-blue/20 active:scale-95 disabled:opacity-30"
                            >
                                {loading ? 'Processing...' : 'Confirm Withdrawal'}
                            </button>
                        </form>
                    </div>

                    <div className="bg-gsps-green/5 p-10 rounded-[50px] border border-gsps-green/10 h-fit space-y-8">
                        <h3 className="text-xl font-black text-gsps-blue">Withdrawal Rules</h3>
                        <div className="space-y-6">
                            {[
                                { i: '💵', t: 'Min Withdrawal', d: '$10.00' },
                                { i: '🕒', t: 'Processing Time', d: 'Up to 24 Hours' },
                                { i: '📈', t: 'Exchange Rate', d: 'Daily Bank Rate' }
                            ].map((rule, idx) => (
                                <div key={idx} className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl shadow-sm">{rule.i}</div>
                                    <div>
                                        <p className="text-[10px] font-black text-gsps-blue/30 uppercase tracking-widest">{rule.t}</p>
                                        <p className="font-black text-gsps-blue">{rule.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="bg-white p-8 md:p-12 rounded-[50px] shadow-sm border border-gray-100 space-y-8">
                        <h2 className="text-2xl font-black text-gsps-blue">Crypto <span className="text-gsps-green">Deposit</span></h2>
                        
                        <div className="bg-orange-50 border-2 border-orange-200 p-6 rounded-2xl flex items-start gap-4">
                            <FaExclamationTriangle className="text-orange-500 text-xl shrink-0 mt-1" />
                            <p className="text-sm font-bold text-orange-800 leading-relaxed">
                                Please send only USDT to the addresses below. Ensure you select the correct network. Incorrect network transfers will result in permanent loss.
                            </p>
                        </div>

                        <div className="flex gap-2 p-1 bg-gsps-bg-light rounded-2xl">
                            {Object.keys(cryptoWallets).map(m => (
                                <button
                                    key={m}
                                    onClick={() => setPayMethod(m)}
                                    className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${payMethod === m ? 'bg-gsps-blue text-white shadow-lg' : 'text-gsps-blue/40 hover:bg-white'}`}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>

                        <div className="bg-gsps-bg-light p-8 rounded-[40px] flex flex-col items-center gap-8 border border-gray-100 relative overflow-hidden">
                            <div className="bg-white p-6 rounded-3xl shadow-inner relative z-10">
                                <img src={cryptoWallets[payMethod].qr} alt="QR Code" className="w-48 h-48 object-contain" />
                            </div>
                            <div className="w-full space-y-3 relative z-10">
                                <label className="text-[10px] font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Wallet Address ({payMethod})</label>
                                <div className="flex gap-2">
                                    <div className="flex-1 bg-white px-6 py-4 rounded-2xl border border-gray-100 font-bold text-gsps-blue text-sm truncate">
                                        {cryptoWallets[payMethod].address}
                                    </div>
                                    <button
                                        onClick={() => handleCopy(cryptoWallets[payMethod].address)}
                                        className="p-4 bg-gsps-blue text-white rounded-2xl hover:bg-gsps-green transition-all shadow-lg"
                                    >
                                        <FaCopy />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 md:p-12 rounded-[50px] shadow-sm border border-gray-100 space-y-8">
                        <h2 className="text-2xl font-black text-gsps-blue">Submit <span className="text-gsps-green">Proof</span></h2>
                        
                        <form onSubmit={handleDepositSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Transaction ID (TXID)</label>
                                <input
                                    type="text"
                                    value={txId}
                                    onChange={(e) => setTxId(e.target.value)}
                                    required
                                    placeholder="Paste your TXID here"
                                    className="w-full px-6 py-4 rounded-2xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 outline-none font-bold text-gsps-blue transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Payment Screenshot</label>
                                <input
                                    type="file"
                                    id="wallet-screenshot"
                                    className="hidden"
                                    onChange={(e) => setScreenshot(e.target.files[0])}
                                    required
                                />
                                <label
                                    htmlFor="wallet-screenshot"
                                    className="flex items-center justify-between px-6 py-4 rounded-2xl bg-gsps-bg-light border-2 border-dashed border-gray-200 cursor-pointer hover:border-gsps-green/50 transition-all"
                                >
                                    <span className="text-sm font-bold text-gsps-blue/40">{screenshot ? screenshot.name : 'Select file'}</span>
                                    <div className="w-10 h-10 bg-gsps-blue/5 rounded-xl flex items-center justify-center text-gsps-blue">📷</div>
                                </label>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full bg-gsps-blue text-white py-6 rounded-[30px] font-black text-lg hover:bg-gsps-green transition-all shadow-2xl shadow-gsps-blue/20 flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    {submitting ? 'Verifying...' : <><FaCheckCircle /> Submit Deposit</>}
                                </button>
                            </div>
                        </form>

                        <div className="p-6 bg-gsps-bg-light rounded-3xl border border-gray-50 italic text-center">
                            <p className="text-xs font-bold text-gsps-blue/40">
                                Deposits are typically verified within 1-2 hours. Once approved, the funds will be added to your balance.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Wallet;
