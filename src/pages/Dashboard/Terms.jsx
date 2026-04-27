import React from 'react';

const Terms = () => {
    const terms = [
        {
            id: 1,
            text: "If any payment-related issues occur (such as a refund or chargeback), please contact us. In such cases, after verification, the payment will be reissued, and a service charge of 5% to 15% will be deducted."
        },
        {
            id: 2,
            text: "If payment is not completed within 1 to 6 hours after your service has been delivered, the matter will be reviewed and necessary actions may be taken in accordance with applicable laws, and the relevant authorities may be notified if required."
        }
    ];

    return (
        <div className="max-w-4xl mx-auto">
            <header className="mb-10">
                <h1 className="text-4xl font-black text-gsps-blue mb-2">Terms & <span className="text-gsps-green">Conditions</span></h1>
                <p className="text-gsps-blue/40 font-bold uppercase tracking-widest text-sm">Please read our terms carefully</p>
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

            <div className="mt-12 p-8 bg-gsps-blue rounded-[10px] text-white">
                <h3 className="text-xl font-black mb-4 flex items-center gap-3">
                    <span>📢</span> Need Help?
                </h3>
                <p className="text-white/60 font-bold leading-relaxed">
                    If you have any questions regarding these terms, please contact our support team through the live chat or Telegram.
                </p>
            </div>
        </div>
    );
};

export default Terms;
