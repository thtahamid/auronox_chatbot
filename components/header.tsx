"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "./ui/button"
import { Menu, Sun, Moon, MessageSquare } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { useTheme } from "next-themes"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const menuItems = [
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/community", label: "Community Forum" },
  ]

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className="px-4 lg:px-6 h-24 flex items-center justify-between bg-white dark:bg-gray-900 transition-colors duration-200">
      <Link className="flex items-center justify-center" href="/">
        <Image src="/images/auranox-logo.png" alt="Auranox Logo" width={60} height={60} />
        <span className="ml-2 text-3xl font-bold text-gray-900 dark:text-white">Auranox</span>
      </Link>
      <nav className="hidden md:flex space-x-4 items-center">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200 hover:scale-105 transform px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800"
            href={item.href}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center space-x-4">
        {mounted && (
          <Button
            onClick={toggleTheme}
            variant="ghost"
            size="icon"
            className="rounded-md text-gray-700 dark:text-gray-300"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle dark mode</span>
          </Button>
        )}
        <Button className="hidden md:inline-flex">Sign In</Button>
        <Button className="md:hidden" size="icon">
          <MessageSquare className="h-5 w-5" />
        </Button>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col items-center space-y-4 mt-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200 hover:scale-105 transform w-full text-center px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button className="w-full">Sign In</Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
