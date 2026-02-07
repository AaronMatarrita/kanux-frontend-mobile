export interface Conversation {
  id: string;
  last_message_at?: string;
  company?: {
    id: string;
    name: string;
    url_logo?: string;
  };
  talent?: {
    id: string;
    first_name?: string;
    last_name?: string;
    url_logo?: string;
  };
  last_message?: Message | null;
}

export interface Message {
  id: string;
  sender_type: "Companhia" | "Talento";
  content: string;
  created_at: string;
  is_read: boolean;
}
export interface ConversationMessagesResponse {
  conversation_id: string;
  messages: Message[];
}