import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { RoleKey } from "@/config/pageRegistry";
import type { SidebarSection } from "@/config/sidebar";

const roleLabelMap: Record<RoleKey, string> = {
  user: "User",
  provider: "Provider",
  admin: "Admin",
};

interface SidebarProps {
  role: RoleKey;
  sections: SidebarSection[];
  collapsed?: boolean;
  currentPath: string;
  onNavigate: (path: string) => void;
  onToggleCollapse?: () => void;
  compactHeight?: boolean;
}

export default function Sidebar({
  role,
  sections,
  collapsed = false,
  currentPath,
  onNavigate,
  onToggleCollapse,
  compactHeight = false,
}: SidebarProps) {
  if (collapsed) {
    return (
      <SidebarRail
        sections={sections}
        currentPath={currentPath}
        onNavigate={onNavigate}
        onToggleCollapse={onToggleCollapse}
      />
    );
  }

  return (
    <SidebarPanel
      role={role}
      sections={sections}
      currentPath={currentPath}
      onNavigate={onNavigate}
      onToggleCollapse={onToggleCollapse}
      compactHeight={compactHeight}
    />
  );
}

function SidebarPanel({
  role,
  sections,
  currentPath,
  onNavigate,
  onToggleCollapse,
  compactHeight,
}: {
  role: RoleKey;
  sections: SidebarSection[];
  currentPath: string;
  onNavigate: (path: string) => void;
  onToggleCollapse?: () => void;
  compactHeight: boolean;
}) {
  return (
    <Card className="fh-nav-shell-card h-full overflow-hidden rounded-[20px]">
      <CardContent
        className={`flex min-h-0 flex-col gap-2 overflow-hidden p-2 ${
          compactHeight ? "max-h-[74vh]" : "h-full"
        }`}
      >
        <div className="flex items-start justify-between gap-3 px-0.5">
          <div className="min-w-0">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--fh-nav-kicker)]">
              {roleLabelMap[role]}
            </div>
            <div className="mt-1 text-sm font-semibold text-[var(--fh-nav-title)]">Navigation</div>
          </div>
          {onToggleCollapse ? (
            <button
              type="button"
              aria-label="Minimize sidebar"
              onClick={onToggleCollapse}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--fh-nav-ghost-btn-border)] bg-[color:var(--fh-nav-ghost-btn-bg)] text-[var(--fh-nav-title)] transition duration-200 ease-out hover:bg-[var(--fh-nav-item-hover)]"
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
          ) : null}
        </div>

        <div className="fh-scroll-region min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
          {sections.map((section) => (
            <div key={section.id} className="space-y-1">
              <div className="flex items-center gap-2 px-3 pb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--fh-nav-kicker)]">
                <section.icon className="h-3.5 w-3.5 text-[var(--fh-nav-item-chevron)]" />
                <span className="truncate">{section.label}</span>
              </div>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const active = item.path === currentPath;
                  const ItemIcon = item.icon;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      title={item.title}
                      aria-current={active ? "page" : undefined}
                      onClick={() => onNavigate(item.path)}
                      className={`fh-interactive-card flex h-10 w-full items-center gap-2 rounded-md border px-3 text-left text-sm transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-soft)] ${
                        active
                          ? "border-[color:var(--fh-nav-item-active-border)] bg-[color:var(--fh-nav-item-active-bg)] text-[color:var(--fh-nav-item-active-fg)] shadow-[var(--fh-nav-active-shadow)]"
                          : "border-transparent text-[var(--fh-nav-item-title)] hover:bg-[color:var(--fh-nav-item-hover)]"
                      }`}
                    >
                      <ItemIcon
                        className={`h-4 w-4 shrink-0 ${
                          active ? "text-[color:var(--fh-nav-item-active-fg)]" : "text-[var(--fh-nav-item-icon-fg)]"
                        }`}
                      />
                      <span className="min-w-0 flex-1 truncate font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function SidebarRail({
  sections,
  currentPath,
  onNavigate,
  onToggleCollapse,
}: {
  sections: SidebarSection[];
  currentPath: string;
  onNavigate: (path: string) => void;
  onToggleCollapse?: () => void;
}) {
  return (
    <Card className="fh-nav-shell-card h-full overflow-hidden rounded-[20px]">
      <CardContent className="flex h-full min-h-0 flex-col items-center gap-2 p-1.5">
        {onToggleCollapse ? (
          <button
            type="button"
            aria-label="Expand sidebar"
            onClick={onToggleCollapse}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--fh-nav-ghost-btn-border)] bg-[color:var(--fh-nav-ghost-btn-bg)] text-[var(--fh-nav-title)] transition duration-200 ease-out hover:bg-[var(--fh-nav-item-hover)]"
          >
            <PanelLeftOpen className="h-4 w-4" />
          </button>
        ) : null}

        <div className="mt-1 flex w-full flex-col items-center gap-1">
          {sections.map((section) => {
            const targetPath = section.items.find((item) => item.path === currentPath)?.path || section.items[0]?.path;
            const active = section.items.some((item) => item.path === currentPath);

            if (!targetPath) return null;

            return (
              <button
                key={section.id}
                type="button"
                aria-label={section.label}
                onClick={() => onNavigate(targetPath)}
                className={`group relative fh-interactive-card inline-flex h-10 w-10 items-center justify-center rounded-lg transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-soft)] ${
                  active
                    ? "border border-[color:var(--fh-nav-item-active-border)] bg-[color:var(--fh-nav-item-active-bg)] text-[color:var(--fh-nav-rail-active-fg)] shadow-[var(--fh-nav-active-shadow)]"
                    : "text-[var(--fh-nav-rail-icon-fg)] hover:bg-[color:var(--fh-nav-item-hover)]"
                }`}
              >
                <section.icon className="h-4 w-4" />
                <span className="pointer-events-none absolute left-[calc(100%+10px)] top-1/2 z-20 -translate-y-1/2 whitespace-nowrap rounded-md bg-slate-950 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100">
                  {section.label}
                </span>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
