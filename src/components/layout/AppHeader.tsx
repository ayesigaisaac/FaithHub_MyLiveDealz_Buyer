import React, { useEffect, useMemo, useState } from "react";
import { Bell, CircleUserRound, Menu, Search } from "lucide-react";
import type { GlobalSearchResult } from "@/data/globalSearch";

const logoIconSrc = "/assets/branding/logo-icon.png";

interface AppHeaderProps {
  mobileOpen: boolean;
  navQuery: string;
  searchOpen: boolean;
  accountSwitcherOpen: boolean;
  currentRoleLabel: string;
  homePath: string;
  alertPath: string;
  searchResults: GlobalSearchResult[];
  searchContainerRef: React.RefObject<HTMLLabelElement | null>;
  onOpenMobileMenu: () => void;
  onGoToLanding: () => void;
  onChangeQuery: (value: string) => void;
  onToggleSearchOpen: (open: boolean) => void;
  onNavigate: (path: string) => void;
  onToggleAccountSwitcher: () => void;
}

const typeLabel: Record<GlobalSearchResult["type"], string> = {
  institution: "Institutions",
  series: "Series",
  resource: "Resources",
  live: "Live sessions",
};

const resultTypeOrder: GlobalSearchResult["type"][] = ["institution", "series", "resource", "live"];

