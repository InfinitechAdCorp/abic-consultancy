'use client';

import { usePathname } from 'next/navigation';
import { ChatbotToggle } from './chatbot-toggle';

export function ChatbotWrapper() {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');

  // Only render the ChatbotToggle if it's NOT an admin page
  if (isAdminPage) {
    return null;
  }

  return <ChatbotToggle />;
}
