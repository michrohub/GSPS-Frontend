import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';

const KYCForm = () => {
    const { user, checkAuth } = useAuth();
    const [status, setStatus] = useState('none'); // none, pending, approved, rejected
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [rejectionReason, setRejectionReason] = useState('');
    
    const [formData, setFormData] = useState({
        studentName: '',
        whatsappNumber: ''
    });
    const [files, setFiles] = useState({
        studentPhoto: null,
        passportFile: null,
        visaFile: null,
        universityDocument: null,
        gobDocument: null
    });

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await api.get('/kyc/status');
                setStatus(res.data.status || 'none');
                if (res.data.rejectionReason) {
                    setRejectionReason(res.data.rejectionReason);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStatus();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFiles({ ...files, [e.target.name]: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        Object.keys(files).forEach(key => {
            if (files[key]) data.append(key, files[key]);
        });

        try {
            await api.post('/kyc/submit', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setStatus('pending');
            await checkAuth(); // Refresh user state
        } catch (err) {
            setError(err.response?.data?.message || 'Error submitting KYC');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="text-center py-20">Loading KYC Details...</div>;

    if (status === 'approved') {
        return (
            <div className="max-w-2xl mx-auto text-center space-y-8 py-20 lg:py-0">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-4xl">✅</div>
                <h2 className="text-4xl font-black text-gsps-blue">KYC Verified</h2>
                <p className="text-gsps-blue/60 font-medium">Your identity has been verified. You now have full access to the dashboard and global payment services.</p>
                <div className="bg-gsps-bg-light p-6 rounded-2xl border border-gray-100 flex items-center justify-between text-left">
                    <div>
                        <p className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest">Verification Status</p>
                        <p className="text-gsps-blue font-black">Fully Verified Student</p>
                    </div>
                    <span className="text-xs font-black bg-green-500 text-white px-3 py-1 rounded-full uppercase tracking-tighter">Approved</span>
                </div>
            </div>
        );
    }

    if (status === 'pending') {
        return (
            <div className="max-w-2xl mx-auto text-center space-y-8 py-[3px] lg:py-6">
                <div className="w-24 h-24 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto text-4xl">⏳</div>
                <h2 className=" text-[25px] lg:text-4xl font-black text-gsps-blue">Review in Progress</h2>
                <p className="text-gsps-blue/60 font-medium">We are currently reviewing your documents. This usually takes 24-48 hours. We'll notify you once your account is approved.</p>
                <div className="p-8 bg-gsps-blue text-white rounded-[10px] text-left">
                    <p className="font-bold mb-4 opacity-60 uppercase tracking-widest text-xs">What happens next?</p>
                    <ul className="space-y-4 font-medium">
                        <li className="flex items-center space-x-3"><span className="text-gsps-green">✔</span> <span>Our team verifies your Passport/ID</span></li>
                        <li className="flex items-center space-x-3"><span className="text-gsps-green">✔</span> <span>University offer letter validation</span></li>
                        <li className="flex items-center space-x-3"><span className="text-gsps-green">✔</span> <span>Face verification check</span></li>
                    </ul>
                </div>
            </div>
        );
    }

    if (status === 'rejected') {
        return (
            <div className="max-w-2xl mx-auto text-center space-y-8 py-[3px] lg:py-6">
                <div className="w-24 h-24 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto text-4xl">❌</div>
                <h2 className=" text-[25px] lg:text-4xl font-black text-gsps-blue">KYC Rejected</h2>
                <p className="text-gsps-blue/60 font-medium">Unfortunately, your identity verification was rejected.</p>
                
                <div className="p-8 bg-red-50 border border-red-200 text-red-800 rounded-[10px] text-left">
                    <p className="font-bold mb-2 opacity-80 uppercase tracking-widest text-xs">Reason for Rejection</p>
                    <p className="font-medium text-lg">{rejectionReason || "No specific reason provided."}</p>
                </div>

                <div className="bg-gsps-bg-light p-6 rounded-2xl border border-gray-100 text-left space-y-4">
                    <p className="font-black text-gsps-blue">Action Required</p>
                    <p className="text-sm text-gsps-blue/60">Please correct the issue mentioned above and resubmit your documents.</p>
                    <button 
                        onClick={() => setStatus('none')} 
                        className="w-full bg-gsps-blue text-white py-4 rounded-[10px] font-black hover:bg-gsps-green transition-all mt-4"
                    >
                        Resubmit Documents
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto lg:py-6">
            <header className="mb-12">
                <h1 className=" text-[23px] md:text-4xl font-black text-gsps-blue mb-4">Identity Verification <span className="text-gsps-green">(KYC)</span></h1>
                <p className="text-gsps-blue/40 font-bold max-w-xl">Mandatory for all students to prevent fraud and ensure secure cross-border payments.</p>
            </header>

            {error && <div className="bg-red-50 text-red-500 p-6 rounded-[10px] mb-8 font-bold border border-red-100">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-10">
                <section className="bg-white p-4 md:p-4 rounded-[10px] shadow-sm border border-gray-100 space-y-8">
                    <h3 className="text-xl font-black text-gsps-blue border-l-4 border-gsps-green pl-4">Personal Info</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gsps-blue/40  tracking-widest ml-1">Student Name</label>
                            <input type="text" name="studentName" value={formData.studentName} placeholder="John Doe" onChange={handleChange} required className="w-full px-6 py-4 rounded-[10px] bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 outline-none font-bold text-gsps-blue mt-[10px]" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gsps-blue/40  tracking-widest ml-1">WhatsApp Number</label>
                            <input type="tel" name="whatsappNumber" value={formData.whatsappNumber} placeholder="+8801..." pattern="^(?:\+8801|01)[3-9]\d{8}$" title="Must be a valid Bangladesh phone number (e.g. 017... or +88017...)" onChange={handleChange} required className="w-full px-6 py-4 rounded-[10px] bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 outline-none font-bold text-gsps-blue mt-[10px]" />
                        </div>
                    </div>
                </section>

                <section className="bg-white p-4  rounded-[10px] shadow-sm border border-gray-100 space-y-8">
                    <h3 className="text-xl font-black text-gsps-blue border-l-4 border-gsps-green pl-4">Document Uploads</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { label: 'Student Photo', name: 'studentPhoto', required: true, accept: '.jpg,.jpeg,.png,.pdf' },
                            { label: 'Passport File', name: 'passportFile', required: true, accept: '.jpg,.jpeg,.png,.pdf' },
                            { label: 'Visa File', name: 'visaFile', required: true, accept: '.jpg,.jpeg,.png,.pdf' },
                            { label: 'University Document', name: 'universityDocument', required: true, accept: '.jpg,.jpeg,.png,.pdf' },
                            { label: 'GOB Document', name: 'gobDocument', required: true, accept: '.jpg,.jpeg,.png,.pdf' }
                        ].map((doc) => (
                            <div key={doc.name} className="space-y-3">
                                <label className="text-xs font-black text-gsps-blue/40  tracking-widest ml-1 ">{doc.label}</label>
                                <div className="relative h-40 group cursor-pointer mt-[10px]">
                                    <input 
                                        type="file" 
                                        name={doc.name} 
                                        accept={doc.accept}
                                        onChange={handleFileChange} 
                                        required={doc.required} 
                                        className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer" 
                                    />
                                    <div className="absolute inset-0 bg-gsps-bg-light border-2 border-dashed border-gray-200 rounded-[10px] flex flex-col items-center justify-center group-hover:bg-gsps-green/5 group-hover:border-gsps-green transition-all overflow-hidden p-2">
                                        {files[doc.name] ? (
                                            files[doc.name].type.startsWith('image/') ? (
                                                <img src={URL.createObjectURL(files[doc.name])} alt="preview" className="h-full w-full object-cover rounded-2xl" />
                                            ) : (
                                                <div className="text-center flex flex-col items-center">
                                                    <span className="text-4xl">📄</span>
                                                    <span className="text-xs font-bold mt-2 truncate w-full px-4 text-gsps-blue">{files[doc.name].name}</span>
                                                </div>
                                            )
                                        ) : (
                                            <>
                                                <span className="text-2xl mb-2 opacity-40 group-hover:scale-110 transition-transform">📄</span>
                                                <span className="text-xs font-bold text-gsps-blue/40 group-hover:text-gsps-blue text-center">
                                                    Choose File or Drag & Drop<br/>(JPG, PNG, PDF)
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <button 
                    type="submit" 
                    disabled={submitting}
                    className="w-full bg-gsps-blue text-white py-6 rounded-[10px] font-black text-xl hover:bg-gsps-green transition-all shadow-2xl active:scale-[0.98] disabled:opacity-50"
                >
                    {submitting ? '🚀 Submitting Review...' : 'Submit Verification'}
                </button>
            </form>
        </div>
    );
};

export default KYCForm;
