export type CtaPriority = "primary" | "secondary" | "accent";

export function ctaPriorityClass(priority: CtaPriority) {
  if (priority === "primary") {
    return "border-transparent bg-[#03cd8c] text-white hover:bg-[#02b87c]";
  }
  if (priority === "accent") {
    return "border-transparent bg-[#f77f00] text-white hover:bg-[#d96f00]";
  }
  return "border-[var(--button-secondary-border)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--button-secondary-hover)]";
}
