import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronsLeft, ChevronsRight, X } from "lucide-react";
import type { SidebarSection } from "@/config/sidebar";

interface SidebarProps {
  sections: SidebarSection[];
  collapsed?: boolean;
  currentPath: string;
  onNavigate?: (path: string) => void;
  resolvePath?: (path: string) => string;
  onToggleCollapse?: () => void;
  onClose?: () => void;
}

function isItemActive(pathname: string, prefixes: string[]) {
  for (const prefix of prefixes) {
    if (!prefix) continue;
    if (prefix.endsWith("-")) {
      if (pathname.startsWith(prefix)) return true;
      continue;
    }
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) return true;
  }
  return false;
}

export default function Sidebar({
  sections,
  collapsed = false,
  currentPath,
  onNavigate,
  resolvePath,
  onToggleCollapse,
  onClose,
}: SidebarProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setOpenSections((prev) => {
      const next: Record<string, boolean> = {};
      for (const section of sections) {
        const hasActiveItem = section.items.some((item) => isItemActive(currentPath, item.activePrefixes));
        if (typeof prev[section.id] === "boolean") {
          next[section.id] = prev[section.id];
        } else {
          next[section.id] = section.collapsible ? hasActiveItem : true;
        }
        if (hasActiveItem) next[section.id] = true;
      }
      return next;
    });
  }, [currentPath, sections]);

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  return (
    <div className="fh-nav-shell-card flex h-full min-h-0 flex-col border-r border-zinc-200/80 bg-white/92 px-2 py-2.5 shadow-[0_12px_24px_rgba(15,23,42,0.06)] backdrop-blur lg:px-2.5 lg:py-3">
      <div className="mb-2 flex items-center justify-end gap-1.5">
        {onClose ? (
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 transition hover:bg-zinc-50"
          >
            <X className="h-4 w-4" />
          </button>
        ) : onToggleCollapse ? (
          <button
            type="button"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={onToggleCollapse}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 transition hover:bg-zinc-50"
          >
            {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
          </button>
        ) : null}
      </div>

      <nav className="fh-scroll-region min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
        {sections.map((section) => {
          const isOpen = openSections[section.id] ?? true;
          const canCollapseSection = Boolean(section.collapsible && !collapsed);

          return (
            <div key={section.id} className="space-y-1.5">
              {!collapsed ? (
                <button
                  type="button"
                  onClick={() => (canCollapseSection ? toggleSection(section.id) : undefined)}
                  className={`flex w-full items-center justify-between rounded-lg px-2 py-1 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500 ${
                    canCollapseSection ? "hover:bg-zinc-100/80" : ""
                  }`}
                >
                  <span>{section.label}</span>
                  {canCollapseSection ? (
                    <ChevronDown className={`h-3.5 w-3.5 transition ${isOpen ? "rotate-180" : "rotate-0"}`} />
                  ) : null}
                </button>
              ) : null}

              {(collapsed || isOpen) && section.items.length > 0 ? (
                <div className={`space-y-1 ${collapsed ? "items-center" : ""}`}>
                  {section.items.map((item) => {
                    const active = isItemActive(currentPath, item.activePrefixes);
                    const targetPath = resolvePath ? resolvePath(item.path) : item.path;

                    return (
                      <Link
                        key={item.id}
                        to={targetPath}
                        title={item.title}
                        aria-current={active ? "page" : undefined}
                        onClick={() => onNavigate?.(item.path)}
                        className={`group flex items-center gap-2.5 rounded-xl border px-2.5 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 ${
                          collapsed ? "justify-center px-0" : ""
                        } ${
                          active
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-transparent bg-white text-zinc-700 hover:border-zinc-200 hover:bg-zinc-50"
                        }`}
                      >
                        <item.icon className={`h-4 w-4 shrink-0 ${active ? "text-emerald-600" : "text-zinc-500"}`} />
                        {!collapsed ? <span className="truncate">{item.label}</span> : null}
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
