'use client'

import React, { useReducer, useEffect, useRef } from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { ScrollArea } from "./ui/scroll-area"
import { MessageSquare, Send, Trash2, Edit2, PanelLeftClose, Plus, ChevronDown, Download, Share2 } from 'lucide-react'
import { useTheme } from 'next-themes'
import ReactMarkdown from 'react-markdown'
import LoadingDialog from './LoadingDialog'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from './ui/dropdown'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

type Message = {
  role: 'user' | 'assistant'
  content: string
}

type Chat = {
  id: string
  title: string
  messages: Message[]
  model: 'gemini-pro' | 'gemini-pro-vision'
}

type State = {
  chats: Chat[];
  currentChat: Chat | null;
  input: string;
  isLoading: boolean;
  error: string | null;
  editingTitle: string | null;
  isSidebarOpen: boolean;
  feedback: { type: 'success' | 'error'; message: string } | null;
};

type Action =
  | { type: 'SET_CHATS'; payload: Chat[] }
  | { type: 'SET_CURRENT_CHAT'; payload: Chat | null }
  | { type: 'SET_INPUT'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_EDITING_TITLE'; payload: string | null }
  | { type: 'SET_SIDEBAR_OPEN'; payload: boolean }
  | { type: 'SET_FEEDBACK'; payload: { type: 'success' | 'error'; message: string } | null };

const initialState: State = {
  chats: [],
  currentChat: null,
  input: '',
  isLoading: false,
  error: null,
  editingTitle: null,
  isSidebarOpen: true,
  feedback: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_CHATS':
      return { ...state, chats: action.payload };
    case 'SET_CURRENT_CHAT':
      return { ...state, currentChat: action.payload };
    case 'SET_INPUT':
      return { ...state, input: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_EDITING_TITLE':
      return { ...state, editingTitle: action.payload };
    case 'SET_SIDEBAR_OPEN':
      return { ...state, isSidebarOpen: action.payload };
    case 'SET_FEEDBACK':
      return { ...state, feedback: action.payload };
    default:
      return state;
  }
}

export default function ChatInterface() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const storedChats = localStorage.getItem('chats')
    if (storedChats) {
      const parsedChats = JSON.parse(storedChats)
      dispatch({ type: 'SET_CHATS', payload: parsedChats })
      if (parsedChats.length > 0) {
        dispatch({ type: 'SET_CURRENT_CHAT', payload: parsedChats[0] })
      } else {
        createNewChat()
      }
    } else {
      createNewChat()
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('chats', JSON.stringify(state.chats))
  }, [state.chats])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [state.currentChat?.messages])

  useEffect(() => {
    const storedSidebarState = localStorage.getItem('sidebarOpen');
    if (storedSidebarState) {
      dispatch({ type: 'SET_SIDEBAR_OPEN', payload: JSON.parse(storedSidebarState) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(state.isSidebarOpen));
  }, [state.isSidebarOpen]);

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      model: 'gemini-pro'
    }
    dispatch({ type: 'SET_CHATS', payload: [newChat, ...state.chats] })
    dispatch({ type: 'SET_CURRENT_CHAT', payload: newChat })
  }

  const deleteChat = (chatId: string) => {
    const updatedChats = state.chats.filter(chat => chat.id !== chatId)
    if (updatedChats.length === 0) {
      const newChat = {
        id: Date.now().toString(),
        title: 'New Chat',
        messages: [],
        model: 'gemini-pro'
      }
      dispatch({ type: 'SET_CURRENT_CHAT', payload: newChat })
      dispatch({ type: 'SET_CHATS', payload: [newChat] })
    } else if (state.currentChat?.id === chatId) {
      dispatch({ type: 'SET_CURRENT_CHAT', payload: updatedChats[0] })
    }
    dispatch({ type: 'SET_CHATS', payload: updatedChats })
  }

  const editChatTitle = (chatId: string, newTitle: string) => {
    const updatedChats = state.chats.map(chat => 
      chat.id === chatId ? { ...chat, title: newTitle } : chat
    )
    dispatch({ type: 'SET_CHATS', payload: updatedChats })
    if (state.currentChat?.id === chatId) {
      dispatch({ type: 'SET_CURRENT_CHAT', payload: { ...state.currentChat, title: newTitle } })
    }
    dispatch({ type: 'SET_EDITING_TITLE', payload: null })
  }

  const validateInput = (input: string): boolean => {
    return input.trim().length > 0;
  };

  const sendMessage = async () => {
    if (!validateInput(state.input) || !state.currentChat) return;

    let userMessage: Message = { role: 'user', content: state.input };
    let updatedChat: Chat = {
      ...state.currentChat,
      messages: [...state.currentChat.messages, userMessage]
    };

    dispatch({ type: 'SET_CURRENT_CHAT', payload: updatedChat })
    dispatch({ type: 'SET_CHATS', payload: state.chats.map(chat => chat.id === updatedChat.id ? updatedChat : chat) })
    dispatch({ type: 'SET_INPUT', payload: '' })
    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'SET_ERROR', payload: null })

    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
      const model = genAI.getGenerativeModel({ model: state.currentChat.model });

      const prompt = `You are an AI assistant. Please respond to the following query: ${state.input}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const aiMessage: Message = { role: 'assistant', content: response.text() };

      updatedChat.messages.push(aiMessage);
      dispatch({ type: 'SET_CURRENT_CHAT', payload: updatedChat })
      dispatch({ type: 'SET_CHATS', payload: state.chats.map(chat => chat.id === updatedChat.id ? updatedChat : chat) })

    } catch (error) {
      console.error('Error generating AI response:', error);
      dispatch({ type: 'SET_ERROR', payload: 'An error occurred while generating the response. Please try again.' })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  };

  const exportChat = () => {
    if (!state.currentChat) return;
    const chatExport = state.currentChat.messages.map(msg => `${msg.role}: ${msg.content}`).join('\n\n');
    const blob = new Blob([chatExport], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${state.currentChat.title}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Add feedback
    dispatch({ type: 'SET_FEEDBACK', payload: { type: 'success', message: 'Chat exported successfully!' } })
  };

  const shareChat = () => {
    if (!state.currentChat) return;
    const chatExport = state.currentChat.messages.map(msg => `${msg.role}: ${msg.content}`).join('\n\n');
    navigator.clipboard.writeText(chatExport).then(() => {
      dispatch({ type: 'SET_FEEDBACK', payload: { type: 'success', message: 'Chat copied to clipboard!' } })
    });
  };

  const changeModel = (model: 'gemini-pro' | 'gemini-pro-vision') => {
    if (!state.currentChat) return;
    const updatedChat = { ...state.currentChat, model };
    dispatch({ type: 'SET_CURRENT_CHAT', payload: updatedChat })
    dispatch({ type: 'SET_CHATS', payload: state.chats.map(chat => chat.id === updatedChat.id ? updatedChat : chat) })
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-200 via-blue-200 to-indigo-200 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      {/* Sidebar */}
      <div className={`${state.isSidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm flex flex-col`}>
        <Button 
          aria-label="Toggle sidebar"
          onClick={() => dispatch({ type: 'SET_SIDEBAR_OPEN', payload: !state.isSidebarOpen })} 
          className="w-10 h-10 mb-4 bg-white/50 hover:bg-white/60 dark:bg-gray-800/50 dark:hover:bg-gray-800/60 text-gray-800 dark:text-white rounded-full"
        >
          {state.isSidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
        </Button>
        {state.isSidebarOpen && (
          <>
            <Button 
              onClick={createNewChat} 
              className="w-full mb-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="mr-2 h-4 w-4" /> New Chat
            </Button>
            <div className="flex-1 overflow-y-auto">
              {state.chats.map(chat => (
                <div key={chat.id} className="mb-2 group relative">
                  <Button
                    variant={state.currentChat?.id === chat.id ? "secondary" : "ghost"}
                    className="w-full justify-start text-sm font-medium"
                    onClick={() => dispatch({ type: 'SET_CURRENT_CHAT', payload: chat })}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span className="truncate">{chat.title}</span>
                  </Button>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => dispatch({ type: 'SET_EDITING_TITLE', payload: chat.id })}
                      className="h-6 w-6 p-0"
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure you want to delete this chat?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the chat and remove its data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteChat(chat.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
            <Dropdown>
              <DropdownTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                  <ChevronDown className="mr-2 h-4 w-4" /> Options
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onSelect={exportChat}>
                  <Download className="mr-2 h-4 w-4" /> Export chat
                </DropdownItem>
                <DropdownItem onSelect={shareChat}>
                  <Share2 className="mr-2 h-4 w-4" /> Share chat
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white/10 dark:bg-gray-900/10 backdrop-blur-sm">
        <ScrollArea className="flex-1 p-4">
          {state.currentChat?.messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
            >
              <div
                className={`inline-block p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                    strong: ({ children }) => <span className="font-bold">{children}</span>,
                    em: ({ children }) => <span className="italic">{children}</span>,
                    code: ({ node, inline, className, children, ...props }) => {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={tomorrow}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}
          {state.isLoading && (
            <div className="flex justify-center items-center h-12">
              <LoadingDialog />
            </div>
          )}
          <div ref={messagesEndRef} />
        </ScrollArea>
        {state.error && (
          <div className="p-2 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-center">
            {state.error}
          </div>
        )}
        <div className="p-4 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
          <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex items-end space-x-2">
            <div className="flex-grow relative">
              <textarea
                aria-label="Chat input"
                value={state.input}
                onChange={(e) => dispatch({ type: 'SET_INPUT', payload: e.target.value })}
                placeholder="Send a message..."
                className="w-full p-3 pr-12 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none overflow-hidden border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                style={{ minHeight: '40px', maxHeight: '200px' }}
                rows={1}
                disabled={state.isLoading}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <Button 
                type="submit"
                disabled={state.isLoading}
                className="absolute right-2 bottom-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors duration-200"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>
      </div>
      {state.feedback && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-lg ${
          state.feedback.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {state.feedback.message}
        </div>
      )}
      <div role="log" aria-live="polite" className="sr-only">
        {state.currentChat?.messages.map((message, index) => (
          <div key={index}>{message.role}: {message.content}</div>
        ))}
      </div>
    </div>
  )
}