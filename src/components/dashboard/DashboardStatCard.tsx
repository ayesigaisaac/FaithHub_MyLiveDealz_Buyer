import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import AppIcon from "@/components/ui/app-icon";

type Tone = "emerald" | "orange" | "slate" | "rose";

type DashboardStatCardProps = {
  label: string;
  value: string;
  hint?: string;
  badge?: string;
  tone?: Tone;
  icon?: React.ReactNode;
  progress?: number;
  className?: string;
};

function toneClass(tone: Tone) {
  if (tone === "orange") return "fh-pill fh-pill-orange";
  if (tone === "rose") return "rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-600";
  if (tone === "slate") return "fh-pill fh-pill-slate";
  return "fh-pill fh-pill-emerald";
}

function progressToneClass(tone: Tone) {
  if (tone === "orange") return "bg-gradient-to-r from-[#f77f00] to-[#f59e0b]";
  if (tone === "rose") return "bg-gradient-to-r from-rose-500 to-rose-400";
  if (tone === "slate") return "bg-gradient-to-r from-slate-500 to-slate-400";
  return "bg-gradient-to-r from-[#03cd8c] to-[#14b8a6]";
}

function iconTone(tone: Tone): "neutral" | "orange" | "green" {
  if (tone === "orange") return "orange";
  if (tone === "rose") return "neutral";
  if (tone === "slate") return "neutral";
  return "green";
}

export function DashboardStatCard({
  label,
  value,
  hint,
  badge,
  tone = "emerald",
  icon,
  progress,
  className = "",
}: DashboardStatCardProps) {
  const normalizedProgress =
    progress === undefined ? undefined : Math.min(100, Math.max(0, progress));

  return (
    <Card
      className={`fh-interactive-card fh-surface-card rounded-[24px] ${className}`.trim()}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="fh-label text-slate-500">{label}</div>
            <div className="fh-stat-value mt-2 text-[1.6rem] font-bold tracking-tight text-slate-900 sm:text-3xl">{value}</div>
          </div>

          {badge ? (
            <span className={toneClass(tone)}>{badge}</span>
          ) : icon ? (
            <AppIcon size="sm" tone={iconTone(tone)}>
              {icon}
            </AppIcon>
          ) : null}
        </div>

        {normalizedProgress !== undefined ? (
          <div className="mt-3.5 h-1.5 rounded-full bg-slate-200/85">
            <div
              className={`h-full rounded-full ${progressToneClass(tone)} transition-[width] duration-500`}
              style={{ width: `${normalizedProgress}%` }}
            />
          </div>
        ) : null}

        {hint ? <p className="mt-2.5 text-sm leading-relaxed text-slate-500 sm:text-[0.92rem]">{hint}</p> : null}
      </CardContent>
    </Card>
  );
}

