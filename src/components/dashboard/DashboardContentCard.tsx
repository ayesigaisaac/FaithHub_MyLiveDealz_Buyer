import React from "react";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AppIcon from "@/components/ui/app-icon";

export interface DashboardContentAction {
  id: string;
  label: string;
  variant?: "default" | "outline" | "ghost";
  onClick: () => void;
}

export interface DashboardContentCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  metadata: string[];
  actions: DashboardContentAction[];
  highlight?: "default" | "accent" | "warning";
}

function iconTone(highlight: DashboardContentCardProps["highlight"]): "green" | "orange" | "neutral" {
  if (highlight === "accent") return "green";
  if (highlight === "warning") return "orange";
  return "neutral";
}

function highlightClass(highlight: DashboardContentCardProps["highlight"]) {
  if (highlight === "accent") return "border-[rgba(3,205,140,0.32)]";
  if (highlight === "warning") return "border-[rgba(247,127,0,0.34)]";
  return "border-[var(--border)]";
}

export function DashboardContentCard({
  icon: Icon,
  title,
  description,
  metadata,
  actions,
  highlight = "default",
}: DashboardContentCardProps) {
  return (
    <Card className={`fh-interactive-card fh-surface-card rounded-2xl ${highlightClass(highlight)}`}>
      <CardContent className="fh-pad-panel space-y-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-2">
            <AppIcon tone={iconTone(highlight)} size="md">
              <Icon className="h-4.5 w-4.5" />
            </AppIcon>
            <div className="space-y-1">
              <h3 className="text-base font-semibold leading-tight text-[var(--text-primary)]">{title}</h3>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{description}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {metadata.map((item) => (
            <span
              key={item}
              className="rounded-full border border-[var(--border)] bg-[var(--panel)] px-2.5 py-1 text-[11px] font-semibold tracking-[0.04em] text-[var(--text-secondary)]"
            >
              {item}
            </span>
          ))}
        </div>

        {actions.length ? (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {actions.map((action) => (
              <Button
                key={action.id}
                type="button"
                variant={action.variant || "outline"}
                uiSize="sm"
                onClick={action.onClick}
                data-no-nav
                className="h-9 w-full rounded-xl px-2 text-xs"
              >
                {action.label}
              </Button>
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
