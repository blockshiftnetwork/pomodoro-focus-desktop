import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    // Simple toggle entre light y dark
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative"
      title={`Current theme: ${theme}`}
      type="button"
    >
      <div className="relative w-[1.2rem] h-[1.2rem]">
        <Sun className="absolute inset-0 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 pointer-events-none" />
        <Moon className="absolute inset-0 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 pointer-events-none" />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

