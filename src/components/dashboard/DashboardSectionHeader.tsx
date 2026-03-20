import React from "react";

type DashboardSectionHeaderProps = {
  title: string;
  subtitle?: string;
  showSubtitle?: boolean;
  action?: React.ReactNode;
  tone?: "default" | "inverse";
  className?: string;
};

export function DashboardSectionHeader({
  title,
  subtitle,
  showSubtitle = false,
  action,
  tone = "default",
  className = "",
}: DashboardSectionHeaderProps) {
  const inverse = tone === "inverse";
  const shouldShowSubtitle = Boolean(showSubtitle && subtitle);

  return (
    <div className={`mb-4 flex flex-wrap items-start justify-between gap-3 ${className}`.trim()}>
      <div className={`min-w-0 ${shouldShowSubtitle ? "space-y-1" : ""}`.trim()}>
        <h3 className={`fh-section-title ${inverse ? "text-white" : "text-slate-900"}`}>
          {title}
        </h3>
        {shouldShowSubtitle ? <p className={`fh-section-subtitle ${inverse ? "text-white/75" : "text-slate-500"}`}>{subtitle}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

