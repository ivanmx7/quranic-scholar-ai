
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Chat from "@/components/Chat";
import ChatHistory from "@/components/ChatHistory";
import { Conversation } from "@/types/chat";
import {
  createNewConversation,
  getConversationsFromLocalStorage,
  saveConversationsToLocalStorage,
  deleteConversation,
} from "@/utils/chatUtils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const isMobile = useIsMobile();

  // Initialize with data from localStorage
  useEffect(() => {
    const storedConversations = getConversationsFromLocalStorage();
    if (storedConversations.length > 0) {
      setConversations(storedConversations);
      setActiveConversationId(storedConversations[0].id);
    } else {
      handleNewConversation();
    }
  }, []);

  // Save to localStorage whenever conversations change
  useEffect(() => {
    if (conversations.length > 0) {
      saveConversationsToLocalStorage(conversations);
    }
  }, [conversations]);

  // Auto-hide sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }
  }, [isMobile]);

  const handleNewConversation = () => {
    try {
      const newConversation = createNewConversation();
      setConversations((prev) => [newConversation, ...prev]);
      setActiveConversationId(newConversation.id);
      if (isMobile) {
        setShowSidebar(false);
      }
      toast({
        title: "New conversation created",
        description: "Start asking questions about Islamic topics",
      });
    } catch (error) {
      console.error("Error creating new conversation:", error);
      toast({
        title: "Error",
        description: "Failed to create new conversation",
        variant: "destructive",
      });
    }
  };

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  const handleDeleteConversation = (id: string) => {
    try {
      const updatedConversations = deleteConversation(conversations, id);
      setConversations(updatedConversations);
      
      // If we deleted the active conversation, set the first conversation as active
      if (id === activeConversationId) {
        if (updatedConversations.length > 0) {
          setActiveConversationId(updatedConversations[0].id);
        } else {
          // If no conversations left, create a new one
          handleNewConversation();
        }
      }
      
      toast({
        title: "Conversation deleted",
        description: "The conversation has been removed",
      });
    } catch (error) {
      console.error("Error deleting conversation:", error);
      toast({
        title: "Error",
        description: "Failed to delete conversation",
        variant: "destructive",
      });
    }
  };

  const handleUpdateConversation = (updatedConversation: Conversation) => {
    const updatedConversations = conversations.map((c) =>
      c.id === updatedConversation.id ? updatedConversation : c
    );
    setConversations(updatedConversations);
  };

  const activeConversation = conversations.find((c) => c.id === activeConversationId);

  return (
    <div className="flex flex-col h-screen bg-islamic-dark">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile sidebar toggle */}
        {isMobile && (
          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 left-4 z-30 bg-islamic-dark border-islamic-gold text-islamic-gold"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            {showSidebar ? <X size={20} /> : <Menu size={20} />}
          </Button>
        )}

        {/* Sidebar */}
        <div
          className={`${
            showSidebar ? "block" : "hidden"
          } ${
            isMobile ? "absolute inset-y-0 left-0 z-20 w-3/4 max-w-xs" : "w-1/4"
          } transition-all duration-300 ease-in-out`}
        >
          <ChatHistory
            conversations={conversations}
            activeConversationId={activeConversationId}
            onSelectConversation={handleSelectConversation}
            onDeleteConversation={handleDeleteConversation}
            onNewConversation={handleNewConversation}
          />
        </div>

        {/* Main chat area */}
        <div className={`${isMobile && showSidebar ? "hidden" : "flex"} flex-1 flex-col`}>
          {activeConversation && (
            <Chat
              conversation={activeConversation}
              onUpdateConversation={handleUpdateConversation}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
