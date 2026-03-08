import React from "react";
import { Moon, Sun } from "lucide-react";
import { useColorMode } from "@/theme/color-mode";

export function ColorModeToggle({ className = "" }: { className?: string }) {
  const { mode, toggle } = useColorMode();
  const isDark = mode === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      className={`inline-flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs font-semibold text-[var(--text-secondary)] shadow-[var(--shadow-soft)] transition hover:-translate-y-[1px] hover:bg-[var(--accent-soft)] hover:text-[var(--text-primary)] ${className}`.trim()}
      aria-label="Toggle dark mode"
      aria-pressed={isDark}
    >
      {isDark ? <Moon className="h-4 w-4 text-[var(--accent)]" /> : <Sun className="h-4 w-4 text-[var(--accent)]" />}
      <span className="hidden sm:inline">Dark</span>
      <span className={`relative h-5 w-9 rounded-full border border-[var(--border)] ${isDark ? "bg-[var(--accent)]" : "bg-transparent"}`}>
        <span className={`absolute top-0.5 h-3.5 w-3.5 rounded-full bg-white transition-transform ${isDark ? "translate-x-4" : "translate-x-0.5"}`} />
      </span>
    </button>
  );
}
