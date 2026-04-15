import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Shield, Info, Loader2, User, Sparkles, WifiOff, Wifi } from 'lucide-react';
import { useAssistant } from '../services/geminiService';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string; // Store as string for easy local storage serialization
}

export function Assistant() {
  const isOnline = useOnlineStatus();
  const { askAssistant, loading, error } = useAssistant();
  const [messages, setMessages] = useLocalStorage<Message[]>('mauntra_chat_history', [
    {
      id: '1',
      role: 'assistant',
      content: "Hello, I'm MAUNTRA Assistant. I'm here to offer supportive guidance and help you find the resources you need. How can I help you today?",
      timestamp: new Date().toISOString(),
    }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');

    const response = await askAssistant(currentInput, isOnline);
    
    if (response) {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      {/* Chat Header */}
      <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
            <img src="/logo.png" alt="Mauntra Haven Logo" className="w-8 h-8 object-contain" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">MAUNTRA Assistant</h3>
            <div className="flex items-center gap-1.5">
              <div className={cn(
                "w-1.5 h-1.5 rounded-full",
                isOnline ? "bg-emerald-500 animate-pulse" : "bg-slate-300"
              )} />
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                {isOnline ? "Secure & Private" : "Offline Mode"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isOnline && (
            <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-600 rounded-full border border-amber-100">
              <WifiOff className="w-3 h-3" />
              <span className="text-[9px] font-bold uppercase tracking-tight">Offline</span>
            </div>
          )}
          <button className="p-2 text-slate-400 hover:text-primary transition-colors">
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex w-full",
                msg.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div className={cn(
                "max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                msg.role === 'user' 
                  ? "bg-primary text-white rounded-tr-none" 
                  : "bg-white text-slate-700 border border-slate-100 rounded-tl-none"
              )}>
                {msg.content}
                <div className={cn(
                  "text-[10px] mt-2 font-medium opacity-60",
                  msg.role === 'user' ? "text-primary-light" : "text-slate-400"
                )}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm">
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
            </div>
          </motion.div>
        )}

        {error && (
          <div className="p-3 bg-rose-50 text-rose-600 text-xs rounded-xl text-center border border-rose-100">
            {error}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="bg-primary text-white p-3 rounded-2xl shadow-lg shadow-primary/20 disabled:opacity-50 disabled:shadow-none transition-all active:scale-95"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-[10px] text-slate-400 text-center mt-3 font-medium">
          I am an AI assistant. For emergencies, please call 911.
        </p>
      </div>
    </div>
  );
}
