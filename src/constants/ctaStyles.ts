export type CtaPriority = "primary" | "secondary" | "accent";

export function ctaPriorityClass(priority: CtaPriority) {
  if (priority === "primary") {
    return "border-transparent bg-[#059669] text-white hover:bg-[#047857]";
  }
  if (priority === "accent") {
    return "border-transparent bg-[#f77f00] text-white hover:bg-[#e56f00]";
  }
  return "border-slate-200 bg-white text-slate-700 hover:bg-slate-50";
}
