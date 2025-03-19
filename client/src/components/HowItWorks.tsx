import { Step } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Choose a Plan",
      description: "Select from our range of monetized TikTok account packages."
    },
    {
      number: 2,
      title: "Make Payment",
      description: "Complete your purchase securely via JazzCash."
    },
    {
      number: 3,
      title: "Fill the Form",
      description: "Submit your contact details and transaction ID."
    },
    {
      number: 4,
      title: "Receive Accounts",
      description: "Get your accounts delivered via email within 3 hours."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#010101]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
            How It <span className="text-[#25F4EE]">Works</span>
          </h2>
          <p className="text-[#F1F1F2]/90 max-w-2xl mx-auto">
            Getting started with your monetized TikTok account is simple and quick
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#25F4EE] to-[#FE2C55] rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <span className="text-2xl font-bold">{step.number}</span>
                {index < steps.length - 1 && (
                  <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 h-0.5 w-8 bg-[#FE2C55] hidden md:block"></div>
                )}
              </div>
              <h3 className="text-xl font-bold font-poppins mb-3">{step.title}</h3>
              <p className="text-[#F1F1F2]/80">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
