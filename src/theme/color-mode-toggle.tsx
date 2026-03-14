import { Moon, Sun } from "lucide-react";
import { useColorMode } from "@/theme/color-mode";

type ColorModeToggleProps = {
  className?: string;
};

export function ColorModeToggle({ className = "" }: ColorModeToggleProps) {
  const { mode, toggle } = useColorMode();
  const isDark = mode === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={[
        "inline-flex min-h-[44px] items-center gap-2 rounded-2xl border border-[var(--border)]",
        "bg-[var(--surface)] px-3 py-2 text-xs font-semibold text-[var(--text-secondary)]",
        "shadow-[var(--shadow-soft)] transition duration-200",
        "hover:-translate-y-[1px] hover:bg-[var(--accent-soft)] hover:text-[var(--text-primary)]",
        "focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30",
        "active:translate-y-0",
        "w-auto max-w-full shrink-0",
        className,
      ].join(" ")}
    >
      <span className="shrink-0">
        {isDark ? (
          <Moon className="h-4 w-4 text-[var(--accent)]" />
        ) : (
          <Sun className="h-4 w-4 text-[var(--accent)]" />
        )}
      </span>

      <span className="hidden sm:inline">{isDark ? "Dark" : "Light"}</span>

      <span
        className={`relative h-5 w-9 shrink-0 rounded-full border border-[var(--border)] transition-colors ${
          isDark ? "bg-[var(--accent)]" : "bg-transparent"
        }`}
      >
        <span
          className={`absolute top-0.5 h-3.5 w-3.5 rounded-full bg-white transition-transform duration-200 ${
            isDark ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </span>
    </button>
  );
}