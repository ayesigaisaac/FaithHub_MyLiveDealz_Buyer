import React, { useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type MediaRailProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  showArrows?: boolean;
};

export default function MediaRail({
  title,
  subtitle,
  children,
  actionLabel,
  onAction,
  showArrows = true,
}: MediaRailProps) {
  const railRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback((direction: "prev" | "next") => {
    if (!railRef.current) return;
    const { clientWidth } = railRef.current;
    const delta = clientWidth * 0.8 * (direction === "next" ? 1 : -1);
    railRef.current.scrollBy({ left: delta, behavior: "smooth" });
  }, []);

  return (
    <section className="space-y-2 sm:space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-lg font-semibold text-[var(--text-primary)] sm:text-xl">{title}</div>
          <div className="text-xs text-[var(--text-secondary)] sm:text-sm">{subtitle}</div>
        </div>
        <div className="flex items-center gap-2">
          {showArrows ? (
            <div className="hidden items-center gap-1 sm:flex">
              <button
                type="button"
                aria-label="Scroll left"
                onClick={() => handleScroll("prev")}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--text-secondary)] transition hover:bg-[var(--accent-soft)]"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Scroll right"
                onClick={() => handleScroll("next")}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--text-secondary)] transition hover:bg-[var(--accent-soft)]"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          ) : null}
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
      </div>

      <div
        ref={railRef}
        className="-mx-4 flex gap-3 overflow-x-auto pb-2 px-4 sm:mx-0 sm:gap-4 sm:pb-3 sm:px-0 snap-x snap-mandatory scroll-px-4"
      >
        {React.Children.map(children, (child, index) => (
          <div key={index} className="snap-start">
            {child}
          </div>
        ))}
      </div>
    </section>
  );
}
