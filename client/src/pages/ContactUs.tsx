import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message is required and should be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const ContactUsPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      
      // Submit to web3forms API
      const web3FormsResponse = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '0639a8c1-defd-4e5a-b74b-33926b5c7af6',
          subject: `New Question: ${data.subject}`,
          from_name: 'TikTok Account Service',
          name: data.name,
          email: data.email,
          message: data.message
        })
      });
      
      const result = await web3FormsResponse.json();
      
      if (result.success) {
        toast({
          title: "Message Sent",
          description: "Thank you for contacting us. We'll get back to you as soon as possible.",
        });
        
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
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
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold font-poppins mb-4">Contact Us</h1>
              <p className="text-[#F1F1F2]/80">
                Have a question or need help? Fill out the form below and we'll get back to you.
              </p>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your full name" 
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
                          placeholder="Your email address" 
                          className="w-full bg-[#010101] border border-white/20 rounded-lg focus:border-[#25F4EE]" 
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="What is your question about?" 
                          className="w-full bg-[#010101] border border-white/20 rounded-lg focus:border-[#25F4EE]" 
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Please describe your question or issue in detail" 
                          className="w-full bg-[#010101] border border-white/20 rounded-lg focus:border-[#25F4EE] min-h-[150px]" 
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="pt-4">
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-6 bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-[#FE2C55]/30 transition duration-300"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ContactUsPage;
