'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'; // Import Popover components
import Image from 'next/image';
import { UserChatWidget } from './user-chat-widget';

export function ChatbotToggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            className="fixed bottom-4 right-4 rounded-full p-2 shadow-lg z-50 w-16 h-16"
            aria-label="Open chat"
          >
            <Image
              src="/images/callcenter-girl.png"
              alt="Chatbot Icon"
              width={48}
              height={48}
              className="rounded-full"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="top" // Position above the trigger
          align="end" // Align to the end (right) of the trigger
          className="w-full max-w-sm p-0" // Set max-width and remove padding
        >
          <UserChatWidget onClose={() => setIsOpen(false)} />
        </PopoverContent>
      </Popover>
    </>
  );
}
