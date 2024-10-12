'use client'

import React, { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from "@/components/ui/button"
import { BrainCircuit, FileText, Pill, UserRound, ChevronDown, ChevronUp } from 'lucide-react'

type Feature = {
  icon: React.ElementType;
  title: string;
  description: string;
  details: string;
}

const features: Feature[] = [
  {
    icon: BrainCircuit,
    title: "Wellness Mentor",
    description: "Get personalized mental health advice from our AI-powered mentor.",
    details: "Our AI-powered Wellness Mentor uses advanced algorithms to provide tailored mental health advice. It analyzes your responses, tracks your progress, and offers personalized strategies to improve your mental well-being. Whether you're dealing with stress, anxiety, or just looking to enhance your overall mental health, our Wellness Mentor is here to guide you 24/7."
  },
  {
    icon: FileText,
    title: "Medical Report Analysis",
    description: "Upload and analyze your medical reports with ease.",
    details: "Our Medical Report Analysis feature uses state-of-the-art natural language processing to interpret complex medical reports. Simply upload your documents, and our AI will provide a clear, easy-to-understand summary. It can highlight key findings, explain medical terminology, and even suggest follow-up questions for your healthcare provider."
  },
  {
    icon: Pill,
    title: "Drug Details",
    description: "Get comprehensive information about medications.",
    details: "Our Drug Details feature provides in-depth information about a wide range of medications. From usage instructions and potential side effects to drug interactions and precautions, you'll have access to comprehensive, up-to-date information. Our AI can even help you understand how a new medication might interact with your current prescriptions."
  },
  {
    icon: UserRound,
    title: "Expert Advice",
    description: "Connect with mental health professionals for personalized guidance.",
    details: "While our AI provides valuable insights, sometimes you need a human touch. Our Expert Advice feature connects you with licensed mental health professionals for personalized guidance. Schedule video consultations, engage in text-based therapy, or get expert second opinions on your mental health concerns."
  },
];

export default function FeaturesPage() {
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);

  const toggleFeature = (title: string) => {
    if (expandedFeature === title) {
      setExpandedFeature(null);
    } else {
      setExpandedFeature(title);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-200 via-blue-200 to-indigo-200 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-900 dark:text-white">Our Features</h1>
        <p className="text-xl text-center mb-12 text-gray-700 dark:text-gray-300">
          Discover how Auranox AI can revolutionize your healthcare experience with our cutting-edge features.
        </p>
        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature) => (
            <div 
              key={feature.title}
              className="bg-white/30 dark:bg-gray-800/30 rounded-lg p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl group"
            >
              <div className="flex items-center mb-4">
                <feature.icon className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{feature.title}</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{feature.description}</p>
              <Button
                variant="ghost"
                onClick={() => toggleFeature(feature.title)}
                className="w-full justify-between text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900"
              >
                {expandedFeature === feature.title ? 'Hide Details' : 'Show Details'}
                {expandedFeature === feature.title ? (
                  <ChevronUp className="h-6 w-6" />
                ) : (
                  <ChevronDown className="h-6 w-6" />
                )}
              </Button>
              {expandedFeature === feature.title && (
                <div className="mt-4 text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-gray-700/50 p-4 rounded-lg">
                  {feature.details}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Ready to experience the future of healthcare?</h2>
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Get Started Now
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
