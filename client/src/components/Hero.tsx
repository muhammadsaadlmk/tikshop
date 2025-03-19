import HeroBg from './ThreeJS/HeroBg';
import TikTokLogo from './ThreeJS/TikTokLogo';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-20 flex items-center justify-center overflow-hidden">
      <HeroBg />

      <div className="container mx-auto px-4 z-10 relative pt-10 md:pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins leading-tight mb-4">
              Monetize Your <span className="bg-gradient-to-r from-[#25F4EE] to-[#FE2C55] text-transparent bg-clip-text">TikTok</span> Journey
            </h1>
            <p className="text-lg md:text-xl text-[#F1F1F2]/90 mb-8">
              Premium monetizeable TikTok accounts for content creators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a 
                href="#pricing" 
                className="px-8 py-3 bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] rounded-full text-white font-semibold hover:shadow-lg hover:shadow-[#FE2C55]/30 transition duration-300 text-center"
              >
                View Pricing
              </a>
              <a 
                href="#how-it-works" 
                className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-semibold hover:bg-white/20 transition duration-300 text-center"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="hidden md:block relative">
            <div className="w-full h-[400px] relative">
              <TikTokLogo />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#features" className="text-white/50 hover:text-white transition duration-300">
          <ChevronDown className="h-6 w-6" />
        </a>
      </div>
    </section>
  );
};

export default Hero;