'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { BrainCircuit, FileText, Pill, UserRound, Sun, Moon, MessageSquare, Users } from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'

export default function LandingPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  if (!mounted) {
    return null // or return a loading spinner
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <header className="px-4 lg:px-6 h-20 flex items-center justify-between">
        <Link className="flex items-center justify-center" href="#">
          <BrainCircuit className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">Auranox</span>
        </Link>
        <nav className="hidden md:flex space-x-4 items-center">
          {['Features', 'Pricing', 'About', 'Community Forum'].map((item) => (
            <Link
              key={item}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200 hover:scale-105 transform"
              href="#"
            >
              {item}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <Button
            onClick={toggleDarkMode}
            variant="ghost"
            size="icon"
            className="rounded-full text-gray-700 dark:text-gray-300"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle dark mode</span>
          </Button>
          <Button className="hidden md:inline-flex">Sign In</Button>
          <Button className="md:hidden" size="icon">
            <MessageSquare className="h-5 w-5" />
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col-reverse md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
              <div className="flex flex-col items-center md:items-start space-y-4 text-center md:text-left md:w-1/2">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-gray-900 dark:text-white">
                    Welcome to Auranox AI
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-700 dark:text-gray-300 md:text-xl">
                    Your personal AI-powered healthcare assistant. Get expert advice, analyze medical reports, and manage your wellness journey.
                  </p>
                </div>
                <div className="w-full max-w-sm">
                  <Button className="w-full" size="lg">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Start Chatting
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center md:justify-end">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px]">
                  <Image
                    src="/images/auranox-mascot.png"
                    alt="Auranox AI Mascot"
                    layout="fill"
                    objectFit="contain"
                    className="float-animation"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12 text-gray-900 dark:text-white">Our Features</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
              {[
                { icon: BrainCircuit, title: "Wellness Mentor", description: "Get personalized mental health advice from our AI-powered mentor." },
                { icon: FileText, title: "Medical Report Analysis", description: "Upload and analyze your medical reports with ease." },
                { icon: Pill, title: "Drug Details", description: "Get comprehensive information about medications." },
                { icon: UserRound, title: "Expert Advice", description: "Connect with mental health professionals for personalized guidance." },
              ].map((feature, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 p-6 rounded-lg bg-white dark:bg-gray-700 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 transform">
                  <feature.icon className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 text-center">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <Users className="h-16 w-16 text-blue-600 dark:text-blue-400" />
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900 dark:text-white">Join Our Community Forum</h2>
              <p className="max-w-[900px] text-gray-700 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Connect with others, share experiences, and learn from our supportive community. Together, we can make mental health a priority.
              </p>
              <div className="w-full max-w-sm">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="lg">
                  Access Community Forum
                </Button>
              </div>
            </div>
          </div>
        </section>
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
      <footer className="w-full py-6 px-4 md:px-6 border-t border-gray-200 dark:border-gray-800">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-700 dark:text-gray-300">© 2024 Auranox AI. All rights reserved.</p>
          <nav className="flex gap-4 mt-4 md:mt-0">
            <Link className="text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" href="#">
              Terms of Service
            </Link>
            <Link className="text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" href="#">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}