import React from "react";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";

type Variant = "default" | "outline" | "ghost";
export interface ButtonProps extends Omit<MuiButtonProps, "variant"> { variant?: Variant; }

function resolveStyles(variant: Variant): { variant: MuiButtonProps["variant"]; sx: any } {
  if (variant === "outline") {
    return {
      variant: "outlined",
      sx: {
        borderColor: "#cbd5e1",
        color: "#0f172a",
        textTransform: "none",
        boxShadow: "none",
        backgroundColor: "#ffffff",
        '&:hover': { borderColor: "rgba(3,205,140,0.45)", backgroundColor: "#f7fffb", boxShadow: "none" },
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
      boxShadow: "0 10px 24px -16px rgba(3, 205, 140, 0.65)",
      backgroundColor: "#03cd8c",
      color: "#06281e",
      '&:hover': { backgroundColor: "#02b67c", boxShadow: "0 10px 24px -16px rgba(3, 205, 140, 0.75)" },
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
      sx={{
        borderRadius: "14px",
        minHeight: 42,
        paddingInline: "14px",
        fontWeight: 700,
        fontSize: "0.9rem",
        letterSpacing: "0.01em",
        ...(resolved.sx || {}),
        ...((sx as any) || {}),
      } as any}
    />
  );
});
