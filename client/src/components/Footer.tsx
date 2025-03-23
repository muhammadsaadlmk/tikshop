import { Link } from 'wouter';
import { Mail, MessageCircle, Facebook, Twitter, Instagram } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';

const Footer = () => {
  return (
    <footer className="bg-[#010101] py-12 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-[#25F4EE] font-bold text-2xl font-poppins">
                Tik<span className="text-[#FE2C55]">Shop</span>
              </div>
            </div>
            <p className="text-[#F1F1F2]/70 mb-4">
              Premium monetizeable TikTok accounts for content creators.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#F1F1F2] hover:text-[#25F4EE] transition duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#F1F1F2] hover:text-[#25F4EE] transition duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#F1F1F2] hover:text-[#25F4EE] transition duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#F1F1F2] hover:text-[#25F4EE] transition duration-300">
                <SiTiktok className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-[#F1F1F2]/70 hover:text-[#25F4EE] transition duration-300">Home</a>
                </Link>
              </li>
              <li>
                <a href="#pricing" className="text-[#F1F1F2]/70 hover:text-[#25F4EE] transition duration-300">Pricing</a>
              </li>
              <li>
                <a href="#how-it-works" className="text-[#F1F1F2]/70 hover:text-[#25F4EE] transition duration-300">How It Works</a>
              </li>
              <li>
                <a href="#contact" className="text-[#F1F1F2]/70 hover:text-[#25F4EE] transition duration-300">Contact</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/terms">
                  <a className="text-[#F1F1F2]/70 hover:text-[#25F4EE] transition duration-300">Terms & Conditions</a>
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <a className="text-[#F1F1F2]/70 hover:text-[#25F4EE] transition duration-300">Privacy Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/refund">
                  <a className="text-[#F1F1F2]/70 hover:text-[#25F4EE] transition duration-300">Refund Policy</a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Mail className="text-[#25F4EE] h-5 w-5 mt-1 mr-3" />
                <span className="text-[#F1F1F2]/70">don4t6@gmail.com</span>
              </li>
              <li className="flex items-start">
                <MessageCircle className="text-[#25F4EE] h-5 w-5 mt-1 mr-3" />
                <span className="text-[#F1F1F2]/70">+92 303 9749212</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-[#F1F1F2]/50">© {new Date().getFullYear()} TikShop. All rights reserved. Created and produced by MS Prime Tech Services in partnership with ARCodeNest.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
