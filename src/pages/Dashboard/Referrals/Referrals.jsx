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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { label: 'Referral Code', value: user?.referralCode, icon: '🎫' },
                    { label: 'Total Earnings', value: `$${user?.walletBalance || 0}`, icon: '💰' },
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
                        { step: '01', title: 'Share your link', desc: 'Send your code to friends paying global university fees.' },
                        { step: '02', title: 'They complete a payment', desc: 'When your friend completes their first international transaction.' },
                        { step: '03', title: 'You get credited', desc: 'Receive a fixed $20 commission directly to your GSPS wallet.' }
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