export default function AppHeader({
  mobileOpen,
  navQuery,
  searchOpen,
  accountSwitcherOpen,
  currentRoleLabel,
  homePath,
  alertPath,
  searchResults,
  searchContainerRef,
  onOpenMobileMenu,
  onChangeQuery,
  onToggleSearchOpen,
  onNavigate,
  onToggleAccountSwitcher,
}: AppHeaderProps) {
  const groupedResults = useMemo(() => {
    const grouped: Array<{ type: GlobalSearchResult["type"]; label: string; items: GlobalSearchResult[] }> = [];
    for (const type of resultTypeOrder) {
      const items = searchResults.filter((result) => result.type === type);
      if (!items.length) continue;
      grouped.push({
        type,
        label: typeLabel[type],
        items,
      });
    }
    return grouped;
  }, [searchResults]);

  const flattenedResults = useMemo(() => groupedResults.flatMap((group) => group.items), [groupedResults]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  useEffect(() => {
    if (!searchOpen || navQuery.trim().length < 2 || !flattenedResults.length) {
      setActiveIndex(-1);
      return;
    }
    setActiveIndex(0);
  }, [flattenedResults.length, navQuery, searchOpen]);

  const activeResult = activeIndex >= 0 ? flattenedResults[activeIndex] : null;

  return (
    <header className="fh-shell-topbar fixed inset-x-0 top-0 z-50 h-14 border-b">
      <div className="h-full w-full px-2.5 sm:px-3 lg:px-4">
        <div className="flex h-full items-center gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <button
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              onClick={onOpenMobileMenu}
              className="fh-shell-control inline-flex h-10 w-10 items-center justify-center rounded-2xl text-[var(--text-secondary)] lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <button
              type="button"
              aria-label="Go to home"
              onClick={() => onNavigate(homePath)}
              className="inline-flex min-h-[42px] min-w-0 items-center gap-2 rounded-2xl px-2.5 py-1.5 transition-colors duration-200 hover:bg-[rgba(3,200,220,0.1)] dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(3,200,220,0.34)] sm:px-3"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--card)_90%,transparent_10%)] p-1 sm:h-10 sm:w-10">
                <img
                  src={logoIconSrc}
                  alt="EVzone FaithHub icon"
                  className="h-8 w-8 object-contain sm:h-9 sm:w-9"
                />
              </span>
              <span className="min-w-0 text-left leading-none">
                <span className="block text-[10px] font-medium tracking-[0.08em] text-[#03c8dc] sm:text-[11px]">
                  EVzone
                </span>
                <span className="mt-0.5 block text-base font-bold tracking-tight text-[#f77f00] sm:text-[1.05rem]">
                  FaithHub
                </span>
              </span>
            </button>
          </div>

          <div className="hidden min-w-0 flex-1 px-1 md:flex lg:px-2">
            <label
              ref={searchContainerRef}
              className="fh-search-shell fh-shell-control relative mx-auto flex h-10 w-full max-w-[44rem] min-w-0 items-center gap-2 rounded-2xl px-3"
            >
              <Search className="h-4 w-4 shrink-0 text-[var(--text-secondary)]" />
              <input
                type="search"
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={searchOpen && navQuery.trim().length >= 2}
                aria-controls="global-search-listbox"
                aria-activedescendant={
                  activeResult ? `search-result-${activeResult.type}-${activeResult.id}` : undefined
                }
                aria-label="Search institutions, series, resources, and live sessions"
                value={navQuery}
                onChange={(event) => onChangeQuery(event.target.value)}
                onFocus={() => onToggleSearchOpen(true)}
                onKeyDown={(event) => {
                  if (!searchOpen || navQuery.trim().length < 2) return;
                  if (!flattenedResults.length) return;

                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    setActiveIndex((prev) => (prev + 1) % flattenedResults.length);
                    return;
                  }

                  if (event.key === "ArrowUp") {
                    event.preventDefault();
                    setActiveIndex((prev) => {
                      if (prev <= 0) return flattenedResults.length - 1;
                      return prev - 1;
                    });
                    return;
                  }

                  if (event.key === "Enter" && activeResult) {
                    event.preventDefault();
                    onNavigate(activeResult.path);
                    onToggleSearchOpen(false);
                    return;
                  }

                  if (event.key === "Escape") {
                    onToggleSearchOpen(false);
                  }
                }}
                placeholder="Search institutions, series, resources, live..."
                className="h-8 w-full border-0 bg-transparent text-sm font-semibold text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted,#6B7280)]"
              />

              {searchOpen && navQuery.trim().length >= 2 ? (
                <div
                  id="global-search-listbox"
                  role="listbox"
                  className="absolute left-0 right-0 top-[calc(100%+0.45rem)] z-50 rounded-xl border border-[var(--border)] bg-[var(--panel)] p-1.5 shadow-[var(--shadow-soft)]"
                  data-no-nav
                >
                  {flattenedResults.length ? (
                    <div className="max-h-72 space-y-2 overflow-y-auto pr-0.5">
                      {groupedResults.map((group) => (
                        <div key={group.type} className="space-y-1">
                          <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-muted,#6B7280)]">
                            {group.label}
                          </div>
                          {group.items.map((result) => {
                            const globalIndex = flattenedResults.findIndex(
                              (entry) => entry.id === result.id && entry.type === result.type,
                            );
                            const isActive = globalIndex === activeIndex;
                            return (
                              <button
                                id={`search-result-${result.type}-${result.id}`}
                                key={`${result.type}:${result.id}`}
                                type="button"
                                role="option"
                                aria-selected={isActive}
                                onMouseEnter={() => setActiveIndex(globalIndex)}
                                onClick={() => {
                                  onNavigate(result.path);
                                  onToggleSearchOpen(false);
                                }}
                                className={`flex w-full items-start justify-between gap-2 rounded-lg px-2.5 py-2 text-left transition ${
                                  isActive
                                    ? "bg-[rgba(3,205,140,0.16)]"
                                    : "hover:bg-[var(--fh-elevated-surface)]"
                                }`}
                                data-no-nav
                              >
                                <span className="min-w-0">
                                  <span className="block truncate text-sm font-semibold text-[var(--text-primary)]">
                                    {result.title}
                                  </span>
                                  <span className="block truncate text-xs text-[var(--text-secondary)]">
                                    {result.subtitle}
                                  </span>
                                </span>
                                <span className="rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">
                                  {result.type}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="px-2 py-3 text-xs text-[var(--text-secondary)]">
                      No results found for "{navQuery.trim()}".
                    </div>
                  )}
                </div>
              ) : null}
            </label>
          </div>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2 md:ml-0">
            <button
              type="button"
              aria-label="Open alerts"
              data-action-id="open-alerts"
              title="Open alerts"
              onClick={() => onNavigate(alertPath)}
              className="fh-shell-control relative inline-flex h-10 w-10 items-center justify-center rounded-2xl text-[var(--text-secondary)]"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-bold text-white">
                2
              </span>
            </button>
            <div className="relative">
              <button
                type="button"
                title={`Open account menu (${currentRoleLabel})`}
                aria-label={`Open account menu. Current role: ${currentRoleLabel}`}
                aria-expanded={accountSwitcherOpen}
                onClick={onToggleAccountSwitcher}
                className="fh-shell-control inline-flex h-10 w-10 items-center justify-center rounded-2xl text-[var(--text-secondary)]"
              >
                <CircleUserRound className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
