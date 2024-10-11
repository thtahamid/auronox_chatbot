"use client"

import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"
import Link from "next/link"
import Image from "next/image"

export default function Header() {
  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/images/auranox-logo.png" alt="Auranox Logo" width={40} height={40} />
          <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">Auranox AI</span>
        </Link>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <Button variant="ghost" asChild>
                <Link href="#about">About</Link>
              </Button>
            </li>
            <li>
              <Button variant="ghost" asChild>
                <Link href="#features">Features</Link>
              </Button>
            </li>
            <li>
              <ModeToggle />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}