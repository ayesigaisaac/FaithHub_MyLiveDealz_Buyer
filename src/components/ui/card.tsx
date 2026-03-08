import React from "react";
import MuiCard, { CardProps as MuiCardProps } from "@mui/material/Card";
import MuiCardContent, { CardContentProps as MuiCardContentProps } from "@mui/material/CardContent";

export interface CardProps extends MuiCardProps {}
export interface CardContentProps extends MuiCardContentProps {}
export interface CardSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

function joinClassNames(...parts: Array<string | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

function normalizeCardClassName(className?: string): string {
  if (!className) return "min-w-0 h-auto overflow-visible rounded-xl border border-slate-200 bg-white shadow-sm";
  const cleaned = className
    .replace(/\boverflow-hidden\b/g, "overflow-visible")
    .replace(/\brounded-\[[^\]]+\]/g, "rounded-xl")
    .replace(/\bborder-white\/\d+\b/g, "border-slate-200")
    .replace(/\bbg-white\/\d+\b/g, "bg-white")
    .replace(/\s+/g, " ")
    .trim();
  return joinClassNames("min-w-0 h-auto overflow-visible rounded-xl border border-slate-200 shadow-sm", cleaned);
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card({ className, sx, ...props }, ref) {
  return (
    <MuiCard
      ref={ref}
      elevation={0}
      className={normalizeCardClassName(className)}
      sx={{
        borderRadius: 12,
        border: "1px solid rgba(148, 163, 184, 0.25)",
        backgroundColor: "#ffffff",
        boxShadow: "0 6px 18px -12px rgba(15, 23, 42, 0.35)",
        overflow: "visible",
        minWidth: 0,
        height: "auto",
        ...(sx || {}),
      }}
      {...props}
    />
  );
});

export const CardHeader = React.forwardRef<HTMLDivElement, CardSectionProps>(function CardHeader({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={joinClassNames("min-w-0 flex flex-col gap-2 border-b border-slate-200 px-4 py-4 sm:px-5", className)}
      {...props}
    />
  );
});

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(function CardContent({ className, sx, ...props }, ref) {
  return (
    <MuiCardContent
      ref={ref}
      className={joinClassNames("min-w-0 flex flex-col gap-2 px-4 py-4 sm:px-5", className)}
      sx={{ "&:last-child": { paddingBottom: 16 }, minWidth: 0, overflow: "visible", height: "auto", ...(sx || {}) }}
      {...props}
    />
  );
});

export const CardFooter = React.forwardRef<HTMLDivElement, CardSectionProps>(function CardFooter({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={joinClassNames("min-w-0 flex flex-wrap items-center gap-2 border-t border-slate-200 px-4 py-4 sm:px-5", className)}
      {...props}
    />
  );
});

