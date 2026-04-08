import React from "react";
import { Bookmark, Play, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type MediaCardAction = {
  label: string;
  onClick: () => void;
  variant?: "default" | "outline";
};

type MediaCardProps = {
  title: string;
  subtitle: string;
  meta: string;
  badge?: string;
  progress?: number;
  actions: MediaCardAction[];
};

export default function MediaCard({
  title,
  subtitle,
  meta,
  badge,
  progress,
  actions,
}: MediaCardProps) {
  return (
    <div className="group fh-interactive-card min-w-[260px] max-w-[280px] rounded-[22px] border border-[var(--border)] bg-[var(--card)] p-4 transition duration-300 hover:-translate-y-1 hover:border-[rgba(3,205,140,0.3)] hover:shadow-[0_20px_45px_-30px_rgba(3,205,140,0.55)]">
      <div className="relative mb-3 overflow-hidden rounded-[18px] border border-[var(--border)] bg-[radial-gradient(circle_at_top_right,rgba(3,205,140,0.2),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.12),transparent_40%)]">
        <div className="aspect-[16/9] w-full" />
        {badge ? (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-[var(--accent)] shadow-sm">
            {badge}
          </span>
        ) : null}
      </div>

      <div className="text-sm font-semibold text-[var(--text-primary)]">{title}</div>
      <div className="mt-1 text-xs text-[var(--text-secondary)]">{subtitle}</div>
      <div className="mt-2 text-xs text-[var(--text-secondary)]">{meta}</div>

      {typeof progress === "number" ? (
        <div className="mt-3">
          <div className="mb-1 flex items-center justify-between text-[11px] text-[var(--text-secondary)]">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-[color-mix(in_srgb,var(--border)_70%,transparent_30%)]">
            <div className="h-2 rounded-full bg-[var(--accent)]" style={{ width: `${progress}%` }} />
          </div>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        {actions.map((action, index) => (
          <Button
            key={`${action.label}-${index}`}
            variant={action.variant === "outline" ? "outline" : "default"}
            className={action.variant === "outline" ? "fh-user-secondary-btn" : "fh-user-primary-btn"}
            onClick={action.onClick}
          >
            {action.label === "Play" ? <Play className="h-4 w-4" /> : null}
            {action.label === "Save" ? <Bookmark className="h-4 w-4" /> : null}
            {action.label === "Share" ? <Share2 className="h-4 w-4" /> : null}
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
