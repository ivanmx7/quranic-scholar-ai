
import React from "react";
import { Message } from "@/types/chat";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/chatUtils";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-lg p-4",
          isUser
            ? "bg-islamic-green text-white rounded-tr-none"
            : "bg-islamic-dark text-islamic-light rounded-tl-none islamic-border"
        )}
      >
        <div className="flex items-center mb-1">
          <div
            className={cn(
              "font-semibold",
              isUser ? "text-islamic-light" : "text-islamic-gold"
            )}
          >
            {isUser ? "You" : "QuranGPT"}
          </div>
          <div className="text-xs opacity-70 ml-2">
            {formatDate(message.timestamp)}
          </div>
        </div>
        <div className="whitespace-pre-wrap">{message.content}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
