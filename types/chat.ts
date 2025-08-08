export interface ChatSession {
  id: string;
  user_name: string;
  user_concern: string;
  status: 'open' | 'closed' | 'pending_review';
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  chat_session_id: string;
  sender_type: 'user' | 'ai' | 'admin';
  content: string;
  created_at: string;
    updated_at: string;
}
