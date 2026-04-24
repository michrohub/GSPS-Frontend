import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const KYCManagement = () => {
    const [kycs, setKycs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedKYC, setSelectedKYC] = useState(null);
    const [rejectionReason, setRejectionReason] = useState('');
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const fetchKYCs = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/admin/kyc?search=${search}&status=${statusFilter}`);
            setKycs(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const debounceFetch = setTimeout(fetchKYCs, 300);
        return () => clearTimeout(debounceFetch);
    }, [search, statusFilter]);


    const handleUpdateStatus = async (id, status) => {
        if (status === 'rejected' && !rejectionReason.trim()) {
            alert('Please provide a rejection reason.');
            return;
        }
        try {
            await api.put(`/admin/kyc/${id}`, { status, rejectionReason });
            setSelectedKYC(null);
            setRejectionReason('');
            fetchKYCs();
        } catch (err) {
            alert('Error updating status');
        }
    };

    return (
        <div className="space-y-12">
            <header>
                <h1 className="text-3xl font-black text-gsps-blue mb-2">KYC <span className="text-gsps-green">Verification</span></h1>
                <p className="text-gsps-blue/40 font-bold uppercase tracking-widest text-sm">Review Student Identites</p>
            </header>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <input 
                        type="text" 
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-[10px] border border-gray-100 focus:border-gsps-blue outline-none font-bold text-sm shadow-sm transition-all"
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
                </div>
                
                <div className="w-full md:w-auto">
                    <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full md:w-48 px-4 py-4 rounded-[10px] border border-gray-100 font-bold text-sm outline-none bg-white shadow-sm"
                    >
                        <option value="">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
            </div>


            <div className="bg-white rounded-[10px] shadow-sm border border-gray-100 overflow-y-auto">
                <table className="w-full text-left">
                    <thead className="bg-[#003b73] border-b border-gray-100">
                        <tr className='whitespace-nowrap'>
                            <th className="px-8 py-5 text-xs font-black text-white  tracking-widest">Student</th>
                            <th className="px-8 py-5 text-xs font-black text-white  tracking-widest">Document</th>
                            <th className="px-8 py-5 text-xs font-black text-white  tracking-widest">Submitted</th>
                            <th className="px-8 py-5 text-xs font-black text-white  tracking-widest">Status</th>
                            <th className="px-8 py-5 text-xs font-black text-white  tracking-widest text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {kycs.map((kyc) => (
                            <tr key={kyc._id} className="hover:bg-gsps-bg-light/30 transition-all">
                                <td className="px-8 py-3">
                                    <p className="font-black text-gsps-blue">{kyc.user?.fullName}</p>
                                    <p className="text-xs font-bold text-gsps-blue/40 italic">{kyc.user?.email}</p>
                                </td>
                                <td className="px-8 py-3 font-bold text-sm text-gsps-blue/60">
                                    {kyc.studentName} <br/>
                                    <span className="text-xs text-gsps-blue/40">{kyc.whatsappNumber}</span>
                                </td>
                                <td className="px-8 py-3 font-bold text-sm text-gsps-blue/40">{new Date(kyc.createdAt).toLocaleDateString()}</td>
                                <td className="px-8 py-3">
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                                        kyc.status === 'approved' ? 'bg-green-100 text-green-600' : 
                                        kyc.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-red-100 text-red-600'
                                    }`}>{kyc.status}</span>
                                </td>
                                <td className="px-8 py-3 text-right">
                                    <button 
                                        onClick={() => setSelectedKYC(kyc)}
                                        className="text-gsps-green font-black hover:underline text-sm uppercase tracking-widest"
                                    >
                                        Review
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {selectedKYC && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gsps-blue/80 backdrop-blur-md" onClick={() => setSelectedKYC(null)}></div>
                    <div className="relative bg-white w-full max-w-4xl rounded-[10px] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
                        <div className="p-4  space-y-10">
                            <div className="flex justify-between items-center">
                                <h2 className="text-3xl font-black text-gsps-blue">KYC Review</h2>
                                <button onClick={() => setSelectedKYC(null)} className="text-2xl opacity-20 hover:opacity-100">✕</button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <section className="space-y-6">
                                    <p className="text-xs font-black text-gsps-blue/30 uppercase tracking-widest">Student Information</p>
                                    <div className="space-y-4">
                                        <p className="text-lg font-black text-gsps-blue">{selectedKYC.user?.fullName}</p>
                                        <p className="text-xs font-bold text-gsps-blue/40 italic">{selectedKYC.user?.email}</p>
                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                            <div><p className="text-[10px] opacity-40 uppercase font-black">Student Name</p><p className="font-bold">{selectedKYC.studentName}</p></div>
                                            <div><p className="text-[10px] opacity-40 uppercase font-black">WhatsApp</p><p className="font-bold">{selectedKYC.whatsappNumber}</p></div>
                                        </div>
                                    </div>
                                </section>

                                <section className="space-y-6">
                                    <p className="text-xs font-black text-gsps-blue/30 uppercase tracking-widest">Document Previews</p>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        {Object.entries(selectedKYC.documents).map(([key, val]) => {
                                            if (!val) return null;
                                            const isImage = val.match(/\.(jpeg|jpg|gif|png)$/i);
                                            const formatKey = key.replace(/([A-Z])/g, ' $1').trim();
                                            return (
                                                <a key={key} href={`http://localhost:5000/${val}`} target="_blank" rel="noreferrer" className="block p-4 bg-gsps-bg-light rounded-2xl hover:bg-gsps-green/5 transition-all text-center group">
                                                    {isImage ? (
                                                        <div className="h-24 w-full mb-3 rounded-lg overflow-hidden border border-gray-200">
                                                            <img src={`http://localhost:5000/${val}`} alt={key} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                                        </div>
                                                    ) : (
                                                        <span className="text-3xl block mb-2 opacity-50">📄</span>
                                                    )}
                                                    <span className="text-[10px] font-black uppercase text-gsps-blue/40">{formatKey}</span>
                                                </a>
                                            );
                                        })}
                                    </div>
                                </section>
                            </div>

                            <div className="pt-10 border-t border-gray-100 space-y-8">
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Rejection Reason (if applicable)</label>
                                    <textarea 
                                        value={rejectionReason}
                                        onChange={(e) => setRejectionReason(e.target.value)}
                                        placeholder="Explain why the KYC is being rejected..."
                                        className="w-full px-6 py-4 rounded-2xl bg-gsps-bg-light outline-none font-bold text-gsps-blue"
                                    ></textarea>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <button 
                                        onClick={() => handleUpdateStatus(selectedKYC._id, 'approved')}
                                        className="flex-1 bg-gsps-green text-white py-5 rounded-[10px] font-black text-lg shadow-xl shadow-green-500/10 hover:scale-[1.02] transition-all"
                                    >
                                        Approve & Verify
                                    </button>
                                    <button 
                                        onClick={() => handleUpdateStatus(selectedKYC._id, 'rejected')}
                                        className="flex-1 bg-red-500 text-white py-5 rounded-[10px] font-black text-lg shadow-xl shadow-red-500/10 hover:scale-[1.02] transition-all"
                                    >
                                        Reject Application
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KYCManagement;
