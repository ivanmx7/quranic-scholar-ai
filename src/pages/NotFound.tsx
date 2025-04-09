
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BookText } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-islamic-pattern-bg">
      <div className="islamic-border text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-islamic-gold">404</h1>
        <BookText className="h-16 w-16 mx-auto mb-4 text-islamic-gold" />
        <p className="text-xl text-islamic-light mb-6">
          The page you are looking for could not be found
        </p>
        <Button
          asChild
          className="bg-islamic-green hover:bg-islamic-gold hover:text-islamic-dark text-white"
        >
          <a href="/">Return to QuranGPT</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
