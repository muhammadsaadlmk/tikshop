import { Check } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "Rs 300",
      description: "Perfect for beginners starting their TikTok journey",
      features: [
        "1 TikTok Monetizeable Account",
        "Account Setup Complete",
        "3-Hour Delivery",
        "Basic Support"
      ],
      popular: false
    },
    {
      name: "Standard",
      price: "Rs 400",
      description: "Ideal for content creators building their presence",
      features: [
        "2 TikTok Monetizeable Accounts",
        "Account Setup Complete",
        "Priority Delivery",
        "Standard Support"
      ],
      popular: true
    },
    {
      name: "Premium",
      price: "Rs 500",
      description: "Perfect for serious creators and small agencies",
      features: [
        "6 TikTok Monetizeable Accounts",
        "Account Setup Complete",
        "Express Delivery",
        "Premium Support"
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-[#1D1D1D] overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#25F4EE]/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#FE2C55]/20 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
            Affordable <span className="text-[#FE2C55]">Pricing</span> Plans
          </h2>
          <p className="text-[#F1F1F2]/90 max-w-2xl mx-auto">
            Choose the perfect package for your content creation journey
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`
                bg-gradient-to-b from-[#1D1D1D] to-[#010101] 
                border ${plan.popular ? 'border-[#FE2C55]/30' : 'border-white/10'} 
                rounded-2xl overflow-hidden transition-all duration-300 
                hover:shadow-lg ${plan.popular ? 'hover:shadow-[#FE2C55]/30' : 'hover:shadow-[#25F4EE]/20'} 
                hover:-translate-y-2
                ${plan.popular ? 'transform scale-105' : ''}
              `}
            >
              {plan.popular && (
                <div className="bg-[#FE2C55] text-white text-center py-2 font-semibold">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold font-poppins mb-2">{plan.name}</h3>
                <div className="flex items-end mb-6">
                  <span className="text-4xl font-bold font-poppins">{plan.price}</span>
                  <span className="text-[#F1F1F2]/70 ml-2">one-time</span>
                </div>
                <p className="text-[#F1F1F2]/80 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="text-[#25F4EE] h-5 w-5 mt-1 mr-3" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a 
                  href="#payment" 
                  className={`
                    block w-full py-3 text-center
                    ${plan.popular ? 
                      'bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-[#FE2C55]/30' : 
                      'bg-white/10 border border-white/20 rounded-lg text-white font-semibold hover:bg-white/20'
                    } 
                    transition duration-300
                  `}
                >
                  Get Started
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
