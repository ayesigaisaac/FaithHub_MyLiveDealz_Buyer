import React, { useMemo } from "react";
import {
  BookOpen,
  CheckCircle2,
  Landmark,
  LogOut,
  Moon,
  Radio,
  Settings,
  ShieldCheck,
  Sun,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import type { RoleKey } from "@/config/pageRegistry";
import type { ColorMode } from "@/theme/color-mode";

type RoleSwitchItem = {
  id: string;
  role: RoleKey;
  title: string;
  subtitle: string;
  targetPath: string;
  matchPrefix: string;
  icon: LucideIcon;
};

type RoleSwitchGroup = {
  label: string;
  items: RoleSwitchItem[];
};

const roleSwitcherGroups: RoleSwitchGroup[] = [
  {
    label: "LEARNERS & FAMILIES",
    items: [
      {
        id: "user-home",
        role: "user",
        title: "Switch to Faith Member",
        subtitle: "Home, discover, live, events, giving",
        targetPath: "/app/user/home",
        matchPrefix: "/app/user",
        icon: Users,
      },
      {
        id: "user-profile",
        role: "user",
        title: "Switch to Profile & Preferences",
        subtitle: "Identity, privacy, and family-ready controls",
        targetPath: "/app/user/profile",
        matchPrefix: "/app/user/profile",
        icon: BookOpen,
      },
    ],
  },
  {
    label: "TEACHING & ACADEMICS",
    items: [
      {
        id: "provider-dashboard",
        role: "provider",
        title: "Switch to Provider Workspace",
        subtitle: "Series, episodes, events, audiences, funds",
        targetPath: "/app/provider/dashboard",
        matchPrefix: "/app/provider",
        icon: Landmark,
      },
      {
        id: "provider-live-ops",
        role: "provider",
        title: "Switch to Live Operations",
        subtitle: "Studio, schedule, moderation, stream control",
        targetPath: "/app/provider/live-ops",
        matchPrefix: "/app/provider/live-ops",
        icon: Radio,
      },
    ],
  },
  {
    label: "PLATFORM LEADERSHIP",
    items: [
      {
        id: "admin-overview",
        role: "admin",
        title: "Switch to Admin Command Center",
        subtitle: "Governance, trust, policy, and security",
        targetPath: "/app/admin/overview",
        matchPrefix: "/app/admin",
        icon: ShieldCheck,
      },
    ],
  },
];

const roleFallbackItemId: Record<RoleKey, string> = {
  user: "user-home",
  provider: "provider-dashboard",
  admin: "admin-overview",
};

interface RoleSwitcherProps {
  isOpen: boolean;
  currentPath: string;
  currentRole: RoleKey;
  colorMode: ColorMode;
  onClose: () => void;
  onSwitch: (path: string) => void;
  onToggleColorMode: () => void;
  onOpenProfileSettings: () => void;
  onLogout: () => void;
  className?: string;
}

function resolveActiveItemId(currentPath: string, currentRole: RoleKey) {
  const items = roleSwitcherGroups.flatMap((group) => group.items);
  const matches = items
    .filter((item) => currentPath.startsWith(item.matchPrefix))
    .sort((a, b) => b.matchPrefix.length - a.matchPrefix.length);

  if (matches.length > 0) return matches[0]!.id;
  return roleFallbackItemId[currentRole];
}

function RoleItem({
  item,
  active,
  onSelect,
}: {
  item: RoleSwitchItem;
  active: boolean;
  onSelect: (path: string) => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => onSelect(item.targetPath)}
      className={`flex w-full items-start gap-3 rounded-xl border p-2.5 text-left transition ${
        active
          ? "border-slate-200 bg-white shadow-sm"
          : "border-transparent bg-white hover:border-slate-200 hover:bg-slate-50"
      }`}
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          active ? "border border-slate-200 bg-white text-slate-700" : "bg-slate-100 text-slate-600"
        }`}
      >
        <item.icon className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-slate-800">{item.title}</span>
        <span className="mt-0.5 block text-xs text-slate-500">{item.subtitle}</span>
      </span>
      {active ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-slate-700" /> : null}
    </button>
  );
}

export default function RoleSwitcher({
  isOpen,
  currentPath,
  currentRole,
  colorMode,
  onClose,
  onSwitch,
  onToggleColorMode,
  onOpenProfileSettings,
  onLogout,
  className = "",
}: RoleSwitcherProps) {
  const activeItemId = useMemo(() => resolveActiveItemId(currentPath, currentRole), [currentPath, currentRole]);
  const darkMode = colorMode === "dark";

  if (!isOpen) return null;

  return (
    <div
      className={`w-[20rem] rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ${className}`.trim()}
      role="dialog"
      aria-label="Account menu"
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-800">Account</h3>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close role switcher"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4">
        {roleSwitcherGroups.map((group) => (
          <div key={group.label}>
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.11em] text-slate-400">{group.label}</div>
            <div className="space-y-1.5">
              {group.items.map((item) => (
                <RoleItem key={item.id} item={item} active={item.id === activeItemId} onSelect={onSwitch} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3">
        <button
          type="button"
          onClick={onToggleColorMode}
          className="flex min-h-10 w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          {darkMode ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-slate-600" />}
          {darkMode ? "Switch to light mode" : "Switch to dark mode"}
        </button>
        <button
          type="button"
          onClick={onOpenProfileSettings}
          className="flex min-h-10 w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <Settings className="h-4 w-4 text-slate-600" />
          Profile settings
        </button>
        <button
          type="button"
          onClick={onLogout}
          className="flex min-h-10 w-full items-center gap-2 rounded-lg border border-rose-200 bg-white px-3 py-2 text-left text-sm font-medium text-rose-600 transition hover:bg-rose-50"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
