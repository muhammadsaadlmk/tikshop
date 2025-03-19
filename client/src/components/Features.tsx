import { DollarSign, Shield, Headphones } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <DollarSign className="text-2xl" />,
      title: "Immediate Monetizeable",
      description: "Accounts are already eligible for the TikTok Creator Fund. Start earning from day one."
    },
    {
      icon: <Shield className="text-2xl" />,
      title: "Secure & Verified",
      description: "All accounts are properly verified and secure. We handle the setup so you don't have to."
    },
    {
      icon: <Headphones className="text-2xl" />,
      title: "24/7 Support",
      description: "Our team is always available to assist you with any questions or technical issues."
    }
  ];

  return (
    <section id="features" className="py-20 bg-[#1D1D1D]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
            Why Choose Our <span className="text-[#FE2C55]">TikTok</span> Accounts?
          </h2>
          <p className="text-[#F1F1F2]/90 max-w-2xl mx-auto">
            Our monetizeable accounts give you a head start in the competitive world of TikTok content creation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-[#010101]/50 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:shadow-lg hover:shadow-[#25F4EE]/10 transition duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-[#25F4EE] to-[#FE2C55] rounded-full flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold font-poppins mb-3">{feature.title}</h3>
              <p className="text-[#F1F1F2]/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
