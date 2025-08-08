'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Send, X, MessageCircle } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Message {
  id: number;
  chat_session_id: number;
  sender_type: 'user' | 'ai' | 'admin';
  content: string;
  created_at: string;
}

interface ChatSession {
  id: number;
  user_name: string;
  user_concern: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const POLLING_INTERVAL = 3000; // Poll every 3 seconds

export function UserChatWidget({ onClose }: { onClose: () => void }) {
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userName, setUserName] = useState('');
  const [userConcern, setUserConcern] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const [isAITyping, setIsAITyping] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (sessionId) {
      const fetchMessages = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/chatbot/chat-sessions/${sessionId}/messages`);
          if (!response.ok) {
            throw new Error('Failed to fetch messages');
          }
          const data: Message[] = await response.json();
          setMessages(data);
          // If we were waiting for an AI response and it arrived, turn off typing indicator
          if (isAITyping && data.length > 0 && data[data.length - 1].sender_type === 'ai') {
            setIsAITyping(false);
            setIsLoading(false); // Also turn off general loading state
          }
        } catch (error) {
          console.error('Error fetching messages:', error);
          toast({
            title: 'Error',
            description: 'Failed to load chat messages.',
            variant: 'destructive',
          });
          setIsAITyping(false); // Turn off typing indicator on error
          setIsLoading(false); // Turn off general loading state on error
        }
      };
      fetchMessages(); // Initial fetch
      const interval = setInterval(fetchMessages, POLLING_INTERVAL);
      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [sessionId, toast, isAITyping]); // Added isAITyping to dependencies to react to its state changes

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAITyping]); // Scroll when messages or typing indicator changes

  const handleStartSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userConcern.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please enter your name and concern.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/chatbot/start-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_name: userName, user_concern: userConcern }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to start chat session');
      }
      const session: ChatSession = await response.json();
      setSessionId(session.id);
      setIsSessionStarted(true);
      toast({
        title: 'Session Started',
        description: 'Your chat session has begun!',
      });
    } catch (error: any) {
      console.error('Error starting session:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to start chat session.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !sessionId) return;

    const newMessage: Message = {
      id: Date.now(), // Temporary ID for optimistic update
      chat_session_id: sessionId,
      sender_type: 'user',
      content: inputMessage,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage('');
    setIsLoading(true); // Set general loading state
    setIsAITyping(true); // Set AI typing indicator

    try {
      const response = await fetch(`${API_BASE_URL}/chatbot/chat-sessions/${sessionId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sender_type: 'user', content: newMessage.content }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
      }
      // The polling mechanism will eventually fetch the actual message from the server
      // No need to set isLoading/isAITyping to false here, as polling will handle it.
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to send message.',
        variant: 'destructive',
      });
      // Revert optimistic update if sending fails
      setMessages((prev) => prev.filter((msg) => msg.id !== newMessage.id));
      setIsAITyping(false); // Turn off typing indicator on error
      setIsLoading(false); // Turn off general loading state on error
    }
  };

  return (
    <Card className="w-full h-[80vh] flex flex-col rounded-xl shadow-lg border border-gray-200 bg-white">
      <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <CardTitle className="text-lg font-semibold text-gray-800">Chat Support</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close chat" className="text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </Button>
      </CardHeader>

      <CardContent className="flex-grow p-0 overflow-hidden flex flex-col">
        {!isSessionStarted ? (
          <form onSubmit={handleStartSession} className="space-y-6 flex flex-col justify-center items-center h-full px-6 py-8 bg-gradient-to-br from-gray-50 to-white">
            <div className="text-center mb-6">
              <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Chat Support!</h2>
              <p className="text-gray-600">Please tell us a bit about yourself to start the conversation.</p>
            </div>
            <div className="w-full max-w-sm space-y-4">
              <Input
                placeholder="Your Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                disabled={isLoading}
                className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              />
              <Input
                placeholder="Your Concern (e.g., 'Visa application', 'Business setup')"
                value={userConcern}
                onChange={(e) => setUserConcern(e.target.value)}
                required
                disabled={isLoading}
                className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              />
              <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3 text-base rounded-lg shadow-md transition-colors duration-200" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                Start Chat
              </Button>
            </div>
          </form>
        ) : (
          <div className="flex-grow flex flex-col bg-gray-50">
            <ScrollArea className="flex-grow p-4">
              <div className="flex flex-col space-y-4">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex items-start gap-3 ${m.sender_type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {m.sender_type !== 'user' && (
                      <Avatar className="h-8 w-8 border border-gray-200">
                        <AvatarFallback className="bg-gray-200 text-gray-600 text-sm">
                          {m.sender_type === 'ai' ? 'AI' : 'AD'}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`flex flex-col max-w-[75%] ${m.sender_type === 'user' ? 'items-end' : 'items-start'}`}>
                      <div
                        className={`inline-block p-3 rounded-lg shadow-sm ${
                          m.sender_type === 'user'
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                        }`}
                      >
                        <p className="text-sm">{m.content}</p>
                        <div className={`text-xs mt-1 ${m.sender_type === 'user' ? 'text-blue-100' : 'text-gray-500'} text-right`}>
                          {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                    {m.sender_type === 'user' && (
                      <Avatar className="h-8 w-8 border border-gray-200">
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
                          {userName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isAITyping && (
                  <div className="flex items-start gap-3 justify-start">
                    <Avatar className="h-8 w-8 border border-gray-200">
                      <AvatarFallback className="bg-gray-200 text-gray-600 text-sm">AI</AvatarFallback>
                    </Avatar>
                    <div className="inline-block p-3 rounded-lg shadow-sm bg-white text-gray-800 rounded-bl-none border border-gray-200">
                      <div className="flex items-center space-x-1">
                        <span className="text-sm">AI is typing</span>
                        <span className="animate-pulse text-sm">...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </div>
        )}
      </CardContent>

      {isSessionStarted && (
        <CardFooter className="p-4 border-t border-gray-200 bg-gray-50">
          <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              disabled={isLoading}
            />
            <Button type="submit" disabled={!inputMessage.trim() || isLoading} className="bg-blue-600 text-white hover:bg-blue-700 shadow-md transition-colors duration-200">
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </CardFooter>
      )}
    </Card>
  );
}

