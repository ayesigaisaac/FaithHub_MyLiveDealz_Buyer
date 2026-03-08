import React from "react";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";

type Variant = "default" | "outline" | "ghost";
export interface ButtonProps extends Omit<MuiButtonProps, "variant"> { variant?: Variant; }

function resolveStyles(variant: Variant): { variant: MuiButtonProps["variant"]; sx: any } {
  if (variant === "outline") {
    return {
      variant: "outlined",
      sx: {
        borderColor: "var(--border)",
        color: "var(--text-primary)",
        textTransform: "none",
        boxShadow: "none",
        backgroundColor: "transparent",
        "&:hover": { borderColor: "var(--accent)", backgroundColor: "var(--accent-soft)", boxShadow: "none" },
      },
    };
  }
  if (variant === "ghost") {
    return {
      variant: "text",
      sx: {
        textTransform: "none",
        color: "var(--text-secondary)",
        "&:hover": { backgroundColor: "var(--accent-soft)", color: "var(--text-primary)" },
      },
    };
  }
  return {
    variant: "contained",
    sx: {
      textTransform: "none",
      boxShadow: "var(--shadow-soft)",
      backgroundColor: "var(--accent)",
      color: "#ffffff",
      "&:hover": { backgroundColor: "var(--accent)", filter: "brightness(1.06)", boxShadow: "var(--shadow-soft)" },
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

