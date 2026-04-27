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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!accepted) return toast.error("Please agree to the Terms & Conditions");
        if (!confirmName.trim()) return toast.error("Please enter your name as confirmation");

        setLoading(true);
        try {
            const res = await api.put('/auth/accept-terms', { name: confirmName });
            setUser(prev => ({ ...prev, ...res.data.user }));
            toast.success("Terms accepted successfully!");
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-12  lg:px-8">
            <header className="mb-12 text-center animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="inline-block px-4 py-1.5 mb-4 bg-gsps-green/10 text-gsps-green text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-gsps-green/20">
                    Comprehensive Legal Framework
                </div>
                <h1 className=" text-[25px] lg:text-4xl md:text-5xl font-black text-gsps-blue mb-4">Agreement & <span className="text-gsps-green">Policies</span></h1>
                <p className="text-gsps-blue/40 font-bold max-w-2xl mx-auto text-sm md:text-base">
                    Please review all 7 sections of our legal framework. You must scroll through and accept all terms to proceed.
                </p>
            </header>

            <div className="lg:bg-white lg:rounded-[40px] lg:shadow-2xl shadow-gsps-blue/10 border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-1000 delay-200">
                {/* Scrollable Content Area */}
                <div className="h-[600px] overflow-y-auto lg:p-6 md:p-16 text-gsps-blue custom-scrollbar scroll-smooth relative">

                    {/* SECTION 1: TERMS & CONDITIONS */}
                    <div id="section-1" className="mb-24">
                        <h2 className=" text-[20px] lg: text-[20px] lg:text-3xl font-black mb-8 pb-4 border-b-4 border-gsps-green inline-block">1. TERMS & CONDITIONS</h2>
                        <div className="space-y-8 text-gsps-blue/80 font-medium leading-relaxed">
                            <section>
                                <h3 className="text-lg font-black text-gsps-blue mb-2">1. Introduction</h3>
                                <p>These Terms & Conditions (“Terms”) govern your access to and use of our website, platform, and financial services (“Services”). By accessing or using our Services, you acknowledge that you have read, understood, and agreed to be bound by these Terms. If you do not agree, you must discontinue use immediately. The Company provides tuition fee assistance, student loan services, foreign currency payment support, and general payment processing for eligible users.</p>
                            </section>

                            <section>
                                <h3 className="text-lg font-black text-gsps-blue mb-2">2. Definitions</h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li><strong>“Company”</strong> refers to the service provider operating this website.</li>
                                    <li><strong>“User”</strong> refers to any individual or entity using our Services.</li>
                                    <li><strong>“Institution”</strong> refers to universities, colleges, banks, utilities, or any organization receiving payments on behalf of the user.</li>
                                    <li><strong>“Loan Agreement”</strong> refers to the legally binding contract signed by users who obtain loans.</li>
                                    <li><strong>“Chargeback”</strong> refers to a reversal of a completed payment initiated by a bank, institution, or payment gateway.</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-lg font-black text-gsps-blue mb-2">3. Services Provided</h3>
                                <p>3.1 <strong>Tuition Fee Payment Assistance:</strong> We assist students in Malaysia, Australia, the UK, the US, and other countries with tuition fee payments.</p>
                                <p>3.2 <strong>Loan Services:</strong> We provide loans with limited interest charges. All loans require identity verification, document submission, a signed Loan Agreement, and compliance with repayment terms.</p>
                                <p>3.3 <strong>Foreign Currency Payment Support:</strong> We assist users who face foreign currency restrictions when paying international tuition fees.</p>
                                <p>3.4 <strong>General Payment Processing:</strong> We may process payments for bank loans, mobile loans, utility bills, and other approved payments.</p>
                            </section>

                            <section>
                                <h3 className="text-lg font-black text-gsps-blue mb-2">4. Eligibility</h3>
                                <p>To use our Services, you must be at least 18 years old, provide accurate and verifiable information, have legal authority, and not be prohibited by law. We reserve the right to refuse service.</p>
                            </section>

                            <section>
                                <h3 className="text-lg font-black text-gsps-blue mb-2">5. User Obligations</h3>
                                <p>Users agree to provide truthful information, submit documents promptly, confirm payment details before submission, and not engage in fraudulent activities. Failure to comply may result in suspension or legal action.</p>
                            </section>

                            <section>
                                <h3 className="text-lg font-black text-gsps-blue mb-2">6. Payment Confirmation & Non-Compliance</h3>
                                <p>Once a payment request is confirmed, the user must proceed. Failure may result in the Company filing a dispute, reporting to the Institution, or requesting cancellation of the user’s Enrollment (COE).</p>
                            </section>

                            <section>
                                <h3 className="text-lg font-black text-gsps-blue mb-2">7. Refund & Chargeback Policy</h3>
                                <p>7.1 <strong>First Chargeback:</strong> Re-processed once with 10–15% service charge.</p>
                                <p>7.2 <strong>Second Chargeback:</strong> Refund issued with 25% service charge; no further attempts.</p>
                                <p>7.3 <strong>Non-Refundable:</strong> Service charges, processing fees, currency conversion, and administrative fees.</p>
                            </section>

                            <section>
                                <h3 className="text-lg font-black text-gsps-blue mb-2">8. Foreign Currency & Exchange Rates</h3>
                                <p>Rates vary based on market. The Company is not responsible for bank delays or regulatory hurdles.</p>
                            </section>

                            <section>
                                <h3 className="text-lg font-black text-gsps-blue mb-2">9. Prohibited Activities</h3>
                                <p>False information, fraudulent transactions, and abuse of chargeback systems are strictly prohibited.</p>
                            </section>

                            <section>
                                <h3 className="text-lg font-black text-gsps-blue mb-2">10. Limitation of Liability</h3>
                                <p>The Company is not liable for third-party delays, incorrect user info, currency fluctuations, or institutional decisions. Liability is limited to the amount paid for the service.</p>
                            </section>

                            <section>
                                <h3 className="text-lg font-black text-gsps-blue mb-2">11. Privacy & Data Protection</h3>
                                <p>Data is processed for verification, payment, and compliance. We do not sell data to unauthorized parties.</p>
                            </section>

                            <section>
                                <h3 className="text-lg font-black text-gsps-blue mb-2">12. Amendments</h3>
                                <p>Terms may be updated at any time. Continued use constitutes acceptance.</p>
                            </section>

                            <section>
                                <h3 className="text-lg font-black text-gsps-blue mb-2">13. Governing Law</h3>
                                <p>Governed by the laws of the jurisdiction of Company registration.</p>
                            </section>

                            <section>
                                <h3 className="text-lg font-black text-gsps-blue mb-2">14. Contact Information</h3>
                                <p>Contact support through official channels on the website.</p>
                            </section>
                        </div>
                    </div>

                    {/* SECTION 2: PRIVACY POLICY */}
                    <div id="section-2" className="mb-24">
                        <h2 className=" text-[20px] lg:text-3xl font-black mb-8 pb-4 border-b-4 border-gsps-green inline-block">2. PRIVACY POLICY</h2>
                        <div className="space-y-8 text-gsps-blue/80 font-medium leading-relaxed">
                            <p>1. <strong>Introduction:</strong> This policy explains how we collect, use, and protect your information.</p>
                            <p>2. <strong>Information We Collect:</strong> Identification data (Passport/ID), contact info, financial info (Bank details/invoices), and technical data (IP/Cookies).</p>
                            <p>3. <strong>How We Use Info:</strong> Verification, processing payments, loan assessment, and legal compliance.</p>
                            <p>4. <strong>Sharing:</strong> Shared with institutions, banks, and regulatory authorities as needed.</p>
                            <p>5. <strong>Security:</strong> Industry-standard measures are implemented to protect your data.</p>
                            <p>6. <strong>Retention:</strong> Retained as long as necessary for services and legal requirements.</p>
                            <p>7. <strong>User Rights:</strong> Right to access, correct, or delete data based on jurisdiction.</p>
                            <p>8. <strong>Cookies:</strong> Used for experience and analytics; can be disabled in settings.</p>
                            <p>10. <strong>Contact:</strong> Contact support for privacy inquiries.</p>
                        </div>
                    </div>

                    {/* SECTION 3: REFUND & CHARGEBACK */}
                    <div id="section-3" className="mb-24">
                        <h2 className=" text-[20px] lg:text-3xl font-black mb-8 pb-4 border-b-4 border-gsps-green inline-block">3. REFUND & CHARGEBACK</h2>
                        <div className="space-y-8 text-gsps-blue/80 font-medium leading-relaxed">
                            <p>1. <strong>General:</strong> All payments are final. Service fees are non-refundable.</p>
                            <p>2. <strong>First Chargeback:</strong> Reprocessed with 10-15% service charge.</p>
                            <p>3. <strong>Second Chargeback:</strong> Refund with 25% service charge; no further attempts.</p>
                            <p>4. <strong>User Error:</strong> No refund if incorrect details are provided by the user.</p>
                            <p>5. <strong>Fraud:</strong> Fraudulent chargebacks result in account suspension and reporting to institutions.</p>
                            <p>6. <strong>Processing:</strong> Approved refunds take 7-45 business days.</p>
                        </div>
                    </div>

                    {/* SECTION 4: LOAN AGREEMENT */}
                    <div id="section-4" className="mb-24">
                        <h2 className=" text-[20px] lg:text-3xl font-black mb-8 pb-4 border-b-4 border-gsps-green inline-block">4. LOAN AGREEMENT</h2>
                        <div className="space-y-8 text-gsps-blue/80 font-medium leading-relaxed">
                            <p>1. <strong>Disbursement:</strong> Paid directly to the institution; no cash provided.</p>
                            <p>2. <strong>Interest:</strong> Disclosed in the Loan Offer Letter. All fees are non-refundable.</p>
                            <p>3. <strong>Repayment:</strong> Borrower must follow the schedule and pay on time.</p>
                            <p>4. <strong>Default:</strong> Results in penalty fees, reporting to institutions, and legal action.</p>
                            <p>5. <strong>Early Repayment:</strong> Allowed without penalty unless stated otherwise.</p>
                        </div>
                    </div>

                    {/* SECTION 5: WEBSITE DISCLAIMER */}
                    <div id="section-5" className="mb-24">
                        <h2 className=" text-[20px] lg:text-3xl font-black mb-8 pb-4 border-b-4 border-gsps-green inline-block">5. WEBSITE DISCLAIMER</h2>
                        <div className="space-y-8 text-gsps-blue/80 font-medium leading-relaxed">
                            <p>1. <strong>General:</strong> No guarantees regarding accuracy or reliability of content.</p>
                            <p>2. <strong>No Advice:</strong> Nothing constitutes financial, legal, or investment advice.</p>
                            <p>3. <strong>Third-Party:</strong> Not responsible for content or security of linked sites.</p>
                            <p>4. <strong>Outcomes:</strong> No guarantee of loan approval, visa outcomes, or enrollment results.</p>
                        </div>
                    </div>

                    {/* SECTION 6: USER AGREEMENT */}
                    <div id="section-6" className="mb-24">
                        <h2 className=" text-[20px] lg:text-3xl font-black mb-8 pb-4 border-b-4 border-gsps-green inline-block">6. USER AGREEMENT</h2>
                        <div className="space-y-8 text-gsps-blue/80 font-medium leading-relaxed">
                            <p>1. <strong>Responsibility:</strong> Users must provide truthful info and maintain security.</p>
                            <p>2. <strong>Account:</strong> Users are responsible for all activities under their account.</p>
                            <p>3. <strong>Termination:</strong> Company may terminate access for fraud or violation of terms.</p>
                            <p>4. <strong>Consent:</strong> Consent to receive digital communications regarding transactions.</p>
                        </div>
                    </div>

                    {/* SECTION 7: COMPLIANCE & RISK */}
                    <div id="section-7" className="mb-12">
                        <h2 className=" text-[20px] lg:text-3xl font-black mb-8 pb-4 border-b-4 border-gsps-green inline-block">7. COMPLIANCE & RISK</h2>
                        <div className="space-y-8 text-gsps-blue/80 font-medium leading-relaxed">
                            <p>1. <strong>Compliance:</strong> We comply with AML, KYC, and international payment regulations.</p>
                            <p>2. <strong>Delays:</strong> Not responsible for delays due to bank processing or transfers.</p>
                            <p>3. <strong>Currency:</strong> Users bear risks of fluctuating exchange rates and fees.</p>
                            <p>4. <strong>Cooperation:</strong> Users must provide documents and respond to inquiries promptly.</p>
                        </div>
                    </div>
                </div>

                {/* Agreement Form Area */}
                <div className="bg-gsps-blue p-8 md:p-16 text-white border-t border-white/10">
                    <form onSubmit={handleSubmit} className="space-y-10 max-w-3xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="flex items-start gap-4 cursor-pointer group bg-white/5 p-6 rounded-[24px] border border-white/10 hover:border-gsps-green/50 transition-all h-full">
                                    <div className="relative flex items-center mt-1 shrink-0">
                                        <input
                                            type="checkbox"
                                            checked={accepted}
                                            onChange={(e) => setAccepted(e.target.checked)}
                                            className="peer w-6 h-6 rounded border-2 border-white/20 bg-white/10 checked:bg-gsps-green transition-all appearance-none cursor-pointer"
                                        />
                                        <span className="absolute hidden peer-checked:block left-1.5 text-white text-xs">✔</span>
                                    </div>
                                    <span className="text-sm font-bold text-white/70 group-hover:text-white transition-colors">
                                        I confirm that I have read all 7 legal sections and agree to be bound by them.
                                    </span>
                                </label>
                            </div>

                            <div className="space-y-3">
                                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-gsps-green">
                                    Digital Confirmation
                                </label>
                                <input
                                    type="text"
                                    value={confirmName}
                                    onChange={(e) => setConfirmName(e.target.value)}
                                    placeholder="Type your full name..."
                                    className="w-full bg-white/5 border-2 border-white/10 rounded-[20px] px-6 py-4 font-bold text-white placeholder:text-white/20 outline-none focus:border-gsps-green transition-all"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !accepted || !confirmName}
                            className="w-full bg-gsps-green text-white py-6 rounded-[24px] font-black  hover:bg-white hover:text-gsps-blue transition-all shadow-2xl disabled:opacity-20 disabled:grayscale disabled:cursor-not-allowed active:scale-[0.98]"
                        >
                            {loading ? "Processing Agreement..." : "I Accept & Agree to Proceed"}
                        </button>
                    </form>
                </div>
            </div>



            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f8fafc;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #003b7320;
                    border-radius: 10px;
                    border: 2px solid #f8fafc;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #003b7340;
                }
            `}} />
        </div>
    );
};

export default Terms;
