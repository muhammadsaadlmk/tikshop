const CTA = () => {
  return (
    <section className="py-20 bg-[#1D1D1D] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FE2C55]/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#25F4EE]/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6">
            Ready to Start Your <span className="bg-gradient-to-r from-[#25F4EE] to-[#FE2C55] text-transparent bg-clip-text">TikTok</span> Journey?
          </h2>
          <p className="text-xl text-[#F1F1F2]/90 mb-8 max-w-2xl mx-auto">
            Get monetizeable TikTok accounts today and start earning from your content creation skills
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#pricing" 
              className="px-8 py-4 bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] rounded-full text-white font-semibold hover:shadow-lg hover:shadow-[#FE2C55]/30 transition duration-300 text-center"
            >
              Get Started Now
            </a>
            <a 
              href="/contact-us" 
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-semibold hover:bg-white/20 transition duration-300 text-center"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;