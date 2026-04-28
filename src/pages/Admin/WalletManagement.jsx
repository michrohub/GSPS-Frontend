import React, { useState, useEffect } from 'react';
import { adminGetTransactions, adminUpdateTransactionStatus } from '../../services/api';
import { toast } from 'react-hot-toast';
import { FaWallet, FaCheck, FaTimes, FaExternalLinkAlt, FaUniversity, FaBitcoin, FaHistory } from 'react-icons/fa';

const WalletManagement = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('pending'); // 'all', 'pending', 'deposit', 'withdrawal'

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const res = await adminGetTransactions();
            setTransactions(res.data);
        } catch (err) {
            toast.error('Failed to fetch transactions');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        const adminNote = prompt('Enter a note for this transaction (optional):');
        
        try {
            await adminUpdateTransactionStatus(id, { status, adminNote });
            toast.success(`Transaction marked as ${status}`);
            fetchTransactions();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update status');
        }
    };

    const filteredTransactions = transactions.filter(tx => {
        if (filter === 'all') return true;
        if (filter === 'pending') return tx.status === 'pending';
        if (filter === 'deposit') return tx.type === 'deposit';
        if (filter === 'withdrawal') return tx.type === 'withdrawal';
        return true;
    });

    return (
        <div className="space-y-10">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-gsps-blue mb-2 flex items-center gap-3">
                        <FaWallet className="text-gsps-green" /> Wallet <span className="text-gsps-green">Management</span>
                    </h1>
                    <p className="text-gsps-blue/40 font-bold uppercase tracking-widest text-sm">Review Deposits & Process Withdrawals</p>
                </div>

                <div className="flex gap-2 p-1 bg-gsps-bg-light rounded-xl border border-gray-100">
                    {['pending', 'deposit', 'withdrawal', 'all'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all ${filter === f ? 'bg-gsps-blue text-white' : 'text-gsps-blue/40 hover:bg-white'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </header>

            <div className="bg-white rounded-[25px] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gsps-blue border-b border-gray-100">
                            <tr>
                                <th className="px-8 py-5 text-[10px] font-black text-white uppercase tracking-[0.2em]">User</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white uppercase tracking-[0.2em]">Type/Method</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white uppercase tracking-[0.2em]">Amount</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white uppercase tracking-[0.2em]">Post-Bal / TRX ID</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white uppercase tracking-[0.2em]">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white uppercase tracking-[0.2em]">Details</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white uppercase tracking-[0.2em] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="px-8 py-20 text-center animate-pulse font-black text-gsps-blue/20 uppercase tracking-widest">Loading Data...</td>
                                </tr>
                            ) : filteredTransactions.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-8 py-20 text-center font-bold text-gsps-blue/40 italic">No matching transactions found.</td>
                                </tr>
                            ) : (
                                filteredTransactions.map((tx) => (
                                    <tr key={tx._id} className="hover:bg-gsps-bg-light/30 transition-all group">
                                        <td className="px-8 py-6">
                                            <p className="font-black text-gsps-blue">{tx.user?.fullName}</p>
                                            <p className="text-[10px] font-bold text-gsps-blue/40">{tx.user?.email}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${tx.type === 'deposit' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                                                    {tx.method === 'bank' ? <FaUniversity /> : <FaBitcoin />}
                                                </div>
                                                <div>
                                                    <p className="font-black text-gsps-blue capitalize text-xs">{tx.type}</p>
                                                    <p className="text-[10px] font-bold text-gsps-blue/40 uppercase">{tx.method}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 font-black text-gsps-blue">
                                            ${tx.amount.toLocaleString()}
                                        </td>
                                        <td className="px-8 py-6">
                                            {tx.type === 'withdrawal' ? (
                                                <p className="font-black text-gsps-green text-xs">
                                                    ${tx.walletBalanceAfter?.toLocaleString() || 'N/A'}
                                                </p>
                                            ) : (
                                                <p className="text-[10px] font-bold text-gsps-blue/60 truncate w-32" title={tx.details?.transactionId}>
                                                    {tx.details?.transactionId || 'No TRX ID'}
                                                </p>
                                            )}
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                                                tx.status === 'completed' || tx.status === 'approved' ? 'bg-green-500 text-white' :
                                                tx.status === 'rejected' ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'
                                            }`}>
                                                {tx.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            {tx.type === 'deposit' ? (
                                                tx.proof ? (
                                                    <a href={tx.proof} target="_blank" rel="noreferrer" className="text-gsps-green font-black flex items-center gap-2 text-xs hover:underline">
                                                        View Proof <FaExternalLinkAlt className="text-[10px]" />
                                                    </a>
                                                ) : (
                                                    <span className="text-gsps-blue/20 italic text-xs">No Proof</span>
                                                )
                                            ) : (
                                                <div className="text-[10px] font-bold text-gsps-blue/60 leading-tight">
                                                    {tx.method === 'bank' ? (
                                                        <>
                                                            <p>{tx.details?.bankName}</p>
                                                            <p className="opacity-60">{tx.details?.accountNumber}</p>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <p>{tx.details?.network}</p>
                                                            <p className="opacity-60 truncate w-32" title={tx.details?.walletAddress}>{tx.details?.walletAddress}</p>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end gap-2">
                                                {tx.status === 'pending' && (
                                                    <>
                                                        <button 
                                                            onClick={() => handleUpdateStatus(tx._id, tx.type === 'deposit' ? 'approved' : 'completed')}
                                                            className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all shadow-lg shadow-green-500/20"
                                                            title={tx.type === 'deposit' ? 'Approve Deposit' : 'Complete Withdrawal'}
                                                        >
                                                            <FaCheck />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleUpdateStatus(tx._id, 'rejected')}
                                                            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
                                                            title="Reject"
                                                        >
                                                            <FaTimes />
                                                        </button>
                                                    </>
                                                )}
                                                {(tx.status === 'completed' || tx.status === 'approved' || tx.status === 'rejected') && (
                                                    <span className="text-[10px] font-black text-gsps-blue/10 uppercase tracking-widest">Processed</span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default WalletManagement;
