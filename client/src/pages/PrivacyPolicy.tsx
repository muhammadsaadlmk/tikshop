import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
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
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            
            <section className="mb-8">
              <h2>1. Information We Collect</h2>
              <p>We collect information you provide directly to us, including:</p>
              <ul>
                <li>Name and contact information</li>
                <li>Payment details</li>
                <li>Communication preferences</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2>2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Process your orders</li>
                <li>Communicate with you about your order</li>
                <li>Provide customer support</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2>3. Information Sharing</h2>
              <p>We do not sell or share your personal information with third parties except as necessary to provide our services.</p>
            </section>
            
            <section className="mb-8">
              <h2>4. Data Security</h2>
              <p>We implement appropriate security measures to protect your personal information.</p>
            </section>
            
            <section className="mb-8">
              <h2>5. Contact Us</h2>
              <p>For privacy-related inquiries, contact us at:</p>
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

export default PrivacyPolicy;
