import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import { useLocation } from 'react-router-dom';

const Payments = () => {
    const { user } = useAuth();
    const location = useLocation();
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    
    const [formData, setFormData] = useState({
        paymentType: 'Tuition Fee',
        amount: '',
        currency: 'GBP',
        purpose: ''
    });

    useEffect(() => {
        if (location.state) {
            const { amount, type, appId } = location.state;
            setFormData(prev => ({
                ...prev,
                amount: amount || '',
                paymentType: 'Other',
                purpose: `Payment for ${type} (App ID: ${appId})`
            }));
        }
    }, [location]);
    const [invoice, setInvoice] = useState(null);

    const fetchPayments = async () => {
        try {
            const res = await api.get('/payments/my');
            setPayments(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setInvoice(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (invoice) data.append('invoice', invoice);

        try {
            await api.post('/payments/request', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setFormData({ paymentType: 'Tuition Fee', amount: '', currency: 'GBP', purpose: '' });
            setInvoice(null);
            fetchPayments();
        } catch (err) {
            setError(err.response?.data?.message || 'Error submitting request');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-12">
            <header>
                <h1 className="text-4xl font-black text-gsps-blue mb-2">Payment <span className="text-gsps-green">Portal</span></h1>
                <p className="text-gsps-blue/40 font-bold uppercase tracking-widest text-sm">International Tuition & Service Fees</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Form Column */}
                <div className="lg:col-span-5 bg-white p-8 md:p-12 rounded-[50px] shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-black text-gsps-blue mb-8">New Request</h2>
                    
                    {error && <div className="bg-red-50 text-red-500 p-4 rounded-2xl mb-6 font-bold">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Payment Type</label>
                            <select 
                                name="paymentType" 
                                value={formData.paymentType} 
                                onChange={handleChange} 
                                disabled={!!location.state}
                                className={`w-full px-6 py-4 rounded-2xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 outline-none font-bold text-gsps-blue ${location.state ? 'opacity-60 cursor-not-allowed' : ''}`}
                            >
                                <option>Tuition Fee</option>
                                <option>Application Fee</option>
                                <option>Visa Fee</option>
                                <option>SEVIS Fee</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-1 space-y-2">
                                <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Currency</label>
                                <select name="currency" value={formData.currency} onChange={handleChange} className="w-full px-4 py-4 rounded-2xl bg-gsps-blue text-white outline-none font-bold">
                                    <option>GBP</option>
                                    <option>USD</option>
                                    <option>EUR</option>
                                    <option>CAD</option>
                                    <option>AUD</option>
                                </select>
                            </div>
                            <div className="col-span-2 space-y-2">
                                <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Amount</label>
                                <input 
                                    type="number" 
                                    name="amount" 
                                    value={formData.amount} 
                                    placeholder="0.00" 
                                    onChange={handleChange} 
                                    required 
                                    disabled={!!location.state?.amount}
                                    className={`w-full px-6 py-4 rounded-2xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 outline-none font-bold text-gsps-blue shadow-inner ${location.state?.amount ? 'opacity-60 cursor-not-allowed' : ''}`} 
                                />
                                {formData.amount && (
                                    <div className="flex items-center space-x-2 ml-1">
                                        <span className="text-[10px] font-black text-gsps-green bg-gsps-green/10 px-2 py-1 rounded-md uppercase tracking-tighter">
                                            Tier Savings: {user?.tier === 'Diamond' ? '8%' : user?.tier === 'Gold' ? '5%' : '3%'} (-${(formData.amount * (user?.tier === 'Diamond' ? 0.08 : user?.tier === 'Gold' ? 0.05 : 0.03)).toFixed(2)})
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Purpose / Note</label>
                            <textarea 
                                name="purpose" 
                                value={formData.purpose} 
                                placeholder="e.g. 2nd Semester Fees for Student ID 123456" 
                                onChange={handleChange} 
                                rows="3" 
                                disabled={!!location.state}
                                className={`w-full px-6 py-4 rounded-2xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 outline-none font-bold text-gsps-blue shadow-inner ${location.state ? 'opacity-60 cursor-not-allowed' : ''}`}
                            ></textarea>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Upload Invoice / Proof</label>
                            <input type="file" onChange={handleFileChange} required className="hidden" id="invoice-upload" />
                            <label htmlFor="invoice-upload" className="flex items-center space-x-4 px-6 py-4 rounded-2xl bg-gsps-green/5 border-2 border-dashed border-gsps-green/20 cursor-pointer hover:bg-gsps-green/10 transition-all">
                                <span className="text-xl">📄</span>
                                <span className="text-sm font-bold text-gsps-green">{invoice ? invoice.name : 'Choose Invoice (PDF/Img)'}</span>
                            </label>
                        </div>

                        <button type="submit" disabled={submitting} className="w-full bg-gsps-blue text-white py-5 rounded-3xl font-black text-lg hover:bg-gsps-green transition-all shadow-xl active:scale-[0.98] disabled:opacity-50">
                            {submitting ? 'Submitting...' : 'Submit Request'}
                        </button>
                    </form>
                </div>

                {/* History Column */}
                <div className="lg:col-span-7 space-y-8">
                    <div className="bg-white rounded-[50px] p-8 md:p-12 shadow-sm border border-gray-100 min-h-[600px]">
                        <h2 className="text-2xl font-black text-gsps-blue mb-10">Payment History</h2>
                        
                        {loading ? (
                            <div className="flex justify-center p-20">Loading payments...</div>
                        ) : payments.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center opacity-30 italic font-bold">
                                <span className="text-5xl mb-4">🏜️</span>
                                <p>No transactions made yet.</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {payments.map((p) => (
                                    <div key={p._id} className="p-6 rounded-3xl bg-gsps-bg-light/50 border border-gray-100 flex items-center justify-between group hover:bg-white hover:shadow-xl transition-all">
                                        <div className="flex items-center space-x-5">
                                            <div className="w-14 h-14 bg-gsps-blue text-white rounded-2xl flex items-center justify-center text-xl">🏛️</div>
                                            <div>
                                                <p className="font-black text-gsps-blue">{p.paymentType}</p>
                                                <p className="text-xs font-bold text-gsps-blue/40 uppercase tracking-widest">{new Date(p.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-black text-gsps-blue">{p.amount} <span className="text-sm opacity-40">{p.currency}</span></p>
                                            <div className="flex items-center justify-end space-x-2 mt-2">
                                                {p.status === 'Completed' && <span className="text-[10px] font-black text-gsps-green bg-green-100 px-3 py-1 rounded-full uppercase tracking-tighter">Savings: ${p.savingsAmount}</span>}
                                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                                                    p.status === 'Completed' ? 'bg-green-500 text-white' : 
                                                    p.status === 'Pending' ? 'bg-orange-500 text-white' : 
                                                    p.status === 'Processing' ? 'bg-gsps-blue text-white' : 'bg-red-500 text-white'
                                                }`}>{p.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payments;
