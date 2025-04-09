
import React, { useEffect, useRef, useState } from "react";
import { Conversation } from "@/types/chat";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sendChatMessage } from "@/services/aiService";
import {
  addMessageToConversation,
  createNewConversation,
} from "@/utils/chatUtils";

interface ChatProps {
  conversation: Conversation;
  onUpdateConversation: (conversation: Conversation) => void;
}

const Chat: React.FC<ChatProps> = ({ conversation, onUpdateConversation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation.messages]);

  const handleSendMessage = async (content: string) => {
    // First add the user message to the conversation
    const updatedConversation = addMessageToConversation(
      conversation,
      content,
      "user"
    );
    onUpdateConversation(updatedConversation);

    // Then get AI response
    setIsLoading(true);
    try {
      const messages = updatedConversation.messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await sendChatMessage(messages);

      // Add AI response to conversation
      if (response.message) {
        const finalConversation = addMessageToConversation(
          updatedConversation,
          response.message.content,
          "assistant"
        );
        onUpdateConversation(finalConversation);
      }
    } catch (error) {
      console.error("Error getting AI response:", error);
      // Add error message
      const errorConversation = addMessageToConversation(
        updatedConversation,
        "I apologize, but I encountered an error. Please try again later.",
        "assistant"
      );
      onUpdateConversation(errorConversation);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-islamic-pattern-bg">
      <div className="flex-1 overflow-hidden">
        {conversation.messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-4">
            <div className="islamic-border max-w-md text-center">
              <h2 className="text-2xl font-semibold mb-4 text-islamic-gold">
                Welcome to QuranGPT
              </h2>
              <p className="text-islamic-light mb-4">
                I am an AI assistant specialized in Islamic knowledge. I can help with
                questions about:
              </p>
              <ul className="text-islamic-light text-left mb-4 space-y-2">
                <li>• The Holy Quran and its interpretations</li>
                <li>• Hadith and Sunnah of Prophet Muhammad ﷺ</li>
                <li>• All Prophets mentioned in Islamic texts</li>
                <li>• Islamic jurisprudence (Fiqh) and rulings (Halal/Haram)</li>
                <li>• Islamic history and civilization</li>
                <li>• Islamic practices and rituals</li>
              </ul>
              <p className="text-islamic-light text-sm italic">
                Please note: I strive to provide accurate information based on
                authentic Islamic sources, but I'm an AI assistant and not a
                replacement for qualified Islamic scholars.
              </p>
            </div>
          </div>
        ) : (
          <ScrollArea className="h-full p-4 islamic-scrollbar">
            {conversation.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={bottomRef} />
          </ScrollArea>
        )}
      </div>
      <div className="p-4">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Chat;
