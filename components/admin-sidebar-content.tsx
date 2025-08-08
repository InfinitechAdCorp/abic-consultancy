"use client"

import * as React from 'react'
import { Search } from 'lucide-react'
import { Label } from '@/components/ui/label'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupLabel,
} from '@/components/ui/sidebar'
import { ChatSession } from '@/types/chat'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { Badge } from '@/components/ui/badge'

interface AdminSidebarContentProps {
  chatSessions: ChatSession[];
  selectedSessionId: string | null;
  onSelectSession: (sessionId: string) => void;
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
}

export function AdminSidebarContent({
  chatSessions,
  selectedSessionId,
  onSelectSession,
  globalFilter,
  onGlobalFilterChange,
}: AdminSidebarContentProps) {
  const filteredSessions = chatSessions.filter(session =>
    session.user_name.toLowerCase().includes(globalFilter.toLowerCase()) ||
    session.user_concern.toLowerCase().includes(globalFilter.toLowerCase()) ||
    session.id.toLowerCase().includes(globalFilter.toLowerCase())
  );

  return (
    <>
      <SidebarGroup className="py-0">
        <SidebarGroupContent className="relative">
          <Label htmlFor="search-sessions" className="sr-only">
            Search Sessions
          </Label>
          <SidebarInput
            id="search-sessions"
            placeholder="Search sessions..."
            className="pl-8"
            value={globalFilter}
            onChange={(e) => onGlobalFilterChange(e.target.value)}
          />
          <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Chat Sessions</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {filteredSessions.length === 0 && (
              <div className="p-2 text-sm text-gray-500">No sessions found.</div>
            )}
            {filteredSessions.map((session) => (
              <SidebarMenuItem key={session.id}>
                <SidebarMenuButton
                  isActive={selectedSessionId === session.id}
                  onClick={() => onSelectSession(session.id)}
                  className="flex flex-col items-start h-auto py-2"
                >
                  <div className="flex justify-between w-full items-center">
                    <span className="font-medium truncate">{session.user_name}</span>
                    <Badge
                      variant={
                        session.status === 'open'
                          ? 'default'
                          : session.status === 'pending_review'
                          ? 'destructive'
                          : 'secondary'
                      }
                      className="ml-2 px-2 py-0.5 text-xs"
                    >
                      {session.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <span className="text-xs text-gray-500 w-full truncate text-left mt-1">
                    {session.user_concern}
                  </span>
                  <span className="text-xs text-gray-400 w-full text-left mt-1">
                    {formatDistanceToNow(new Date(session.updated_at), { addSuffix: true })}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
}
