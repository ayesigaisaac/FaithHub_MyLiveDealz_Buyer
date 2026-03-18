import { Moon, Sun } from "lucide-react";
import { useColorMode } from "@/theme/color-mode";

type ColorModeToggleProps = {
  className?: string;
};

export function ColorModeToggle({ className = "" }: ColorModeToggleProps) {
  const { mode, toggle } = useColorMode();
  const isDark = mode === "dark";
  const actionLabel = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={actionLabel}
      aria-pressed={isDark}
      title={actionLabel}
      className={[
        "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--border)]",
        "bg-[var(--surface)] text-[var(--text-secondary)]",
        "shadow-[var(--shadow-soft)] transition duration-200",
        "hover:-translate-y-[1px] hover:bg-[var(--accent-soft)] hover:text-[var(--text-primary)]",
        "focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30",
        "active:translate-y-0",
        className,
      ].join(" ")}
    >
      {isDark ? (
        <Moon className="h-4 w-4 text-[var(--accent)]" />
      ) : (
        <Sun className="h-4 w-4 text-[var(--accent)]" />
      )}
    </button>
  );
}
