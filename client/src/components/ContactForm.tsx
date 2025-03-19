import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  contactEmail: z.string().email("Valid email is required"),
  accountEmail: z.string().email("Valid email is required"),
  transactionId: z.string().min(3, "Transaction ID is required"),
  whatsappNumber: z.string().min(10, "Valid WhatsApp number is required"),
  message: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      contactEmail: '',
      accountEmail: '',
      transactionId: '',
      whatsappNumber: '',
      message: ''
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await apiRequest('POST', '/api/contact', data);
      
      toast({
        title: "Success",
        description: "Thank you! Your information has been submitted. We will contact you shortly.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your information. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-[#1D1D1D]/50 backdrop-blur-md border border-white/10 p-8 rounded-xl">
      <h3 className="text-2xl font-bold font-poppins mb-6">Contact Information</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="First Name" 
                      className="w-full bg-[#010101] border border-white/20 rounded-lg focus:border-[#25F4EE]" 
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Last Name" 
                      className="w-full bg-[#010101] border border-white/20 rounded-lg focus:border-[#25F4EE]" 
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email for Contact</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="Your contact email" 
                    className="w-full bg-[#010101] border border-white/20 rounded-lg focus:border-[#25F4EE]" 
                    {...field} 
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="accountEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email for Accounts</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="Email to receive accounts" 
                    className="w-full bg-[#010101] border border-white/20 rounded-lg focus:border-[#25F4EE]" 
                    {...field} 
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="transactionId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transaction ID (TID)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Your payment transaction ID" 
                    className="w-full bg-[#010101] border border-white/20 rounded-lg focus:border-[#25F4EE]" 
                    {...field} 
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="whatsappNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>WhatsApp Number</FormLabel>
                <FormControl>
                  <Input 
                    type="tel" 
                    placeholder="Your WhatsApp number" 
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
                <FormLabel>Message (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Any additional information" 
                    className="w-full bg-[#010101] border border-white/20 rounded-lg focus:border-[#25F4EE] min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full py-6 bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-[#FE2C55]/30 transition duration-300"
          >
            Submit Information
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
