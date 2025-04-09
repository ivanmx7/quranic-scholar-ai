
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendIcon } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-islamic-dark p-4 rounded-lg border border-islamic-gold"
    >
      <div className="flex flex-col space-y-2">
        <Textarea
          placeholder="Ask about the Quran's history, structure, interpretation, prophets, or Islamic rulings..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="resize-none bg-islamic-dark border-islamic-green text-islamic-light"
          rows={3}
          disabled={isLoading}
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isLoading || !message.trim()}
            className="bg-islamic-green hover:bg-islamic-gold hover:text-islamic-dark text-white"
          >
            {isLoading ? (
              "Processing..."
            ) : (
              <>
                Send <SendIcon className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
