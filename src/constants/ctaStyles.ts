export type CtaPriority = "primary" | "secondary" | "accent";

export function ctaPriorityClass(priority: CtaPriority) {
  if (priority === "primary") {
    return "border-transparent bg-[#16a34a] text-white hover:bg-[#15803d]";
  }
  if (priority === "accent") {
    return "border-transparent bg-[#f97316] text-white hover:bg-[#ea580c]";
  }
  return "border-slate-200 bg-white text-slate-700 hover:bg-slate-50";
}
