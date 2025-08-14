"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Send, Trash2, ArrowLeft, Menu, MoreVertical } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

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
  status: "open" | "closed" | "pending_review"
  created_at: string
  updated_at: string
}

const ADMIN_CHAT_API_ROUTE = "/api/admin/chatbot"
const POLLING_INTERVAL = 3000

export default function AdminChatDashboard() {
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [sessionToDelete, setSessionToDelete] = useState<ChatSession | null>(null)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const { toast } = useToast()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const previousMessageCountRef = useRef(0)
  const isUserScrolledUpRef = useRef(false)
  const shouldAutoScrollRef = useRef(true)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const checkIfAtBottom = () => {
    const scrollArea = scrollAreaRef.current?.querySelector("[data-radix-scroll-area-viewport]")
    if (scrollArea) {
      const { scrollTop, scrollHeight, clientHeight } = scrollArea
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10 // 10px threshold
      isUserScrolledUpRef.current = !isAtBottom
      shouldAutoScrollRef.current = isAtBottom
    }
  }

  const fetchSessions = async () => {
    try {
      const response = await fetch(`${ADMIN_CHAT_API_ROUTE}?action=getSessions`)
      if (!response.ok) {
        throw new Error("Failed to fetch sessions")
      }
      const data: ChatSession[] = await response.json()
      setSessions(data)
    } catch (error) {
      console.error("Error fetching sessions:", error)
      toast({
        title: "Error",
        description: "Failed to load chat sessions.",
        variant: "destructive",
      })
    }
  }

  const fetchMessages = async (sessionId: number) => {
    try {
      const response = await fetch(`${ADMIN_CHAT_API_ROUTE}?action=getMessages&sessionId=${sessionId}`)
      if (!response.ok) {
        throw new Error("Failed to fetch messages")
      }
      const data: Message[] = await response.json()

      const sortedMessages = data.sort((a, b) => {
        const timeA = new Date(a.created_at).getTime()
        const timeB = new Date(b.created_at).getTime()
        return timeA - timeB
      })

      setMessages(sortedMessages)
    } catch (error) {
      console.error("Error fetching messages:", error)
      toast({
        title: "Error",
        description: "Failed to load chat messages for selected session.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    fetchSessions()

    let interval: NodeJS.Timeout
    if (selectedSessionId) {
      fetchMessages(selectedSessionId)
      interval = setInterval(() => fetchMessages(selectedSessionId), POLLING_INTERVAL)
    } else {
      interval = setInterval(fetchSessions, POLLING_INTERVAL)
    }

    return () => clearInterval(interval)
  }, [selectedSessionId, toast])

  useEffect(() => {
    const currentMessageCount = messages.length
    const previousCount = previousMessageCountRef.current

    if (currentMessageCount > previousCount && shouldAutoScrollRef.current && !isUserScrolledUpRef.current) {
      setTimeout(() => {
        scrollToBottom()
      }, 100)
    }

    previousMessageCountRef.current = currentMessageCount
  }, [messages])

  const handleSelectSession = (sessionId: number) => {
    setSelectedSessionId(sessionId)
    setMessages([])
    setInputMessage("")
    previousMessageCountRef.current = 0
    isUserScrolledUpRef.current = false
    shouldAutoScrollRef.current = true
    setIsMobileSidebarOpen(false)
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim() || !selectedSessionId) return

    const newMessage: Message = {
      id: Date.now(),
      chat_session_id: selectedSessionId,
      sender_type: "admin",
      content: inputMessage,
      created_at: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputMessage("")
    setIsLoading(true)
    shouldAutoScrollRef.current = true
    isUserScrolledUpRef.current = false

    try {
      const response = await fetch(`${ADMIN_CHAT_API_ROUTE}?action=addMessage&sessionId=${selectedSessionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sender_type: "admin", content: newMessage.content }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to send message")
      }
    } catch (error: any) {
      console.error("Error sending message:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to send message.",
        variant: "destructive",
      })
      setMessages((prev) => prev.filter((msg) => msg.id !== newMessage.id))
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateStatus = async (status: ChatSession["status"]) => {
    if (!selectedSessionId) return
    setIsLoading(true)
    try {
      const response = await fetch(`${ADMIN_CHAT_API_ROUTE}?action=updateStatus&sessionId=${selectedSessionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update status")
      }

      toast({
        title: "Status Updated",
        description: `Session status changed to ${status}.`,
      })
      fetchSessions()
    } catch (error: any) {
      console.error("Error updating status:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to update session status.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteSession = async (sessionId: number) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${ADMIN_CHAT_API_ROUTE}?action=deleteSession&sessionId=${sessionId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to delete session")
      }

      toast({
        title: "Session Deleted",
        description: "Chat session has been permanently deleted.",
      })

      if (selectedSessionId === sessionId) {
        setSelectedSessionId(null)
        setMessages([])
        setInputMessage("")
      }

      fetchSessions()
    } catch (error: any) {
      console.error("Error deleting session:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to delete session.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setDeleteDialogOpen(false)
      setSessionToDelete(null)
    }
  }

  const openDeleteDialog = (session: ChatSession, e: React.MouseEvent) => {
    e.stopPropagation()
    setSessionToDelete(session)
    setDeleteDialogOpen(true)
  }

  const selectedSession = sessions.find((s) => s.id === selectedSessionId)

  const SessionsList = () => (
    <ScrollArea className="h-full">
      {sessions.length === 0 && <p className="p-4 text-center text-gray-500">No active sessions.</p>}
      {sessions.map((session) => (
        <div
          key={session.id}
          className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
            selectedSessionId === session.id ? "bg-blue-50 border-l-4 border-blue-500" : ""
          } relative group`}
          onClick={() => handleSelectSession(session.id)}
        >
          <div className="absolute top-2 right-2 flex gap-1">
            {/* Desktop: Hover-based delete button */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
              onClick={(e) => openDeleteDialog(session, e)}
              disabled={isLoading}
            >
              <Trash2 className="h-4 w-4" />
            </Button>

            {/* Mobile: Always visible menu with delete option */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden h-8 w-8 p-0 hover:bg-gray-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  onClick={(e) => openDeleteDialog(session, e)}
                  className="text-red-600 focus:text-red-600 focus:bg-red-50"
                  disabled={isLoading}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Session
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <p className="font-semibold pr-10 text-sm md:text-base">{session.user_name}</p>
          <p className="text-xs md:text-sm text-gray-600 truncate pr-10">{session.user_concern}</p>
          <p
            className={`text-xs mt-1 ${
              session.status === "open"
                ? "text-green-600"
                : session.status === "closed"
                  ? "text-red-600"
                  : "text-yellow-600"
            }`}
          >
            Status: {session.status.replace(/_/g, " ")}
          </p>
          <p className="text-xs text-gray-500">Last update: {new Date(session.updated_at).toLocaleString()}</p>
        </div>
      ))}
    </ScrollArea>
  )

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-1 bg-gray-100 md:ml-64">
          {/* Desktop Sidebar */}
          <Card className="hidden md:flex w-1/4 flex-col border-r rounded-none shadow-none">
            <CardHeader>
              <CardTitle className="text-xl">Chat Sessions</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow p-0 overflow-hidden">
              <SessionsList />
            </CardContent>
          </Card>

          {/* Main Chat Area */}
          <Card className="flex-1 flex flex-col rounded-none shadow-none">
            <CardHeader className="pb-2">
              {selectedSession ? (
                <>
                  <div className="flex items-center justify-between md:block">
                    <div className="flex items-center gap-2 md:gap-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="md:hidden"
                        onClick={() => setSelectedSessionId(null)}
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <CardTitle className="text-lg md:text-xl">
                        Chat with {selectedSession.user_name}
                        <span
                          className={`ml-2 text-sm font-normal ${
                            selectedSession.status === "open"
                              ? "text-green-600"
                              : selectedSession.status === "closed"
                                ? "text-red-600"
                                : "text-yellow-600"
                          }`}
                        >
                          ({selectedSession.status.replace(/_/g, " ")})
                        </span>
                      </CardTitle>
                    </div>
                    {/* Mobile Sessions Menu */}
                    <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="sm" className="md:hidden">
                          <Menu className="h-4 w-4" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left" className="w-80 p-0">
                        <div className="flex flex-col h-full">
                          <div className="p-4 border-b">
                            <h2 className="text-lg font-semibold">Chat Sessions</h2>
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <SessionsList />
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 mt-1">Concern: {selectedSession.user_concern}</p>
                  <div className="flex flex-col sm:flex-row gap-2 mt-2">
                    <Select
                      onValueChange={(value: ChatSession["status"]) => handleUpdateStatus(value)}
                      value={selectedSession.status}
                    >
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Update Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="pending_review">Pending Review</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" onClick={() => setSelectedSessionId(null)} className="hidden md:block">
                      Close Session View
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg md:text-xl text-gray-500">
                      <span className="hidden md:inline">Select a chat session to view messages</span>
                      <span className="md:hidden">Chat Sessions</span>
                    </CardTitle>
                    {/* Mobile Sessions Menu when no session selected */}
                    <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="sm" className="md:hidden">
                          <Menu className="h-4 w-4" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left" className="w-80 p-0">
                        <div className="flex flex-col h-full">
                          <div className="p-4 border-b">
                            <h2 className="text-lg font-semibold">Chat Sessions</h2>
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <SessionsList />
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </>
              )}
            </CardHeader>
            <Separator />
            <CardContent className="flex-grow p-2 md:p-4 overflow-hidden">
              {selectedSessionId ? (
                <ScrollArea className="h-full pr-2 md:pr-4" ref={scrollAreaRef} onScrollCapture={checkIfAtBottom}>
                  {messages.length === 0 && (
                    <p className="text-center text-gray-500 text-sm md:text-base">No messages in this session yet.</p>
                  )}
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`mb-3 md:mb-4 flex ${m.sender_type === "admin" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex flex-col max-w-[85%] md:max-w-[80%] ${m.sender_type === "admin" ? "items-end" : "items-start"}`}
                      >
                        {m.sender_type !== "admin" && (
                          <span className="text-xs md:text-sm font-semibold capitalize mb-1">
                            {m.sender_type === "user" ? selectedSession?.user_name : m.sender_type}:
                          </span>
                        )}
                        <div
                          className={`inline-block p-2 md:p-3 rounded-xl text-sm md:text-base ${
                            m.sender_type === "admin"
                              ? "bg-purple-600 text-white"
                              : m.sender_type === "user"
                                ? "bg-blue-50 text-blue-800"
                                : "bg-emerald-50 text-emerald-800"
                          }`}
                        >
                          {m.sender_type === "admin" && (
                            <span className="font-semibold capitalize mr-1">{m.sender_type}: </span>
                          )}
                          {m.content}
                          <div className="text-xs text-right mt-1 opacity-75">
                            {new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </ScrollArea>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <div className="md:hidden text-center p-4">
                    <p className="text-sm mb-4">Select a chat session to start viewing messages</p>
                    <Button onClick={() => setIsMobileSidebarOpen(true)} variant="outline">
                      <Menu className="h-4 w-4 mr-2" />
                      View Sessions
                    </Button>
                  </div>
                  <p className="hidden md:block">Please select a session from the left panel.</p>
                </div>
              )}
            </CardContent>
            {selectedSessionId && (
              <CardFooter className="p-2 md:p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message as admin..."
                    className="flex-grow text-sm md:text-base"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    disabled={!inputMessage.trim() || isLoading}
                    size="sm"
                    className="md:size-default"
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </form>
              </CardFooter>
            )}
          </Card>
        </div>

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent className="mx-4 max-w-md md:max-w-lg">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-base md:text-lg">Delete Chat Session</AlertDialogTitle>
              <AlertDialogDescription className="text-sm md:text-base">
                Are you sure you want to delete the chat session with <strong>{sessionToDelete?.user_name}</strong>?
                This action cannot be undone and will permanently remove all messages in this conversation.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col sm:flex-row gap-2">
              <AlertDialogCancel disabled={isLoading} className="w-full sm:w-auto">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => sessionToDelete && handleDeleteSession(sessionToDelete.id)}
                disabled={isLoading}
                className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Deleting...
                  </>
                ) : (
                  "Delete Session"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SidebarInset>
    </SidebarProvider>
  )
}
