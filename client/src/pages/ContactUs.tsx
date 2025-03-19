import { Link } from 'wouter';
import { ArrowLeft, Mail, MessageCircle, Clock, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';

const ContactUs = () => {
  return (
    <div className="bg-gradient-to-br from-[#010101] to-[#1D1D1D] font-inter text-white min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-32">
        <Link href="/">
          <a className="inline-flex items-center text-[#25F4EE] hover:text-[#FE2C55] mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </a>
        </Link>
        
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-poppins mb-4">Get in Touch</h1>
            <p className="text-[#F1F1F2]/80 max-w-2xl mx-auto">
              Have questions about our TikTok accounts? Our team is here to help you with any inquiries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-[#1D1D1D]/50 backdrop-blur-md border border-white/10 p-6 rounded-xl flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#25F4EE]/20 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-[#25F4EE]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-[#F1F1F2]/70 mb-4">For general inquiries and support</p>
              <a href="mailto:support@tikshop.com" className="text-[#25F4EE] hover:text-[#FE2C55] transition-colors">
                support@tikshop.com
              </a>
            </div>
            
            <div className="bg-[#1D1D1D]/50 backdrop-blur-md border border-white/10 p-6 rounded-xl flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#25F4EE]/20 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-[#25F4EE]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
              <p className="text-[#F1F1F2]/70 mb-4">For faster responses and support</p>
              <a href="https://wa.me/923001234567" className="text-[#25F4EE] hover:text-[#FE2C55] transition-colors">
                +92 300 1234567
              </a>
            </div>
            
            <div className="bg-[#1D1D1D]/50 backdrop-blur-md border border-white/10 p-6 rounded-xl flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#25F4EE]/20 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-[#25F4EE]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Operating Hours</h3>
              <p className="text-[#F1F1F2]/70 mb-4">We're available to assist you</p>
              <p className="text-[#F1F1F2]">24/7 Customer Support</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold font-poppins mb-6">Send Us a Message</h2>
              <p className="text-[#F1F1F2]/80 mb-8">
                Fill out the form below and our team will get back to you as soon as possible.
              </p>
              
              <ContactForm />
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="bg-[#1D1D1D]/50 backdrop-blur-md border border-white/10 p-8 rounded-xl mb-8">
                <h3 className="text-xl font-bold font-poppins mb-4">Frequently Asked Questions</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">How long does account delivery take?</h4>
                    <p className="text-[#F1F1F2]/70">Accounts are typically delivered within 3 hours after payment confirmation.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">What payment methods do you accept?</h4>
                    <p className="text-[#F1F1F2]/70">Currently, we only accept JazzCash for payments.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Are the accounts guaranteed to work?</h4>
                    <p className="text-[#F1F1F2]/70">Yes, all accounts come with a 24-hour replacement guarantee if they don't work as described.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-[#FE2C55]/20 to-[#25F4EE]/20 p-8 rounded-xl">
                <div className="flex items-start mb-4">
                  <MapPin className="h-6 w-6 text-[#FE2C55] mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Our Location</h3>
                    <p className="text-[#F1F1F2]/80">
                      While we operate primarily online, our team is based in Pakistan to provide local support to our customers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ContactUs;
