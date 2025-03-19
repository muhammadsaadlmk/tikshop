import { useState } from 'react';
import { Link } from 'wouter';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [legalMenuOpen, setLegalMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleLegalMenu = () => {
    setLegalMenuOpen(!legalMenuOpen);
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
            <a href="#contact" className="text-white hover:text-[#25F4EE] transition duration-300">Order Now</a>
            <Link href="/contact-us">
              <span className="text-white hover:text-[#25F4EE] transition duration-300 cursor-pointer">Contact Us</span>
            </Link>
            <div className="relative">
              <button 
                onClick={toggleLegalMenu}
                className="flex items-center text-white hover:text-[#25F4EE] transition duration-300"
              >
                Legal <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              {legalMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-[#010101] border border-white/10 rounded-lg shadow-lg py-2">
                  <Link href="/terms">
                    <a className="block px-4 py-2 text-white hover:bg-[#25F4EE]/10 transition duration-300">Terms & Conditions</a>
                  </Link>
                  <Link href="/privacy">
                    <a className="block px-4 py-2 text-white hover:bg-[#25F4EE]/10 transition duration-300">Privacy Policy</a>
                  </Link>
                  <Link href="/refund">
                    <a className="block px-4 py-2 text-white hover:bg-[#25F4EE]/10 transition duration-300">Refund Policy</a>
                  </Link>
                </div>
              )}
            </div>
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
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#25F4EE] transition duration-300">Order Now</a>
              <Link href="/contact-us">
                <span onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#25F4EE] transition duration-300 cursor-pointer block">Contact Us</span>
              </Link>
              <div className="border-t border-[#1D1D1D]/30 pt-4">
                <p className="text-white/50 text-sm mb-2">Legal</p>
                <Link href="/terms">
                  <span onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#25F4EE] transition duration-300 cursor-pointer block pl-4">Terms & Conditions</span>
                </Link>
                <Link href="/privacy">
                  <span onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#25F4EE] transition duration-300 cursor-pointer block pl-4">Privacy Policy</span>
                </Link>
                <Link href="/refund">
                  <span onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#25F4EE] transition duration-300 cursor-pointer block pl-4">Refund Policy</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;