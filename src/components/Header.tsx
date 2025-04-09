
import React from "react";
import { BookText } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-center p-4 bg-islamic-dark border-b border-islamic-gold">
      <div className="flex items-center">
        <BookText className="h-6 w-6 mr-2 text-islamic-gold" />
        <h1 className="text-xl font-bold text-islamic-gold">QuranGPT</h1>
      </div>
    </header>
  );
};

export default Header;
