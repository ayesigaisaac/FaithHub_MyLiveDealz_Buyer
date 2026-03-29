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
      className={`fh-interactive-card group w-full rounded-2xl p-3 text-left sm:p-4 ${toneClass} ${className}`.trim()}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[0.95rem] font-semibold text-[var(--text-primary)] sm:text-base">{title}</div>
          <div className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-[0.95rem]">{detail}</div>
        </div>
        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--text-muted,#6B7280)] transition group-hover:translate-x-0.5" />
      </div>
    </button>
  );
}

