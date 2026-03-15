import type { ReactNode } from "react";

export type PageStateKind = "loading" | "empty" | "offline" | "error";

export type QuickAction = {
  id: string;
  label: string;
  dataActionLabel?: string;
  onClick?: () => void;
  icon?: ReactNode;
  variant?: "default" | "outline" | "ghost";
  disabled?: boolean;
};
