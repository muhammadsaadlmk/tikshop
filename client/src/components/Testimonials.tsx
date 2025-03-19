import { User, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      text: "The account was delivered quickly and was already set up for monetization. Made my first earnings within a week!",
      name: "Ahmed K.",
      role: "Content Creator"
    },
    {
      text: "Bought the premium package for my agency. All accounts were properly verified and working perfectly. Great service!",
      name: "Fatima S.",
      role: "Digital Agency Owner"
    },
    {
      text: "Customer support was excellent. They helped me set everything up and answered all my questions promptly.",
      name: "Usman M.",
      role: "Influencer"
    }
  ];

  return (
    <section className="py-20 bg-[#1D1D1D]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
            What Our <span className="text-[#25F4EE]">Customers</span> Say
          </h2>
          <p className="text-[#F1F1F2]/90 max-w-2xl mx-auto">
            Hear from content creators who have used our monetized TikTok accounts
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-[#010101]/50 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:shadow-lg hover:shadow-[#25F4EE]/10 transition duration-300"
            >
              <div className="flex items-center mb-4">
                <Quote className="text-[#FE2C55] h-8 w-8 opacity-50" />
              </div>
              <p className="text-[#F1F1F2]/90 mb-6">{testimonial.text}</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#25F4EE]/20 rounded-full flex items-center justify-center mr-4">
                  <User className="h-6 w-6 text-[#25F4EE]" />
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-[#F1F1F2]/70">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
