import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';
import { toast } from 'react-hot-toast';

const Referrals = () => {
    const { user, setUser } = useAuth();
    const [referralCode, setReferralCode] = useState('');
    const [applying, setApplying] = useState(false);
    const referralLink = `${window.location.origin}/signup?ref=${user?.referralCode}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink);
        toast.success('Referral link copied!');
    };

    const handleApplyReferral = async (e) => {
        e.preventDefault();
        if (!referralCode.trim()) return toast.error('Please enter a referral code');
        
        setApplying(true);
        try {
            const res = await api.post('/user/apply-referral', { referralCode });
            setUser(prev => ({ ...prev, ...res.data.user }));
            toast.success(res.data.message);
            setReferralCode('');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to apply referral code');
        } finally {
            setApplying(false);
        }
    };

    return (
        <div className="space-y-12 max-w-5xl mx-auto">
            <header className="text-center">
                <h1 className="text-4xl lg:text-6xl font-black text-gsps-blue mb-6">Refer & <span className="text-gsps-green">Earn</span></h1>
                <p className="text-xl text-gsps-blue/40 font-bold max-w-2xl mx-auto italic">Shape the future of global student payments and get rewarded for every friend you bring to GSPS.</p>
            </header>

            <div className="bg-gradient-to-br from-gsps-blue to-gsps-blue/90 rounded-[40px] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-gsps-blue/20">
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
                    { label: 'Successful Referrals', value: user?.referralCount || 0, icon: '🏆' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 text-center">
                        <div className="text-4xl mb-4">{stat.icon}</div>
                        <p className="text-xs font-black text-gsps-blue/30 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                        <p className="text-3xl font-black text-gsps-blue">{stat.value}</p>
                    </div>
                ))}
            </div>

            {!user?.referredBy && (
                <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="max-w-xl mx-auto text-center space-y-6">
                        <div className="w-16 h-16 bg-gsps-green/10 rounded-2xl flex items-center justify-center text-3xl mx-auto">🤝</div>
                        <h2 className="text-2xl font-black text-gsps-blue">
                            Were you referred by <span className="text-gsps-green">someone?</span>
                        </h2>
                        <p className="text-gsps-blue/40 font-bold italic text-sm">
                            If you missed entering a referral code during signup, you can add it here. Once a code is applied, it will be locked forever and cannot be changed.
                        </p>
                        
                        <form onSubmit={handleApplyReferral} className="flex flex-col sm:flex-row gap-4">
                            <input 
                                type="text"
                                placeholder="Enter Referral Code"
                                value={referralCode}
                                onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                                className="flex-1 px-6 py-4 rounded-2xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 outline-none font-bold text-gsps-blue transition-all uppercase placeholder:normal-case"
                            />
                            <button 
                                type="submit"
                                disabled={applying}
                                className="bg-gsps-blue text-white px-8 py-4 rounded-2xl font-black hover:bg-gsps-green transition-all active:scale-95 disabled:opacity-50 whitespace-nowrap shadow-lg shadow-gsps-blue/20"
                            >
                                {applying ? 'Applying...' : 'Apply Code'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="bg-gsps-blue rounded-[60px] p-12 md:p-20 text-white relative overflow-hidden text-center shadow-2xl shadow-gsps-blue/20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gsps-green/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10 max-w-2xl mx-auto space-y-10">
                    <h2 className="text-3xl font-black italic tracking-tight">Your <span className="text-gsps-green underline underline-offset-8 decoration-white/20">Unique</span> Referral Link</h2>
                    <div className="bg-white/10 p-6 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md">
                        <code className="text-gsps-green font-mono font-bold text-lg break-all selection:bg-gsps-green selection:text-white px-4">
                            {referralLink}
                        </code>
                        <button
                            onClick={copyToClipboard}
                            className="bg-gsps-green text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-xl shadow-gsps-green/20 active:scale-95 whitespace-nowrap"
                        >
                            Copy Link
                        </button>
                    </div>
                    
                    <div className="pt-12 space-y-10">
                        <div className="inline-block px-6 py-2 bg-gsps-green/20 text-gsps-green rounded-full text-xs font-black uppercase tracking-[0.2em] border border-gsps-green/30">
                            Reward Tiers
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { name: 'Silver', rate: '20%', color: 'border-slate-400/30 bg-slate-400/5', icon: '🥈' },
                                { name: 'Gold', rate: '25%', color: 'border-amber-500/30 bg-amber-500/5', icon: '🥇' },
                                { name: 'Diamond', rate: '30%', color: 'border-cyan-400/30 bg-cyan-400/5', icon: '💎' }
                            ].map((tier, idx) => (
                                <div key={idx} className={`p-6 rounded-[30px] border-2 ${tier.color} backdrop-blur-sm transition-transform hover:scale-105`}>
                                    <div className="text-3xl mb-3">{tier.icon}</div>
                                    <h4 className="text-sm font-black text-white/50 uppercase tracking-widest mb-1">{tier.name}</h4>
                                    <p className="text-4xl font-black text-gsps-green">{tier.rate}</p>
                                    <p className="text-[10px] font-bold text-white/30 uppercase mt-2">Commission</p>
                                </div>
                            ))}
                        </div>

                        <div className="relative group overflow-hidden bg-gradient-to-r from-gsps-green/20 to-gsps-green/5 border-2 border-gsps-green/30 p-8 rounded-[35px] backdrop-blur-md">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-gsps-green/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-white flex items-center gap-3 justify-center md:justify-start">
                                        <span className="text-3xl">🎁</span> Special Referral Bonus
                                    </h3>
                                    <p className="text-white/60 font-bold max-w-md">
                                        Get an extra <span className="text-gsps-green text-xl font-black">$50</span> for every referral who completes KYC and makes their first payment!
                                    </p>
                                </div>
                                <div className="text-5xl font-black text-gsps-green bg-white/10 px-8 py-4 rounded-3xl border border-white/10">
                                    +$50
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[50px] p-12 border border-gray-100 shadow-sm text-center">
                <h3 className="text-2xl font-black text-gsps-blue mb-10">How It Works</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                        { step: '01', title: 'Share your link', desc: 'Invite friends to GSPS using your unique referral code or link.' },
                        { step: '02', title: 'Friend Joins', desc: 'When your friend adds your code or joins via link and completes KYC, they become eligible.' },
                        { step: '03', title: 'Earn & Upgrade', desc: 'Once your friend completes their first payment, you receive $50 and progress towards the next badge.' }
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
