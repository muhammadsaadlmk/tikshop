import { useState } from 'react';
import { Link } from 'wouter';
import { Check, AlertCircle, ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const paymentSchema = z.object({
  transactionId: z.string().min(3, "Transaction ID is required"),
  amount: z.string().min(1, "Amount is required"),
  senderName: z.string().min(2, "Sender name is required"),
  senderNumber: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

const PaymentConfirmation = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      transactionId: '',
      amount: '',
      senderName: '',
      senderNumber: '',
      email: '',
    }
  });

  const onSubmit = async (data: PaymentFormValues) => {
    try {
      await apiRequest('POST', '/api/payment-confirmation', data);
      
      toast({
        title: "Payment Confirmed",
        description: "Your payment has been confirmed. We'll process your order shortly.",
      });
      
      setIsSubmitted(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem confirming your payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#010101] to-[#1D1D1D] font-inter text-white min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-32">
        <div className="max-w-2xl mx-auto">
          <Link href="/">
            <a className="inline-flex items-center text-[#25F4EE] hover:text-[#FE2C55] mb-8 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </a>
          </Link>
          
          <div className="bg-[#1D1D1D]/50 backdrop-blur-md border border-white/10 p-8 rounded-xl">
            {!isSubmitted ? (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold font-poppins mb-4">Payment Confirmation</h1>
                  <p className="text-[#F1F1F2]/80">
                    Confirm your JazzCash payment details to expedite your order processing
                  </p>
                </div>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="transactionId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Transaction ID (TID)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your JazzCash transaction ID" 
                              className="w-full bg-[#010101] border border-white/20 rounded-lg focus:border-[#25F4EE]" 
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amount Paid (Rs)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter the amount paid" 
                              className="w-full bg-[#010101] border border-white/20 rounded-lg focus:border-[#25F4EE]" 
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="senderName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sender's Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Name used for payment" 
                              className="w-full bg-[#010101] border border-white/20 rounded-lg focus:border-[#25F4EE]" 
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="senderNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sender's Phone Number</FormLabel>
                          <FormControl>
                            <Input 
                              type="tel"
                              placeholder="Phone number used for payment" 
                              className="w-full bg-[#010101] border border-white/20 rounded-lg focus:border-[#25F4EE]" 
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              type="email"
                              placeholder="Email to receive confirmation" 
                              className="w-full bg-[#010101] border border-white/20 rounded-lg focus:border-[#25F4EE]" 
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        className="w-full py-6 bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-[#FE2C55]/30 transition duration-300"
                      >
                        Confirm Payment
                      </Button>
                    </div>
                  </form>
                </Form>
                
                <div className="mt-6 p-4 bg-[#25F4EE]/10 border border-[#25F4EE]/30 rounded-lg flex items-start">
                  <AlertCircle className="h-5 w-5 text-[#25F4EE] mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-[#F1F1F2]/90">
                    After confirming your payment, please allow up to 3 hours for account delivery. Our team will contact you via the email provided.
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="h-8 w-8 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold font-poppins mb-4">Payment Successfully Confirmed!</h2>
                <p className="text-[#F1F1F2]/80 mb-6">
                  Thank you for your payment. Your order is now being processed. We'll deliver your TikTok accounts to your email within 3 hours.
                </p>
                <Link href="/">
                  <a className="inline-block px-8 py-3 bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] rounded-full text-white font-semibold hover:shadow-lg hover:shadow-[#FE2C55]/30 transition duration-300">
                    Return to Home
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PaymentConfirmation;
