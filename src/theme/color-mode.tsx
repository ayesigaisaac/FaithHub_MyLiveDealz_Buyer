import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

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

export function ColorModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ColorMode>("light");

  useEffect(() => {
    let initial: ColorMode = "light";
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "dark" || saved === "light") initial = saved;
    } catch {
      initial = "light";
    }
    setModeState(initial);
    applyMode(initial);
  }, []);

  const setMode = (next: ColorMode) => {
    setModeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage failures (private mode, blocked storage).
    }
    applyMode(next);
  };

  const toggle = () => setMode(mode === "dark" ? "light" : "dark");

  const value = useMemo(() => ({ mode, setMode, toggle }), [mode]);
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

