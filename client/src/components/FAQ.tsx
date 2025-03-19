import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqs: FAQItem[] = [
    {
      question: "Are these accounts really monetized?",
      answer: "Yes, all our accounts are fully set up and eligible for the TikTok Creator Fund. They meet all the requirements for monetization right out of the box."
    },
    {
      question: "How soon will I receive my accounts?",
      answer: "We typically deliver accounts within 3 hours of receiving your payment and completed form. Premium customers receive priority delivery."
    },
    {
      question: "Is JazzCash the only payment method?",
      answer: "Currently, we only accept payments through JazzCash. We're working on adding more payment methods in the future."
    },
    {
      question: "Can I change the account details later?",
      answer: "Yes, you'll have full access to change account details including username, profile picture, and bio. We provide complete account credentials."
    },
    {
      question: "Do you offer a refund policy?",
      answer: "We offer a 24-hour replacement guarantee if any account doesn't work as described. Contact our support team immediately if you encounter any issues."
    }
  ];

  const toggleItem = (index: number) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter(item => item !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
  };

  return (
    <section className="py-20 bg-[#010101]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
            Frequently Asked <span className="text-[#FE2C55]">Questions</span>
          </h2>
          <p className="text-[#F1F1F2]/90 max-w-2xl mx-auto">
            Find answers to common questions about our TikTok accounts
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#1D1D1D]/50 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
                <button 
                  className="w-full flex justify-between items-center p-5 text-left"
                  onClick={() => toggleItem(index)}
                >
                  <span className="font-semibold">{faq.question}</span>
                  <ChevronDown className={`text-[#25F4EE] transition-transform duration-300 ${openItems.includes(index) ? 'transform rotate-180' : ''}`} />
                </button>
                {openItems.includes(index) && (
                  <div className="px-5 pb-5">
                    <p className="text-[#F1F1F2]/90">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
