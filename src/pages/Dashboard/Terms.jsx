import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { toast } from 'react-hot-toast';

const Terms = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const [accepted, setAccepted] = useState(false);
    const [confirmName, setConfirmName] = useState('');
    const [loading, setLoading] = useState(false);

    const terms = [
        {
            id: 1,
            text: "If any payment-related issues occur (such as a refund or chargeback), please contact us. In such cases, after verification, the payment will be reissued, and a service charge of 5% to 15% will be deducted."
        },
        {
            id: 2,
            text: "If payment is not completed within 1 to 6 hours after our service has been delivered, the matter will be reviewed and necessary actions may be taken in accordance with applicable laws, and the relevant authorities may be notified if required."
        }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!accepted) return toast.error("Please agree to the Terms & Conditions");
        if (!confirmName.trim()) return toast.error("Please enter your name as confirmation");
        
        setLoading(true);
        try {
            const res = await api.put('/auth/accept-terms', { name: confirmName });
            setUser(res.data.user);
            toast.success("Terms accepted successfully!");
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-black text-gsps-blue mb-2">Terms & <span className="text-gsps-green">Conditions</span></h1>
                <p className="text-gsps-blue/40 font-bold uppercase tracking-widest text-sm">Please read and agree to proceed</p>
            </header>

            <div className="space-y-6">
                {terms.map((term) => (
                    <div
                        key={term.id}
                        className="bg-white p-8 rounded-[10px] shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 bg-gsps-green/10 text-gsps-green rounded-2xl flex items-center justify-center font-black text-xl shrink-0">
                                {term.id}
                            </div>
                            <p className="text-gsps-blue text-lg font-bold leading-relaxed">
                                {term.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="mt-12 p-8 bg-gsps-blue rounded-[30px] text-white shadow-2xl space-y-8">
                <div className="space-y-6">
                    <label className="flex items-start gap-4 cursor-pointer group">
                        <input 
                            type="checkbox" 
                            checked={accepted}
                            onChange={(e) => setAccepted(e.target.checked)}
                            className="w-6 h-6 rounded border-2 border-white/20 bg-white/10 mt-1 checked:bg-gsps-green transition-all"
                        />
                        <span className="text-lg font-bold text-white/80 group-hover:text-white transition-colors">
                            I have read and agree to all the Terms & Conditions mentioned above.
                        </span>
                    </label>

                    <div className="space-y-3">
                        <label className="block text-xs font-black uppercase tracking-widest text-gsps-green">
                            Enter your full name as confirmation
                        </label>
                        <input 
                            type="text" 
                            value={confirmName}
                            onChange={(e) => setConfirmName(e.target.value)}
                            placeholder="Type your full name here..."
                            className="w-full bg-white/10 border-2 border-white/10 rounded-2xl px-6 py-4 font-bold text-white placeholder:text-white/20 outline-none focus:border-gsps-green transition-all"
                        />
                    </div>
                </div>

                <button 
                    type="submit"
                    disabled={loading || !accepted || !confirmName}
                    className="w-full bg-gsps-green text-white py-5 rounded-2xl font-black text-xl hover:bg-white hover:text-gsps-blue transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                >
                    {loading ? "Processing..." : "Confirm & Access Dashboard"}
                </button>
            </form>
        </div>
    );
};

export default Terms;
