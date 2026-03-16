import React from "react";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import type { SxProps, Theme } from "@mui/material/styles";

type Variant = "default" | "outline" | "ghost";
type UiSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<MuiButtonProps, "variant"> {
  variant?: Variant;
  uiSize?: UiSize;
}

function resolveStyles(variant: Variant): { variant: MuiButtonProps["variant"]; sx: SxProps<Theme> } {
  if (variant === "outline") {
    return {
      variant: "outlined",
      sx: {
        borderColor: "var(--border)",
        color: "var(--text-primary)",
        textTransform: "none",
        boxShadow: "none",
        backgroundColor: "var(--surface)",
        "&:hover": {
          borderColor: "var(--accent)",
          backgroundColor: "var(--accent-soft)",
          boxShadow: "var(--shadow-soft)",
        },
      },
    };
  }

  if (variant === "ghost") {
    return {
      variant: "text",
      sx: {
        textTransform: "none",
        color: "var(--text-secondary)",
        "&:hover": {
          backgroundColor: "var(--accent-soft)",
          color: "var(--text-primary)",
        },
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
      "&:hover": {
        backgroundColor: "var(--accent)",
        filter: "brightness(0.98)",
        boxShadow: "0 8px 18px rgba(16, 185, 129, 0.18)",
      },
    },
  };
}

function resolveSize(uiSize: UiSize): SxProps<Theme> {
  if (uiSize === "sm") {
    return {
      minHeight: 40,
      paddingInline: "14px",
      fontSize: "0.88rem",
    };
  }

  if (uiSize === "lg") {
    return {
      minHeight: 50,
      paddingInline: "20px",
      fontSize: "0.98rem",
    };
  }

  return {
    minHeight: 44,
    paddingInline: "16px",
    fontSize: "0.93rem",
  };
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "default", uiSize = "md", className, sx, ...props },
  ref,
) {
  const resolved = resolveStyles(variant);
  const sizeStyles = resolveSize(uiSize);

  return (
    <MuiButton
      ref={ref}
      {...props}
      variant={resolved.variant}
      className={className}
      sx={[
        {
          borderRadius: "12px",
          fontWeight: 700,
          letterSpacing: "0.01em",
          lineHeight: 1.2,
          whiteSpace: "nowrap",
          transition: "all 180ms ease",
        },
        sizeStyles,
        resolved.sx,
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    />
  );
});
