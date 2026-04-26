import React from 'react';

const Terms = () => {
    const terms = [
        {
            id: 1,
            text: "যদি কোনো কারণে পেমেন্ট-সংক্রান্ত সমস্যা (যেমন: রিফান্ড বা চার্জব্যাক) দেখা দেয়, অনুগ্রহ করে আমাদের সঙ্গে যোগাযোগ করুন। সেক্ষেত্রে যাচাই-বাছাই সাপেক্ষে পুনরায় পেমেন্ট প্রদান করা হবে এবং সার্ভিস চার্জ হিসেবে ৫% থেকে ১৫% পর্যন্ত কেটে নেওয়া হবে।"
        },
        {
            id: 2,
            text: "আপনাদের সার্ভিস প্রদান সম্পন্ন হওয়ার পর ১ থেকে ৬ ঘণ্টার মধ্যে পেমেন্ট সম্পন্ন না হলে, বিষয়টি পর্যালোচনা করে প্রযোজ্য আইন অনুযায়ী প্রয়োজনীয় ব্যবস্থা গ্রহণ করা হবে এবং প্রয়োজনে সংশ্লিষ্ট কর্তৃপক্ষকে অবহিত করা হতে পারে।"
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
                    If you have any questions regarding these terms, please contact our support team through the live chat or WhatsApp.
                </p>
            </div>
        </div>
    );
};

export default Terms;
