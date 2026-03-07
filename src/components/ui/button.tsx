import React from "react";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";

type Variant = "default" | "outline" | "ghost";
export interface ButtonProps extends Omit<MuiButtonProps, "variant"> { variant?: Variant; }

function resolveStyles(variant: Variant): { variant: MuiButtonProps["variant"]; sx: any } {
  if (variant === "outline") {
    return {
      variant: "outlined",
      sx: {
        borderColor: "#e2e8f0",
        color: "#0f172a",
        textTransform: "none",
        boxShadow: "none",
        '&:hover': { borderColor: 'rgba(3,205,140,0.35)', backgroundColor: '#f7fffb', boxShadow: 'none' },
      },
    };
  }
  if (variant === "ghost") {
    return {
      variant: "text",
      sx: {
        textTransform: "none",
        color: "#03cd8c",
        '&:hover': { backgroundColor: 'rgba(3,205,140,0.10)' },
      },
    };
  }
  return {
    variant: "contained",
    sx: {
      textTransform: "none",
      boxShadow: "none",
      backgroundColor: '#03cd8c',
      '&:hover': { backgroundColor: '#02b67c', boxShadow: 'none' },
    },
  };
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "default", className, sx, ...props },
  ref
) {
  const resolved = resolveStyles(variant);
  return (
    <MuiButton
      ref={ref}
      {...props}
      variant={resolved.variant}
      className={className}
      sx={{ borderRadius: "16px", minHeight: 44, fontWeight: 600, ...(resolved.sx || {}), ...((sx as any) || {}) } as any}
    />
  );
});
