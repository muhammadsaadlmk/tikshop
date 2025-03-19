import { useState } from 'react';
import { Link } from 'wouter';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#010101]/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link href="/">
              <div className="text-[#25F4EE] font-bold text-2xl font-poppins cursor-pointer">
                Tik<span className="text-[#FE2C55]">Shop</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/">
              <span className="text-white hover:text-[#25F4EE] transition duration-300 cursor-pointer">Home</span>
            </Link>
            <a href="#pricing" className="text-white hover:text-[#25F4EE] transition duration-300">Pricing</a>
            <a href="#how-it-works" className="text-white hover:text-[#25F4EE] transition duration-300">How It Works</a>
            <a href="#contact" className="text-white hover:text-[#25F4EE] transition duration-300">Contact</a>
            <Link href="/payment-confirmation">
              <span className="text-white hover:text-[#25F4EE] transition duration-300 cursor-pointer">Payment</span>
            </Link>
          </div>
          
          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-[#1D1D1D]/30 mt-4">
            <div className="flex flex-col space-y-4">
              <Link href="/">
                <span onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#25F4EE] transition duration-300 cursor-pointer block">Home</span>
              </Link>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#25F4EE] transition duration-300">Pricing</a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#25F4EE] transition duration-300">How It Works</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#25F4EE] transition duration-300">Contact</a>
              <Link href="/payment-confirmation">
                <span onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#25F4EE] transition duration-300 cursor-pointer block">Payment</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
