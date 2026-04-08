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
    <section className="space-y-2 sm:space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-lg font-semibold text-[var(--text-primary)] sm:text-xl">{title}</div>
          <div className="text-xs text-[var(--text-secondary)] sm:text-sm">{subtitle}</div>
        </div>
        {actionLabel ? (
          <button
            type="button"
            onClick={onAction}
            className="rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-[11px] font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--accent-soft)] sm:px-4 sm:py-2 sm:text-xs"
          >
            {actionLabel}
          </button>
        ) : null}
      </div>

      <div className="-mx-4 flex gap-3 overflow-x-auto pb-2 px-4 sm:mx-0 sm:gap-4 sm:pb-3 sm:px-0">
        {children}
      </div>
    </section>
  );
}
