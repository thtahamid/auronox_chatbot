import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from "@/components/ui/button"
import Image from 'next/image';
import { Brain, Heart, Users, Zap, User } from 'lucide-react';

const teamMembers = [
  { name: 'Tahamid', role: 'Designer & Web Developer', icon: User },
  { name: 'Mahdi', role: 'Backend & Prototype', icon: User },
  { name: 'Yousuf', role: 'Backend & Prototype', icon: User },
  { name: 'Inaya', role: 'Designer & Research', icon: User },
];

const values = [
  { icon: Brain, title: 'Innovation', description: 'Pushing the boundaries of AI in healthcare' },
  { icon: Heart, title: 'Compassion', description: 'Putting user well-being at the heart of our service' },
  { icon: Users, title: 'Inclusivity', description: 'Making mental health support accessible to all' },
  { icon: Zap, title: 'Empowerment', description: 'Equipping users with knowledge and tools for better health' },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-200 via-blue-200 to-indigo-200 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-900 dark:text-white">About Auranox AI</h1>
        
        {/* Mission Statement */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Our Mission</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            At Auranox AI, we're on a mission to revolutionize mental healthcare through the power of artificial intelligence. We believe that everyone deserves access to high-quality mental health support, and we're leveraging cutting-edge technology to make that a reality.
          </p>
        </section>

        {/* Company History */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Our Journey</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Auranox AI was born from a passionate group of university students who came together to create an innovative solution for their final year project. Inspired by the growing need for accessible mental health support, especially among their peers, they brainstormed ways to leverage technology for well-being, self-care, and mental health.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            What started as a university project quickly evolved into a comprehensive platform designed to support individuals on their mental health journey. The team's diverse skills in design, web development, backend programming, and research allowed them to create a unique AI-powered healthcare assistant.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Today, Auranox AI stands as a testament to the power of student innovation, aiming to serve users worldwide by providing personalized mental health advice, medical report analysis, and connecting individuals with professional support when needed.
          </p>
        </section>

        {/* Team Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center">
                <member.icon className="h-24 w-24 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{member.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div key={value.title} className="flex items-start">
                <value.icon className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{value.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Join Us in Transforming Mental Healthcare</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Experience the future of mental health support with Auranox AI.
          </p>
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Get Started Now
          </Button>
        </section>
      </main>
      <Footer />
    </div>
  );
}
