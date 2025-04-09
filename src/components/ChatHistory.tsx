
import React from "react";
import { Conversation } from "@/types/chat";
import { Button } from "@/components/ui/button";
import { MessageSquare, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDate } from "@/utils/chatUtils";

interface ChatHistoryProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  onNewConversation: () => void;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onDeleteConversation,
  onNewConversation,
}) => {
  return (
    <div className="h-full flex flex-col bg-islamic-dark border-r border-islamic-gold">
      <div className="p-4 border-b border-islamic-gold">
        <Button
          onClick={onNewConversation}
          className="w-full bg-islamic-green hover:bg-islamic-gold hover:text-islamic-dark text-white"
        >
          New Conversation
        </Button>
      </div>
      <ScrollArea className="flex-1 islamic-scrollbar">
        <div className="p-2">
          {conversations.length === 0 ? (
            <div className="text-center p-4 text-islamic-light opacity-70">
              No conversations yet
            </div>
          ) : (
            conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`mb-2 rounded-lg transition-colors ${
                  activeConversationId === conversation.id
                    ? "bg-islamic-green"
                    : "bg-transparent hover:bg-islamic-green/20"
                }`}
              >
                <div
                  className="p-3 cursor-pointer flex items-center justify-between"
                  onClick={() => onSelectConversation(conversation.id)}
                >
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2 text-islamic-gold" />
                    <div>
                      <div className="font-medium text-islamic-light">
                        {conversation.title}
                      </div>
                      <div className="text-xs text-islamic-light opacity-70">
                        {formatDate(conversation.updatedAt)}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteConversation(conversation.id);
                    }}
                    className="opacity-70 hover:opacity-100 text-islamic-light hover:bg-islamic-green/50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatHistory;
