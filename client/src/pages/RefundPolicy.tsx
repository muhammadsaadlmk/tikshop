import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const RefundPolicy = () => {
  return (
    <div className="bg-gradient-to-br from-[#010101] to-[#1D1D1D] font-inter text-white min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-32">
        <div className="max-w-4xl mx-auto">
          <Link href="/">
            <span className="inline-flex items-center text-[#25F4EE] hover:text-[#FE2C55] mb-8 transition-colors cursor-pointer">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </span>
          </Link>
          
          <div className="prose prose-invert max-w-none">
            <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>
            
            <section className="mb-8">
              <h2>1. Refund Eligibility</h2>
              <p>We process refund requests under the following conditions:</p>
              <ul>
                <li>Account delivery not completed within 24 hours of payment confirmation</li>
                <li>Account not functioning as described at the time of delivery</li>
                <li>Technical issues preventing account access</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2>2. Refund Process</h2>
              <p>To request a refund:</p>
              <ul>
                <li>Contact our support team within 24 hours of purchase</li>
                <li>Provide your transaction ID and reason for refund</li>
                <li>Allow up to 48 hours for review and processing</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2>3. Non-Refundable Cases</h2>
              <p>Refunds will not be processed if:</p>
              <ul>
                <li>The account has been used or modified after delivery</li>
                <li>Request is made after 24 hours of purchase</li>
                <li>Account credentials have been shared with third parties</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2>4. Contact Information</h2>
              <p>For refund-related inquiries, contact us at:</p>
              <ul>
                <li>WhatsApp: +92 303 9749212</li>
                <li>Email: tikshopbrand@gmail.com</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RefundPolicy;
