import { useState, useEffect } from 'react';
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
import { apiRequest } from '@/lib/queryClient';

// Define the plans with their email limits
const PLANS = {
  STARTER: { name: 'Starter', emailLimit: 1 },
  STANDARD: { name: 'Standard', emailLimit: 2 },
  PREMIUM: { name: 'Premium', emailLimit: 6 }
};

// List of countries for the country selector
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

const createBaseSchema = () => {
  return z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    contactEmail: z.string().email("Valid email is required"),
    plan: z.enum(['STARTER', 'STANDARD', 'PREMIUM']),
    country: z.string().min(1, "Country is required"),
    transactionId: z.string().min(3, "Transaction ID is required"),
    whatsappNumber: z.string().min(10, "Valid WhatsApp number is required"),
    message: z.string().optional(),
  });
};

// Dynamic form schema based on plan selection
const createDynamicFormSchema = (selectedPlan: keyof typeof PLANS) => {
  const baseSchema = createBaseSchema();
  
  // Add dynamic fields based on plan
  if (selectedPlan === 'STARTER') {
    return baseSchema.extend({
      accountEmail1: z.string().email("Valid email is required"),
    });
  } else if (selectedPlan === 'STANDARD') {
    return baseSchema.extend({
      accountEmail1: z.string().email("Valid email is required"),
      accountEmail2: z.string().email("Valid email is required"),
    });
  } else if (selectedPlan === 'PREMIUM') {
    return baseSchema.extend({
      accountEmail1: z.string().email("Valid email is required"),
      accountEmail2: z.string().email("Valid email is required"),
      accountEmail3: z.string().email("Valid email is required"),
      accountEmail4: z.string().email("Valid email is required"),
      accountEmail5: z.string().email("Valid email is required"),
      accountEmail6: z.string().email("Valid email is required"),
    });
  }
  
  return baseSchema;
};

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<keyof typeof PLANS>('STARTER');
  
  const form = useForm({
    resolver: zodResolver(createDynamicFormSchema(selectedPlan)),
    defaultValues: {
      firstName: '',
      lastName: '',
      contactEmail: '',
      plan: 'STARTER' as const,
      country: '',
      transactionId: '',
      whatsappNumber: '',
      message: '',
      accountEmail1: '',
      accountEmail2: '',
      accountEmail3: '',
      accountEmail4: '',
      accountEmail5: '',
      accountEmail6: '',
    }
  });

  // Update validation schema when plan changes
  useEffect(() => {
    form.clearErrors();
    const newSchema = createDynamicFormSchema(selectedPlan);
    form.setValue('plan', selectedPlan);
  }, [selectedPlan, form]);

  // Handle plan change
  const handlePlanChange = (value: keyof typeof PLANS) => {
    setSelectedPlan(value);
  };

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      
      // Collect all account emails based on the plan
      const accountEmails = [];
      for (let i = 1; i <= PLANS[selectedPlan].emailLimit; i++) {
        const emailKey = `accountEmail${i}` as keyof typeof data;
        if (data[emailKey]) {
          accountEmails.push(data[emailKey]);
        }
      }
      
      // Submit to web3forms API
      const web3FormsResponse = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '6ae82029-8b9f-493e-b755-47c942182a0d',
          subject: `New TikTok Account Order - ${PLANS[selectedPlan].name} Plan`,
          from_name: 'TikTok Account Service',
          name: `${data.firstName} ${data.lastName}`,
          email: data.contactEmail,
          plan: PLANS[selectedPlan].name,
          country: data.country,
          accountEmails: accountEmails.join(', '),
          transactionId: data.transactionId,
          whatsappNumber: data.whatsappNumber,
          message: data.message || 'No additional message'
        })
      });
      
      const result = await web3FormsResponse.json();
      
      if (result.success) {
        // Also submit to our backend API for storage
        await apiRequest('POST', '/api/contact', {
          ...data,
          accountEmails
        });
        
        toast({
          title: "Success",
          description: "Thank you! Your order has been submitted. We will contact you shortly.",
        });
        
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#1D1D1D]/50 backdrop-blur-md border border-white/10 p-8 rounded-xl">
      <h3 className="text-2xl font-bold font-poppins mb-6">Contact Information</h3>
      
      {/* Plan selection */}
      <div className="mb-8">
        <h4 className="text-xl font-semibold mb-3">Select Your Plan</h4>
        <RadioGroup 
          defaultValue="STARTER"
          className="flex flex-col sm:flex-row gap-4"
          onValueChange={(value) => handlePlanChange(value as keyof typeof PLANS)}
        >
          <div className={`flex items-start space-x-2 p-4 rounded-lg border ${selectedPlan === 'STARTER' ? 'border-[#25F4EE]' : 'border-white/20'}`}>
            <RadioGroupItem value="STARTER" id="plan-starter" />
            <label htmlFor="plan-starter" className="cursor-pointer">
              <div className="font-medium">Starter</div>
              <div className="text-sm text-white/70">1 Account</div>
            </label>
          </div>
          <div className={`flex items-start space-x-2 p-4 rounded-lg border ${selectedPlan === 'STANDARD' ? 'border-[#25F4EE]' : 'border-white/20'}`}>
            <RadioGroupItem value="STANDARD" id="plan-standard" />
            <label htmlFor="plan-standard" className="cursor-pointer">
              <div className="font-medium">Standard</div>
              <div className="text-sm text-white/70">2 Accounts</div>
            </label>
          </div>
          <div className={`flex items-start space-x-2 p-4 rounded-lg border ${selectedPlan === 'PREMIUM' ? 'border-[#25F4EE]' : 'border-white/20'}`}>
            <RadioGroupItem value="PREMIUM" id="plan-premium" />
            <label htmlFor="plan-premium" className="cursor-pointer">
              <div className="font-medium">Premium</div>
              <div className="text-sm text-white/70">6 Accounts</div>
            </label>
          </div>
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
          
          <div className="border-t border-white/10 my-6 pt-6">
            <h4 className="text-xl font-semibold mb-4">Account Email{PLANS[selectedPlan].emailLimit > 1 ? 's' : ''}</h4>
            <p className="text-sm text-white/70 mb-4">
              You can add {PLANS[selectedPlan].emailLimit} email{PLANS[selectedPlan].emailLimit > 1 ? 's' : ''} with the {PLANS[selectedPlan].name} plan.
            </p>
            
            <div className="space-y-4">
              {/* Dynamic email fields based on the selected plan */}
              {Array.from({ length: PLANS[selectedPlan].emailLimit }).map((_, index) => (
                <FormField
                  key={`accountEmail${index + 1}`}
                  control={form.control}
                  name={`accountEmail${index + 1}` as any}
                  render={({ field }) => (
                    <FormItem>
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
