import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronsLeft, ChevronsRight, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AppIcon from "@/components/ui/app-icon";
import type { SidebarSection } from "@/config/sidebar";

interface SidebarProps {
  sections: SidebarSection[];
  collapsed?: boolean;
  currentPath: string;
  onNavigate?: (path: string) => void;
  resolvePath?: (path: string) => string;
  onToggleCollapse?: () => void;
  onClose?: () => void;
  compactHeight?: boolean;
}

function isPathActive(itemPath: string, currentPath: string) {
  if (itemPath === currentPath) return true;
  return currentPath.startsWith(`${itemPath}/`);
}

function getSectionDomId(sectionId: string) {
  return `sidebar-section-${sectionId.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}

export default function Sidebar({
  sections,
  collapsed = false,
  currentPath,
  onNavigate,
  resolvePath,
  onToggleCollapse,
  onClose,
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
      sections={sections}
      currentPath={currentPath}
      onNavigate={onNavigate}
      resolvePath={resolvePath}
      onToggleCollapse={onToggleCollapse}
      onClose={onClose}
      compactHeight={compactHeight}
    />
  );
}

function SidebarPanel({
  sections,
  currentPath,
  onNavigate,
  resolvePath,
  onToggleCollapse,
  onClose,
  compactHeight,
}: {
  sections: SidebarSection[];
  currentPath: string;
  onNavigate?: (path: string) => void;
  resolvePath?: (path: string) => string;
  onToggleCollapse?: () => void;
  onClose?: () => void;
  compactHeight: boolean;
}) {
  const [openSectionId, setOpenSectionId] = useState<string>("");

  useEffect(() => {
    if (!sections.length) {
      setOpenSectionId("");
      return;
    }

    const activeSectionId =
      sections.find((section) => section.items.some((item) => isPathActive(item.path, currentPath)))?.id ||
      sections[0].id;

    setOpenSectionId((prev) => {
      if (!prev) return activeSectionId;
      const currentSection = sections.find((section) => section.id === prev);
      if (!currentSection) return activeSectionId;
      const stillActiveSection = currentSection.items.some((item) => isPathActive(item.path, currentPath));
      return stillActiveSection ? prev : activeSectionId;
    });
  }, [sections, currentPath]);

  const toggleSection = (sectionId: string) => {
    setOpenSectionId((prev) => (prev === sectionId ? "" : sectionId));
  };

  return (
    <Card className="fh-nav-shell-card h-full min-h-0 overflow-hidden rounded-[22px] border border-[var(--fh-nav-shell-border)] bg-[color:var(--fh-nav-shell-bg)] shadow-[0_16px_32px_rgba(15,23,42,0.1)]">
      <CardContent
        className={`flex min-h-0 flex-col overflow-hidden ${
          compactHeight ? "h-full gap-2 p-2" : "h-full gap-2.5 p-2 lg:p-2.5"
        }`}
      >
        <div className={`flex items-start justify-between gap-3 ${compactHeight ? "px-1 pt-1" : "px-0.5 pt-0.5"}`}>
          <div className="min-w-0">
            <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--fh-nav-kicker)]">Navigation</div>
            <div className="mt-1 text-[1.02rem] font-semibold text-[var(--fh-nav-title)]">
              {compactHeight ? "Quick Access" : "Workspace Modules"}
            </div>
          </div>
          {onClose ? (
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--fh-nav-ghost-btn-border)] bg-[color:var(--fh-nav-ghost-btn-bg)] text-[var(--fh-nav-title)] transition duration-200 ease-out hover:bg-[color:var(--fh-nav-ghost-btn-hover)]"
            >
              <X className="h-4 w-4" />
            </button>
          ) : onToggleCollapse ? (
            <button
              type="button"
              aria-label="Minimize sidebar"
              onClick={onToggleCollapse}
              className="inline-flex h-10 w-10 items-center justify-center rounded-[14px] border border-[var(--fh-nav-ghost-btn-border)] bg-[color:var(--fh-nav-ghost-btn-bg)] text-[var(--fh-nav-title)] transition duration-200 ease-out hover:bg-[color:var(--fh-nav-ghost-btn-hover)]"
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>
          ) : null}
        </div>

        <div
          className={`fh-scroll-region min-h-0 flex-1 space-y-2 overflow-y-auto pr-1.5 ${
            compactHeight ? "pb-1" : "pb-2.5"
          }`}
        >
          {sections.map((section) => {
            const expanded = openSectionId === section.id;
            const sectionDomId = getSectionDomId(section.id);
            const triggerId = `${sectionDomId}-trigger`;
            const panelId = `${sectionDomId}-panel`;
            return (
              <div
                key={section.id}
                className="overflow-hidden rounded-[20px] border border-[var(--fh-nav-section-border)] bg-[color:var(--fh-nav-section-bg)]"
              >
                <button
                  id={triggerId}
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => toggleSection(section.id)}
                  className={`group flex w-full items-center justify-between gap-3 ${
                    expanded ? "" : "hover:bg-[color:var(--fh-nav-item-hover)]"
                  } ${
                    compactHeight ? "px-2.5 py-2.5" : "px-3 py-3"
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <AppIcon
                      size="sm"
                      className={`border-[var(--fh-nav-section-border)] bg-[color:var(--fh-nav-section-icon-bg)] text-[var(--fh-nav-section-icon-fg)] shadow-none ${
                        compactHeight ? "h-10 w-10 rounded-[12px]" : "h-11 w-11 rounded-[13px]"
                      }`}
                    >
                      <section.icon className={compactHeight ? "h-[0.95rem] w-[0.95rem]" : "h-4 w-4"} />
                    </AppIcon>
                    <span className={`font-semibold uppercase tracking-[0.12em] text-[var(--fh-nav-muted)] ${compactHeight ? "text-[0.98rem]" : "text-[1rem]"}`}>
                      {section.label}
                    </span>
                  </span>
                  <span className="relative inline-flex h-8 w-8 items-center justify-center">
                    <ChevronRight
                      className={`h-5 w-5 text-[var(--fh-nav-item-chevron)] transition ${
                        expanded ? "rotate-90" : "rotate-0"
                      }`}
                    />
                  </span>
                </button>
                {expanded ? (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    className={`space-y-2 border-t border-[var(--fh-nav-section-divider)] px-3 pt-3 ${
                      compactHeight ? "pb-2" : "pb-3"
                    }`}
                  >
                    {section.items.map((item) => {
                      const active = isPathActive(item.path, currentPath);
                      return (
                        <Link
                          key={item.id}
                          to={resolvePath ? resolvePath(item.path) : item.path}
                          title={item.title}
                          aria-current={active ? "page" : undefined}
                          onClick={() => onNavigate?.(item.path)}
                        className={`block w-full rounded-[14px] border px-3 py-2.5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-soft)] ${
                            active
                              ? "border-[var(--fh-nav-item-active-border)] bg-[color:var(--fh-nav-item-active-bg)] text-[var(--fh-nav-item-active-fg)] shadow-sm"
                              : "border-transparent bg-[color:var(--fh-nav-item-bg)] text-[var(--fh-nav-item-title)] hover:border-[var(--fh-nav-item-hover-border)] hover:bg-[color:var(--fh-nav-item-hover)]"
                          }`}
                        >
                          <div className={`break-words font-semibold leading-snug ${compactHeight ? "text-[0.96rem]" : "text-[1.02rem]"}`}>
                            {item.label}
                          </div>
                          {item.subtitle ? (
                            <div className={`mt-0.5 truncate font-medium leading-snug text-[var(--fh-nav-item-sub)] ${compactHeight ? "text-[0.82rem]" : "text-[0.88rem]"}`}>
                              {item.subtitle}
                            </div>
                          ) : null}
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })}
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
    <Card className="fh-nav-shell-card h-full min-h-0 overflow-hidden rounded-[22px] border border-[var(--fh-nav-shell-border)] bg-[color:var(--fh-nav-shell-bg)] shadow-[0_14px_30px_rgba(15,23,42,0.1)]">
      <CardContent className="flex h-full min-h-0 flex-col items-center gap-2 p-2">
        {onToggleCollapse ? (
          <button
            type="button"
            aria-label="Expand sidebar"
            onClick={onToggleCollapse}
            className="inline-flex h-10 w-10 items-center justify-center rounded-[14px] border border-[var(--fh-nav-ghost-btn-border)] bg-[color:var(--fh-nav-ghost-btn-bg)] text-[var(--fh-nav-title)] transition duration-200 ease-out hover:bg-[color:var(--fh-nav-ghost-btn-hover)]"
          >
            <ChevronsRight className="h-4 w-4" />
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
                className={`group relative inline-flex h-10 w-10 items-center justify-center rounded-[14px] border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-soft)] ${
                  active
                    ? "border-[var(--fh-nav-rail-active-border)] bg-[color:var(--fh-nav-rail-active-bg)] text-[var(--fh-nav-rail-active-fg)]"
                    : "border-[var(--fh-nav-rail-icon-border)] bg-[color:var(--fh-nav-rail-icon-bg)] text-[var(--fh-nav-rail-icon-fg)] hover:bg-white"
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
