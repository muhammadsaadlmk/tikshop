import { Info } from 'lucide-react';
import { Link } from 'wouter';
import ContactForm from './ContactForm';

const Payment = () => {
  return (
    <section id="payment" className="py-20 bg-[#010101]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">
                Payment <span className="text-[#FE2C55]">Information</span>
              </h2>
              <p className="text-[#F1F1F2]/90 mb-8">
                We currently accept payments through JazzCash only. Follow these simple steps to complete your purchase:
              </p>

              <div className="bg-[#1D1D1D]/50 backdrop-blur-md border border-white/10 p-6 rounded-xl mb-8">
                <div className="flex items-center mb-4">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-4">
                    <rect width="48" height="48" rx="8" fill="#9E1946"/>
                    <path d="M10 24C10 16.268 16.268 10 24 10C31.732 10 38 16.268 38 24C38 31.732 31.732 38 24 38C16.268 38 10 31.732 10 24Z" fill="#ED1C63"/>
                    <path d="M22.3999 20.4V27.6H25.5999V20.4H22.3999ZM14.7999 20.4V27.6H20.7999V20.4H14.7999ZM27.1999 20.4V27.6H33.1999V20.4H27.1999Z" fill="white"/>
                  </svg>
                  <h3 className="text-xl font-bold font-poppins">JazzCash Payment</h3>
                </div>

                <p className="font-bold text-xl mb-2 text-[#25F4EE]">+92 322 4374661</p>
                <p className="text-[#F1F1F2]/90 text-sm mb-4">Account Holder: Muhammad Mohsin</p>

                <ol className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <span className="bg-[#FE2C55] text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">1</span>
                    <span>Send payment to the number above</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-[#FE2C55] text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">2</span>
                    <span>Save your Transaction ID (TID)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-[#FE2C55] text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">3</span>
                    <span>Fill out the contact form with your details</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-[#FE2C55] text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">4</span>
                    <span>You'll be contacted via WhatsApp or email within 3 hours</span>
                  </li>
                </ol>

                <div className="bg-[#25F4EE]/10 border border-[#25F4EE]/30 p-4 rounded-lg">
                  <p className="text-sm flex items-start">
                    <Info className="h-4 w-4 text-[#25F4EE] mr-2 mt-0.5" />
                    Make sure to include your correct WhatsApp number and email for account delivery.
                  </p>
                </div>
              </div>

              <div className="flex justify-center md:justify-start">
                <Link href="/payment-confirmation">
                  <span className="cursor-pointer inline-block px-8 py-3 bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] rounded-full text-white font-semibold hover:shadow-lg hover:shadow-[#FE2C55]/30 transition duration-300 text-center">
                    Payment Confirmation Page
                  </span>
                </Link>
              </div>
            </div>

            {/* Contact Form */}
            <div id="contact">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;