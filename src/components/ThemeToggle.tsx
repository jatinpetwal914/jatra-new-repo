import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return (
    <button
      onClick={() => setDark((d) => !d)}
      aria-label="Toggle theme"
      className="relative h-10 w-20 rounded-full border border-border bg-card/60 backdrop-blur-md flex items-center px-1 transition-smooth hover:border-accent"
    >
      <div
        className={`absolute h-8 w-8 rounded-full bg-gradient-accent shadow-glow transition-smooth ${
          dark ? "translate-x-10" : "translate-x-0"
        }`}
      />
      <Sun className="h-4 w-4 text-foreground/70 absolute left-2.5" />
      <Moon className="h-4 w-4 text-foreground/70 absolute right-2.5" />
    </button>
  );
};

export default ThemeToggle;
