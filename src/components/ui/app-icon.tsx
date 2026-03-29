import React from "react";

type AppIconTone = "neutral" | "soft" | "green" | "orange" | "dark";
type AppIconSize = "sm" | "md" | "lg";

export interface AppIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: AppIconTone;
  size?: AppIconSize;
  children: React.ReactNode;
}

function sizeClass(size: AppIconSize) {
  if (size === "sm") return "h-8 w-8 rounded-xl";
  if (size === "lg") return "h-11 w-11 rounded-2xl";
  return "h-10 w-10 rounded-2xl";
}

function toneClass(tone: AppIconTone) {
  if (tone === "soft") return "border border-[var(--border)] bg-[var(--card)] text-[var(--text-secondary)] shadow-sm";
  if (tone === "green") return "border border-[rgba(3,205,140,0.3)] bg-[rgba(3,205,140,0.14)] text-[var(--accent)] shadow-sm";
  if (tone === "orange") return "border border-[rgba(247,127,0,0.3)] bg-[rgba(247,127,0,0.14)] text-[#f77f00] shadow-sm";
  if (tone === "dark") return "border border-[var(--border)] bg-[var(--card)] text-[var(--text-primary)] shadow-sm";
  return "border border-[var(--border)] bg-[var(--neutral-light)] text-[var(--text-secondary)] shadow-sm";
}

export default function AppIcon({
  tone = "neutral",
  size = "md",
  className = "",
  children,
  ...props
}: AppIconProps) {
  return (
    <span
      className={`fh-app-icon inline-flex shrink-0 items-center justify-center ${sizeClass(size)} ${toneClass(tone)} ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  );
}
