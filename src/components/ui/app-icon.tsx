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
  if (tone === "soft") return "border border-slate-200 bg-white text-slate-600 shadow-sm";
  if (tone === "green") return "border border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm";
  if (tone === "orange") return "border border-orange-200 bg-orange-50 text-orange-700 shadow-sm";
  if (tone === "dark") return "border border-slate-300 bg-white text-slate-800 shadow-sm";
  return "border border-slate-200 bg-slate-100 text-slate-700 shadow-sm";
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
