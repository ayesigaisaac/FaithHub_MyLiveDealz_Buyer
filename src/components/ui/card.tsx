import React from "react";
import MuiCard, { CardProps as MuiCardProps } from "@mui/material/Card";
import MuiCardContent, { CardContentProps as MuiCardContentProps } from "@mui/material/CardContent";

export interface CardProps extends MuiCardProps {}
export interface CardContentProps extends MuiCardContentProps {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card({ className, sx, ...props }, ref) {
  return (
    <MuiCard
      ref={ref}
      elevation={0}
      className={className}
      sx={{
        borderRadius: "22px",
        border: "1px solid rgba(148, 163, 184, 0.25)",
        backgroundColor: "#ffffff",
        boxShadow: "0 10px 30px -24px rgba(15, 23, 42, 0.45)",
        ...(sx || {}),
      }}
      {...props}
    />
  );
});

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(function CardContent({ className, sx, ...props }, ref) {
  return <MuiCardContent ref={ref} className={className} sx={{ padding: 0, "&:last-child": { paddingBottom: 0 }, ...(sx || {}) }} {...props} />;
});

