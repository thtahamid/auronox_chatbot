'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { ScrollArea } from "./ui/scroll-area"
import { MessageSquare, Plus, Send, Trash2, Edit2, PanelLeftClose, FileText, Pill, UserRound, Youtube } from 'lucide-react'
import { useTheme } from 'next-themes'
import ReactMarkdown from 'react-markdown';
import LoadingDialog from './LoadingDialog';

type Message = {
  role: 'user' | 'assistant'
  content: string
}

type Chat = {
  id: string
  title: string
  messages: Message[]
}

type ChatMode = 'general' | 'medical-report' | 'drug-details' | 'expert-advice'

type YouTubeVideo = {
  title: string;
  url: string;
  thumbnailUrl: string;
}

const ALLOWED_TOPICS = [
  // Physical Health
  'physical health', 'fitness', 'exercise', 'nutrition', 'diet', 'sleep', 'chronic illness', 'pain management',
  'preventive care', 'immune system', 'cardiovascular health', 'respiratory health', 'digestive health',
  'skin care', 'dental health', 'vision care', 'hearing health',

  // Mental Health
  'mental health', 'psychology', 'psychiatry', 'therapy', 'counseling', 'stress management', 'anxiety',
  'depression', 'bipolar disorder', 'schizophrenia', 'eating disorders', 'addiction', 'PTSD',
  'OCD', 'ADHD', 'autism', 'personality disorders',

  // Emotional Well-being
  'emotional intelligence', 'mindfulness', 'meditation', 'relaxation techniques', 'self-care',
  'work-life balance', 'resilience', 'coping strategies', 'positive psychology',

  // Cognitive Health
  'brain health', 'memory', 'concentration', 'cognitive function', 'neuroplasticity', 'learning',
  'problem-solving', 'creativity',

  // Social Health
  'relationships', 'communication skills', 'social support', 'community involvement', 'family dynamics',
  'conflict resolution', 'empathy', 'social anxiety',

  // Lifestyle
  'healthy habits', 'wellness', 'holistic health', 'alternative medicine', 'complementary therapies',
  'yoga', 'acupuncture', 'massage therapy', 'aromatherapy',

  // Medical Topics
  'diseases', 'conditions', 'symptoms', 'diagnosis', 'treatment', 'medications', 'side effects',
  'medical procedures', 'first aid', 'emergency care',

  // Public Health
  'epidemiology', 'health policy', 'health education', 'environmental health', 'occupational health',
  'global health', 'health disparities', 'health equity',

  // Personal Development
  'self-improvement', 'goal setting', 'time management', 'productivity', 'personal growth',
  'motivation', 'habit formation', 'life coaching',

  // Specialized Areas
  'sports medicine', 'geriatric care', 'pediatric health', "women's health", "men's health",
  'LGBTQ+ health', 'reproductive health', 'sexual health',

  // Emerging Fields
  'telemedicine', 'digital health', 'wearable technology', 'personalized medicine', 'genomics',
  'biohacking', 'longevity research'
];

