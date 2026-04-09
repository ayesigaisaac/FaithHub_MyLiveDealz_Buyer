import React, { useEffect, useMemo, useRef, useState } from "react";
import { Bell, CircleUserRound, Menu, Search } from "lucide-react";
import type { GlobalSearchResult } from "@/data/globalSearch";
import {
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
  notificationEvents,
} from "@/data/notifications";
import type { FaithHubNotification } from "@/types/notification";

interface AppHeaderProps {
  mobileOpen: boolean;
  navQuery: string;
  searchOpen: boolean;
  accountSwitcherOpen: boolean;
  currentRoleLabel: string;
  homePath: string;
  alertPath: string;
  searchResults: GlobalSearchResult[];
  hasSearchQuery: boolean;
  searchContainerRef: React.RefObject<HTMLLabelElement | null>;
  onOpenMobileMenu: () => void;
  onGoToLanding: () => void;
  onChangeQuery: (value: string) => void;
  onToggleSearchOpen: (open: boolean) => void;
  onNavigate: (path: string) => void;
  onSelectSearchResult: (result: GlobalSearchResult) => void;
  onToggleAccountSwitcher: () => void;
}

const typeLabel: Record<GlobalSearchResult["type"], string> = {
  page: "Pages",
  event: "Events",
  community: "Community",
  content: "Content",
  recent: "Recent searches",
};

const resultTypeOrder: GlobalSearchResult["type"][] = ["recent", "page", "event", "community", "content"];

export default function AppHeader({
  mobileOpen,
  navQuery,
  searchOpen,
  accountSwitcherOpen,
  currentRoleLabel,
  homePath,
  alertPath,
  searchResults,
  hasSearchQuery,
  searchContainerRef,
  onOpenMobileMenu,
  onChangeQuery,
  onToggleSearchOpen,
  onNavigate,
  onSelectSearchResult,
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
  const [notifications, setNotifications] = useState<FaithHubNotification[]>([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement | null>(null);
  const unreadCount = useMemo(() => notifications.filter((item) => !item.read).length, [notifications]);

  const reloadNotifications = () => {
    setNotifications(getNotifications().slice(0, 12));
  };

  useEffect(() => {
    if (!searchOpen || !flattenedResults.length) {
      setActiveIndex(-1);
      return;
    }
    setActiveIndex(0);
  }, [flattenedResults.length, navQuery, searchOpen]);

  useEffect(() => {
    reloadNotifications();
    const onUpdated = () => reloadNotifications();
    const onStorage = (event: StorageEvent) => {
      if (event.key && event.key !== "faithhub_notifications") return;
      reloadNotifications();
    };
    window.addEventListener(notificationEvents.updated, onUpdated);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(notificationEvents.updated, onUpdated);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  useEffect(() => {
    if (!isNotificationsOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!notificationRef.current?.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [isNotificationsOpen]);

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
                aria-expanded={searchOpen && flattenedResults.length > 0}
                aria-controls="global-search-listbox"
                aria-activedescendant={
                  activeResult ? `search-result-${activeResult.type}-${activeResult.id}` : undefined
                }
                aria-label="Search institutions, series, resources, and live sessions"
                value={navQuery}
                onChange={(event) => onChangeQuery(event.target.value)}
                onFocus={() => onToggleSearchOpen(true)}
                onKeyDown={(event) => {
                  if (!searchOpen) return;
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
                    onSelectSearchResult(activeResult);
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

              {searchOpen ? (
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
                                  onSelectSearchResult(result);
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
                  ) : hasSearchQuery ? (
                    <div className="px-2 py-3 text-xs text-[var(--text-secondary)]">
                      No results found for "{navQuery.trim()}".
                    </div>
                  ) : (
                    <div className="px-2 py-3 text-xs text-[var(--text-secondary)]">
                      Start typing to search, or use recent searches.
                    </div>
                  )}
                </div>
              ) : null}
            </label>
          </div>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2 md:ml-0">
            <div className="relative" ref={notificationRef}>
              <button
                type="button"
                aria-label="Open notifications"
                data-action-id="open-alerts"
                title="Open notifications"
                onClick={() => setIsNotificationsOpen((prev) => !prev)}
                className="fh-shell-control relative inline-flex h-10 w-10 items-center justify-center rounded-2xl text-[var(--text-secondary)]"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 ? (
                  <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-bold text-white">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                ) : null}
              </button>

              {isNotificationsOpen ? (
                <div
                  className="absolute right-0 top-[calc(100%+0.45rem)] z-50 w-[22rem] rounded-xl border border-[var(--border)] bg-[var(--panel)] p-2 shadow-[var(--shadow-soft)]"
                  data-no-nav
                >
                  <div className="mb-1.5 flex items-center justify-between px-1.5">
                    <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)]">
                      Notifications
                    </div>
                    <div className="flex items-center gap-2">
                      {unreadCount > 0 ? (
                        <button
                          type="button"
                          className="text-[11px] font-semibold text-[var(--accent)] hover:underline"
                          onClick={() => {
                            markAllNotificationsRead();
                            reloadNotifications();
                          }}
                        >
                          Mark all read
                        </button>
                      ) : null}
                      <button
                        type="button"
                        className="text-[11px] font-semibold text-[var(--text-secondary)] hover:underline"
                        onClick={() => {
                          setIsNotificationsOpen(false);
                          onNavigate(alertPath);
                        }}
                      >
                        View all
                      </button>
                    </div>
                  </div>
                  {notifications.length ? (
                    <div className="max-h-80 space-y-1 overflow-y-auto pr-0.5">
                      {notifications.map((notification) => (
                        <button
                          key={notification.id}
                          type="button"
                          onClick={() => {
                            if (!notification.read) {
                              markNotificationRead(notification.id);
                              reloadNotifications();
                            }
                          }}
                          className={`w-full rounded-lg border px-2.5 py-2 text-left transition ${
                            notification.read
                              ? "border-[var(--border)] bg-[var(--card)]"
                              : "border-[rgba(3,205,140,0.28)] bg-[rgba(3,205,140,0.1)]"
                          }`}
                        >
                          <div className="text-xs font-semibold text-[var(--text-primary)]">{notification.message}</div>
                          <div className="mt-1 text-[11px] text-[var(--text-secondary)]">
                            {new Date(notification.createdAt).toLocaleString()}
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="px-2 py-3 text-xs text-[var(--text-secondary)]">
                      No notifications yet.
                    </div>
                  )}
                </div>
              ) : null}
            </div>
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
