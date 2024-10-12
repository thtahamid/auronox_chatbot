'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { BrainCircuit, FileText, Pill, UserRound, MessageSquare, Users } from 'lucide-react'
import Header from './header'
import Footer from './footer'
import Image from 'next/image'

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-200 via-blue-200 to-indigo-200 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 transition-colors duration-200">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  Welcome to Auranox AI
                </h1>
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
                  Your personal AI-powered healthcare assistant. Get instant answers, personalized advice, and expert insights at your fingertips.
                </p>
                <div>
                  <Link href="/chat">
                    <Button 
                      size="lg" 
                      className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 dark:from-blue-400 dark:to-purple-500 dark:hover:from-blue-500 dark:hover:to-purple-600 text-white transition-all duration-300 transform hover:scale-105"
                    >
                      <MessageSquare className="mr-2 h-5 w-5" />
                      Start Chatting
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 mt-8 md:mt-0">
                <Image
                  src="/images/auranox-mascot.png"
                  alt="Auranox AI Mascot"
                  width={500}
                  height={500}
                  className="mx-auto md:mx-0"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12 text-gray-900 dark:text-white">Our Features</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
              {[
                { icon: BrainCircuit, title: "Wellness Mentor", description: "Get personalized mental health advice from our AI-powered mentor." },
                { icon: FileText, title: "Medical Report Analysis", description: "Upload and analyze your medical reports with ease." },
                { icon: Pill, title: "Drug Details", description: "Get comprehensive information about medications." },
                { icon: UserRound, title: "Expert Advice", description: "Connect with mental health professionals for personalized guidance." },
              ].map((feature, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 p-6 rounded-lg bg-white/30 dark:bg-gray-800/30 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 transform backdrop-blur-sm">
                  <feature.icon className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 text-center">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Forum Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <Users className="h-16 w-16 text-blue-600 dark:text-blue-400" />
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900 dark:text-white">Join Our Community Forum</h2>
              <p className="max-w-[900px] text-gray-700 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Connect with others, share experiences, and learn from our supportive community. Together, we can make mental health a priority.
              </p>
              <div className="w-full max-w-sm">
                <Link href="/community">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="lg">
                    Access Community Forum
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900 dark:text-white">Start Your Wellness Journey Today</h2>
                <p className="max-w-[900px] text-gray-700 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of users who have improved their mental health and well-being with Auranox AI.
                </p>
              </div>
              <div className="w-full max-w-sm">
                <Button className="w-full" size="lg">
                  Sign Up Now
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