export default function ChatInterface() {
  const [chats, setChats] = useState<Chat[]>([])
  const [currentChat, setCurrentChat] = useState<Chat | null>(null)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [chatMode, setChatMode] = useState<ChatMode>('general')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const [suggestions, setSuggestions] = useState<YouTubeVideo[]>([])
  const [showYouTubeSuggestions, setShowYouTubeSuggestions] = useState(true);

  useEffect(() => {
    const storedChats = localStorage.getItem('chats')
    if (storedChats) {
      const parsedChats = JSON.parse(storedChats)
      setChats(parsedChats)
      if (parsedChats.length > 0) {
        setCurrentChat(parsedChats[0])
      } else {
        createNewChat() // Call this function to create a new chat if there are no stored chats
      }
    } else {
      createNewChat() // Call this function to create a new chat if there are no stored chats
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('chats', JSON.stringify(chats))
  }, [chats])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [currentChat?.messages])

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: []
    }
    setChats([newChat, ...chats])
    setCurrentChat(newChat)
    setChatMode('general')
  }

  const deleteChat = (chatId: string) => {
    setChats(chats.filter(chat => chat.id !== chatId))
    if (currentChat?.id === chatId) {
      setCurrentChat(chats.length > 1 ? chats[0] : null)
    }
  }

  const editChatTitle = (chatId: string, newTitle: string) => {
    setChats(chats.map(chat => 
      chat.id === chatId ? { ...chat, title: newTitle } : chat
    ))
    if (currentChat?.id === chatId) {
      setCurrentChat({ ...currentChat, title: newTitle })
    }
    setEditingTitle(null)
  }

  const isRelevantTopic = (input: string): boolean => {
    return ALLOWED_TOPICS.some(topic => 
      input.toLowerCase().includes(topic) || 
      topic.split(' ').every(word => input.toLowerCase().includes(word))
    );
  };

  const generatePrompt = (input: string, mode: ChatMode): string => {
    let basePrompt = `You are Auranox AI, an AI assistant specialized in human health, well-being, and personal development. Respond in a friendly, empathetic, and informative manner. Structure your responses as follows:

1. Begin with a brief acknowledgment of the user's query or concern.
2. Provide a structured response using the following format:

   I. [Main Category 1]
      A. [Subcategory or point 1]
      B. [Subcategory or point 2]
      C. [Subcategory or point 3]

   II. [Main Category 2]
      A. [Subcategory or point 1]
      B. [Subcategory or point 2]
      C. [Subcategory or point 3]

   (Continue with additional categories as needed)

3. End with a follow-up question to encourage further discussion.

Use markdown formatting for headers and bullet points. Maintain a compassionate and supportive tone throughout your response. If the query is not directly related to human health, well-being, or personal development, find a relevant connection or provide general health advice.

Here's an example of the desired response format:

User: I am not feeling very well, what should I do?

AI: I'm sorry to hear that you're not feeling well. Let's explore some steps you can take to address your discomfort and improve your well-being.

I. Assess Your Physical Health
   A. Check for symptoms: Monitor your temperature, any pain, or unusual sensations.
   B. Rest and recover: Allow your body time to heal by getting adequate sleep.
   C. Stay hydrated: Drink plenty of water throughout the day.
   D. Eat nutritious foods: Focus on balanced meals to support your immune system.

II. Support Your Mental Well-being
    A. Practice stress-reduction techniques: Try deep breathing or meditation.
    B. Engage in gentle exercise: Consider a short walk or light stretching.
    C. Connect with loved ones: Share your feelings with trusted friends or family.
    D. Limit screen time: Reduce exposure to potentially stressful news or social media.

III. Seek Professional Help if Needed
     A. Consult your doctor: If symptoms persist or worsen, schedule an appointment.
     B. Consider telehealth options: Many providers offer remote consultations.
     C. Don't ignore mental health: Reach out to a therapist if you're feeling overwhelmed.

Is there a specific aspect of your discomfort that you'd like to discuss further? Understanding more about your symptoms or concerns can help me provide more targeted advice.

Now, respond to the following user query: ${input}`;

    switch (mode) {
      case 'general':
        basePrompt += "\nProvide helpful information and advice related to physical health, mental health, emotional well-being, and personal growth.";
        break;
      case 'medical-report':
        basePrompt += "\nAnalyze the following medical report and provide insights related to the patient's health and well-being. Structure your analysis into relevant health categories.";
        break;
      case 'drug-details':
        basePrompt += "\nProvide information about the following medication, including its uses, potential side effects, and any relevant health considerations. Organize the information into clear categories.";
        break;
      case 'expert-advice':
        basePrompt += "\nAs a health and wellness expert, provide detailed advice on the following topic. Structure your response with clear categories and actionable suggestions.";
        break;
    }

    return basePrompt;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    let userMessage: Message;
    userMessage = { role: 'user', content: input };

    let updatedChat: Chat;
    if (currentChat) {
      updatedChat = {
        ...currentChat,
        messages: [...currentChat.messages, userMessage]
      };
    } else {
      updatedChat = {
        id: Date.now().toString(),
        title: 'New Chat',
        messages: [userMessage]
      };
    }

    setCurrentChat(updatedChat);
    setChats(prevChats => [updatedChat, ...prevChats.filter(chat => chat.id !== updatedChat.id)]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = generatePrompt(input, chatMode);

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const aiMessage: Message = { role: 'assistant', content: response.text() };

      updatedChat.messages.push(aiMessage);
      setCurrentChat(updatedChat);

      setChats(prevChats => prevChats.map(chat => chat.id === updatedChat.id ? updatedChat : chat));

      // Fetch YouTube video suggestions only for the first prompt in general mode
      if (showYouTubeSuggestions && chatMode === 'general') {
        const videoSuggestions = await fetchYouTubeVideos(input);
        setSuggestions(videoSuggestions);
        setShowYouTubeSuggestions(false);
      }

    } catch (error) {
      console.error('Error generating AI response:', error);
      setError('An error occurred while generating the response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchYouTubeVideos = async (query: string) => {
    try {
      const response = await fetch(`/api/youtube-search?query=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch YouTube videos');
      }
      const videos = await response.json();
      return videos;
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
      return [];
    }
  }

  return (
    <div className="flex h-[calc(100vh-6rem)] bg-gradient-to-br from-purple-200 via-blue-200 to-indigo-200 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm p-4 overflow-hidden`}>
        <Button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          className="w-10 h-10 mb-4 bg-white/50 hover:bg-white/60 dark:bg-gray-800/50 dark:hover:bg-gray-800/60 text-gray-800 dark:text-white rounded-full"
        >
          {isSidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
        </Button>
        {isSidebarOpen && (
          <>
            <Button 
              onClick={createNewChat} 
              className="w-full mb-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="mr-2 h-4 w-4" /> New Chat
            </Button>
            <div className="space-y-2 mb-4">
              {['general', 'medical-report', 'drug-details', 'expert-advice'].map((mode) => (
                <Button 
                  key={mode}
                  onClick={() => setChatMode(mode as ChatMode)} 
                  className={`w-full justify-start bg-white/50 hover:bg-white/60 dark:bg-gray-800/50 dark:hover:bg-gray-800/60 text-gray-800 dark:text-white transition-all duration-300 transform hover:scale-105 ${chatMode === mode ? 'bg-blue-100 dark:bg-blue-900' : ''}`}
                >
                  {mode === 'general' && <MessageSquare className="mr-2 h-4 w-4" />}
                  {mode === 'medical-report' && <FileText className="mr-2 h-4 w-4" />}
                  {mode === 'drug-details' && <Pill className="mr-2 h-4 w-4" />}
                  {mode === 'expert-advice' && <UserRound className="mr-2 h-4 w-4" />}
                  {mode.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </Button>
              ))}
            </div>
            <div className="h-[calc(100vh-16rem)] overflow-y-auto pr-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <div className="space-y-2">
                {chats.map(chat => (
                  <div key={chat.id} className="flex items-center mb-2">
                    {editingTitle === chat.id ? (
                      <Input
                        value={chat.title}
                        onChange={(e) => editChatTitle(chat.id, e.target.value)}
                        onBlur={() => setEditingTitle(null)}
                        onKeyPress={(e) => e.key === 'Enter' && setEditingTitle(null)}
                        className="flex-grow mr-2 bg-white/50 dark:bg-gray-800/50"
                      />
                    ) : (
                      <Button
                        variant="ghost"
                        className={`w-full justify-start text-gray-800 dark:text-white bg-white/30 hover:bg-white/40 dark:bg-gray-800/30 dark:hover:bg-gray-800/40 transition-all duration-300 transform hover:scale-105 ${currentChat?.id === chat.id ? 'bg-blue-100 dark:bg-blue-900' : ''}`}
                        onClick={() => setCurrentChat(chat)}
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        {chat.title}
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingTitle(chat.id)}
                      className="ml-2 text-gray-800 dark:text-white bg-white/30 hover:bg-white/40 dark:bg-gray-800/30 dark:hover:bg-gray-800/40 transition-all duration-300 transform hover:scale-105"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteChat(chat.id)}
                      className="ml-2 text-gray-800 dark:text-white bg-white/30 hover:bg-white/40 dark:bg-gray-800/30 dark:hover:bg-gray-800/40 transition-all duration-300 transform hover:scale-105"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white/10 dark:bg-gray-900/10 backdrop-blur-sm">
        <ScrollArea className="flex-1 p-4">
          {currentChat?.messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.role === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                {message.role === 'user' ? (
                  message.content
                ) : (
                  <ReactMarkdown
                    components={{
                      strong: ({ node, ...props }) => <span className="font-bold" {...props} />,
                      em: ({ node, ...props }) => <span className="italic" {...props} />,
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="mb-4">
              <LoadingDialog />
            </div>
          )}
          {suggestions.length > 0 && showYouTubeSuggestions && chatMode === 'general' && (
            <div className="mt-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Suggested Videos:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {suggestions.map((video, index) => (
                  <a
                    key={index}
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center bg-white/70 dark:bg-gray-700/70 rounded-lg p-2 hover:shadow-md transition-shadow"
                  >
                    <Image
                      src={video.thumbnailUrl}
                      alt={video.title}
                      width={120}
                      height={90}
                      className="w-full h-auto mb-2 rounded"
                    />
                    <p className="text-sm text-center text-gray-800 dark:text-gray-200">{video.title}</p>
                  </a>
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </ScrollArea>
        {error && (
          <div className="p-2 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-center">
            {error}
          </div>
        )}
        <div className="p-4 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm">
          <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Type your ${chatMode === 'general' ? 'message' : chatMode.replace('-', ' ')}...`}
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              disabled={isLoading}
            />
            <Button 
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? 'Sending...' : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}