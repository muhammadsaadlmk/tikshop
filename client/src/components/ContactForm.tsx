import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from '@/hooks/use-toast';

const PLANS = {
  STARTER: { name: 'Starter', emailLimit: 1, description: 'Basic Package - 1 Account' },
  STANDARD: { name: 'Standard', emailLimit: 2, description: 'Standard Package - 2 Accounts' },
  PREMIUM: { name: 'Premium', emailLimit: 6, description: 'Premium Package - 6 Accounts' }
};

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

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  contactEmail: z.string().email("Valid email is required"),
  plan: z.enum(['STARTER', 'STANDARD', 'PREMIUM']),
  country: z.string().min(1, "Country is required"),
  transactionId: z.string().min(3, "Transaction ID is required"),
  whatsappNumber: z.string().min(10, "Valid WhatsApp number is required"),
  message: z.string().optional(),
  accountEmails: z.array(z.string().email("Valid email is required")).min(1),
});

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<keyof typeof PLANS>('STARTER');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      contactEmail: '',
      plan: selectedPlan,
      country: '',
      transactionId: '',
      whatsappNumber: '',
      message: '',
      accountEmails: [''],
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append('access_key', '0639a8c1-defd-4e5a-b74b-33926b5c7af6');
      formData.append('subject', `New TikTok Account Order - ${PLANS[selectedPlan].name} Plan`);
      formData.append('from_name', 'TikTok Account Service Order');
      formData.append('name', `${data.firstName} ${data.lastName}`);
      formData.append('email', data.contactEmail);
      formData.append('message', `
Order Details:
- Plan: ${PLANS[selectedPlan].name}
- Country: ${data.country}
- Account Emails: ${data.accountEmails.join(', ')}
- Transaction ID: ${data.transactionId}
- WhatsApp: ${data.whatsappNumber}
${data.message ? `\nAdditional Message:\n${data.message}` : ''}
      `.trim());

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (result.success) {
        toast({
          title: "Order Submitted Successfully",
          description: "Thank you! We'll contact you shortly via WhatsApp or email.",
        });
        form.reset();
        setSelectedPlan('STARTER');
      } else {
        throw new Error(result.message || 'Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your order. Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#1D1D1D]/50 backdrop-blur-md border border-white/10 p-8 rounded-xl">
      <h3 className="text-2xl font-bold font-poppins mb-6">Contact Information</h3>

      <div className="mb-8">
        <h4 className="text-xl font-semibold mb-3">Select Your Plan</h4>
        <div className="text-[#25F4EE] mb-4">
          Selected Plan: {PLANS[selectedPlan].description}
        </div>
        <RadioGroup 
          defaultValue={selectedPlan}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          onValueChange={(value) => setSelectedPlan(value as keyof typeof PLANS)}
        >
          {Object.entries(PLANS).map(([key, plan]) => (
            <RadioGroupItem
              key={key}
              value={key}
              className={`flex items-start space-x-2 p-4 rounded-lg border ${
                selectedPlan === key ? 'border-[#25F4EE] bg-[#25F4EE]/10' : 'border-white/20'
              }`}
            >
              <label htmlFor={`plan-${key.toLowerCase()}`} className="cursor-pointer flex-1">
                <div className="font-medium">{plan.name}</div>
                <div className="text-sm text-white/70">{plan.emailLimit} Account{plan.emailLimit > 1 ? 's' : ''}</div>
              </label>
            </RadioGroupItem>
          ))}
        </RadioGroup>
      </div>

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
                  <FormMessage />
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
                  <FormMessage />
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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country For Account</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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

          <div className="border-t border-white/10 my-6 pt-6">
            <h4 className="text-xl font-semibold mb-4">Account Email{PLANS[selectedPlan].emailLimit > 1 ? 's' : ''}</h4>
            <p className="text-sm text-white/70 mb-4">
              You can add {PLANS[selectedPlan].emailLimit} email{PLANS[selectedPlan].emailLimit > 1 ? 's' : ''} with the {PLANS[selectedPlan].name} plan.
            </p>
            {Array.from({ length: PLANS[selectedPlan].emailLimit }).map((_, index) => (
              <FormField
                key={`accountEmails.${index}`}
                control={form.control}
                name={`accountEmails.${index}`}
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Account Email {index + 1}</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="Email to receive account" 
                        className="w-full bg-[#010101] border border-white/20 rounded-lg focus:border-[#25F4EE]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

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
                <FormMessage />
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
                <FormMessage />
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
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-6 bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-[#FE2C55]/30 transition duration-300"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Order'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
