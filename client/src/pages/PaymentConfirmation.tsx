import { useState } from 'react';
import { Link } from 'wouter';
import { Check, AlertCircle, ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// List of countries for the country selector - same as in ContactForm
const COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Argentina', 'Armenia', 'Australia', 
  'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 
  'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 
  'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 
  'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros',
  'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 
  'Dominican Republic', 'DR Congo', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea',
  'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia',
  'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau',
  'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq',
  'Ireland', 'Israel', 'Italy', 'Ivory Coast', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan',
  'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia',
  'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia',
  'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico',
  'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique',
  'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger',
  'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine',
  'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar',
  'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Samoa', 'San Marino',
  'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia',
  'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain',
  'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan',
  'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia',
  'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom',
  'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
  'Yemen', 'Zambia', 'Zimbabwe'
];

const paymentSchema = z.object({
  transactionId: z.string().min(3, "Transaction ID is required"),
  amount: z.string().min(1, "Amount is required"),
  senderName: z.string().min(2, "Sender name is required"),
  senderNumber: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  country: z.string().min(1, "Country is required"),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

const PaymentConfirmation = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      transactionId: '',
      amount: '',
      senderName: '',
      senderNumber: '',
      email: '',
      country: '',
    }
  });

  const onSubmit = async (data: PaymentFormValues) => {
    let backendSuccess = false;
    
    try {
      setIsSubmitting(true);
      
      // First try to submit to backend
      try {
        await apiRequest('POST', '/api/payment-confirmation', data);
        backendSuccess = true;
      } catch (backendError) {
        console.error("Backend submission error:", backendError);
        // Continue with web3forms even if backend fails
      }
      
      // Then submit to web3forms API
      try {
        const web3FormsResponse = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: '6ae82029-8b9f-493e-b755-47c942182a0d',
            subject: 'New TikTok Account Payment Confirmation',
            from_name: 'TikTok Account Service',
            name: data.senderName,
            email: data.email,
            country: data.country,
            transactionId: data.transactionId,
            amount: data.amount,
            senderNumber: data.senderNumber,
            message: `Payment confirmation for Rs${data.amount}`,
          })
        });
        
        const result = await web3FormsResponse.json();
        
        // If web3forms fails but backend was successful, 
        // we still consider it a partial success
        if (!result.success && !backendSuccess) {
          throw new Error('Web3forms submission failed');
        }
      } catch (web3Error) {
        console.error("Web3forms submission error:", web3Error);
        // If backend was successful but web3forms failed,
        // we still show success message
        if (!backendSuccess) {
          throw new Error('Payment confirmation failed on both systems');
        }
      }
      
      // If we get here, at least one submission was successful
      toast({
        title: "Payment Confirmed",
        description: "Your payment has been confirmed. We'll process your order shortly.",
      });
      
      setIsSubmitted(true);
    } catch (error) {
      console.error("Payment confirmation error:", error);
      toast({
        title: "Error",
        description: "There was a problem confirming your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#010101] to-[#1D1D1D] font-inter text-white min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-32">
        <div className="max-w-2xl mx-auto">
          <Link href="/">
            <span className="inline-flex items-center text-[#25F4EE] hover:text-[#FE2C55] mb-8 transition-colors cursor-pointer">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </span>
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full bg-[#010101] border border-white/20 rounded-lg focus:border-[#25F4EE]">
                                <SelectValue placeholder="Select your country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="max-h-80">
                              {COUNTRIES.map(country => (
                                <SelectItem key={country} value={country}>{country}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-4">
                      <Button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-6 bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-[#FE2C55]/30 transition duration-300"
                      >
                        {isSubmitting ? 'Processing...' : 'Confirm Payment'}
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
                  <span className="inline-block px-8 py-3 bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] rounded-full text-white font-semibold hover:shadow-lg hover:shadow-[#FE2C55]/30 transition duration-300 cursor-pointer">
                    Return to Home
                  </span>
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
