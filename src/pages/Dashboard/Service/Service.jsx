import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Service = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [feeTypes, setFeeTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [submitting, setSubmitting] = useState(false);

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
        window.open(`https://wa.me/+8801234567890?text=${encodeURIComponent(message)}`, '_blank');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-orange-500';
            case 'Approved': return 'bg-blue-500';
            case 'Completed': return 'bg-green-500';
            case 'Rejected': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="space-y-8">
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
                                            <p className="font-black text-gsps-blue">{app.finalAmount ? `${app.finalAmount} GBP` : (app.initialAmount ? `${app.initialAmount} (Est)` : 'N/A')}</p>
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
                                                💬
                                            </button>
                                            {app.status === 'Completed' && (
                                                <button 
                                                    onClick={() => navigate('/dashboard/payments', { state: { amount: app.finalAmount, type: app.feeTypeName, appId: app._id }})}
                                                    className="px-4 py-2 bg-gsps-green text-white rounded-xl font-black text-xs hover:bg-gsps-blue transition-all"
                                                >
                                                    Pay Now
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
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
                                    <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Portal Login Access (User/Pass)</label>
                                    <textarea name="portalAccess" value={formData.portalAccess} onChange={handleChange} required rows="3" placeholder="Please provide login credentials for the portal" className="w-full px-6 py-4 rounded-2xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 outline-none font-bold text-gsps-blue shadow-inner"></textarea>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Initial Amount (Optional)</label>
                                    <input type="number" name="initialAmount" value={formData.initialAmount} onChange={handleChange} placeholder="0.00" className="w-full px-6 py-4 rounded-2xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 outline-none font-bold text-gsps-blue shadow-inner" />
                                </div>
                            </div>
                            <button type="submit" disabled={submitting} className="w-full bg-gsps-blue text-white py-5 rounded-3xl font-black text-lg hover:bg-gsps-green transition-all shadow-xl disabled:opacity-50">
                                {submitting ? 'Submitting Application...' : 'Submit Application'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Service;
