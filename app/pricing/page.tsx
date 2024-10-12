import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from "@/components/ui/button"
import { Check } from 'lucide-react';

const pricingTiers = [
  {
    name: 'Basic',
    price: '$9.99',
    period: 'month',
    description: 'Perfect for individuals just starting their mental health journey.',
    features: [
      'Access to AI Wellness Mentor',
      'Basic Medical Report Analysis',
      'Limited Drug Information Lookup',
      'Community Forum Access',
    ],
  },
  {
    name: 'Pro',
    price: '$24.99',
    period: 'month',
    description: 'Ideal for those seeking comprehensive mental health support.',
    features: [
      'All Basic features',
      'Advanced Medical Report Analysis',
      'Unlimited Drug Information Lookup',
      'Priority Community Support',
      '1 Free Expert Consultation per month',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Tailored solutions for organizations and healthcare providers.',
    features: [
      'All Pro features',
      'Custom AI model training',
      'Dedicated account manager',
      'API access for integration',
      'Bulk user management',
      'Advanced analytics and reporting',
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-200 via-blue-200 to-indigo-200 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-900 dark:text-white">Sample Pricing Model</h1>
        <p className="text-xl text-center mb-12 text-gray-700 dark:text-gray-300">
          Choose the plan that best fits your needs and start your journey to better mental health today.
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {pricingTiers.map((tier) => (
            <div 
              key={tier.name}
              className="bg-white/30 dark:bg-gray-800/30 rounded-lg p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl flex flex-col"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{tier.name}</h3>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                {tier.price}
                {tier.period && <span className="text-lg font-normal text-gray-600 dark:text-gray-400">/{tier.period}</span>}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">{tier.description}</p>
              <ul className="mb-8 flex-grow">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-center mb-2 text-gray-700 dark:text-gray-300">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {tier.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </Button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
