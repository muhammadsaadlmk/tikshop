import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TermsAndConditions = () => {
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
            <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
            
            <section className="mb-8">
              <h2>1. Acceptance of Terms</h2>
              <p>By accessing and using our services, you agree to be bound by these terms and conditions.</p>
            </section>
            
            <section className="mb-8">
              <h2>2. Service Description</h2>
              <p>We provide TikTok account services for content creators. Our services include account setup and delivery.</p>
            </section>
            
            <section className="mb-8">
              <h2>3. Payment and Refunds</h2>
              <p>All payments are processed through JazzCash. Refund requests will be evaluated on a case-by-case basis.</p>
            </section>
            
            <section className="mb-8">
              <h2>4. Account Delivery</h2>
              <p>Accounts will be delivered within 3 hours of confirmed payment during business hours.</p>
            </section>
            
            <section className="mb-8">
              <h2>5. Support</h2>
              <p>For support, contact us at:</p>
              <ul>
                <li>WhatsApp: +92 303 9749212</li>
                <li>Email: tikshopbrand@gmail.com</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2>6. Disclaimer</h2>
              <p>We are not affiliated with TikTok or ByteDance. Use our services responsibly and in accordance with TikTok's terms of service.</p>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
