import React from 'react';
import ChatInterface from '@/components/ChatInterface';
import Header from '@/components/header';

export default function ChatPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1">
        <ChatInterface />
      </div>
    </div>
  );
}
