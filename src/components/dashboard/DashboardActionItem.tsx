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
      className={`fh-interactive-card w-full rounded-xl p-3 text-left ${toneClass} ${className}`.trim()}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-base font-semibold text-slate-900">{title}</div>
          <div className="mt-1 text-sm leading-relaxed text-slate-500">{detail}</div>
        </div>
        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
      </div>
    </button>
  );
}

