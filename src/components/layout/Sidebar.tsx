import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AppIcon from "@/components/ui/app-icon";
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
  onNavigate?: (path: string) => void;
  resolvePath?: (path: string) => string;
  onToggleCollapse?: () => void;
  compactHeight?: boolean;
}

function isPathActive(itemPath: string, currentPath: string) {
  if (itemPath === currentPath) return true;
  return currentPath.startsWith(`${itemPath}/`);
}

export default function Sidebar({
  role,
  sections,
  collapsed = false,
  currentPath,
  onNavigate,
  resolvePath,
  onToggleCollapse,
  compactHeight = false,
}: SidebarProps) {
  if (collapsed) {
    return (
      <SidebarRail
        sections={sections}
        currentPath={currentPath}
        onNavigate={onNavigate}
        resolvePath={resolvePath}
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
      resolvePath={resolvePath}
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
  resolvePath,
  onToggleCollapse,
  compactHeight,
}: {
  role: RoleKey;
  sections: SidebarSection[];
  currentPath: string;
  onNavigate?: (path: string) => void;
  resolvePath?: (path: string) => string;
  onToggleCollapse?: () => void;
  compactHeight: boolean;
}) {
  const [openSectionIds, setOpenSectionIds] = useState<string[]>(() => sections.map((section) => section.id));

  useEffect(() => {
    setOpenSectionIds((prev) => {
      const validIds = new Set(sections.map((section) => section.id));
      const retained = prev.filter((id) => validIds.has(id));
      const appended = sections.map((section) => section.id).filter((id) => !retained.includes(id));
      return [...retained, ...appended];
    });
  }, [sections]);

  const openSectionSet = useMemo(() => new Set(openSectionIds), [openSectionIds]);

  const toggleSection = (sectionId: string) => {
    setOpenSectionIds((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    );
  };

  return (
    <Card className="fh-nav-shell-card h-full min-h-0 overflow-hidden rounded-[24px]">
      <CardContent
        className={`flex min-h-0 flex-col gap-2 overflow-hidden ${
          compactHeight ? "h-full p-2" : "h-full p-2 lg:p-2.5"
        }`}
      >
        <div className="flex items-center justify-between gap-3 px-1">
          <div className="min-w-0">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
              {roleLabelMap[role]}
            </div>
            <div className="mt-1 text-sm font-semibold text-zinc-900">Navigation</div>
          </div>
          {onToggleCollapse ? (
            <button
              type="button"
              aria-label="Minimize sidebar"
              onClick={onToggleCollapse}
              className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 transition duration-200 ease-out hover:bg-zinc-50"
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
          ) : null}
        </div>

        <div
          className={`fh-scroll-region min-h-0 flex-1 space-y-2 overflow-y-auto pr-1 ${
            compactHeight ? "pb-1" : "pb-2"
          }`}
        >
          {sections.map((section) => (
            <div key={section.id} className="overflow-hidden rounded-[18px] border border-zinc-200 bg-white/80">
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                className={`flex w-full items-center justify-between gap-2 hover:bg-zinc-50 ${
                  compactHeight ? "px-2 py-1.5" : "px-2 py-1.5 xl:px-2.5 xl:py-2"
                }`}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <AppIcon size="sm" className="border-zinc-200 bg-zinc-100 text-zinc-700">
                    <section.icon className="h-4 w-4" />
                  </AppIcon>
                  <span className="truncate text-[11px] font-semibold uppercase tracking-[0.11em] text-zinc-500">
                    {section.label}
                  </span>
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-zinc-500 transition ${
                    openSectionSet.has(section.id) ? "rotate-0" : "-rotate-90"
                  }`}
                />
              </button>
              {openSectionSet.has(section.id) ? (
                <div className={`space-y-1 px-2 ${compactHeight ? "pb-1.5" : "pb-2"}`}>
                  {section.items.map((item) => {
                    const active = isPathActive(item.path, currentPath);
                    const ItemIcon = item.icon;
                    return (
                      <Link
                        key={item.id}
                        to={resolvePath ? resolvePath(item.path) : item.path}
                        title={item.title}
                        aria-current={active ? "page" : undefined}
                        onClick={() => onNavigate?.(item.path)}
                        className={`flex w-full items-center gap-2 rounded-2xl border px-2.5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-soft)] ${
                          compactHeight ? "h-9 text-sm" : "h-9 text-[13px] xl:h-10 xl:text-sm"
                        } ${
                          active
                            ? "border-zinc-200 bg-white text-zinc-900 shadow-sm"
                            : "border-zinc-200/80 bg-white text-zinc-700 hover:bg-zinc-50"
                        }`}
                      >
                        <AppIcon
                          size="sm"
                          tone={active ? "dark" : "neutral"}
                          className={
                            active
                              ? "border-slate-300 bg-slate-100 text-slate-700 shadow-none"
                              : "border-zinc-200 bg-zinc-100 text-zinc-700"
                          }
                        >
                          <ItemIcon className="h-4 w-4 shrink-0" />
                        </AppIcon>
                        <span className="min-w-0 flex-1 truncate font-semibold">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              ) : null}
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
  resolvePath,
  onToggleCollapse,
}: {
  sections: SidebarSection[];
  currentPath: string;
  onNavigate?: (path: string) => void;
  resolvePath?: (path: string) => string;
  onToggleCollapse?: () => void;
}) {
  return (
    <Card className="fh-nav-shell-card h-full min-h-0 overflow-hidden rounded-[24px]">
      <CardContent className="flex h-full min-h-0 flex-col items-center gap-2 p-2">
        {onToggleCollapse ? (
          <button
            type="button"
            aria-label="Expand sidebar"
            onClick={onToggleCollapse}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 transition duration-200 ease-out hover:bg-zinc-50"
          >
            <PanelLeftOpen className="h-4 w-4" />
          </button>
        ) : null}

        <div className="mt-1 flex w-full flex-col items-center gap-1">
          {sections.map((section) => {
            const targetPath =
              section.items.find((item) => isPathActive(item.path, currentPath))?.path || section.items[0]?.path;
            const active = section.items.some((item) => isPathActive(item.path, currentPath));

            if (!targetPath) return null;

            return (
              <Link
                key={section.id}
                to={resolvePath ? resolvePath(targetPath) : targetPath}
                aria-label={section.label}
                onClick={() => onNavigate?.(targetPath)}
                className={`group relative inline-flex h-10 w-10 items-center justify-center rounded-xl border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-soft)] ${
                  active
                    ? "border-zinc-200 bg-white text-zinc-900 shadow-sm"
                    : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
                }`}
              >
                <section.icon className="h-4 w-4" />
                <span className="pointer-events-none absolute left-[calc(100%+10px)] top-1/2 z-20 -translate-y-1/2 whitespace-nowrap rounded-md bg-zinc-950 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-sm transition duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100">
                  {section.label}
                </span>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
