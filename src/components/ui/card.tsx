import React from "react";
import MuiCard, { CardProps as MuiCardProps } from "@mui/material/Card";


export interface CardProps extends MuiCardProps {}
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card({ className, sx, ...props }, ref) {
  return (
    <MuiCard
      ref={ref}
      elevation={0}
      className={className}
      sx={{
        borderRadius: "22px",
        border: "1px solid var(--border)",
        backgroundColor: "var(--card)",
        boxShadow: "var(--shadow-soft)",
        color: "var(--text-primary)",
        transition: "transform 200ms ease, box-shadow 200ms ease, background-color 200ms ease, border-color 200ms ease",
        "&:hover": { transform: "translateY(-2px)" },
        ...(sx || {}),
      }}
      {...props}
    />
  );
});

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(function CardContent({ className, ...props }, ref) {
  return <div ref={ref} className={className} {...props} />;
});

