import React from 'react';
import Image from 'next/image';

const LoadingDialog: React.FC = () => {
  return (
    <div className="flex items-center space-x-3 bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg shadow-md backdrop-blur-sm">
      <Image
        src="/images/auranox-logo.png"
        alt="Auranox Logo"
        width={40}
        height={40}
        className="animate-pulse"
      />
      <div className="flex flex-col">
        <span className="font-bold text-gray-800 dark:text-white">Auranox is thinking...</span>
        <div className="flex space-x-1 mt-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingDialog;
