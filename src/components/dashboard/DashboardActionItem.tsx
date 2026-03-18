import React from "react";
import { ChevronRight } from "lucide-react";

type DashboardActionItemProps = {
  title: string;
  detail: string;
  actionLabel?: string;
  actionId?: string;
  onClick?: () => void;
  tone?: "default" | "elevated";
  className?: string;
};

export function DashboardActionItem({
  title,
  detail,
  actionLabel,
  actionId,
  onClick,
  tone = "default",
  className = "",
}: DashboardActionItemProps) {
  const toneClass =
    tone === "elevated"
      ? "border-amber-200 bg-[linear-gradient(105deg,rgba(255,250,243,0.98),rgba(255,243,232,0.86))] hover:border-[#f1c990]"
      : "border-[var(--border)] bg-[color:var(--card)] hover:bg-[var(--surface)]";

  return (
    <button
      type="button"
      onClick={onClick}
      data-action-label={actionLabel}
      data-action-id={actionId}
      className={`group w-full rounded-xl border p-3 text-left shadow-[0_1px_0_rgba(15,23,42,0.03)] transition hover:-translate-y-[1px] hover:border-[#c8f0e0] ${toneClass} ${className}`.trim()}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-slate-900">{title}</div>
          <div className="mt-1 text-xs leading-relaxed text-slate-500">{detail}</div>
        </div>
        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5" />
      </div>
    </button>
  );
}

