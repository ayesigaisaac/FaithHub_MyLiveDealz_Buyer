import React, { useEffect, useMemo, useRef, useState } from "react";
import { matchPath, Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import {
  Bell,
  BookOpen,
  BriefcaseBusiness,
  ChevronDown,
  ChevronRight,
  Clock3,
  LayoutGrid,
  MapPin,
  Menu,
  MessageSquare,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  ShieldAlert,
  Sparkles,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ColorModeToggle } from "@/theme/color-mode-toggle";
import {
  defaultPageForRole,
  getRoutePatterns,
  pagesByRole,
  pageRegistry,
  type PageRegistryItem,
  type RoleKey,
} from "@/config/pageRegistry";
import { resolvePageButtonAction } from "@/config/pageActionRegistry";

const faithmartLogoLandscape = "/faithmart-logo-landscape.png";

type GroupedPages = Record<string, PageRegistryItem[]>;

type QuickLink = {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
  tone: "emerald" | "orange" | "slate";
};

const sectionLabelMap: Partial<Record<RoleKey, Record<string, string>>> = {
  user: {
    "Start & Identity": "Account",
    "Discovery & Institutions": "Explore",
    "Series & Content": "Library",
    "Live Sessionz": "Live",
    "Events, Giving & Membership": "Community",
    "Trust & Settings": "Preferences",
  },
  provider: {
    "Onboarding & Core HQ": "Workspace",
    "Content Studio": "Content",
    "Live Operations": "Live Ops",
    "Audience & Distribution": "Audience",
    "Commerce, Funds & Trust": "Revenue & Trust",
  },
  admin: {
    "Global Control": "Overview",
    "Verification & Trust": "Trust",
    "Finance & Channels": "Finance",
    "Security & Evidence": "Security",
  },
};

function getCurrentRole(pathname: string): RoleKey {
  if (pathname.startsWith("/app/provider")) return "provider";
  if (pathname.startsWith("/app/admin")) return "admin";
  return "user";
}

function matchesPagePath(page: Pick<PageRegistryItem, "path" | "routePatterns">, pathname: string) {
  return getRoutePatterns(page).some((pattern) => Boolean(matchPath({ path: pattern, end: true }, pathname)));
}

function withAdminAccess(path: string, enabled: boolean) {
  if (!enabled || !path.startsWith("/app/")) return path;
  return path.includes("?") ? `${path}&admin=1` : `${path}?admin=1`;
}

function getSectionLabel(role: RoleKey, section: string) {
  return sectionLabelMap[role]?.[section] || section;
}

function getRoleSummary(role: RoleKey) {
  if (role === "provider") return "Institution workspace for content, live operations, and funds.";
  if (role === "admin") return "Global command scope for verification, moderation, finance, and security.";
  return "Member journey for discovery, live sessions, events, giving, and settings.";
}

function getSectionIcon(sectionLabel: string): LucideIcon {
  const value = sectionLabel.toLowerCase();
  if (value.includes("finance") || value.includes("revenue")) return Wallet;
  if (value.includes("library") || value.includes("series") || value.includes("content")) return BookOpen;
  if (value.includes("commerce") || value.includes("audience")) return BriefcaseBusiness;
  if (value.includes("trust") || value.includes("security")) return ShieldAlert;
  if (value.includes("live")) return Clock3;
  if (value.includes("community")) return Sparkles;
  return LayoutGrid;
}

function compactModuleLabel(sectionLabel: string) {
  const clean = sectionLabel.includes("·")
    ? sectionLabel.split("·").slice(-1)[0]?.trim() || sectionLabel
    : sectionLabel;
  return clean.length > 18 ? `${clean.slice(0, 18)}...` : clean;
}

function getQuickLinks(role: RoleKey): QuickLink[] {
  if (role === "provider") {
    return [
      { id: "provider-live-ops", label: "Live Ops", path: "/app/provider/live-ops", icon: LayoutGrid, tone: "emerald" },
      { id: "provider-schedule", label: "Schedule", path: "/app/provider/live-schedule", icon: MessageSquare, tone: "slate" },
      { id: "provider-notify", label: "Notify", path: "/app/provider/notifications", icon: Bell, tone: "orange" },
      { id: "provider-funds", label: "Funds", path: "/app/provider/funds", icon: Wallet, tone: "emerald" },
    ];
  }
  if (role === "admin") {
    return [
      { id: "admin-moderation", label: "Moderation", path: "/app/admin/live-moderation", icon: ShieldAlert, tone: "orange" },
      { id: "admin-verify", label: "Verify", path: "/app/admin/verification", icon: LayoutGrid, tone: "emerald" },
      { id: "admin-security", label: "Security", path: "/app/admin/security", icon: Bell, tone: "slate" },
      { id: "admin-finance", label: "Finance", path: "/app/admin/finance", icon: Wallet, tone: "orange" },
    ];
  }
  return [
    { id: "user-live", label: "Live", path: "/app/user/live", icon: Clock3, tone: "emerald" },
    { id: "user-events", label: "Events", path: "/app/user/events", icon: MapPin, tone: "slate" },
    { id: "user-giving", label: "Giving", path: "/app/user/giving", icon: Wallet, tone: "orange" },
    { id: "user-settings", label: "Help & Safety", path: "/app/user/settings", icon: ShieldAlert, tone: "emerald" },
  ];
}
export default function AppShellLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const routeRole = getCurrentRole(location.pathname);
  const adminAllAccess = routeRole === "admin" || searchParams.get("admin") === "1";
  const shellRole: RoleKey = adminAllAccess ? "admin" : routeRole;

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navQuery, setNavQuery] = useState("");
  const [profileHintOpen, setProfileHintOpen] = useState(false);
  const profileHintRef = useRef<HTMLDivElement | null>(null);

  const pages = useMemo(
    () => (adminAllAccess ? pageRegistry : pagesByRole[routeRole] || []),
    [adminAllAccess, routeRole],
  );

  const filteredPages = useMemo(() => {
    const normalized = navQuery.trim().toLowerCase();
    if (!normalized) return pages;
    return pages.filter((page) =>
      `${page.label} ${page.section} ${page.navTag} ${page.description}`.toLowerCase().includes(normalized),
    );
  }, [pages, navQuery]);

  const grouped = useMemo<GroupedPages>(() => {
    const keyFor = (page: PageRegistryItem) => {
      if (!adminAllAccess) return getSectionLabel(routeRole, page.section);
      const roleLabel = page.role === "provider" ? "Provider" : page.role === "admin" ? "Admin" : "User";
      return `${roleLabel} · ${getSectionLabel(page.role, page.section)}`;
    };
    return filteredPages.reduce((acc, page) => {
      const key = keyFor(page);
      (acc[key] ||= []).push(page);
      return acc;
    }, {} as GroupedPages);
  }, [adminAllAccess, filteredPages, routeRole]);

  const sectionCount = Object.keys(grouped).length;
  const currentPage = pageRegistry.find((page) => matchesPagePath(page, location.pathname));
  const activeNavPath = currentPage?.path || location.pathname;
  const quickLinks = useMemo(() => getQuickLinks(shellRole), [shellRole]);

  const navigateToPath = (path: string) => navigate(withAdminAccess(path, adminAllAccess));

  const exitAdminView = () => {
    const params = new URLSearchParams(location.search);
    params.delete("admin");
    const query = params.toString();
    navigate(query ? `${location.pathname}?${query}` : location.pathname, { replace: true });
  };

  const handlePageAction = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement | null;
    const button = target?.closest("button");
    if (!button || button.hasAttribute("disabled")) return;
    const actionId = button.getAttribute("data-action-id") || "";
    const rawLabel =
      button.getAttribute("data-action-label") ||
      button.getAttribute("aria-label") ||
      button.textContent ||
      "";
    const label = rawLabel.replace(/\s+/g, " ").trim();
    const actionPath = resolvePageButtonAction(currentPage?.path || location.pathname, label, actionId);
    if (!actionPath) return;
    event.preventDefault();
    navigateToPath(actionPath);
  };

  useEffect(() => {
    if (!profileHintOpen) return;
    const timeoutId = window.setTimeout(() => setProfileHintOpen(false), 2400);
    return () => window.clearTimeout(timeoutId);
  }, [profileHintOpen]);

  useEffect(() => {
    if (!profileHintOpen) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (!profileHintRef.current?.contains(event.target as Node)) {
        setProfileHintOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProfileHintOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [profileHintOpen]);

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden overflow-x-clip bg-[var(--bg)] text-[var(--text-primary)]">
      <div className="fh-shell-topbar z-30 shrink-0 border-b border-[var(--border)] shadow-[0_10px_24px_rgba(15,23,42,0.05)] backdrop-blur">
        <div className="mx-auto max-w-[1860px] px-3 py-3 sm:px-4 lg:px-5">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="fh-shell-control inline-flex h-11 w-11 items-center justify-center rounded-2xl text-slate-700 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <button
              type="button"
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-pressed={sidebarCollapsed}
              onClick={() => setSidebarCollapsed((prev) => !prev)}
              className="fh-shell-control hidden h-11 w-11 items-center justify-center rounded-2xl text-slate-700 xl:inline-flex"
            >
              {sidebarCollapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
            </button>

            <button
              type="button"
              aria-label="Go to FaithHub landing page"
              onClick={() => navigate("/")}
              className="fh-shell-control inline-flex h-12 min-w-0 items-center rounded-2xl px-3"
            >
              <img
                src={faithmartLogoLandscape}
                alt="FaithMart"
                className="h-9 w-auto max-w-[11rem] object-contain sm:h-10 sm:max-w-[12rem]"
              />
            </button>

            <label className="fh-shell-control hidden min-w-0 flex-1 items-center gap-2 rounded-2xl px-3 py-2 md:flex">
              <Search className="h-4 w-4 shrink-0 text-slate-500" />
              <input
                type="search"
                value={navQuery}
                onChange={(event) => setNavQuery(event.target.value)}
                placeholder="Search modules"
                className="h-8 w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
              <span className="inline-flex h-7 min-w-[2rem] items-center justify-center rounded-full bg-slate-100 px-2 text-xs font-semibold text-slate-600">
                {filteredPages.length}
              </span>
            </label>

            <div className="ml-auto flex items-center gap-2">
              <div ref={profileHintRef} className="relative hidden xl:block">
                <button
                  type="button"
                  aria-label="Open profile options"
                  onClick={() => setProfileHintOpen((prev) => !prev)}
                  className="fh-shell-control inline-flex h-11 items-center gap-2 rounded-2xl px-3 text-left"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#111827] text-[11px] font-semibold text-white">
                    BM
                  </span>
                  <span className="leading-tight">
                    <span className="block text-xs font-semibold text-slate-900">Brian M.</span>
                    <span className="block text-[11px] text-slate-500">Greenhill Community - Member</span>
                  </span>
                  <ChevronDown className="h-4 w-4 text-slate-500" />
                </button>
                {profileHintOpen ? (
                  <div className="pointer-events-none absolute left-1/2 top-[calc(100%+8px)] z-10 -translate-x-1/2 whitespace-nowrap rounded bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                    <span className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 rotate-45 bg-slate-900" />
                    Community: Greenhill Community
                  </div>
                ) : null}
              </div>
              <RoleSwitcher
                role={shellRole}
                onChange={(nextRole) =>
                  navigate(withAdminAccess(defaultPageForRole[nextRole], adminAllAccess || nextRole === "admin"))
                }
              />
              <div className="hidden xl:block">
                <ColorModeToggle className="h-11 w-11 rounded-2xl" />
              </div>
              <button
                type="button"
                aria-label="Open alerts"
                className="fh-shell-control relative inline-flex h-11 w-11 items-center justify-center rounded-2xl text-slate-700"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[var(--accent)]" />
              </button>
            </div>
          </div>

          <label className="fh-shell-control mt-3 flex items-center gap-2 rounded-2xl px-3 py-2 md:hidden">
            <Search className="h-4 w-4 shrink-0 text-slate-500" />
            <input
              type="search"
              value={navQuery}
              onChange={(event) => setNavQuery(event.target.value)}
              placeholder="Search modules"
              className="h-8 w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
            <span className="inline-flex h-7 min-w-[2rem] items-center justify-center rounded-full bg-slate-100 px-2 text-xs font-semibold text-slate-600">
              {filteredPages.length}
            </span>
          </label>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1860px] min-h-0 min-w-0 flex-1 gap-4 overflow-hidden px-3 pb-3 pt-4 sm:px-4 lg:px-5">
        <aside className={`hidden min-h-0 shrink-0 xl:block ${sidebarCollapsed ? "w-[96px]" : "w-[332px]"}`}>
          <div className="h-full">
            {sidebarCollapsed ? (
              <SidebarRail
                grouped={grouped}
                currentPath={activeNavPath}
                onNavigate={navigateToPath}
                onExpand={() => setSidebarCollapsed(false)}
              />
            ) : (
              <SidebarPanel
                role={shellRole}
                grouped={grouped}
                currentPath={activeNavPath}
                onNavigate={navigateToPath}
                onCollapse={() => setSidebarCollapsed(true)}
              />
            )}
          </div>
        </aside>

        <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} sx={{ display: { xl: "none" } }}>
          <div className="w-[320px] max-w-[88vw] p-3">
            <div className="mb-3 flex items-center justify-between px-1">
              <div className="fh-label text-slate-500">Navigation</div>
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[color:var(--card)] text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <SidebarPanel
              role={shellRole}
              grouped={grouped}
              currentPath={activeNavPath}
              compactHeight
              onNavigate={(path) => {
                navigateToPath(path);
                setMobileOpen(false);
              }}
            />
          </div>
        </Drawer>
        <main className="fh-scroll-region min-h-0 min-w-0 flex-1 space-y-4 overflow-y-auto pr-1" onClickCapture={handlePageAction}>
          <Card className="fh-hero-card rounded-[26px]">
            <CardContent className="p-5 sm:p-6">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div className="min-w-0">
                  <div className="fh-eyebrow text-[#03cd8c]">FaithHub Workspace</div>
                  <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-[2rem]">
                    {currentPage?.label || "Welcome back"}
                  </h1>
                  <p className="mt-2 max-w-3xl text-sm text-slate-600">
                    {currentPage?.description || "Unified operations, discovery, and engagement modules."}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge className="fh-pill fh-pill-emerald hover:bg-emerald-50">
                      {adminAllAccess ? "Viewing as Admin Scope" : `${shellRole.toUpperCase()} workspace`}
                    </Badge>
                    <Badge className="fh-pill fh-pill-slate hover:bg-slate-100">{currentPage?.navTag || "Dashboard"}</Badge>
                    <Badge className="fh-pill fh-pill-slate hover:bg-slate-50">{filteredPages.length} modules available</Badge>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {quickLinks.slice(0, 2).map((link) => (
                    <button
                      key={link.id}
                      type="button"
                      onClick={() => navigateToPath(link.path)}
                      className={`inline-flex min-h-[42px] items-center rounded-xl px-4 text-sm font-semibold transition hover:-translate-y-[1px] ${
                        link.tone === "orange"
                          ? "bg-[#fff3e8] text-[#cc6500] hover:bg-[#ffe8d1]"
                          : link.tone === "slate"
                            ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            : "bg-[#ecfff8] text-[#049e6d] hover:bg-[#ddf9ef]"
                      }`}
                    >
                      <link.icon className="mr-2 h-4 w-4" />
                      {link.label}
                    </button>
                  ))}
                  {adminAllAccess && routeRole !== "admin" ? (
                    <button
                      type="button"
                      onClick={exitAdminView}
                      className="fh-inline-action inline-flex min-h-[42px] items-center rounded-xl px-4 text-sm font-semibold text-slate-600"
                    >
                      Exit admin view
                    </button>
                  ) : null}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <MetricTile title="Modules" value={String(filteredPages.length)} hint="Available in current scope" tone="emerald" />
            <MetricTile title="Sections" value={String(sectionCount)} hint="Navigation groups" tone="slate" />
            <MetricTile
              title="Workspace"
              value={shellRole === "admin" ? "Control" : shellRole === "provider" ? "Institution" : "Member"}
              hint="Current role mode"
              tone="orange"
            />
            <MetricTile title="Status" value="Healthy" hint={getRoleSummary(shellRole)} tone="emerald" />
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  );
}

