import React from "react";
import { CheckCircle2, Landmark, ShieldCheck, Users, type LucideIcon } from "lucide-react";
import type { Role } from "@/types/roles";

type RoleOption = {
  role: Role;
  label: string;
  path: string;
  icon: LucideIcon;
};

const roleOptions: RoleOption[] = [
  {
    role: "admin",
    label: "Admin",
    path: "/admin",
    icon: ShieldCheck,
  },
  {
    role: "user",
    label: "User",
    path: "/home",
    icon: Users,
  },
  {
    role: "provider",
    label: "Provider",
    path: "/provider",
    icon: Landmark,
  },
];

interface RoleSwitcherProps {
  currentRole: Role;
  collapsed?: boolean;
  onSelectRole: (role: Role, path: string) => void;
}

export default function RoleSwitcher({
  currentRole,
  collapsed = false,
  onSelectRole,
}: RoleSwitcherProps) {
  return (
    <section className="mb-2 space-y-1.5" aria-label="Workspace role switcher">
      {!collapsed ? (
        <div className="px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted,#6B7280)]">
          Workspace role
        </div>
      ) : null}

      <div className={`space-y-1 ${collapsed ? "items-center" : ""}`}>
        {roleOptions.map((option) => {
          const active = option.role === currentRole;
          return (
            <button
              key={option.role}
              type="button"
              title={option.label}
              aria-label={`Switch to ${option.label}`}
              onClick={() => onSelectRole(option.role, option.path)}
              className={`fh-sidebar-item group relative flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(3,205,140,0.34)] ${
                collapsed ? "h-10 w-10 justify-center px-0" : ""
              } ${active ? "is-active" : ""}`}
              aria-pressed={active}
            >
              <option.icon
                className={`h-4 w-4 shrink-0 ${active ? "text-[var(--accent)]" : "text-[var(--text-secondary)]"}`}
              />

              {!collapsed ? (
                <>
                  <span className="min-w-0 flex-1 truncate">{option.label}</span>
                  {active ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                  ) : null}
                </>
              ) : active ? (
                <CheckCircle2 className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full bg-[var(--panel)] text-[var(--accent)]" />
              ) : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}
