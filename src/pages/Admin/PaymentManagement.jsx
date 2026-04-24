import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const PaymentManagement = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [editData, setEditData] = useState({
        status: '',
        savingsAmount: '',
        adminNote: ''
    });

    const fetchPayments = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/admin/payments?search=${search}&status=${statusFilter}`);
            setPayments(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const debounceFetch = setTimeout(fetchPayments, 300);
        return () => clearTimeout(debounceFetch);
    }, [search, statusFilter]);


    const openDetails = (payment) => {
        setSelectedPayment(payment);
        setEditData({
            status: payment.status,
            savingsAmount: payment.savingsAmount,
            adminNote: payment.adminNote || ''
        });
    };

    const handleUpdate = async () => {
        try {
            await api.put(`/admin/payments/${selectedPayment._id}`, editData);
            setSelectedPayment(null);
            fetchPayments();
        } catch (err) {
            alert('Error updating payment');
        }
    };

    return (
        <div className="space-y-12">
            <header>
                <h1 className="text-[23px] lg:text-4xl font-black text-gsps-blue mb-2">Global <span className="text-gsps-green">Payments</span></h1>
                <p className="text-gsps-blue/40 font-bold uppercase tracking-widest text-sm">Process Tuition & Visa Transactions</p>
            </header>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <input 
                        type="text" 
                        placeholder="Search by name, email or txn ID..."
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
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
            </div>


            <div className="bg-white rounded-[10px] shadow-sm border border-gray-100 overflow-y-auto">
                <table className="w-full text-left">
                    <thead className="bg-[#003b73] border-b border-gray-100">
                        <tr className='whitespace-nowrap'>
                            <th className="px-8 py-6 text-xs font-black text-white  tracking-widest">Student</th>
                            <th className="px-8 py-6 text-xs font-black text-white  tracking-widest">Type</th>
                            <th className="px-8 py-6 text-xs font-black text-white  tracking-widest">Amount</th>
                            <th className="px-8 py-6 text-xs font-black text-white  tracking-widest">Status</th>
                            <th className="px-8 py-6 text-xs font-black text-white  tracking-widest text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {payments.map((p) => (
                            <tr key={p._id} className="hover:bg-gsps-bg-light/30 transition-all">
                                <td className="px-8 py-6">
                                    <p className="font-black text-gsps-blue">{p.user?.fullName}</p>
                                    <p className="text-[10px] font-bold text-gsps-blue/40">{p.user?.email}</p>
                                </td>
                                <td className="px-8 py-6 font-bold text-sm text-gsps-blue/60">{p.paymentType}</td>
                                <td className="px-8 py-6 font-black text-gsps-blue">{p.amount} {p.currency}</td>
                                <td className="px-8 py-6">
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                                        p.status === 'Completed' ? 'bg-green-500 text-white' : 
                                        p.status === 'Processing' ? 'bg-gsps-blue text-white' : 
                                        p.status === 'Pending' ? 'bg-orange-500 text-white' : 'bg-red-500 text-white'
                                    }`}>{p.status}</span>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <button onClick={() => openDetails(p)} className="text-gsps-green font-black hover:underline text-sm uppercase tracking-widest">Update</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {selectedPayment && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gsps-blue/80 backdrop-blur-md" onClick={() => setSelectedPayment(null)}></div>
                    <div className="relative bg-white w-full max-w-2xl rounded-[50px] shadow-2xl p-10 md:p-12 overflow-hidden">
                        <div className="space-y-10">
                            <div className="flex justify-between items-center">
                                <h2 className="text-3xl font-black text-gsps-blue">Process Payment</h2>
                                <button onClick={() => setSelectedPayment(null)} className="text-2xl opacity-20">✕</button>
                            </div>

                            <div className="bg-gsps-bg-light p-6 rounded-3xl flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] opacity-40 uppercase font-black">Request Details</p>
                                    <p className="font-black text-gsps-blue">{selectedPayment.paymentType} - {selectedPayment.amount} {selectedPayment.currency}</p>
                                </div>
                                {selectedPayment.invoiceDocument && (
                                    <a href={`http://localhost:5000/${selectedPayment.invoiceDocument}`} target="_blank" rel="noreferrer" className="bg-gsps-green text-white px-6 py-3 rounded-2xl font-bold text-xs">View Invoice</a>
                                )}
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Status Update</label>
                                    <select 
                                        value={editData.status} 
                                        onChange={(e) => setEditData({...editData, status: e.target.value})}
                                        className="w-full px-6 py-4 rounded-2xl bg-gsps-bg-light outline-none font-bold text-gsps-blue"
                                    >
                                        <option>Pending</option>
                                        <option>Processing</option>
                                        <option>Completed</option>
                                        <option>Rejected</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Savings for Student (USD)</label>
                                    <input 
                                        type="number" 
                                        value={editData.savingsAmount} 
                                        onChange={(e) => setEditData({...editData, savingsAmount: e.target.value})}
                                        className="w-full px-6 py-4 rounded-2xl bg-gsps-bg-light outline-none font-bold text-gsps-blue"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Internal Note</label>
                                    <textarea 
                                        value={editData.adminNote}
                                        onChange={(e) => setEditData({...editData, adminNote: e.target.value})}
                                        className="w-full px-6 py-4 rounded-2xl bg-gsps-bg-light outline-none font-bold text-gsps-blue"
                                    ></textarea>
                                </div>

                                <button onClick={handleUpdate} className="w-full bg-gsps-blue text-white py-5 rounded-3xl font-black text-lg shadow-xl shadow-gsps-blue/20 hover:scale-[1.02] transition-all">
                                    Save Status & Update Ledger
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentManagement;
