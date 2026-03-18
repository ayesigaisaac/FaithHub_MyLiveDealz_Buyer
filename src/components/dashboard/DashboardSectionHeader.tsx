import React from "react";

type DashboardSectionHeaderProps = {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  tone?: "default" | "inverse";
  className?: string;
};

export function DashboardSectionHeader({
  title,
  subtitle,
  action,
  tone = "default",
  className = "",
}: DashboardSectionHeaderProps) {
  const inverse = tone === "inverse";

  return (
    <div className={`mb-4 flex flex-wrap items-start justify-between gap-3 ${className}`.trim()}>
      <div className="min-w-0 space-y-1">
        <h3 className={`text-lg font-semibold tracking-tight sm:text-xl ${inverse ? "text-white" : "text-slate-900"}`}>
          {title}
        </h3>
        {subtitle ? <p className={`text-sm leading-relaxed ${inverse ? "text-white/75" : "text-slate-500"}`}>{subtitle}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

