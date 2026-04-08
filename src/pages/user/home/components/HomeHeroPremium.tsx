import React from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type HomeHeroPremiumProps = {
  name: string;
  featuredTitle: string;
  featuredDetail: string;
  onPrimaryAction: () => void;
};

export default function HomeHeroPremium({
  name,
  featuredTitle,
  featuredDetail,
  onPrimaryAction,
}: HomeHeroPremiumProps) {
  return (
    <div className="rounded-[28px] border border-[var(--border)] bg-[radial-gradient(circle_at_top_right,rgba(3,205,140,0.18),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.12),transparent_40%)] p-6 shadow-[0_18px_45px_-30px_rgba(3,205,140,0.55)]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-xs font-semibold text-[var(--text-secondary)]">
            <Sparkles className="h-4 w-4 text-[var(--accent)]" />
            Premium home experience
          </div>
          <h1 className="mt-3 text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
            Welcome back, {name}
          </h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)] sm:text-base">
            Discover content, live sessions, and community moments curated for your journey.
          </p>
        </div>

        <div className="w-full max-w-sm rounded-[22px] border border-[var(--border)] bg-[var(--card)] p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-secondary)]">
            Featured right now
          </div>
          <div className="mt-2 text-lg font-semibold text-[var(--text-primary)]">{featuredTitle}</div>
          <div className="mt-1 text-sm text-[var(--text-secondary)]">{featuredDetail}</div>
          <Button className="fh-user-primary-btn mt-4 w-full" onClick={onPrimaryAction}>
            Watch now
          </Button>
        </div>
      </div>
    </div>
  );
}
