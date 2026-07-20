"use client";

import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/store/useThemeStore";

export default function DarkModeToggle() {
  const { theme, toggle } = useThemeStore();

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="rounded-full p-2 text-text hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
