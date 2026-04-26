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
                <h1 className="text-4xl font-black text-gsps-blue mb-2">Payment <span className="text-gsps-green">History</span></h1>
                <p className="text-gsps-blue/40 font-bold uppercase tracking-widest text-sm">Review your past transactions</p>
            </header>

            <div className="bg-white rounded-[10px] p-8 md:p-12 shadow-sm border border-gray-100 min-h-[600px]">
                {loading ? (
                    <div className="flex justify-center p-20">Loading payments...</div>
                ) : payments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center opacity-30 italic font-bold">
                        <span className="text-5xl mb-4">🏜️</span>
                        <p>No transactions made yet.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-black text-gsps-blue/40 uppercase tracking-widest">Type</th>
                                    <th className="px-6 py-4 text-xs font-black text-gsps-blue/40 uppercase tracking-widest">Amount</th>
                                    <th className="px-6 py-4 text-xs font-black text-gsps-blue/40 uppercase tracking-widest">Transaction ID</th>
                                    <th className="px-6 py-4 text-xs font-black text-gsps-blue/40 uppercase tracking-widest">Status</th>
                                    <th className="px-6 py-4 text-xs font-black text-gsps-blue/40 uppercase tracking-widest">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {payments.map((p) => (
                                    <tr key={p._id} className="hover:bg-gsps-bg-light/30 transition-colors">
                                        <td className="px-6 py-6">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gsps-blue text-white rounded-xl flex items-center justify-center text-sm">🏛️</div>
                                                <p className="font-black text-gsps-blue">{p.paymentType}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <p className="font-black text-gsps-blue">{p.amount}</p>
                                        </td>
                                        <td className="px-6 py-6">
                                            <p className="text-xs font-bold text-gsps-blue/60 font-mono">{p.transactionId || 'N/A'}</p>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full text-white ${p.status === 'Completed' ? 'bg-green-500' :
                                                p.status === 'Pending Verification' ? 'bg-purple-600' :
                                                    p.status === 'Pending' ? 'bg-orange-500' :
                                                        p.status === 'Processing' ? 'bg-gsps-blue' : 'bg-red-500'
                                                }`}>{p.status}</span>
                                        </td>
                                        <td className="px-6 py-6 text-xs font-bold text-gsps-blue/40">
                                            {new Date(p.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Payments;
