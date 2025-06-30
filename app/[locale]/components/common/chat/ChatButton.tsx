'use client';

import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import ChatWindow from './ChatWindow';

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        <MessageSquare size={28} />
      </button>

      {isOpen && <ChatWindow onClose={toggleChat} />}
    </>
  );
}
