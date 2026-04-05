import React, { useEffect, useRef } from "react";
import {
  LogOut,
  Moon,
  Settings,
  Sun,
  X,
} from "lucide-react";
import type { ColorMode } from "@/theme/color-mode";

interface AccountSwitcherProps {
  isOpen: boolean;
  colorMode: ColorMode;
  onClose: () => void;
  onToggleColorMode: () => void;
  onOpenProfileSettings: () => void;
  onLogout: () => void;
  onLogoutAllRoles: () => void;
}

export default function AccountSwitcher({
  isOpen,
  colorMode,
  onClose,
  onToggleColorMode,
  onOpenProfileSettings,
  onLogout,
  onLogoutAllRoles,
}: AccountSwitcherProps) {
  const panelRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  const darkMode = colorMode === "dark";

  return (
    <div
      className={`fixed inset-0 z-[80] ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        aria-label="Close account panel"
        onClick={onClose}
        className={`absolute inset-0 bg-slate-950/45 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Account switcher"
        tabIndex={-1}
        className={`absolute right-0 top-0 h-full w-[min(22rem,92vw)] border-l border-[var(--border)] bg-[var(--panel)] shadow-[0_0_0_1px_rgba(255,255,255,0.04)] transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(3,205,140,0.34)]`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted,#6B7280)]">Account</p>
              <h2 className="text-sm font-semibold text-[var(--text-primary)]">Preferences</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close switcher"
              className="fh-shell-control inline-flex h-9 w-9 items-center justify-center rounded-xl text-[var(--text-secondary)]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="fh-scroll-region flex-1 space-y-4 overflow-y-auto p-4">
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.11em] text-[var(--text-muted,#6B7280)]">Preferences</p>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={onToggleColorMode}
                  className="flex min-h-10 w-full items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-left text-sm font-medium text-[var(--text-secondary)] transition hover:bg-[var(--fh-elevated-surface)] hover:text-[var(--text-primary)]"
                >
                  {darkMode ? (
                    <Sun className="h-4 w-4 text-amber-500" />
                  ) : (
                    <Moon className="h-4 w-4 text-[var(--text-secondary)]" />
                  )}
                  {darkMode ? "Switch to light mode" : "Switch to dark mode"}
                </button>
                <button
                  type="button"
                  onClick={onOpenProfileSettings}
                  className="flex min-h-10 w-full items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-left text-sm font-medium text-[var(--text-secondary)] transition hover:bg-[var(--fh-elevated-surface)] hover:text-[var(--text-primary)]"
                >
                  <Settings className="h-4 w-4 text-[var(--text-secondary)]" />
                  Profile settings
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-[var(--border)] p-4">
            <div className="space-y-2">
              <button
                type="button"
                onClick={onLogout}
                className="flex min-h-10 w-full items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-left text-sm font-medium text-rose-400 transition hover:bg-[var(--fh-elevated-surface)]"
              >
                <LogOut className="h-4 w-4" />
                Logout current role
              </button>
              <button
                type="button"
                onClick={onLogoutAllRoles}
                className="flex min-h-10 w-full items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-left text-sm font-medium text-rose-500 transition hover:bg-[var(--fh-elevated-surface)]"
              >
                <LogOut className="h-4 w-4" />
                Logout all roles
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
