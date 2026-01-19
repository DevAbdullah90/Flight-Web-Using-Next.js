'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, ArrowUp, Sparkles, Zap, Plane } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useChat } from '@/hooks/useChat';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, isLoading, sendMessage } = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    await sendMessage(inputValue);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="mb-4 w-[380px] sm:w-[420px] h-[650px] max-h-[85vh] flex flex-col pointer-events-auto shadow-2xl shadow-flight-primary/20 rounded-3xl overflow-hidden border border-white/40 bg-white/70 backdrop-blur-3xl"
          >
            {/* Ambient Background Mesh */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
              <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full bg-flight-primary blur-[80px]" />
              <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-300 blur-[60px]" />
            </div>

            {/* Seamless Header */}
            <div className="relative z-10 px-6 pt-6 pb-4 flex items-center justify-between border-b border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-flight-primary/10 flex items-center justify-center text-flight-primary border border-flight-primary/20">
                  <Plane className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold tracking-wider text-flight-primary uppercase">AI Concierge</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 tracking-tight leading-none">Trip Assistant</h3>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-slate-500 hover:text-slate-800"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="relative z-10 flex-1 overflow-y-auto px-6 py-4 space-y-6 scroll-smooth scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">

              {/* Contextual Date Divider */}
              <div className="flex justify-center">
                <span className="text-[10px] font-bold text-slate-400 bg-white/50 border border-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                  Today
                </span>
              </div>

              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={cn(
                    "flex w-full",
                    msg.role === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  <div className={cn("flex max-w-[85%] flex-col", msg.role === 'user' ? "items-end" : "items-start")}>

                    <div
                      className={cn(
                        "px-5 py-3.5 text-[15px] leading-relaxed shadow-sm backdrop-blur-md",
                        msg.role === 'user'
                          ? "bg-flight-primary text-white rounded-[20px] rounded-tr-md shadow-lg shadow-flight-primary/20"
                          : "bg-white/80 text-slate-700 border border-white/60 rounded-[20px] rounded-tl-md shadow-sm"
                      )}
                    >
                      {msg.text}
                    </div>
                    {msg.role === 'bot' && (
                      <span className="text-[10px] font-semibold text-slate-400 mt-1 ml-2 opacity-0 animate-fade-in group-hover:opacity-100 transition-opacity">
                        AI Assistant
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start w-full"
                >
                  <div className="bg-white/60 backdrop-blur-md px-4 py-3 rounded-[20px] rounded-tl-sm flex items-center gap-2 shadow-sm border border-white/40">
                    <Sparkles size={14} className="text-flight-primary animate-pulse" />
                    <span className="text-xs text-slate-500 font-medium">Processing...</span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Floating Input Area */}
            <div className="relative z-10 p-5 bg-gradient-to-t from-white/90 to-transparent">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-flight-primary to-blue-400 rounded-[28px] opacity-20 group-focus-within:opacity-40 transition duration-500 blur"></div>
                <div className="relative flex items-center bg-white rounded-[24px] shadow-sm border border-slate-100 pr-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about flights..."
                    className="flex-1 bg-transparent border-none outline-none text-[15px] px-5 py-4 text-slate-800 placeholder:text-slate-400"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className="w-10 h-10 flex items-center justify-center bg-flight-primary hover:bg-flight-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full transition-all shadow-md active:scale-95"
                  >
                    <ArrowUp size={18} strokeWidth={2.5} />
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="pointer-events-auto relative group"
      >
        <div className="absolute inset-0 bg-flight-primary rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
        <div className="relative w-14 h-14 bg-flight-primary text-white rounded-full shadow-xl shadow-flight-primary/30 flex items-center justify-center transition-colors border-2 border-white/20">
          <AnimatePresence mode='wait'>
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageSquare size={24} fill="currentColor" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    </div>
  );
}

