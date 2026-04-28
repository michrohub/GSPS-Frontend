import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { getMyTransactions, requestWithdrawal, requestDeposit } from '../../../services/api';
import { toast } from 'react-hot-toast';
import { FaCopy, FaCheckCircle, FaExclamationTriangle, FaUniversity, FaBitcoin, FaHistory, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import ImageUpload from '../../../components/Common/ImageUpload';

import QR_USDT_BNB_20 from '../../../../public/USDT-BNB_20.jpg';
import QR_USDT_SOL from '../../../../public/USDT-SOL.jpg';
import QR_USDT_TRC_20 from '../../../../public/USDT-TRC-20.jpg';

const Wallet = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('withdraw');
    const [transactions, setTransactions] = useState([]);
    const [loadingTransactions, setLoadingTransactions] = useState(true);

    // Withdrawal states
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [withdrawMethod, setWithdrawMethod] = useState('bank'); // 'bank' or 'crypto'
    const [bankDetails, setBankDetails] = useState({
        bankName: '',
        fullName: '',
        accountNumber: '',
        routingNumber: ''
    });
    const [cryptoDetails, setCryptoDetails] = useState({
        network: 'USDT (BEP20)',
        walletAddress: ''
    });
    const [withdrawing, setWithdrawing] = useState(false);

    // Deposit states
    const [depositAmount, setDepositAmount] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [depositMethod, setDepositMethod] = useState('crypto');
    const [depositProofUrl, setDepositProofUrl] = useState('');
    const [depositing, setDepositing] = useState(false);
    const [cryptoPayMethod, setCryptoPayMethod] = useState('USDT-BNB20');

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

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const res = await getMyTransactions();
            setTransactions(res.data);
        } catch (err) {
            console.error('Failed to fetch transactions');
        } finally {
            setLoadingTransactions(false);
        }
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Address copied!');
    };

    const handleWithdraw = async (e) => {
        e.preventDefault();
        const amount = parseFloat(withdrawAmount);
        if (!amount || amount < 10) return toast.error('Minimum withdrawal is $10');
        if (amount > user?.walletBalance) return toast.error('Insufficient balance');
        
        setWithdrawing(true);
        try {
            const payload = {
                amount,
                method: withdrawMethod,
                details: withdrawMethod === 'bank' ? bankDetails : cryptoDetails
            };
            await requestWithdrawal(payload);
            toast.success('Withdrawal request submitted! Balance deducted.');
            setWithdrawAmount('');
            setBankDetails({ bankName: '', fullName: '', accountNumber: '', routingNumber: '' });
            setCryptoDetails({ ...cryptoDetails, walletAddress: '' });
            fetchTransactions();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error processing withdrawal.');
        } finally {
            setWithdrawing(false);
        }
    };

    const handleDepositSubmit = async (e) => {
        e.preventDefault();
        const amount = parseFloat(depositAmount);
        if (!amount || amount <= 0) return toast.error('Please enter a valid amount');
        
        setDepositing(true);
        try {
            const payload = {
                amount,
                method: depositMethod,
                proof: depositProofUrl,
                transactionId
            };
            await requestDeposit(payload);
            toast.success('Deposit submitted for verification');
            setDepositAmount('');
            setTransactionId('');
            setDepositProofUrl('');
            fetchTransactions();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error submitting deposit');
        } finally {
            setDepositing(false);
        }
    };

    return (
        <div className="space-y-12 max-w-6xl mx-auto px-4 md:px-0">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl lg:text-6xl font-black text-gsps-blue mb-4">My <span className="text-gsps-green">Wallet</span></h1>
                    <p className="text-lg md:text-xl text-gsps-blue/40 font-bold max-w-xl italic">Manage your earnings, deposits and fast withdrawals in one place.</p>
                </div>
                <div className="bg-gsps-blue p-8 rounded-[35px] text-white min-w-[280px] relative overflow-hidden group shadow-2xl shadow-gsps-blue/20">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-gsps-green/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                    <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.3em] mb-2">Available Balance</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl text-gsps-green font-black">$</span>
                        <span className="text-5xl font-black text-white tracking-tighter">{user?.walletBalance?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}</span>
                    </div>
                </div>
            </header>

            <div className="flex gap-4 p-2 bg-gsps-bg-light rounded-[25px] w-fit mx-auto md:mx-0">
                {['withdraw', 'deposit', 'history'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 md:px-10 py-4 rounded-[20px] font-black uppercase tracking-widest text-xs md:text-sm transition-all ${
                            activeTab === tab 
                            ? 'bg-gsps-blue text-white shadow-xl shadow-gsps-blue/20 scale-105' 
                            : 'text-gsps-blue/30 hover:text-gsps-blue'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {activeTab === 'withdraw' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-[50px] shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-black text-gsps-blue mb-8">Request Withdrawal</h2>
                        <form onSubmit={handleWithdraw} className="space-y-8">
                            <div className="grid grid-cols-2 gap-4">
                                <button 
                                    type="button"
                                    onClick={() => setWithdrawMethod('bank')}
                                    className={`py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border-2 flex items-center justify-center gap-2 ${withdrawMethod === 'bank' ? 'border-gsps-green bg-gsps-green/5 text-gsps-blue' : 'border-gray-50 text-gsps-blue/20 hover:border-gsps-blue/10'}`}
                                >
                                    <FaUniversity /> Bank Transfer
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setWithdrawMethod('crypto')}
                                    className={`py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border-2 flex items-center justify-center gap-2 ${withdrawMethod === 'crypto' ? 'border-gsps-green bg-gsps-green/5 text-gsps-blue' : 'border-gray-50 text-gsps-blue/20 hover:border-gsps-blue/10'}`}
                                >
                                    <FaBitcoin /> Crypto (USDT)
                                </button>
                            </div>

                            {withdrawMethod === 'bank' ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Bank Name</label>
                                        <input type="text" value={bankDetails.bankName} onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})} required className="w-full px-6 py-4 rounded-xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 outline-none font-bold text-gsps-blue" placeholder="e.g. Chase Bank" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Full Name on Account</label>
                                        <input type="text" value={bankDetails.fullName} onChange={(e) => setBankDetails({...bankDetails, fullName: e.target.value})} required className="w-full px-6 py-4 rounded-xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 outline-none font-bold text-gsps-blue" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Account Number</label>
                                        <input type="text" value={bankDetails.accountNumber} onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})} required className="w-full px-6 py-4 rounded-xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 outline-none font-bold text-gsps-blue" placeholder="0000000000" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Routing Number</label>
                                        <input type="text" value={bankDetails.routingNumber} onChange={(e) => setBankDetails({...bankDetails, routingNumber: e.target.value})} required className="w-full px-6 py-4 rounded-xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 outline-none font-bold text-gsps-blue" placeholder="000000000" />
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Select Network</label>
                                        <select value={cryptoDetails.network} onChange={(e) => setCryptoDetails({...cryptoDetails, network: e.target.value})} className="w-full px-6 py-4 rounded-xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 outline-none font-bold text-gsps-blue">
                                            <option>USDT (BEP20)</option>
                                            <option>USDT (SOL)</option>
                                            <option>USDT (TRC20)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Wallet Address</label>
                                        <input type="text" value={cryptoDetails.walletAddress} onChange={(e) => setCryptoDetails({...cryptoDetails, walletAddress: e.target.value})} required className="w-full px-6 py-4 rounded-xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 outline-none font-bold text-gsps-blue" placeholder="Paste your USDT wallet address" />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-3">
                                <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Amount to Withdraw (USD)</label>
                                <div className="relative">
                                    <span className="absolute left-8 top-1/2 -translate-y-1/2 text-2xl font-black text-gsps-blue/20">$</span>
                                    <input 
                                        type="number" 
                                        value={withdrawAmount}
                                        onChange={(e) => setWithdrawAmount(e.target.value)}
                                        placeholder="0.00"
                                        min="10"
                                        required
                                        className="w-full pl-14 pr-8 py-5 rounded-2xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 outline-none font-black text-gsps-blue text-3xl transition-all" 
                                    />
                                </div>
                                <p className="text-[10px] font-bold text-gsps-blue/30 uppercase tracking-widest ml-2">Min: $10.00 | Fee: 0%</p>
                            </div>

                            <button 
                                type="submit" 
                                disabled={withdrawing || !withdrawAmount || withdrawAmount < 10 || withdrawAmount > user?.walletBalance}
                                className="w-full bg-gsps-blue text-white py-6 rounded-[30px] font-black text-lg uppercase tracking-widest hover:bg-gsps-green transition-all shadow-2xl shadow-gsps-blue/20 active:scale-95 disabled:opacity-30"
                            >
                                {withdrawing ? 'Processing Request...' : 'Confirm Withdrawal'}
                            </button>
                        </form>
                    </div>

                    <div className="bg-gsps-green/5 p-10 rounded-[50px] border border-gsps-green/10 h-fit space-y-8">
                        <h3 className="text-xl font-black text-gsps-blue">Withdrawal Rules</h3>
                        <div className="space-y-6">
                            {[
                                { i: '💵', t: 'Min Withdrawal', d: '$10.00' },
                                { i: '🕒', t: 'Processing Time', d: 'Up to 24 Hours' },
                                { i: '📈', t: 'Withdrawal Limit', d: 'Up to Balance' }
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
            )}

            {activeTab === 'deposit' && (
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
                                    onClick={() => setCryptoPayMethod(m)}
                                    className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${cryptoPayMethod === m ? 'bg-gsps-blue text-white shadow-lg' : 'text-gsps-blue/40 hover:bg-white'}`}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>

                        <div className="bg-gsps-bg-light p-8 rounded-[40px] flex flex-col items-center gap-8 border border-gray-100 relative overflow-hidden">
                            <div className="bg-white p-6 rounded-3xl shadow-inner relative z-10">
                                <img src={cryptoWallets[cryptoPayMethod].qr} alt="QR Code" className="w-48 h-48 object-contain" />
                            </div>
                            <div className="w-full space-y-3 relative z-10">
                                <label className="text-[10px] font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Wallet Address ({cryptoPayMethod})</label>
                                <div className="flex gap-2">
                                    <div className="flex-1 bg-white px-6 py-4 rounded-2xl border border-gray-100 font-bold text-gsps-blue text-sm truncate">
                                        {cryptoWallets[cryptoPayMethod].address}
                                    </div>
                                    <button
                                        onClick={() => handleCopy(cryptoWallets[cryptoPayMethod].address)}
                                        className="p-4 bg-gsps-blue text-white rounded-2xl hover:bg-gsps-green transition-all shadow-lg"
                                    >
                                        <FaCopy />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 md:p-12 rounded-[50px] shadow-sm border border-gray-100 space-y-8">
                        <h2 className="text-2xl font-black text-gsps-blue">Submit <span className="text-gsps-green">Deposit</span></h2>
                        
                        <form onSubmit={handleDepositSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Amount Sent (USD)</label>
                                <input
                                    type="number"
                                    value={depositAmount}
                                    onChange={(e) => setDepositAmount(e.target.value)}
                                    required
                                    placeholder="e.g. 100.00"
                                    className="w-full px-6 py-4 rounded-2xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 outline-none font-bold text-gsps-blue transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Transaction ID (TXID)</label>
                                <input
                                    type="text"
                                    value={transactionId}
                                    onChange={(e) => setTransactionId(e.target.value)}
                                    required
                                    placeholder="Paste your TRX ID here"
                                    className="w-full px-6 py-4 rounded-2xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 outline-none font-bold text-gsps-blue transition-all"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Payment Proof (Screenshot)</label>
                                <ImageUpload 
                                    onUploadSuccess={(res) => setDepositProofUrl(res.secure_url)}
                                    acceptedTypes="image/*"
                                />
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={depositing || !depositAmount || !depositProofUrl || !transactionId}
                                    className="w-full bg-gsps-blue text-white py-6 rounded-[30px] font-black text-lg hover:bg-gsps-green transition-all shadow-2xl shadow-gsps-blue/20 flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    {depositing ? 'Submitting...' : <><FaCheckCircle /> Request Deposit Approval</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {activeTab === 'history' && (
                <div className="bg-white p-8 md:p-12 rounded-[50px] shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-14 h-14 bg-gsps-blue/5 rounded-2xl flex items-center justify-center text-gsps-blue text-2xl">
                            <FaHistory />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-gsps-blue">Transaction History</h2>
                            <p className="text-xs font-bold text-gsps-blue/40 uppercase tracking-widest">View all your deposits and withdrawals</p>
                        </div>
                    </div>

                    {loadingTransactions ? (
                        <div className="py-20 text-center animate-pulse">
                            <p className="text-gsps-blue/40 font-black uppercase tracking-widest">Loading history...</p>
                        </div>
                    ) : transactions.length === 0 ? (
                        <div className="py-20 text-center bg-gsps-bg-light rounded-[30px] border border-dashed border-gray-200">
                            <p className="text-gsps-blue/40 font-bold italic">No transactions found yet.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left border-b border-gray-50">
                                        <th className="pb-6 text-[10px] font-black text-gsps-blue/30 uppercase tracking-[0.2em]">Type</th>
                                        <th className="pb-6 text-[10px] font-black text-gsps-blue/30 uppercase tracking-[0.2em]">Amount</th>
                                        <th className="pb-6 text-[10px] font-black text-gsps-blue/30 uppercase tracking-[0.2em]">Status</th>
                                        <th className="pb-6 text-[10px] font-black text-gsps-blue/30 uppercase tracking-[0.2em]">Date</th>
                                        <th className="pb-6 text-[10px] font-black text-gsps-blue/30 uppercase tracking-[0.2em] text-right">Details</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {transactions.map((tx) => (
                                        <tr key={tx._id} className="group hover:bg-gsps-bg-light/30 transition-all">
                                            <td className="py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${tx.type === 'deposit' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                                                        {tx.type === 'deposit' ? <FaArrowDown /> : <FaArrowUp />}
                                                    </div>
                                                    <span className="font-black text-gsps-blue capitalize">{tx.type}</span>
                                                </div>
                                            </td>
                                            <td className="py-6">
                                                <span className={`font-black ${tx.type === 'deposit' ? 'text-gsps-green' : 'text-gsps-blue'}`}>
                                                    {tx.type === 'deposit' ? '+' : '-'}${tx.amount.toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="py-6">
                                                <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                                                    tx.status === 'completed' || tx.status === 'approved' ? 'bg-green-500 text-white' :
                                                    tx.status === 'rejected' ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'
                                                }`}>
                                                    {tx.status}
                                                </span>
                                            </td>
                                            <td className="py-6 text-xs font-bold text-gsps-blue/40">
                                                {new Date(tx.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="py-6 text-right">
                                                <span className="text-[10px] font-bold text-gsps-blue/30 group-hover:text-gsps-blue transition-colors">
                                                    {tx.method === 'bank' ? 'Bank Transfer' : tx.details?.network || 'Crypto'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Wallet;
