import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { toast } from 'react-hot-toast';

const FeeApplicationManagement = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const [selectedApp, setSelectedApp] = useState(null);
    const [rejectionReason, setRejectionReason] = useState('');
    const [finalAmount, setFinalAmount] = useState('');
    const [invoice, setInvoice] = useState(null);
    const [processing, setProcessing] = useState(false);
    
    // Fee Type Management
    const [feeTypes, setFeeTypes] = useState([]);
    const [showFeeTypeModal, setShowFeeTypeModal] = useState(false);
    const [newFeeType, setNewFeeType] = useState({ name: '', description: '' });

    const fetchApplications = async () => {
        try {
            const res = await api.get(`/fee-applications/all${filter ? `?status=${filter}` : ''}`);
            setApplications(res.data);
        } catch (err) {
            toast.error('Error fetching applications');
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
    }, [filter]);

    const handleCreateFeeType = async (e) => {
        e.preventDefault();
        try {
            await api.post('/fee-applications/fee-types', newFeeType);
            toast.success('Fee type created successfully');
            setNewFeeType({ name: '', description: '' });
            fetchFeeTypes();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error creating fee type');
        }
    };

    const handleAction = async (status) => {
        if (!selectedApp) return;
        setProcessing(true);

        const formData = new FormData();
        formData.append('status', status);
        if (status === 'Rejected') formData.append('rejectionReason', rejectionReason);
        if (status === 'Completed') {
            formData.append('finalAmount', finalAmount);
            if (invoice) formData.append('invoice', invoice);
        }

        try {
            await api.put(`/fee-applications/${selectedApp._id}/status`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success(`Application marked as ${status}`);
            setSelectedApp(null);
            setRejectionReason('');
            setFinalAmount('');
            setInvoice(null);
            fetchApplications();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error updating status');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-gsps-blue mb-2">Service <span className="text-gsps-green">Management</span></h1>
                    <p className="text-gsps-blue/40 font-bold uppercase tracking-widest text-sm">Review & process fee applications</p>
                </div>
                <button 
                    onClick={() => setShowFeeTypeModal(true)}
                    className="bg-gsps-green text-white px-6 py-3 rounded-2xl font-black shadow-lg hover:bg-gsps-blue transition-all active:scale-95"
                >
                    ⚙️ Manage Fee Types
                </button>
                <div className="relative group">
                    <select 
                        value={filter} 
                        onChange={(e) => setFilter(e.target.value)}
                        className="appearance-none bg-white px-8 py-3 rounded-2xl border-2 border-gray-100 shadow-sm text-xs font-black text-gsps-blue uppercase tracking-widest outline-none focus:border-gsps-green/30 transition-all cursor-pointer pr-12"
                    >
                        <option value="">Filter: All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Completed">Completed</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gsps-blue/40 text-[10px]">
                        ▼
                    </div>
                </div>
            </header>

           <div className="bg-white rounded-[10px] shadow-sm border border-gray-100 overflow-y-auto">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gsps-bg-light border-b border-gray-100">
                            <tr>
                                <th className="px-8 py-6 text-xs font-black text-gsps-blue/40 uppercase tracking-widest">Student</th>
                                <th className="px-8 py-6 text-xs font-black text-gsps-blue/40 uppercase tracking-widest">Fee Details</th>
                                <th className="px-8 py-6 text-xs font-black text-gsps-blue/40 uppercase tracking-widest">Portal Access</th>
                                <th className="px-8 py-6 text-xs font-black text-gsps-blue/40 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-6 text-xs font-black text-gsps-blue/40 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan="5" className="px-8 py-10 text-center font-bold text-gsps-blue/40">Loading...</td></tr>
                            ) : applications.length === 0 ? (
                                <tr><td colSpan="5" className="px-8 py-10 text-center font-bold text-gsps-blue/40">No applications found.</td></tr>
                            ) : (
                                applications.map((app) => (
                                    <tr key={app._id} className="hover:bg-gsps-bg-light/30 transition-colors">
                                        <td className="px-8 py-6">
                                            <p className="font-black text-gsps-blue">{app.user?.fullName}</p>
                                            <p className="text-xs font-bold text-gsps-blue/40">{app.user?.email}</p>
                                            <p className="text-xs font-bold text-gsps-blue/40">{app.user?.phone}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="font-black text-gsps-blue">{app.feeTypeName}</p>
                                            <p className="text-xs font-bold text-gsps-blue/40">{app.country}</p>
                                            <a href={app.paymentLink} target="_blank" rel="noreferrer" className="text-[10px] text-gsps-green hover:underline font-bold">Link ↗</a>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-xs font-bold text-gsps-blue/60 bg-gray-100 p-2 rounded-lg max-w-[200px] break-words">{app.portalAccess}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest ${
                                                app.status === 'Pending' ? 'bg-orange-500' : 
                                                app.status === 'Approved' ? 'bg-blue-500' : 
                                                app.status === 'Completed' ? 'bg-green-500' : 'bg-red-500'
                                            }`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right space-x-2">
                                            {app.status === 'Pending' && (
                                                <button onClick={() => setSelectedApp({ ...app, action: 'Approve' })} className="px-3 py-2 bg-blue-100 text-blue-600 rounded-lg font-black text-[10px] uppercase hover:bg-blue-600 hover:text-white transition-all">Approve</button>
                                            )}
                                            {(app.status === 'Pending' || app.status === 'Approved') && (
                                                <>
                                                    <button onClick={() => setSelectedApp({ ...app, action: 'Reject' })} className="px-3 py-2 bg-red-100 text-red-600 rounded-lg font-black text-[10px] uppercase hover:bg-red-600 hover:text-white transition-all">Reject</button>
                                                    <button onClick={() => setSelectedApp({ ...app, action: 'Complete' })} className="px-3 py-2 bg-green-100 text-green-600 rounded-lg font-black text-[10px] uppercase hover:bg-green-600 hover:text-white transition-all">Complete</button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Admin Action Modal */}
            {selectedApp && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gsps-blue/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden">
                        <div className="px-8 py-6 bg-gsps-blue text-white flex items-center justify-between">
                            <h2 className="text-2xl font-black">{selectedApp.action} <span className="text-gsps-green">Application</span></h2>
                            <button onClick={() => setSelectedApp(null)} className="text-white/60 hover:text-white text-2xl font-black">✕</button>
                        </div>
                        <div className="p-8 space-y-6">
                            {selectedApp.action === 'Approve' && (
                                <div className="text-center py-4">
                                    <p className="font-bold text-gsps-blue mb-6">Are you sure you want to approve this application from {selectedApp.user?.fullName}?</p>
                                    <button onClick={() => handleAction('Approved')} disabled={processing} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 transition-all disabled:opacity-50">Confirm Approval</button>
                                </div>
                            )}

                            {selectedApp.action === 'Reject' && (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Rejection Reason</label>
                                        <textarea value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value)} required placeholder="Why is this application being rejected?" className="w-full px-6 py-4 rounded-2xl bg-gsps-bg-light border-2 border-transparent focus:border-red-500/30 outline-none font-bold text-gsps-blue shadow-inner" rows="4"></textarea>
                                    </div>
                                    <button onClick={() => handleAction('Rejected')} disabled={processing || !rejectionReason} className="w-full bg-red-600 text-white py-4 rounded-2xl font-black hover:bg-red-700 transition-all disabled:opacity-50">Reject Application</button>
                                </div>
                            )}

                            {selectedApp.action === 'Complete' && (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Final Payment Amount (GBP)</label>
                                        <input type="number" value={finalAmount} onChange={(e) => setFinalAmount(e.target.value)} required placeholder="0.00" className="w-full px-6 py-4 rounded-2xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 outline-none font-bold text-gsps-blue shadow-inner" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Upload Invoice (PDF/Image)</label>
                                        <input type="file" onChange={(e) => setInvoice(e.target.files[0])} className="w-full px-6 py-4 rounded-2xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 outline-none font-bold text-gsps-blue" />
                                    </div>
                                    <button onClick={() => handleAction('Completed')} disabled={processing || !finalAmount} className="w-full bg-green-600 text-white py-4 rounded-2xl font-black hover:bg-green-700 transition-all disabled:opacity-50">Mark as Completed</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {/* Fee Type Management Modal */}
            {showFeeTypeModal && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-gsps-blue/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="px-8 py-6 bg-gsps-blue text-white flex items-center justify-between shrink-0">
                            <h2 className="text-2xl font-black">Manage <span className="text-gsps-green">Fee Types</span></h2>
                            <button onClick={() => setShowFeeTypeModal(false)} className="text-white/60 hover:text-white text-2xl font-black">✕</button>
                        </div>
                        
                        <div className="p-8 overflow-y-auto space-y-8">
                            {/* Create New Fee Type Form */}
                            <form onSubmit={handleCreateFeeType} className="bg-gsps-bg-light p-6 rounded-3xl space-y-4">
                                <h3 className="font-black text-gsps-blue uppercase tracking-widest text-xs">Create New Type</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input 
                                        type="text" 
                                        placeholder="Name (e.g. Visa Fee)" 
                                        value={newFeeType.name}
                                        onChange={(e) => setNewFeeType({ ...newFeeType, name: e.target.value })}
                                        required
                                        className="px-4 py-3 rounded-xl border-2 border-transparent focus:border-gsps-green/30 outline-none font-bold text-gsps-blue"
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="Description (optional)" 
                                        value={newFeeType.description}
                                        onChange={(e) => setNewFeeType({ ...newFeeType, description: e.target.value })}
                                        className="px-4 py-3 rounded-xl border-2 border-transparent focus:border-gsps-green/30 outline-none font-bold text-gsps-blue"
                                    />
                                </div>
                                <button type="submit" className="w-full bg-gsps-blue text-white py-3 rounded-xl font-black hover:bg-gsps-green transition-all shadow-lg">
                                    Add Fee Type
                                </button>
                            </form>

                            {/* Existing Fee Types List */}
                            <div className="space-y-4">
                                <h3 className="font-black text-gsps-blue uppercase tracking-widest text-xs">Existing Types</h3>
                                <div className="grid grid-cols-1 gap-3">
                                    {feeTypes.map(type => (
                                        <div key={type._id} className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:shadow-md transition-all">
                                            <div>
                                                <p className="font-black text-gsps-blue">{type.name}</p>
                                                <p className="text-xs font-bold text-gsps-blue/40">{type.description || 'No description'}</p>
                                            </div>
                                            <span className="text-[10px] font-black text-gsps-green bg-gsps-green/10 px-2 py-1 rounded-md uppercase">Active</span>
                                        </div>
                                    ))}
                                    {feeTypes.length === 0 && (
                                        <p className="text-center py-10 text-gsps-blue/30 font-bold italic">No fee types created yet.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeeApplicationManagement;
