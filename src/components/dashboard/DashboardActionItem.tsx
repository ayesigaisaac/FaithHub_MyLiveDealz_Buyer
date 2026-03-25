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
      ? "fh-subcard-warm"
      : "fh-subcard";

  return (
    <button
      type="button"
      onClick={onClick}
      data-action-label={actionLabel}
      data-action-id={actionId}
      className={`fh-interactive-card w-full rounded-xl p-3.5 text-left sm:p-4 ${toneClass} ${className}`.trim()}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[0.97rem] font-semibold text-slate-900 sm:text-base">{title}</div>
          <div className="mt-1 text-sm leading-relaxed text-slate-500 sm:text-[0.95rem]">{detail}</div>
        </div>
        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
      </div>
    </button>
  );
}

