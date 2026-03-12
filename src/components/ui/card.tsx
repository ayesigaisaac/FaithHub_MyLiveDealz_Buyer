import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  sx?: React.CSSProperties;
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { className = "", sx, style, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={`rounded-[16px] ${className}`.trim()}
      style={{
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-soft)",
        transition: "transform 200ms ease, box-shadow 200ms ease, background-color 200ms ease, border-color 200ms ease",
        ...sx,
        ...style,
      }}
      {...props}
    />
  );
});

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(function CardContent({ className, ...props }, ref) {
  return <div ref={ref} className={className} {...props} />;
});
