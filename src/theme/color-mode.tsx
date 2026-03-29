import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type ColorMode = "light" | "dark";

const STORAGE_KEY = "faithhub-color-mode";

type ColorModeContextValue = {
  mode: ColorMode;
  setMode: (mode: ColorMode) => void;
  toggle: () => void;
};

const ColorModeContext = createContext<ColorModeContextValue | undefined>(undefined);

function applyMode(mode: ColorMode) {
  const root = document.documentElement;
  root.setAttribute("data-theme", mode);
  root.style.colorScheme = mode === "dark" ? "dark" : "light";
}

function getInitialMode(): ColorMode {
  if (typeof window === "undefined") return "light";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "dark" || saved === "light") return saved;
  } catch {
    // Ignore storage failures and continue with system preference fallback.
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ColorModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ColorMode>(() => getInitialMode());

  useEffect(() => {
    applyMode(mode);
    try {
      window.localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // Ignore storage failures (private mode, blocked storage).
    }
  }, [mode]);

  const setMode = useCallback((next: ColorMode) => {
    setModeState((prev) => (prev === next ? prev : next));
  }, []);

  const toggle = useCallback(() => {
    setModeState((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(() => ({ mode, setMode, toggle }), [mode, setMode, toggle]);
  return <ColorModeContext.Provider value={value}>{children}</ColorModeContext.Provider>;
}

export function useColorMode(): ColorModeContextValue {
  const ctx = useContext(ColorModeContext);
  if (!ctx) {
    // Fallback prevents runtime crashes if provider is not mounted for some reason.
    return { mode: "light", setMode: () => {}, toggle: () => {} };
  }
  return ctx;
}
