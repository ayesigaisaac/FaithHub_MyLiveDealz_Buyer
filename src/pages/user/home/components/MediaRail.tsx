import React from "react";

type MediaRailProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
};

export default function MediaRail({
  title,
  subtitle,
  children,
  actionLabel,
  onAction,
}: MediaRailProps) {
  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xl font-semibold text-[var(--text-primary)]">{title}</div>
          <div className="text-sm text-[var(--text-secondary)]">{subtitle}</div>
        </div>
        {actionLabel ? (
          <button
            type="button"
            onClick={onAction}
            className="rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--accent-soft)]"
          >
            {actionLabel}
          </button>
        ) : null}
      </div>

      <div className="flex gap-4 overflow-x-auto pb-3">
        {children}
      </div>
    </section>
  );
}
