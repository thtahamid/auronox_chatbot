import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from "@/components/ui/button"
import { MessageCircle, ThumbsUp, Eye, Clock } from 'lucide-react';

const forumTopics = [
  {
    id: 1,
    title: "Coping with Anxiety During Pandemic",
    author: "AnxietyWarrior",
    replies: 24,
    views: 1200,
    likes: 56,
    lastActivity: "2 hours ago"
  },
  {
    id: 2,
    title: "Meditation Techniques for Beginners",
    author: "ZenMaster101",
    replies: 18,
    views: 890,
    likes: 42,
    lastActivity: "5 hours ago"
  },
  {
    id: 3,
    title: "Balancing Work and Mental Health",
    author: "WorkLifeBalance",
    replies: 31,
    views: 1500,
    likes: 78,
    lastActivity: "1 day ago"
  },
  {
    id: 4,
    title: "Dealing with Imposter Syndrome",
    author: "ConfidentDev",
    replies: 15,
    views: 720,
    likes: 35,
    lastActivity: "3 days ago"
  },
  {
    id: 5,
    title: "The Benefits of Journaling for Mental Health",
    author: "JournalEnthusiast",
    replies: 22,
    views: 980,
    likes: 51,
    lastActivity: "1 week ago"
  }
];

export default function CommunityForumPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-200 via-blue-200 to-indigo-200 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-900 dark:text-white">Sample Community Forum</h1>
        <p className="text-xl text-center mb-12 text-gray-700 dark:text-gray-300">
          Join our supportive community to discuss mental health, share experiences, and learn from others.
        </p>
        
        <div className="bg-white/30 dark:bg-gray-800/30 rounded-lg p-6 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Discussions</h2>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Start New Topic
            </Button>
          </div>
          
          <div className="space-y-4">
            {forumTopics.map((topic) => (
              <div key={topic.id} className="bg-white/50 dark:bg-gray-700/50 p-4 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">{topic.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Posted by: {topic.author}</p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                  <span className="flex items-center"><MessageCircle className="h-4 w-4 mr-1" /> {topic.replies} replies</span>
                  <span className="flex items-center"><Eye className="h-4 w-4 mr-1" /> {topic.views} views</span>
                  <span className="flex items-center"><ThumbsUp className="h-4 w-4 mr-1" /> {topic.likes} likes</span>
                  <span className="flex items-center"><Clock className="h-4 w-4 mr-1" /> {topic.lastActivity}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Load More Topics
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
