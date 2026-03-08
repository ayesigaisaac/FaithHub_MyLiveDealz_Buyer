import React from "react";
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {}
export function Badge({ className = "", children, ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  );
}


