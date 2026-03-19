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
          borderColor: "var(--border)",
          backgroundColor: "var(--surface)",
          boxShadow: "none",
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
          backgroundColor: "transparent",
          color: "var(--text-secondary)",
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
        filter: "none",
        boxShadow: "var(--shadow-soft)",
      },
    },
  };
}

function resolveSize(uiSize: UiSize): SxProps<Theme> {
  if (uiSize === "sm") {
    return {
      minHeight: { xs: 42, sm: 40 },
      px: { xs: 1.5, sm: 1.75 },
      fontSize: { xs: "0.84rem", sm: "0.88rem" },
    };
  }

  if (uiSize === "lg") {
    return {
      minHeight: { xs: 50, sm: 50 },
      px: { xs: 2.25, sm: 2.5 },
      fontSize: { xs: "0.94rem", sm: "0.98rem" },
    };
  }

  return {
    minHeight: { xs: 46, sm: 44 },
    px: { xs: 1.75, sm: 2 },
    fontSize: { xs: "0.89rem", sm: "0.93rem" },
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
          "@media (max-width:640px)": {
            borderRadius: "11px",
          },
        },
        sizeStyles,
        resolved.sx,
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    />
  );
});
