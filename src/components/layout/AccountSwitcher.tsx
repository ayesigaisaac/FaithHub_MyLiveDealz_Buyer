import React, { useEffect } from "react";
import {
  CheckCircle2,
  Landmark,
  LogOut,
  Moon,
  Settings,
  ShieldCheck,
  Sun,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { routes } from "@/constants/routes";
import type { Role } from "@/types/roles";
import type { ColorMode } from "@/theme/color-mode";

type RoleOption = {
  role: Role;
  label: string;
  subtitle: string;
  path: string;
  icon: LucideIcon;
};

const roleOptions: RoleOption[] = [
  {
    role: "user",
    label: "User Workspace",
    subtitle: "Home, series, live, and community",
    path: routes.app.user.home,
    icon: Users,
  },
  {
    role: "provider",
    label: "Provider Workspace",
    subtitle: "Content, analytics, events, and audience",
    path: routes.app.provider.dashboard,
    icon: Landmark,
  },
  {
    role: "admin",
    label: "Admin Command Center",
    subtitle: "Policy, security, finance, and governance",
    path: routes.app.admin.overview,
    icon: ShieldCheck,
  },
];

interface AccountSwitcherProps {
  isOpen: boolean;
  currentRole: Role;
  colorMode: ColorMode;
  onClose: () => void;
  onSwitchRole: (role: Role, path: string) => void;
  onToggleColorMode: () => void;
  onOpenProfileSettings: () => void;
  onLogout: () => void;
}

export default function AccountSwitcher({
  isOpen,
  currentRole,
  colorMode,
  onClose,
  onSwitchRole,
  onToggleColorMode,
  onOpenProfileSettings,
  onLogout,
}: AccountSwitcherProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
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
        role="dialog"
        aria-label="Account switcher"
        className={`absolute right-0 top-0 h-full w-[min(22rem,92vw)] border-l border-[var(--border)] bg-[var(--panel)] shadow-[0_0_0_1px_rgba(255,255,255,0.04)] transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted,#6B7280)]">Account</p>
              <h2 className="text-sm font-semibold text-[var(--text-primary)]">Switch Workspace</h2>
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
            <section className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.11em] text-[var(--text-muted,#6B7280)]">Roles</p>
              {roleOptions.map((option) => {
                const active = option.role === currentRole;
                return (
                  <button
                    key={option.role}
                    type="button"
                    onClick={() => onSwitchRole(option.role, option.path)}
                    className={`group flex w-full items-start gap-3 rounded-xl border p-3 text-left transition ${
                      active
                        ? "border-[rgba(34,197,94,0.35)] bg-[rgba(34,197,94,0.15)]"
                        : "border-[var(--border)] bg-[var(--card)] hover:border-[rgba(34,197,94,0.22)] hover:bg-[var(--fh-elevated-surface)]"
                    }`}
                  >
                    <span
                      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        active
                          ? "bg-[rgba(34,197,94,0.18)] text-[#22C55E]"
                          : "bg-[var(--fh-elevated-surface)] text-[var(--text-secondary)]"
                      }`}
                    >
                      <option.icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[var(--text-primary)]">{option.label}</span>
                        {active ? (
                          <span className="rounded-full bg-[rgba(34,197,94,0.18)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#22C55E]">
                            Current
                          </span>
                        ) : null}
                      </span>
                      <span className="mt-1 block text-xs text-[var(--text-secondary)]">{option.subtitle}</span>
                    </span>
                    {active ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#22C55E]" /> : null}
                  </button>
                );
              })}
            </section>

            <div className="border-t border-[var(--border)] pt-4">
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
            <button
              type="button"
              onClick={onLogout}
              className="flex min-h-10 w-full items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-left text-sm font-medium text-rose-400 transition hover:bg-[var(--fh-elevated-surface)]"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