function RoleSwitcher({ role, onChange }: { role: RoleKey; onChange: (role: RoleKey) => void }) {
  const roles: RoleKey[] = ["user", "provider", "admin"];
  return (
    <div className="fh-shell-control hidden h-11 items-center gap-1 rounded-2xl p-1 md:flex">
      {roles.map((item) => {
        const active = role === item;
        return (
          <button
            type="button"
            key={item}
            aria-pressed={active}
            onClick={() => onChange(item)}
            className={`rounded-xl px-3 py-1.5 text-sm font-semibold transition ${
              active
                ? item === "provider"
                  ? "bg-[#fff3e8] text-[#cc6500]"
                  : item === "admin"
                    ? "bg-slate-800 text-white"
                    : "bg-[#ecfff8] text-[#049e6d]"
                : "text-slate-500 hover:bg-[var(--surface)] hover:text-slate-700"
            }`}
          >
            {item === "user" ? "User" : item === "provider" ? "Provider" : "Admin"}
          </button>
        );
      })}
    </div>
  );
}
function SidebarPanel({
  role,
  grouped,
  currentPath,
  onNavigate,
  onCollapse,
  compactHeight = false,
}: {
  role: RoleKey;
  grouped: GroupedPages;
  currentPath: string;
  onNavigate: (path: string) => void;
  onCollapse?: () => void;
  compactHeight?: boolean;
}) {
  const sections = useMemo(
    () => Object.entries(grouped).map(([section, items]) => ({ id: section, label: section, items, icon: getSectionIcon(section) })),
    [grouped],
  );
  const activeSectionId = useMemo(
    () => sections.find((section) => section.items.some((item) => item.path === currentPath))?.id || "",
    [currentPath, sections],
  );
  const [openSectionId, setOpenSectionId] = useState(activeSectionId || sections[0]?.id || "");

  useEffect(() => {
    if (!sections.some((section) => section.id === openSectionId)) {
      setOpenSectionId(activeSectionId || sections[0]?.id || "");
    }
  }, [activeSectionId, openSectionId, sections]);

  useEffect(() => {
    if (activeSectionId) setOpenSectionId(activeSectionId);
  }, [activeSectionId]);

  return (
    <Card className="h-full overflow-hidden rounded-[22px] border border-[var(--fh-nav-shell-border)] bg-[color:var(--fh-nav-shell-bg)] shadow-[0_24px_48px_rgba(2,8,20,0.28)]">
      <CardContent
        className={`flex min-h-0 flex-col gap-2.5 overflow-hidden p-2.5 ${
          compactHeight ? "max-h-[74vh]" : "h-full"
        }`}
      >
        <div className="flex items-start justify-between gap-3 px-0.5">
          <div className="min-w-0">
            <div className="text-sm font-semibold text-[var(--fh-nav-title)]">Navigation</div>
            <div className="text-xs text-[var(--fh-nav-muted)]">Modules</div>
            <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--fh-nav-kicker)]">
              {role === "admin" ? "Control" : role === "provider" ? "Operations" : "FaithHub"}
            </div>
          </div>
          {onCollapse ? (
            <button
              type="button"
              aria-label="Minimize sidebar"
              onClick={onCollapse}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--fh-nav-ghost-btn-border)] bg-[color:var(--fh-nav-ghost-btn-bg)] text-[var(--fh-nav-title)] transition hover:bg-[color:var(--fh-nav-ghost-btn-hover)]"
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
          ) : null}
        </div>

        <div className="fh-scroll-region min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
          {sections.map((section) => {
            const SectionIcon = section.icon;
            const expanded = openSectionId === section.id;
            return (
              <div key={section.id} className="rounded-xl border border-[var(--fh-nav-section-border)] bg-[color:var(--fh-nav-section-bg)]">
                <button
                  type="button"
                  onClick={() => setOpenSectionId((prev) => (prev === section.id ? "" : section.id))}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left"
                >
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[color:var(--fh-nav-section-icon-bg)] text-[var(--fh-nav-section-icon-fg)]">
                    <SectionIcon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--fh-nav-muted)]">
                      {compactModuleLabel(section.label)}
                    </span>
                  </span>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-[var(--fh-nav-item-chevron)] transition ${expanded ? "rotate-180" : ""}`} />
                </button>

                {expanded ? (
                  <div className="space-y-1 border-t border-[var(--fh-nav-section-divider)] px-2 pb-2 pt-2">
                    {section.items.map((item) => {
                      const ItemIcon = item.icon;
                      const active = item.path === currentPath;
                      return (
                        <button
                          type="button"
                          key={item.id}
                          aria-current={active ? "page" : undefined}
                          onClick={() => onNavigate(item.path)}
                          className={`group flex w-full items-center gap-2 rounded-xl border px-2.5 py-2 text-left transition ${
                            active
                              ? "border-[var(--fh-nav-item-active-border)] bg-[color:var(--fh-nav-item-active-bg)]"
                              : "border-transparent bg-[color:var(--fh-nav-item-bg)] hover:border-[var(--fh-nav-item-hover-border)] hover:bg-[color:var(--fh-nav-item-hover)]"
                          }`}
                        >
                          <span
                            className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                              active
                                ? "bg-[color:var(--fh-nav-item-active-icon-bg)] text-[var(--fh-nav-item-active-icon-fg)]"
                                : "bg-[color:var(--fh-nav-item-icon-bg)] text-[var(--fh-nav-item-icon-fg)]"
                            }`}
                          >
                            <ItemIcon className="h-3.5 w-3.5" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-semibold text-[var(--fh-nav-item-title)]">{item.label}</span>
                            <span className="block truncate text-xs text-[var(--fh-nav-item-sub)]">{item.navTag}</span>
                          </span>
                          <ChevronRight className="h-4 w-4 shrink-0 text-[var(--fh-nav-item-chevron)] transition group-hover:text-[var(--fh-nav-item-sub)]" />
                        </button>
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
  grouped,
  currentPath,
  onNavigate,
  onExpand,
}: {
  grouped: GroupedPages;
  currentPath: string;
  onNavigate: (path: string) => void;
  onExpand: () => void;
}) {
  const sections = useMemo(
    () => Object.entries(grouped).map(([section, items]) => ({ id: section, label: section, items, icon: getSectionIcon(section) })),
    [grouped],
  );

  return (
    <Card className="h-full overflow-hidden rounded-[20px] border border-[var(--fh-nav-shell-border)] bg-[color:var(--fh-nav-shell-bg)] shadow-[0_24px_48px_rgba(2,8,20,0.28)]">
      <CardContent className="flex h-full min-h-0 flex-col items-center gap-1.5 p-1.5">
        <button
          type="button"
          aria-label="Expand sidebar"
          onClick={onExpand}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--fh-nav-ghost-btn-border)] bg-[color:var(--fh-nav-ghost-btn-bg)] text-[var(--fh-nav-title)] transition hover:bg-[color:var(--fh-nav-ghost-btn-hover)]"
        >
          <PanelLeftOpen className="h-4 w-4" />
        </button>

        <div className="mt-0.5 flex w-full flex-col items-center gap-1.5">
          {sections.map((section) => {
            const Icon = section.icon;
            const targetPath = section.items.find((item) => item.path === currentPath)?.path || section.items[0]?.path;
            const active = section.items.some((item) => item.path === currentPath);
            if (!targetPath) return null;
            return (
              <button
                key={section.id}
                type="button"
                title={section.label}
                aria-label={section.label}
                onClick={() => onNavigate(targetPath)}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border transition ${
                  active
                    ? "border-[var(--fh-nav-rail-active-border)] bg-[color:var(--fh-nav-rail-active-bg)] text-[var(--fh-nav-rail-active-fg)]"
                    : "border-[var(--fh-nav-rail-icon-border)] bg-[color:var(--fh-nav-rail-icon-bg)] text-[var(--fh-nav-rail-icon-fg)] hover:border-[var(--fh-nav-item-hover-border)] hover:bg-[color:var(--fh-nav-ghost-btn-hover)]"
                }`}
              >
                <Icon className="h-4 w-4" />
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function MetricTile({
  title,
  value,
  hint,
  tone,
}: {
  title: string;
  value: string;
  hint: string;
  tone: "emerald" | "orange" | "slate";
}) {
  return (
    <Card className="fh-panel-card rounded-2xl">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{title}</div>
          <span
            className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${
              tone === "orange"
                ? "bg-[#fff3e8] text-[#cc6500]"
                : tone === "slate"
                  ? "bg-slate-100 text-slate-600"
                  : "bg-[#ecfff8] text-[#049e6d]"
            }`}
          >
            Live
          </span>
        </div>
        <div className="mt-2 text-2xl font-bold leading-none text-slate-900">{value}</div>
        <div className="mt-1 text-xs text-slate-500">{hint}</div>
      </CardContent>
    </Card>
  );
}



