"use client"

import { useState, useRef, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent } from './ui/card'
import { ScrollArea } from './ui/scroll-area'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY as string);

type Message = {
  role: 'user' | 'bot'
  content: string
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro"});
      const result = await model.generateContent(input);
      const response = await result.response;
      const text = response.text();

      const botMessage: Message = { role: 'bot', content: text }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error('Error generating response:', error)
      const errorMessage: Message = { role: 'bot', content: 'Sorry, I encountered an error. Please try again.' }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <ScrollArea className="h-[400px] pr-4" ref={scrollAreaRef}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.role === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <span
                className={`inline-block p-2 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {message.content}
              </span>
            </div>
          ))}
        </ScrollArea>
        <form onSubmit={handleSubmit} className="mt-4 flex">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow mr-2"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}