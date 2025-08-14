"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Send, X, MessageCircle } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Message {
  id: number
  chat_session_id: number
  sender_type: "user" | "ai" | "admin"
  content: string
  created_at: string
}

interface ChatSession {
  id: number
  user_name: string
  user_concern: string
  status: string
  created_at: string
  updated_at: string
}

interface PersistedChatData {
  sessionId: number
  userName: string
  userConcern: string
  messages: Message[]
  isSessionStarted: boolean
  lastMessageId: number | null
  isFirstMessage: boolean
  timestamp: number // To check if data is stale
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
const POLLING_INTERVAL = 3000 // Poll every 3 seconds
const STORAGE_KEY = "chat_widget_data"
const DATA_EXPIRY_HOURS = 24 // Data expires after 24 hours

export function UserChatWidget({ onClose }: { onClose: () => void }) {
  const [sessionId, setSessionId] = useState<number | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [userName, setUserName] = useState("")
  const [userConcern, setUserConcern] = useState("")
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSessionStarted, setIsSessionStarted] = useState(false)
  const [isAITyping, setIsAITyping] = useState(false)
  const [lastMessageId, setLastMessageId] = useState<number | null>(null)
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null)
  const [pendingMessage, setPendingMessage] = useState<string | null>(null)
  const [isFirstMessage, setIsFirstMessage] = useState(true)

  const { toast } = useToast()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const saveChatData = useCallback(() => {
    if (typeof window === "undefined") return

    const chatData: PersistedChatData = {
      sessionId: sessionId!,
      userName,
      userConcern,
      messages,
      isSessionStarted,
      lastMessageId,
      isFirstMessage,
      timestamp: Date.now(),
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chatData))
    } catch (error) {
      console.error("Failed to save chat data:", error)
    }
  }, [sessionId, userName, userConcern, messages, isSessionStarted, lastMessageId, isFirstMessage])

  const loadChatData = useCallback(() => {
    if (typeof window === "undefined") return null

    try {
      const savedData = localStorage.getItem(STORAGE_KEY)
      if (!savedData) return null

      const chatData: PersistedChatData = JSON.parse(savedData)

      // Check if data is expired
      const hoursElapsed = (Date.now() - chatData.timestamp) / (1000 * 60 * 60)
      if (hoursElapsed > DATA_EXPIRY_HOURS) {
        localStorage.removeItem(STORAGE_KEY)
        return null
      }

      return chatData
    } catch (error) {
      console.error("Failed to load chat data:", error)
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
  }, [])

  const clearChatData = useCallback(() => {
    if (typeof window === "undefined") return
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  useEffect(() => {
    const savedData = loadChatData()
    if (savedData) {
      setSessionId(savedData.sessionId)
      setUserName(savedData.userName)
      setUserConcern(savedData.userConcern)
      setMessages(savedData.messages)
      setIsSessionStarted(savedData.isSessionStarted)
      setLastMessageId(savedData.lastMessageId)
      setIsFirstMessage(savedData.isFirstMessage)

      if (savedData.sessionId && savedData.isSessionStarted) {
        validateSession(savedData.sessionId)
      }

      toast({
        title: "Chat Restored",
        description: "Your previous conversation has been restored.",
      })
    }
  }, [loadChatData, toast])

  useEffect(() => {
    // Save data if we have a session ID, or if we have form data to preserve
    if (sessionId || userName.trim() || userConcern.trim()) {
      saveChatData()
    }
  }, [sessionId, userName, userConcern, messages, isSessionStarted, lastMessageId, isFirstMessage, saveChatData])

  const validateSession = async (sessionId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chatbot/chat-sessions/${sessionId}/messages`)
      if (!response.ok) {
        if (response.status === 404) {
          // Session no longer exists, clear saved data
          clearChatData()
          setSessionId(null)
          setIsSessionStarted(false)
          setMessages([])
          setUserName("")
          setUserConcern("")
          toast({
            title: "Session Expired",
            description: "Your previous chat session has expired. Please start a new one.",
            variant: "destructive",
          })
        }
      }
    } catch (error) {
      console.error("Error validating session:", error)
      // Don't clear data on network errors, just log the error
    }
  }

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }, [])

  // Fetch messages function
  const fetchMessages = useCallback(async () => {
    if (!sessionId) return

    try {
      const response = await fetch(`${API_BASE_URL}/chatbot/chat-sessions/${sessionId}/messages`)
      if (!response.ok) {
        if (response.status === 404) {
          clearChatData()
          setSessionId(null)
          setIsSessionStarted(false)
          setMessages([])
          toast({
            title: "Session Expired",
            description: "Your chat session has expired. Please start a new one.",
            variant: "destructive",
          })
          return
        }
        throw new Error("Failed to fetch messages")
      }
      const data: Message[] = await response.json()

      // Sort messages by created_at AND id to ensure proper chronological order
      // First by created_at, then by id as fallback for messages with same timestamp
      const sortedMessages = data.sort((a, b) => {
        const dateA = new Date(a.created_at).getTime()
        const dateB = new Date(b.created_at).getTime()

        // If timestamps are the same, sort by ID
        if (dateA === dateB) {
          return a.id - b.id
        }

        // Sort by timestamp (oldest first)
        return dateA - dateB
      })

      // Use functional update to avoid dependency on messages
      setMessages((prevMessages) => {
        // Check if we have new messages by comparing the entire array length and last message
        const hasNewMessages =
          sortedMessages.length !== prevMessages.length ||
          (sortedMessages.length > 0 &&
            prevMessages.length > 0 &&
            sortedMessages[sortedMessages.length - 1].id !== prevMessages[prevMessages.length - 1].id)

        if (hasNewMessages) {
          // Update last message ID
          if (sortedMessages.length > 0) {
            setLastMessageId(sortedMessages[sortedMessages.length - 1].id)
          }

          // Clear pending message when new message arrives
          setPendingMessage(null)

          // Clear typing indicator and loading state when any new message arrives
          // (whether from AI, admin, or user)
          setIsAITyping(false)
          setIsLoading(false)

          // After first response, subsequent messages go to admin
          setIsFirstMessage(false)

          // Scroll to bottom when new messages arrive
          scrollToBottom()

          return sortedMessages
        }

        return prevMessages
      })
    } catch (error) {
      console.error("Error fetching messages:", error)
      // Only show error toast if this is not a background polling request
      if (isAITyping || isLoading) {
        toast({
          title: "Error",
          description: "Failed to load chat messages.",
          variant: "destructive",
        })
      }
      setIsAITyping(false)
      setIsLoading(false)
    }
  }, [sessionId, lastMessageId, isAITyping, isLoading, toast, scrollToBottom, clearChatData])

  useEffect(() => {
    if (sessionId && isSessionStarted) {
      // Initial fetch
      fetchMessages()

      // Setup polling
      const interval = setInterval(fetchMessages, POLLING_INTERVAL)
      setPollingInterval(interval)

      return () => {
        if (interval) {
          clearInterval(interval)
        }
      }
    }

    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval)
        setPollingInterval(null)
      }
    }
  }, [sessionId, isSessionStarted])

  useEffect(() => {
    if (isAITyping) {
      scrollToBottom()
    }
  }, [isAITyping, scrollToBottom])

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval)
      }
    }
  }, [pollingInterval])

  const handleStartSession = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userName.trim() || !userConcern.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your name and concern.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/chatbot/start-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_name: userName, user_concern: userConcern }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to start chat session")
      }

      const session: ChatSession = await response.json()
      setSessionId(session.id)
      setIsSessionStarted(true)

      toast({
        title: "Session Started",
        description: "Your chat session has begun!",
      })
    } catch (error: any) {
      console.error("Error starting session:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to start chat session.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim() || !sessionId || isLoading) return

    const messageContent = inputMessage.trim()
    setInputMessage("")
    setIsLoading(true)
    setPendingMessage(messageContent)

    // Only set AI typing for the first message
    if (isFirstMessage) {
      setIsAITyping(true)
    }

    try {
      const response = await fetch(`${API_BASE_URL}/chatbot/chat-sessions/${sessionId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender_type: "user",
          content: messageContent,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to send message")
      }

      // Force immediate fetch of messages after sending
      setTimeout(fetchMessages, 500)

      // If this is not the first message, just clear loading after a short delay
      if (!isFirstMessage) {
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
      }
    } catch (error: any) {
      console.error("Error sending message:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to send message.",
        variant: "destructive",
      })

      // Restore the input message on error
      setInputMessage(messageContent)
      setPendingMessage(null)
      setIsAITyping(false)
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(e as any)
    }
  }

  const handleStartNewChat = () => {
    clearChatData()
    setSessionId(null)
    setMessages([])
    setUserName("")
    setUserConcern("")
    setIsSessionStarted(false)
    setLastMessageId(null)
    setIsFirstMessage(true)
    setInputMessage("")
    setPendingMessage(null)
    setIsAITyping(false)
    setIsLoading(false)

    if (pollingInterval) {
      clearInterval(pollingInterval)
      setPollingInterval(null)
    }
  }

  return (
    <Card className="w-full h-[80vh] flex flex-col rounded-xl shadow-lg border border-gray-200 bg-white">
      <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <CardTitle className="text-lg font-semibold text-gray-800">Chat Support</CardTitle>
        <div className="flex items-center gap-2">
          {isSessionStarted && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleStartNewChat}
              className="text-gray-500 hover:text-gray-700 text-xs"
            >
              New Chat
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close chat"
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-grow p-0 overflow-hidden flex flex-col">
        {!isSessionStarted ? (
          <form
            onSubmit={handleStartSession}
            className="space-y-6 flex flex-col justify-center items-center h-full px-6 py-8 bg-gradient-to-br from-gray-50 to-white"
          >
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
              <Button
                type="submit"
                className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3 text-base rounded-lg shadow-md transition-colors duration-200"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                Start Chat
              </Button>
            </div>
          </form>
        ) : (
          <div className="flex-grow flex flex-col bg-gray-50">
            <ScrollArea className="flex-grow p-4">
              <div className="flex flex-col space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${
                      message.sender_type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.sender_type !== "user" && (
                      <Avatar className="h-8 w-8 border border-gray-200">
                        <AvatarFallback className="bg-gray-200 text-gray-600 text-sm">
                          {message.sender_type === "ai" ? "AI" : "AD"}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`flex flex-col max-w-[75%] ${
                        message.sender_type === "user" ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`inline-block p-3 rounded-lg shadow-sm ${
                          message.sender_type === "user"
                            ? "bg-blue-600 text-white rounded-br-none"
                            : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <div
                          className={`text-xs mt-1 flex items-center justify-end gap-1 ${
                            message.sender_type === "user" ? "text-blue-100" : "text-gray-500"
                          }`}
                        >
                          <span>
                            {new Date(message.created_at).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          {message.sender_type === "user" && <span className="text-blue-200">✓</span>}
                        </div>
                      </div>
                    </div>
                    {message.sender_type === "user" && (
                      <Avatar className="h-8 w-8 border border-gray-200">
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
                          {userName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {/* Pending Message - Shows while message is being sent */}
                {pendingMessage && (
                  <div className="flex items-start gap-3 justify-end">
                    <div className="flex flex-col max-w-[75%] items-end">
                      <div className="inline-block p-3 rounded-lg shadow-sm bg-blue-400 text-white rounded-br-none opacity-70">
                        <p className="text-sm whitespace-pre-wrap">{pendingMessage}</p>
                        <div className="text-xs mt-1 flex items-center justify-end gap-1 text-blue-100">
                          <span>Sending...</span>
                          <div className="w-2 h-2 border border-blue-200 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      </div>
                    </div>
                    <Avatar className="h-8 w-8 border border-gray-200">
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
                        {userName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                )}

                {/* AI/Admin Typing Indicator */}
                {isAITyping && (
                  <div className="flex items-start gap-3 justify-start">
                    <Avatar className="h-8 w-8 border border-gray-200">
                      <AvatarFallback className="bg-gray-200 text-gray-600 text-sm">AI</AvatarFallback>
                    </Avatar>
                    <div className="inline-block p-3 rounded-lg shadow-sm bg-white text-gray-800 rounded-bl-none border border-gray-200">
                      <div className="flex items-center space-x-1">
                        <span className="text-sm">AI is processing your request</span>
                        <div className="flex space-x-1">
                          <div
                            className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Waiting for Admin Message */}
                {!isFirstMessage && !isLoading && !isAITyping && (
                  <div className="flex justify-center">
                    <div className="inline-block px-3 py-2 rounded-full bg-gray-100 text-gray-600 text-xs">
                      Please wait for admin response...
                    </div>
                  </div>
                )}

                {/* Scroll anchor */}
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
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              disabled={isLoading}
              autoFocus
            />
            <Button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="bg-blue-600 text-white hover:bg-blue-700 shadow-md transition-colors duration-200 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </CardFooter>
      )}
    </Card>
  )
}
