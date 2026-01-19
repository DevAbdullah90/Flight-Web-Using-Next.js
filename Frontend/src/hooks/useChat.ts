import { useState, useCallback } from 'react';
import { ChatMessage } from '@/lib/types';
import { sendChatQuery } from '@/lib/api';

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'bot',
      text: 'Hello! I am your AI Flight Assistant. Ask me about flights, destinations, or travel tips!',
      timestamp: Date.now(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const responseText = await sendChatQuery(text);
      
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: responseText,
        timestamp: Date.now(),
      };
      
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          text: "Sorry, I'm having trouble connecting to the server right now. Please try again later.",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
  };
}
