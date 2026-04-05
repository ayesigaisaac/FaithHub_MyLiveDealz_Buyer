import React, { useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { matchPath, Outlet, useLocation, useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import { useAuth } from "@/auth/AuthContext";
import AccountSwitcher from "@/components/layout/AccountSwitcher";
import AppHeader from "@/components/layout/AppHeader";
import Sidebar from "@/components/layout/Sidebar";
import GiveSupportCTA from "@/components/giving/GiveSupportCTA";
import { useColorMode } from "@/theme/color-mode";
import { getRoutePatterns, pageRegistry, type PageRegistryItem, type RoleKey } from "@/config/pageRegistry";
import { buildUnifiedSidebarSections } from "@/config/sidebar";
import { resolvePageButtonAction } from "@/config/pageActionRegistry";
import { searchGlobalContent } from "@/data/globalSearch";
import { trackEvent } from "@/data/tracker";
import { addAuthAuditRecord } from "@/data/authAudit";
import { routes } from "@/constants/routes";
import type { Role } from "@/types/roles";

const roleTriggerLabel: Record<RoleKey, string> = {
  user: "Faith Member",
  provider: "Provider Workspace",
  admin: "Admin Command",
};

const alertRouteByRole: Record<RoleKey, string> = {
  user: routes.app.user.settings,
  provider: routes.app.provider.notifications,
  admin: routes.app.admin.liveModeration,
};

const profileSettingsRouteByRole: Record<RoleKey, string> = {
  user: routes.app.user.profile,
  provider: routes.app.provider.onboarding,
  admin: routes.app.admin.security,
};

const roleDisplayName: Record<RoleKey, string> = {
  user: "User",
  provider: "Provider",
  admin: "Admin",
};

const iconFallbackRouteByRole: Record<
  RoleKey,
  { calendar: string; messages: string; discover: string; settings: string }
> = {
  user: {
    calendar: routes.app.user.events,
    messages: routes.app.user.liveChat,
    discover: routes.app.user.discover,
    settings: routes.app.user.settings,
  },
  provider: {
    calendar: routes.app.provider.liveSchedule,
    messages: routes.app.provider.notifications,
    discover: routes.app.provider.contacts,
    settings: routes.app.provider.onboarding,
  },
  admin: {
    calendar: routes.app.admin.overview,
    messages: routes.app.admin.liveModeration,
    discover: routes.app.admin.verification,
    settings: routes.app.admin.security,
  },
};

function getCurrentRole(pathname: string): RoleKey {
  if (pathname.startsWith(routes.app.provider.base)) return "provider";
  if (pathname.startsWith(routes.app.admin.base)) return "admin";
  return "user";
}

function matchesPagePath(page: Pick<PageRegistryItem, "path" | "routePatterns">, pathname: string) {
  return getRoutePatterns(page).some((pattern) => Boolean(matchPath({ path: pattern, end: true }, pathname)));
}

function resolveIconOnlyFallbackPath(button: HTMLButtonElement, role: RoleKey) {
  const iconRoutes = iconFallbackRouteByRole[role];
  if (
    button.querySelector(".lucide-arrow-left") ||
    button.querySelector(".lucide-chevron-left") ||
    button.querySelector(".lucide-chevrons-left")
  ) {
    return "__back__";
  }
  if (button.querySelector(".lucide-house")) return "/home";
  if (button.querySelector(".lucide-bell")) return alertRouteByRole[role];
  if (button.querySelector(".lucide-sparkles")) return iconRoutes.settings;
  if (button.querySelector(".lucide-settings")) return iconRoutes.settings;
  if (button.querySelector(".lucide-calendar-days")) return iconRoutes.calendar;
  if (button.querySelector(".lucide-message-square")) return iconRoutes.messages;
  if (button.querySelector(".lucide-users")) return iconRoutes.discover;
  return null;
}

export default function AppShellLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentRole, setRole, logout, logoutAllRoles, sessionExpiresAt, user } = useAuth();
  const { mode, toggle } = useColorMode();

  const routeRole = getCurrentRole(location.pathname);
  const shellRole: RoleKey = currentRole || routeRole;

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navQuery, setNavQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountSwitcherOpen, setAccountSwitcherOpen] = useState(false);
  const [pendingRoleSwitch, setPendingRoleSwitch] = useState<{ role: RoleKey } | null>(null);
  const [sessionMsRemaining, setSessionMsRemaining] = useState<number | null>(null);
  const searchContainerRef = useRef<HTMLLabelElement | null>(null);
  const pendingRoleDialogRef = useRef<HTMLDivElement | null>(null);

  const sidebarSections = useMemo(
    () => buildUnifiedSidebarSections({ role: shellRole, query: navQuery }),
    [shellRole, navQuery],
  );

  const currentPage = pageRegistry.find((page) => matchesPagePath(page, location.pathname));
  const activeNavPath = currentPage?.path || location.pathname;
  const currentRoleLabel = roleTriggerLabel[shellRole];
  const sidebarWidthClass = sidebarCollapsed ? "lg:ml-[84px]" : "lg:ml-[280px]";
  const showGivingCta =
    shellRole !== "admin" &&
    (location.pathname.startsWith(routes.app.provider.base) ||
      location.pathname.includes("/series") ||
      location.pathname.includes("/live") ||
      location.pathname.includes("/community") ||
      location.pathname.includes("/institution"));
  const showSessionWarning = Boolean(
    sessionMsRemaining !== null &&
      sessionMsRemaining <= 1000 * 60 * 5 &&
      sessionMsRemaining > 0 &&
      user,
  );
  const sessionMinutesRemaining = sessionMsRemaining ? Math.ceil(sessionMsRemaining / 60000) : 0;
  const globalSearchResults = useMemo(
    () => searchGlobalContent(navQuery, shellRole),
    [navQuery, shellRole],
  );

  const resolveNavPath = (path: string) => path;
  const navigateToPath = (path: string) => {
    trackEvent(
      "NAVIGATE_PAGE",
      {
        from: location.pathname,
        to: path,
        source: "app-shell",
      },
      { role: shellRole },
    );
    navigate(path);
  };
  const handleRoleSwitch = (nextRole: Role, _path: string) => {
    setPendingRoleSwitch({ role: nextRole as RoleKey });
  };

  const confirmRoleSwitch = () => {
    if (!pendingRoleSwitch) return;
    const nextRole = pendingRoleSwitch.role;
    addAuthAuditRecord({
      action: "ROLE_SWITCH_CONFIRMED",
      role: nextRole,
      email: user?.email,
      detail: `Confirmed from ${shellRole} to ${nextRole}`,
      route: location.pathname,
    });
    trackEvent(
      "ROLE_SWITCH",
      {
        fromRole: shellRole,
        toRole: nextRole,
        trigger: "sidebar",
      },
      { role: shellRole },
    );
    flushSync(() => {
      setRole(nextRole);
    });
    navigate(routes.public.loginByRole(nextRole));
    setMobileOpen(false);
    setPendingRoleSwitch(null);
  };

  const handlePageAction = (event: React.MouseEvent<HTMLElement>) => {
    const insideAppWorkspace = location.pathname.startsWith("/app/");
    if (!insideAppWorkspace && !currentPage) return;

    if (event.defaultPrevented) return;
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const target = event.target as HTMLElement | null;
    if (!target) return;
    if (target.closest("[data-no-nav]")) return;
    if (target.closest("a, [role='link'], input, textarea, select, option, label")) return;

    const button = target.closest("button");
    if (!button || button.hasAttribute("disabled")) return;
    if ((button.getAttribute("type") || "").toLowerCase() === "submit") return;
    if (button.getAttribute("aria-haspopup")) return;
    if (button.getAttribute("role") === "switch") return;
    if (button.getAttribute("aria-pressed") !== null) return;
    if (!button.hasAttribute("data-action-id") && button.getAttribute("aria-expanded") !== null) return;

    const actionId = button.getAttribute("data-action-id") || "";
    const rawLabel =
      button.getAttribute("data-action-label") ||
      button.getAttribute("aria-label") ||
      button.getAttribute("title") ||
      button.textContent ||
      "";
    const label = rawLabel.replace(/\s+/g, " ").trim();
    if (!label && !actionId) return;

    const actionPath =
      resolvePageButtonAction(currentPage?.path || location.pathname, label, actionId) ||
      resolveIconOnlyFallbackPath(button, shellRole);
    if (!actionPath) return;
    event.preventDefault();
    if (actionPath === "__back__") {
      trackEvent(
        "CLICK_BUTTON",
        {
          id: actionId || "shell-back-action",
          label: label || "Back",
          location: currentPage?.path || location.pathname,
        },
        { role: shellRole },
      );
      navigate(-1);
      return;
    }
    trackEvent(
      "CLICK_BUTTON",
      {
        id: actionId || "shell-action",
        label,
        location: currentPage?.path || location.pathname,
      },
      { role: shellRole },
    );
    navigateToPath(actionPath);
  };

  useEffect(() => {
    setMobileOpen(false);
    setAccountSwitcherOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!searchOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!searchContainerRef.current?.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };
    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [searchOpen]);

  useEffect(() => {
    if (!sessionExpiresAt || !user) {
      setSessionMsRemaining(null);
      return;
    }
    const update = () => setSessionMsRemaining(Math.max(0, sessionExpiresAt - Date.now()));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [sessionExpiresAt, user]);

  useEffect(() => {
    if (!pendingRoleSwitch) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPendingRoleSwitch(null);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    pendingRoleDialogRef.current?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [pendingRoleSwitch]);

  return (
    <div className="fh-page-canvas h-[100dvh] overflow-hidden bg-[var(--bg)] text-[var(--text-primary)]">
      <AppHeader
        mobileOpen={mobileOpen}
        navQuery={navQuery}
        searchOpen={searchOpen}
        accountSwitcherOpen={accountSwitcherOpen}
        currentRoleLabel={currentRoleLabel}
        alertPath={alertRouteByRole[shellRole]}
        searchResults={globalSearchResults}
        searchContainerRef={searchContainerRef}
        onOpenMobileMenu={() => setMobileOpen(true)}
        onGoToLanding={() => navigate(routes.public.landing)}
        onChangeQuery={setNavQuery}
        onToggleSearchOpen={setSearchOpen}
        onNavigate={navigateToPath}
        onToggleAccountSwitcher={() => setAccountSwitcherOpen((prev) => !prev)}
      />

      <div className="flex h-full pt-14">
        <aside
          className={`fixed left-0 top-14 bottom-0 z-40 hidden transition-[width] duration-200 ease-out lg:block ${
            sidebarCollapsed ? "w-[84px]" : "w-[280px]"
          }`}
        >
          <Sidebar
            sections={sidebarSections}
            currentRole={shellRole}
            collapsed={sidebarCollapsed}
            currentPath={activeNavPath}
            onRoleSwitch={handleRoleSwitch}
            resolvePath={resolveNavPath}
            onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
          />
        </aside>

        <Drawer
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          sx={{
            display: { lg: "none" },
            "& .MuiDrawer-paper": {
              width: "min(300px, 84vw)",
              backgroundColor: "transparent",
              boxShadow: "none",
              border: "none",
            },
          }}
        >
          <div className="h-full">
            <Sidebar
              sections={sidebarSections}
              currentRole={shellRole}
              currentPath={activeNavPath}
              onRoleSwitch={handleRoleSwitch}
              resolvePath={resolveNavPath}
              onNavigate={() => setMobileOpen(false)}
              onClose={() => setMobileOpen(false)}
            />
          </div>
        </Drawer>

        <main
          className={`fh-scroll-region min-h-0 flex-1 overflow-y-auto px-6 py-6 ${sidebarWidthClass}`}
          onClickCapture={handlePageAction}
        >
          <div className="fh-app-content min-h-full">
            {showSessionWarning ? (
              <div className="mb-4 rounded-2xl border border-amber-300/40 bg-amber-50/70 px-4 py-3 text-sm text-amber-800 dark:border-amber-400/25 dark:bg-amber-500/10 dark:text-amber-200">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span>
                    Session expires in about {sessionMinutesRemaining} minute
                    {sessionMinutesRemaining === 1 ? "" : "s"}.
                  </span>
                  <button
                    type="button"
                    onClick={() => navigate(routes.public.loginByRole(shellRole))}
                    className="rounded-lg border border-amber-400/50 px-3 py-1.5 font-semibold transition hover:bg-amber-100/60 dark:hover:bg-amber-400/10"
                  >
                    Re-authenticate now
                  </button>
                </div>
              </div>
            ) : null}
            {showGivingCta ? <GiveSupportCTA role={shellRole} /> : null}
            <Outlet />
          </div>
        </main>
      </div>

      <AccountSwitcher
        isOpen={accountSwitcherOpen}
        colorMode={mode}
        onClose={() => setAccountSwitcherOpen(false)}
        onToggleColorMode={() => {
          toggle();
        }}
        onOpenProfileSettings={() => {
          navigateToPath(profileSettingsRouteByRole[shellRole]);
          setAccountSwitcherOpen(false);
        }}
        onLogout={() => {
          logout();
          navigate(routes.public.login);
          setAccountSwitcherOpen(false);
        }}
        onLogoutAllRoles={() => {
          logoutAllRoles();
          navigate(routes.public.login);
          setAccountSwitcherOpen(false);
        }}
      />

      {pendingRoleSwitch ? (
        <div
          className="fixed inset-0 z-[85] flex items-center justify-center bg-slate-950/60 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setPendingRoleSwitch(null);
            }
          }}
        >
          <div
            ref={pendingRoleDialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Confirm role switch"
            tabIndex={-1}
            className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5 shadow-[var(--shadow-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(3,205,140,0.34)]"
          >
            <div className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted,#6B7280)]">
              Confirm role switch
            </div>
            <div className="mt-1 text-lg font-semibold text-[var(--text-primary)]">
              Sign in again as {roleDisplayName[pendingRoleSwitch.role]}
            </div>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              For security, switching roles requires a fresh login for that workspace.
            </p>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => setPendingRoleSwitch(null)}
                className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--surface)]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmRoleSwitch}
                className="flex-1 rounded-xl bg-[var(--accent)] px-3 py-2 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
