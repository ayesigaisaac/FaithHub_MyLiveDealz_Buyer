import React from "react";
import { Bookmark, Play, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type ContinueWatchingBannerProps = {
  title: string;
  detail: string;
  progress: number;
  onContinue: () => void;
  onSave: () => void;
  onShare: () => void;
};

export default function ContinueWatchingBanner({
  title,
  detail,
  progress,
  onContinue,
  onSave,
  onShare,
}: ContinueWatchingBannerProps) {
  const safeProgress = Math.max(0, Math.min(100, progress));

  return (
    <section className="rounded-[24px] border border-[var(--border)] bg-[var(--card)] p-4 shadow-[0_16px_32px_-28px_rgba(3,205,140,0.55)] sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
            Continue watching
          </div>
          <div className="mt-2 text-lg font-semibold text-[var(--text-primary)] sm:text-xl">
            {title}
          </div>
          <div className="mt-1 text-sm text-[var(--text-secondary)]">{detail}</div>

          <div className="mt-3">
            <div className="mb-1 flex items-center justify-between text-[11px] text-[var(--text-secondary)]">
              <span>Progress</span>
              <span>{safeProgress}%</span>
            </div>
            <div className="h-2 rounded-full bg-[color-mix(in_srgb,var(--border)_70%,transparent_30%)]">
              <div className="h-2 rounded-full bg-[var(--accent)]" style={{ width: `${safeProgress}%` }} />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button className="fh-user-primary-btn" onClick={onContinue}>
            <Play className="h-4 w-4" />
            Continue
          </Button>
          <Button variant="outline" className="fh-user-secondary-btn" onClick={onSave}>
            <Bookmark className="h-4 w-4" />
            Save
          </Button>
          <Button variant="outline" className="fh-user-secondary-btn" onClick={onShare}>
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
    </section>
  );
}
