import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../../../services/api';

const Overview = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalPayments: 0,
        totalSaved: 0,
        referralEarnings: 0,
        referralCount: 0
    });
    const [recentPayments, setRecentPayments] = useState([]);
    const [kycStatus, setKycStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const res = await api.get('/payments/my');
                const payments = res.data;
                setRecentPayments(payments.slice(0, 5));
                
                const completed = payments.filter(p => p.status === 'Completed');
                const totalPaid = completed.reduce((acc, curr) => acc + curr.amount, 0);
                const totalSaved = completed.reduce((acc, curr) => acc + curr.savingsAmount, 0);

                setStats({
                    totalPayments: completed.length,
                    totalSaved: totalSaved,
                    referralEarnings: user?.walletBalance || 0,
                    referralCount: user?.referralCount || 0
                });

                const kycRes = await api.get('/kyc/status').catch(() => null);
                if (kycRes && kycRes.data) {
                    setKycStatus(kycRes.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [user]);

    if (loading) return <div className="animate-pulse space-y-8">
        <div className="h-40 bg-white rounded-3xl"></div>
        <div className="h-80 bg-white rounded-3xl"></div>
    </div>;

    return (
        <div className="">
            <header className="mb-6">
                <h1 className="text-4xl lg:text-[25px] font-black text-gsps-blue mb-2">Welcome, <span className="text-gsps-green">{user?.fullName.split(' ')[0]}!</span></h1>
                <p className="text-gsps-blue/40 font-bold uppercase tracking-[0.2em] text-sm">Dashboard Overview</p>
            </header>

            {kycStatus && (!kycStatus.status || kycStatus.status === 'none') && (
                <div className="bg-orange-50 border border-orange-200 text-orange-800 p-6 rounded-2xl mb-6 flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h3 className="font-black text-xl mb-1 flex items-center"><span className="mr-2 text-2xl">⚠️</span> Verify Identity (KYC)</h3>
                        <p className="text-sm font-medium">Please complete your KYC to access all features.</p>
                    </div>
                    <Link to="/dashboard/kyc" className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition shadow-lg shadow-orange-600/20 active:scale-95 whitespace-nowrap">Verify Now</Link>
                </div>
            )}
            
            {kycStatus && kycStatus.status === 'pending' && (
                <div className="bg-blue-50 border border-blue-200 text-blue-800 p-6 rounded-2xl mb-6 flex justify-between items-center">
                    <div>
                        <h3 className="font-black text-xl mb-1 flex items-center"><span className="mr-2 text-2xl">⏳</span> KYC Under Review</h3>
                        <p className="text-sm font-medium">Your documents are currently being checked. This usually takes 24-48 hours.</p>
                    </div>
                </div>
            )}
            
            {kycStatus && kycStatus.status === 'approved' && (
                <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-2xl mb-6 flex justify-between items-center">
                    <div>
                        <h3 className="font-black text-xl mb-1 flex items-center"><span className="mr-2 text-2xl">✅</span> KYC Verified</h3>
                        <p className="text-sm font-medium">Your identity has been successfully verified.</p>
                    </div>
                    <span className="bg-green-600 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap">Verified</span>
                </div>
            )}
            
            {kycStatus && kycStatus.status === 'rejected' && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-2xl mb-6 flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h3 className="font-black text-xl mb-1 flex items-center"><span className="mr-2 text-2xl">❌</span> KYC Rejected</h3>
                        <p className="text-sm font-bold opacity-80 uppercase tracking-widest text-xs mb-1">Reason for Rejection:</p>
                        <p className="text-sm font-medium">{kycStatus.rejectionReason || "Please correct issues and resubmit your documents."}</p>
                    </div>
                    <Link to="/dashboard/kyc" className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition shadow-lg shadow-red-600/20 active:scale-95 whitespace-nowrap">Resubmit</Link>
                </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {[
                    { label: 'Current Tier', value: user?.tier || 'Silver', icon: user?.tier === 'Diamond' ? '💎' : user?.tier === 'Gold' ? '🥇' : '🥈', color: user?.tier === 'Diamond' ? 'bg-purple-50 text-purple-600' : user?.tier === 'Gold' ? 'bg-yellow-50 text-yellow-600' : 'bg-gray-50 text-gray-600' },
                    { label: 'Total Saved', value: `$${stats.totalSaved.toFixed(2)}`, icon: '💰', color: 'bg-blue-50 text-gsps-blue' },
                    { label: 'Referral Earnings', value: `$${stats.referralEarnings}`, icon: '💵', color: 'bg-gsps-green/10 text-gsps-green' },
                    { label: 'Valid Referrals', value: stats.referralCount, icon: '👥', color: 'bg-orange-50 text-orange-600' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-[20px] rounded-[15px] shadow-sm border border-gray-100 group hover:scale-[1.02] transition-all">
                        <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center text-2xl mb-6`}>{stat.icon}</div>
                        <p className="text-gsps-blue/40 font-bold uppercase tracking-widest text-xs mb-2">{stat.label}</p>
                        <p className="text-3xl font-black text-gsps-blue">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Tier Progress Section */}
            {user?.tier !== 'Diamond' && (
                <div className="mt-8 bg-white p-8 rounded-[15px] shadow-sm border border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-black text-gsps-blue">Tier Progress</h2>
                            <p className="text-sm font-bold text-gsps-blue/40 uppercase tracking-widest">
                                {user?.tier === 'Silver' ? `Refer ${3 - stats.referralCount} more users to reach Gold` : `Refer ${10 - stats.referralCount} more users to reach Diamond`}
                            </p>
                        </div>
                        <div className="mt-4 md:mt-0 px-4 py-2 bg-gsps-blue/5 rounded-xl border border-gsps-blue/10">
                            <span className="text-xs font-black text-gsps-blue uppercase tracking-widest">Benefit: {user?.tier === 'Silver' ? '5% Discount' : '8% Discount'}</span>
                        </div>
                    </div>
                    <div className="w-full h-4 bg-gsps-bg-light rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-gsps-green transition-all duration-1000" 
                            style={{ width: `${(stats.referralCount / (user?.tier === 'Silver' ? 3 : 10)) * 100}%` }}
                        ></div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
                {/* Recent Payments */}
                <div className="lg:col-span-2 bg-white rounded-[15px] p-8 md:p-10 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black text-gsps-blue">Recent Payments</h2>
                        <button className="text-gsps-green font-bold hover:underline">View All</button>
                    </div>
                    
                    {recentPayments.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="text-4xl mb-4">📭</div>
                            <p className="text-gsps-blue/40 font-bold">No payments found yet.</p>
                            <button className="mt-4 text-gsps-green font-bold">Make your first payment request</button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {recentPayments.map((p) => (
                                <div key={p._id} className="flex items-center justify-between p-6 rounded-2xl hover:bg-gsps-bg-light transition-all border border-transparent hover:border-gray-100">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gsps-blue/5 rounded-xl flex items-center justify-center text-xl">💸</div>
                                        <div>
                                            <p className="font-black text-gsps-blue">{p.paymentType}</p>
                                            <p className="text-xs font-bold text-gsps-blue/40 uppercase tracking-widest">{new Date(p.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black text-gsps-blue">{p.amount} {p.currency}</p>
                                        <p className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                                            p.status === 'Completed' ? 'bg-green-100 text-green-600' : 
                                            p.status === 'Pending' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-gsps-blue'
                                        }`}>{p.status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Referral Card */}
                <div className="bg-gsps-blue rounded-[15px] p-6 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-gsps-green/20 rounded-full blur-[60px] translate-x-20 -translate-y-20"></div>
                    <div className="relative z-10 space-y-8">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-3xl">🚀</div>
                        <div>
                            <h3 className="text-2xl font-black mb-2">Refer & Earn</h3>
                            <p className="text-white/60 font-medium">Earn $20 for every friend who completes their first international payment.</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                            <span className="font-mono font-bold text-gsps-green">{user?.referralCode}</span>
                            <button className="text-xs font-black uppercase tracking-widest bg-white text-gsps-blue px-4 py-2 rounded-xl hover:scale-105 transition-all">Copy</button>
                        </div>
                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] text-center italic">Total referrals: {stats.referralCount}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
