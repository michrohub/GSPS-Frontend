import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaCopy, FaTelegram, FaCheckCircle, FaExclamationTriangle, FaTelegramPlane } from 'react-icons/fa';

import QR_USDT_BNB_20 from '../../../../public/USDT-BNB_20.jpg';
import QR_USDT_SOL from '../../../../public/USDT-SOL.jpg';
import QR_USDT_TRC_20 from '../../../../public/USDT-TRC-20.jpg';

const Service = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [feeTypes, setFeeTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showPayModal, setShowPayModal] = useState(false);
    const [selectedApp, setSelectedApp] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [payMethod, setPayMethod] = useState('USDT-BNB20');
    const [txId, setTxId] = useState('');
    const [screenshot, setScreenshot] = useState(null);

    const [formData, setFormData] = useState({
        feeTypeId: '',
        country: '',
        paymentLink: '',
        portalAccess: '',
        initialAmount: '',
        notes: ''
    });

    const fetchApplications = async () => {
        try {
            const res = await api.get('/fee-applications/my');
            setApplications(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchFeeTypes = async () => {
        try {
            const res = await api.get('/fee-applications/fee-types');
            setFeeTypes(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchApplications();
        fetchFeeTypes();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await api.post('/fee-applications/apply', formData);
            toast.success('Application submitted successfully');
            setShowModal(false);
            setFormData({ feeTypeId: '', country: '', paymentLink: '', portalAccess: '', initialAmount: '', notes: '' });
            fetchApplications();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error submitting application');
        } finally {
            setSubmitting(false);
        }
    };

    const handleWhatsApp = (appId) => {
        const message = `Hello GSPS Support, I need help with my Fee Application ID: ${appId}`;
        window.open(`https://t.me/GSPS26?text=${encodeURIComponent(message)}`, '_blank');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-orange-500';
            case 'Approved': return 'bg-blue-500';
            case 'Completed': return 'bg-green-500';
            case 'Rejected': return 'bg-red-500';
            case 'Pending Verification': return 'bg-purple-600';
            default: return 'bg-gray-500';
        }
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Address copied to clipboard');
    };

    const handlePaySubmit = async (e) => {
        e.preventDefault();
        if (!txId || !screenshot) {
            return toast.error('Please provide Transaction ID and Screenshot');
        }
        setSubmitting(true);
        try {
            const data = new FormData();
            data.append('applicationId', selectedApp._id);
            data.append('transactionId', txId);
            data.append('paymentType', selectedApp.feeTypeName);
            data.append('amount', selectedApp.finalAmount || selectedApp.initialAmount || 0);
            data.append('currency', 'GBP');
            data.append('purpose', `Payment for ${selectedApp.feeTypeName}`);
            data.append('invoice', screenshot);

            await api.post('/payments/request', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success('Payment submitted for verification');
            setShowPayModal(false);
            setTxId('');
            setScreenshot(null);
            fetchApplications();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error submitting payment');
        } finally {
            setSubmitting(false);
        }
    };

    const cryptoWallets = {
        'USDT-BNB20': {
            address: '0x1c07f48c7Af167914032133Dd8C6E84de1d55CAa', // Replace with real
            qr: QR_USDT_BNB_20
        },
        'USDT-SOL': {
            address: 'HpgVQKtYDvMtCoDqqZdsDTLxh9Eu9u4u38FBcreuav4k', // Replace with real
            qr: QR_USDT_SOL
        },
        'USDT-TRC20': {
            address: 'TPtSN6dVxuNGnA2KNPojDLKJXQ3TR6hu6S', // Replace with real
            qr: QR_USDT_TRC_20
        }
    };

    return (
        <div className="space-y-8 pb-12">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-gsps-blue mb-2">Service <span className="text-gsps-green">Panel</span></h1>
                    <p className="text-gsps-blue/40 font-bold uppercase tracking-widest text-sm">Apply for university & visa fees</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-gsps-blue text-white px-8 py-4 rounded-[10px] font-black shadow-lg hover:bg-gsps-green transition-all active:scale-95"
                >
                    + Apply New Fee
                </button>
            </header>

            <div className="bg-white rounded-[10px] shadow-sm border border-gray-100 overflow-y-auto">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gsps-bg-light border-b border-gray-100">
                            <tr>
                                <th className="px-8 py-6 text-xs font-black text-gsps-blue/40  tracking-widest">Fee Type</th>
                                <th className="px-8 py-6 text-xs font-black text-gsps-blue/40  tracking-widest">Amount</th>
                                <th className="px-8 py-6 text-xs font-black text-gsps-blue/40  tracking-widest">Status</th>
                                <th className="px-8 py-6 text-xs font-black text-gsps-blue/40  tracking-widest">Date</th>
                                <th className="px-8 py-6 text-xs font-black text-gsps-blue/40  tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan="5" className="px-8 py-10 text-center font-bold text-gsps-blue/40">Loading applications...</td></tr>
                            ) : applications.length === 0 ? (
                                <tr><td colSpan="5" className="px-8 py-10 text-center font-bold text-gsps-blue/40">No applications found.</td></tr>
                            ) : (
                                applications.map((app) => (
                                    <tr key={app._id} className="hover:bg-gsps-bg-light/30 transition-colors">
                                        <td className="px-8 py-6">
                                            <p className="font-black text-gsps-blue">{app.feeTypeName}</p>
                                            <p className="text-xs font-bold text-gsps-blue/40">{app.country}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="font-black text-gsps-blue">{app.finalAmount ? `${app.finalAmount}` : (app.initialAmount ? `${app.initialAmount}` : 'N/A')}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest ${getStatusColor(app.status)}`}>
                                                {app.status}
                                            </span>
                                            {app.status === 'Rejected' && app.rejectionReason && (
                                                <p className="text-[10px] text-red-500 font-bold mt-1 max-w-[150px] truncate" title={app.rejectionReason}>Reason: {app.rejectionReason}</p>
                                            )}
                                        </td>
                                        <td className="px-8 py-6 text-xs font-bold text-gsps-blue/40 uppercase tracking-widest">
                                            {new Date(app.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-8 py-6 text-right space-x-3">
                                            <button
                                                onClick={() => handleWhatsApp(app._id)}
                                                className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all shadow-sm"
                                                title="WhatsApp Support"
                                            >
                                                <FaTelegramPlane />

                                            </button>
                                            {app.status === 'Pending' && (
                                                <button
                                                    onClick={() => {
                                                        setSelectedApp(app);
                                                        setShowPayModal(true);
                                                    }}
                                                    className="px-4 py-2 bg-gsps-green text-white rounded-xl font-black text-xs hover:bg-gsps-blue transition-all"
                                                >
                                                    Pay Now
                                                </button>
                                            )}
                                            {app.status === 'Pending Verification' && (
                                                <span className="text-xs font-black text-purple-600 uppercase tracking-widest italic">
                                                    Pending Verification
                                                </span>
                                            )}
                                            {app.status === 'Completed' && (
                                                <span className="text-xs font-black text-gsps-green uppercase tracking-widest">
                                                    Payment Completed
                                                </span>
                                            )}
                                            {app.status === 'Rejected' && (
                                                <span className="text-xs font-black text-red-500 uppercase tracking-widest">
                                                    Rejected
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Support Section */}
            <div className="bg-gsps-blue rounded-[30px] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-3xl">
                        <FaTelegram className="text-gsps-green" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black">Need help? <span className="text-gsps-green">Contact us on Telegram</span></h3>
                        <p className="text-white/60 font-bold">Our support team is available 24/7 to assist you.</p>
                    </div>
                </div>
                <a
                    href="https://t.me/gsps_support"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-gsps-green text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-white hover:text-gsps-blue transition-all shadow-xl flex items-center gap-2"
                >
                    <FaTelegram /> Join Telegram
                </a>
            </div>

            {/* Application Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gsps-blue/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="px-8 py-6 bg-gsps-blue text-white flex items-center justify-between">
                            <h2 className="text-2xl font-black">Apply for <span className="text-gsps-green">Fee</span></h2>
                            <button onClick={() => setShowModal(false)} className="text-white/60 hover:text-white text-2xl font-black">✕</button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Fee Type</label>
                                    <select name="feeTypeId" value={formData.feeTypeId} onChange={handleChange} required className="w-full px-6 py-4 rounded-2xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 outline-none font-bold text-gsps-blue">
                                        <option value="">Select Fee Type</option>
                                        {feeTypes.map(type => (
                                            <option key={type._id} value={type._id}>{type.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Country</label>
                                    <input type="text" name="country" value={formData.country} onChange={handleChange} required placeholder="e.g. UK, USA" className="w-full px-6 py-4 rounded-2xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 outline-none font-bold text-gsps-blue shadow-inner" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Official Payment Link</label>
                                    <input type="url" name="paymentLink" value={formData.paymentLink} onChange={handleChange} required placeholder="https://..." className="w-full px-6 py-4 rounded-2xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 outline-none font-bold text-gsps-blue shadow-inner" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Important Documents</label>
                                    <textarea name="portalAccess" value={formData.portalAccess} onChange={handleChange} required rows="3" placeholder="Please provide login credentials for the portal" className="w-full px-6 py-4 rounded-2xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 outline-none font-bold text-gsps-blue shadow-inner"></textarea>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1"> Amount</label>
                                    <input required type="number" name="initialAmount" value={formData.initialAmount} onChange={handleChange} placeholder="0.00" className="w-full px-6 py-4 rounded-2xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 outline-none font-bold text-gsps-blue shadow-inner" />
                                </div>
                            </div>
                            <button type="submit" disabled={submitting} className="w-full bg-gsps-blue text-white py-5 rounded-3xl font-black text-lg hover:bg-gsps-green transition-all shadow-xl disabled:opacity-50">
                                {submitting ? 'Submitting Application...' : 'Submit Application'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Pay Now Modal */}
            {showPayModal && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-gsps-blue/80 backdrop-blur-md">
                    <div className="bg-white w-full max-w-xl rounded-[10px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
                        <div className="px-8 py-6 bg-gsps-blue text-white flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-black">Crypto <span className="text-gsps-green">Payment</span></h2>
                                <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Submit Transaction Details</p>
                            </div>
                            <button onClick={() => setShowPayModal(false)} className="text-white/60 hover:text-white text-2xl font-black">✕</button>
                        </div>

                        <div className="p-8 space-y-6 max-h-[80vh] overflow-y-auto">
                            <div className="bg-orange-50 border-2 border-orange-200 p-4 rounded-2xl flex items-start gap-4">
                                <FaExclamationTriangle className="text-orange-500 text-xl shrink-0 mt-1" />
                                <p className="text-sm font-bold text-orange-800">
                                    অবশ্যই ক্রিপ্টোকারেন্সির মাধ্যমে পেমেন্ট করতে হবে। ভুল নেটওয়ার্কে পেমেন্ট করলে তা পুনরুদ্ধার করা সম্ভব নয়।
                                </p>
                            </div>

                            <div className="flex gap-2 p-1 bg-gsps-bg-light rounded-2xl">
                                {Object.keys(cryptoWallets).map(method => (
                                    <button
                                        key={method}
                                        onClick={() => setPayMethod(method)}
                                        className={`flex-1 py-3 rounded-xl font-black text-xs transition-all ${payMethod === method ? 'bg-gsps-blue text-white shadow-lg' : 'text-gsps-blue/40 hover:bg-white'}`}
                                    >
                                        {method}
                                    </button>
                                ))}
                            </div>

                            <div className="bg-gsps-bg-light p-6 rounded-3xl flex flex-col items-center gap-6 border border-gray-100">
                                <div className="bg-white p-4 rounded-3xl shadow-inner">
                                    <img src={cryptoWallets[payMethod].qr} alt="QR Code" className="w-40 h-40 object-contain" />
                                </div>
                                <div className="w-full space-y-2">
                                    <label className="text-[10px] font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Wallet Address ({payMethod})</label>
                                    <div className="flex gap-2">
                                        <div className="flex-1 bg-white px-4 py-3 rounded-xl border border-gray-100 font-bold text-gsps-blue text-xs truncate">
                                            {cryptoWallets[payMethod].address}
                                        </div>
                                        <button
                                            onClick={() => handleCopy(cryptoWallets[payMethod].address)}
                                            className="p-3 bg-gsps-blue text-white rounded-xl hover:bg-gsps-green transition-all"
                                        >
                                            <FaCopy />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handlePaySubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Transaction ID (TXID)</label>
                                    <input
                                        type="text"
                                        value={txId}
                                        onChange={(e) => setTxId(e.target.value)}
                                        required
                                        placeholder="Paste your transaction ID here"
                                        className="w-full px-6 py-4 rounded-2xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 outline-none font-bold text-gsps-blue shadow-inner"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Upload Screenshot</label>
                                    <input
                                        type="file"
                                        id="pay-screenshot"
                                        className="hidden"
                                        onChange={(e) => setScreenshot(e.target.files[0])}
                                        required
                                    />
                                    <label
                                        htmlFor="pay-screenshot"
                                        className="flex items-center justify-between px-6 py-4 rounded-2xl bg-gsps-bg-light border-2 border-dashed border-gray-200 cursor-pointer hover:border-gsps-green/50 transition-all"
                                    >
                                        <span className="text-sm font-bold text-gsps-blue/40">{screenshot ? screenshot.name : 'Choose payment screenshot'}</span>
                                        <div className="w-10 h-10 bg-gsps-blue/5 rounded-xl flex items-center justify-center text-gsps-blue">📷</div>
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full bg-gsps-blue text-white py-5 rounded-[10px] font-black text-lg hover:bg-gsps-green transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3"
                                >
                                    {submitting ? 'Verifying...' : <><FaCheckCircle /> Submit Payment</>}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Service;
