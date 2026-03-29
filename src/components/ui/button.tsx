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
        borderColor: "var(--button-secondary-border)",
        color: "var(--text-primary)",
        textTransform: "none",
        boxShadow: "none",
        backgroundColor: "transparent",
        "&:hover": {
          borderColor: "var(--button-secondary-border)",
          backgroundColor: "var(--button-secondary-hover)",
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
        color: "var(--text-primary)",
        "&:hover": {
          backgroundColor: "var(--accent-soft)",
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
        backgroundColor: "var(--accent-strong)",
        boxShadow: "0 12px 24px rgba(3, 205, 140, 0.24)",
      },
    },
  };
}

function resolveSize(uiSize: UiSize): SxProps<Theme> {
  if (uiSize === "sm") {
    return {
      minHeight: { xs: 40, sm: 40 },
      px: { xs: 1.4, sm: 1.75 },
      fontSize: { xs: "0.84rem", sm: "0.9rem" },
    };
  }

  if (uiSize === "lg") {
    return {
      minHeight: { xs: 48, sm: 50 },
      px: { xs: 2.25, sm: 2.5 },
      fontSize: { xs: "0.94rem", sm: "0.98rem" },
    };
  }

  return {
    minHeight: { xs: 44, sm: 44 },
    px: { xs: 1.75, sm: 2 },
    fontSize: { xs: "0.9rem", sm: "0.94rem" },
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
          lineHeight: 1.25,
          whiteSpace: "normal",
          textAlign: "center",
          wordBreak: "break-word",
          overflowWrap: "anywhere",
          hyphens: "auto",
          minWidth: { xs: 104, sm: 96 },
          maxWidth: "100%",
          overflow: "visible",
          textOverflow: "clip",
          flexWrap: "wrap",
          gap: "0.45rem",
          transition: "all 180ms ease",
          "& .MuiButton-startIcon, & .MuiButton-endIcon": {
            margin: 0,
            flexShrink: 0,
          },
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
