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
      className={`fh-card-base rounded-[16px] ${className}`.trim()}
      style={{
        transition:
          "transform 220ms ease, box-shadow 220ms ease, background-color 220ms ease, border-color 220ms ease",
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
