'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, MessageSquare, Sparkles, Loader2 } from 'lucide-react';

interface ChatWindowProps {
  onClose: () => void;
}

export default function ChatWindow({ onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial welcome message
  useEffect(() => {
    setTimeout(() => {
      setMessages([{ sender: 'bot', text: 'Hi there! How can I help you today?' }]);
    }, 500);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus the input field when the component loads
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
  
    const userMessage = { sender: 'user' as const, text: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
  
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input.trim() }),
      });
  
      const data = await res.json();
  
      // Artificial delay for typing effect
      setTimeout(() => {
        if (data.reply) {
          setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
        } else {
          setMessages(prev => [...prev, { sender: 'bot', text: 'Sorry, I did not understand.' }]);
        }
        setIsTyping(false);
      }, 700);
    } catch {
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Error contacting AI server.' }]);
        setIsTyping(false);
      }, 700);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-20 right-6 w-80 h-96 bg-white dark:bg-gray-900 shadow-xl rounded-2xl overflow-hidden flex flex-col z-50 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-2xl">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Sparkles className="text-white animate-pulse" size={20} />
          <h2 className="font-bold text-lg text-white">AI Assistant</h2>
        </div>
        <button 
          onClick={onClose} 
          className="text-white hover:text-gray-200 transition-colors duration-200 rounded-full hover:bg-white/10 p-1"
          aria-label="Close chat"
        >
          <X size={20} />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'bot' && (
              <MessageSquare size={16} className="text-indigo-500 mr-1 mt-1 flex-shrink-0" />
            )}
            <div 
              className={`max-w-[75%] p-3 rounded-2xl text-sm shadow-sm animate-fade-in ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-tr-none transform hover:scale-102 transition-transform duration-200'
                  : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-tl-none border border-gray-200 dark:border-gray-700'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl text-sm rounded-tl-none border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full rounded-full py-2 px-4 pr-10 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all duration-200"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className={`absolute right-2 p-1.5 rounded-full ${
              input.trim() 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                : 'bg-gray-300 text-gray-500 dark:bg-gray-700'
            } transition-colors duration-200`}
            aria-label="Send message"
          >
            {isTyping ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>
      </div>

      {/* Add global styles */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        
        .transform:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
}