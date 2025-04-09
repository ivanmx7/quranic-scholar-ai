
import { Conversation, Message } from "@/types/chat";

// Generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Format date for display
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

// Save conversations to local storage
export const saveConversationsToLocalStorage = (conversations: Conversation[]): void => {
  localStorage.setItem('qurangpt-conversations', JSON.stringify(conversations));
};

// Get conversations from local storage
export const getConversationsFromLocalStorage = (): Conversation[] => {
  const conversations = localStorage.getItem('qurangpt-conversations');
  if (!conversations) return [];
  
  // Parse the conversations and ensure dates are converted back to Date objects
  return JSON.parse(conversations).map((conversation: any) => ({
    ...conversation,
    createdAt: new Date(conversation.createdAt),
    updatedAt: new Date(conversation.updatedAt),
    messages: conversation.messages.map((message: any) => ({
      ...message,
      timestamp: new Date(message.timestamp)
    }))
  }));
};

// Create a new conversation
export const createNewConversation = (): Conversation => {
  const now = new Date();
  return {
    id: generateId(),
    title: `Conversation ${formatDate(now)}`,
    messages: [],
    createdAt: now,
    updatedAt: now
  };
};

// Add message to conversation
export const addMessageToConversation = (
  conversation: Conversation,
  content: string,
  role: 'user' | 'assistant' | 'system'
): Conversation => {
  const message: Message = {
    id: generateId(),
    content,
    role,
    timestamp: new Date()
  };
  
  return {
    ...conversation,
    messages: [...conversation.messages, message],
    updatedAt: new Date()
  };
};
