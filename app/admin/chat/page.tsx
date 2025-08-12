'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Send } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'; // Import Sidebar components
import { AppSidebar } from '@/components/app-sidebar'; // Import AppSidebar

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
  status: 'open' | 'closed' | 'pending_review';
  created_at: string;
  updated_at: string;
}

const ADMIN_CHAT_API_ROUTE = '/api/admin/chatbot';
const POLLING_INTERVAL = 3000; // Poll every 3 seconds

export default function AdminChatDashboard() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchSessions = async () => {
    try {
      const response = await fetch(`${ADMIN_CHAT_API_ROUTE}?action=getSessions`);
      if (!response.ok) {
        throw new Error('Failed to fetch sessions');
      }
      const data: ChatSession[] = await response.json();
      setSessions(data);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load chat sessions.',
        variant: 'destructive',
      });
    }
  };

  const fetchMessages = async (sessionId: number) => {
    try {
      const response = await fetch(`${ADMIN_CHAT_API_ROUTE}?action=getMessages&sessionId=${sessionId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      const data: Message[] = await response.json();
      
      // Debug: Log the raw data to see the timestamps
      console.log('Raw messages from API:', data.map(m => ({ id: m.id, created_at: m.created_at, content: m.content.substring(0, 50) })));
      
      // Sort messages by created_at to ensure chronological order (oldest first)
      const sortedMessages = data.sort((a, b) => {
        const timeA = new Date(a.created_at).getTime();
        const timeB = new Date(b.created_at).getTime();
        console.log(`Comparing: ${a.created_at} (${timeA}) vs ${b.created_at} (${timeB})`);
        return timeA - timeB;
      });
      
      console.log('Sorted messages:', sortedMessages.map(m => ({ id: m.id, created_at: m.created_at, content: m.content.substring(0, 50) })));
      
      setMessages(sortedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: 'Error',
        description: 'Failed to load chat messages for selected session.',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchSessions(); // Initial fetch of sessions

    let interval: NodeJS.Timeout;
    if (selectedSessionId) {
      fetchMessages(selectedSessionId); // Initial fetch for selected session
      interval = setInterval(() => fetchMessages(selectedSessionId), POLLING_INTERVAL);
    } else {
      // Poll sessions list even if no session is selected
      interval = setInterval(fetchSessions, POLLING_INTERVAL);
    }

    return () => clearInterval(interval); // Cleanup on unmount
  }, [selectedSessionId, toast]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSelectSession = (sessionId: number) => {
    setSelectedSessionId(sessionId);
    setMessages([]); // Clear messages when switching sessions
    setInputMessage('');
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !selectedSessionId) return;

    const newMessage: Message = {
      id: Date.now(), // Temporary ID for optimistic update
      chat_session_id: selectedSessionId,
      sender_type: 'admin',
      content: inputMessage,
      created_at: new Date().toISOString(),
    };

    // Add new message to the end (bottom) of the messages array
    setMessages((prev) => [...prev, newMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(`${ADMIN_CHAT_API_ROUTE}?action=addMessage&sessionId=${selectedSessionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sender_type: 'admin', content: newMessage.content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
      }
      // The polling mechanism will eventually fetch the actual message from the server
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to send message.',
        variant: 'destructive',
      });
      setMessages((prev) => prev.filter((msg) => msg.id !== newMessage.id)); // Revert optimistic update
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (status: ChatSession['status']) => {
    if (!selectedSessionId) return;
    setIsLoading(true);
    try {
      const response = await fetch(`${ADMIN_CHAT_API_ROUTE}?action=updateStatus&sessionId=${selectedSessionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update status');
      }

      toast({
        title: 'Status Updated',
        description: `Session status changed to ${status}.`,
      });
      fetchSessions(); // Refresh sessions list to show updated status
    } catch (error: any) {
      console.error('Error updating status:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update session status.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedSession = sessions.find(s => s.id === selectedSessionId);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-1 bg-gray-100 ml-64"> {/* Removed h-screen, let flex-1 manage height */}
          {/* Session List Sidebar - now a panel within the main content */}
          <Card className="w-1/4 flex flex-col border-r rounded-none shadow-none">
            <CardHeader>
              <CardTitle className="text-xl">Chat Sessions</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow p-0 overflow-hidden">
              <ScrollArea className="h-full">
                {sessions.length === 0 && (
                  <p className="p-4 text-center text-gray-500">No active sessions.</p>
                )}
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                      selectedSessionId === session.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    }`}
                    onClick={() => handleSelectSession(session.id)}
                  >
                    <p className="font-semibold">{session.user_name}</p>
                    <p className="text-sm text-gray-600 truncate">{session.user_concern}</p>
                    <p className={`text-xs mt-1 ${
                      session.status === 'open' ? 'text-green-600' :
                      session.status === 'closed' ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      Status: {session.status.replace(/_/g, ' ')}
                    </p>
                    <p className="text-xs text-gray-500">Last update: {new Date(session.updated_at).toLocaleString()}</p>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Area - fills the rest of the space */}
          <Card className="flex-1 flex flex-col rounded-none shadow-none">
            <CardHeader className="pb-2">
              {selectedSession ? (
                <>
                  <CardTitle className="text-xl">
                    Chat with {selectedSession.user_name}
                    <span className={`ml-2 text-sm font-normal ${
                      selectedSession.status === 'open' ? 'text-green-600' :
                      selectedSession.status === 'closed' ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      ({selectedSession.status.replace(/_/g, ' ')})
                    </span>
                  </CardTitle>
                  <p className="text-sm text-gray-600">Concern: {selectedSession.user_concern}</p>
                  <div className="flex space-x-2 mt-2">
                    <Select onValueChange={(value: ChatSession['status']) => handleUpdateStatus(value)} value={selectedSession.status}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Update Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="pending_review">Pending Review</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" onClick={() => setSelectedSessionId(null)}>Close Session View</Button>
                  </div>
                </>
              ) : (
                <CardTitle className="text-xl text-gray-500">Select a chat session to view messages</CardTitle>
              )}
            </CardHeader>
            <Separator />
            <CardContent className="flex-grow p-4 overflow-hidden">
              {selectedSessionId ? (
                <ScrollArea className="h-full pr-4">
                  {messages.length === 0 && (
                    <p className="text-center text-gray-500">No messages in this session yet.</p>
                  )}
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`mb-4 flex ${m.sender_type === 'admin' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex flex-col max-w-[80%] ${m.sender_type === 'admin' ? 'items-end' : 'items-start'}`}>
                        {m.sender_type !== 'admin' && (
                          <span className="text-sm font-semibold capitalize mb-1">
                            {m.sender_type}:
                          </span>
                        )}
                        <div
                          className={`inline-block p-3 rounded-xl ${
                            m.sender_type === 'admin'
                              ? 'bg-purple-600 text-white'
                              : m.sender_type === 'user'
                              ? 'bg-blue-50 text-blue-800'
                              : 'bg-emerald-50 text-emerald-800'
                          }`}
                        >
                          {m.sender_type === 'admin' && (
                            <span className="font-semibold capitalize mr-1">
                              {m.sender_type}:{' '}
                            </span>
                          )}
                          {m.content}
                          <div className="text-xs text-right mt-1 opacity-75">
                            {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </ScrollArea>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p>Please select a session from the left panel.</p>
                </div>
              )}
            </CardContent>
            {selectedSessionId && (
              <CardFooter className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message as admin..."
                    className="flex-grow"
                    disabled={isLoading}
                  />
                  <Button type="submit" disabled={!inputMessage.trim() || isLoading}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </form>
              </CardFooter>
            )}
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}