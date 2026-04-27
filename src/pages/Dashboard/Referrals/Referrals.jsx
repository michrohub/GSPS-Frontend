import React from 'react';
import { useAuth } from '../../../context/AuthContext';

const Referrals = () => {
    const { user } = useAuth();
    const referralLink = `${window.location.origin}/signup?ref=${user?.referralCode}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink);
        alert('Referral link copied!');
    };

    return (
        <div className="space-y-12 max-w-5xl mx-auto">
            <header className="text-center">
                <h1 className="text-4xl lg:text-6xl font-black text-gsps-blue mb-6">Refer & <span className="text-gsps-green">Earn</span></h1>
                <p className="text-xl text-gsps-blue/40 font-bold max-w-2xl mx-auto italic">Shape the future of global student payments and get rewarded for every friend you bring to GSPS.</p>
            </header>

            <div className="bg-gradient-to-br from-gsps-blue to-gsps-blue/90 rounded-[40px] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-gsps-blue/20">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gsps-green/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gsps-light-blue/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="bg-gsps-green/20 p-3 rounded-2xl backdrop-blur-sm border border-gsps-green/30">
                            <span className="text-2xl">🚀</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black tracking-tight">Referral Milestones</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                        {/* Connection lines (hidden on mobile) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 z-0"></div>

                        {[
                            { badge: 'Silver', target: 'Initial Status', icon: '🥈', color: 'from-slate-300 to-slate-500', glow: 'shadow-slate-400/20' },
                            { badge: 'Gold', target: '5 Successfull Refers', icon: '🥇', color: 'from-amber-300 to-amber-600', glow: 'shadow-amber-500/30' },
                            { badge: 'Diamond', target: '10 Successfull Refers', icon: '💎', color: 'from-cyan-300 to-blue-500', glow: 'shadow-cyan-400/30' }
                        ].map((m, i) => (
                            <div key={i} className="relative z-10 group">
                                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${m.color} ${m.glow} shadow-lg flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                                        {m.icon}
                                    </div>
                                    <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-1">{m.target}</p>
                                    <h4 className="text-xl font-black">{m.badge} Badge</h4>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 flex flex-col lg:flex-row items-center gap-4 border-t border-white/10 pt-8">
                        <div className="flex-1 flex items-center gap-3 bg-white/5 border border-white/5 rounded-2xl p-4 backdrop-blur-sm">
                            <span className="animate-pulse text-xl">✨</span>
                            <p className="text-sm md:text-base font-medium text-white/80">
                                Achieve more than <span className="text-gsps-green font-bold">10 referrals</span> to unlock "Suspense" — our premium commission tier with even higher rewards!
                            </p>
                        </div>
                        <div className="w-full lg:w-auto flex items-center gap-3 bg-gsps-green/20 border border-gsps-green/30 rounded-2xl p-4 backdrop-blur-sm shadow-lg shadow-gsps-green/10">
                            <span className="text-xl">💳</span>
                            <p className="text-sm font-bold text-white uppercase tracking-wider">
                                Required: <span className="text-gsps-green">Complete 1+ Payment</span> to Activate
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                    { label: 'Referral Code', value: user?.referralCode, icon: '🎫' },
                    // { label: 'Total Earnings', value: `$${user?.walletBalance || 0}`, icon: '💰' },
                    { label: 'Successful Referrals', value: user?.referralCount || 0, icon: '🏆' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 text-center">
                        <div className="text-4xl mb-4">{stat.icon}</div>
                        <p className="text-xs font-black text-gsps-blue/30 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                        <p className="text-3xl font-black text-gsps-blue">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="bg-gsps-blue rounded-[60px] p-12 md:p-20 text-white relative overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gsps-green/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10 max-w-2xl mx-auto space-y-10">
                    <h2 className="text-3xl font-black">Your Unique Link</h2>
                    <div className="bg-white/10 p-6 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md">
                        <code className="text-gsps-green font-mono font-bold text-lg break-all">{referralLink}</code>
                        <button
                            onClick={copyToClipboard}
                            className="bg-gsps-green text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-xl shadow-gsps-green/20 active:scale-95 whitespace-nowrap"
                        >
                            Copy Link
                        </button>
                    </div>
                    <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10">
                        <div className="space-y-2">
                            <p className="text-2xl font-black text-gsps-green">10%</p>
                            <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Commission</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-2xl font-black text-gsps-green">Instant</p>
                            <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Payouts</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-2xl font-black text-gsps-green">Unlimited</p>
                            <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Invites</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[50px] p-12 border border-gray-100 shadow-sm text-center">
                <h3 className="text-2xl font-black text-gsps-blue mb-10">How It Works</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                        { step: '01', title: 'Complete a Payment', desc: 'To be eligible for referral rewards, you must complete at least one successful transaction.' },
                        { step: '02', title: 'Share your link', desc: 'Invite friends to GSPS using your unique referral code or link.' },
                        { step: '03', title: 'Earn & Upgrade', desc: 'Get credited when they pay and level up your badge for even higher commission rates.' }
                    ].map((item, i) => (
                        <div key={i} className="space-y-4">
                            <div className="text-5xl font-black text-gsps-bg-light">{item.step}</div>
                            <h4 className="text-xl font-black text-gsps-blue">{item.title}</h4>
                            <p className="text-gsps-blue/40 font-bold leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Referrals;
