import React from "react";
import {
  Compass,
  Globe,
  Headset,
  Instagram,
  Linkedin,
  Mail,
  MessageSquare,
  ShieldCheck,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

type FaithHubFooterProps = {
  variant?: "app" | "public";
  surface?: "card" | "band";
  density?: "comfortable" | "compact";
  className?: string;
};

type FooterLink = {
  label: string;
  to: string;
};

type FooterGroup = {
  title: string;
  links: FooterLink[];
};

type FooterUtilityLink = {
  label: string;
  to: string;
  icon: LucideIcon;
};

type FooterContactLink = {
  label: string;
  icon: LucideIcon;
  to?: string;
  href?: string;
  external?: boolean;
};

type FooterSocialLink = {
  label: string;
  icon: LucideIcon;
  href: string;
};

type FooterVariantConfig = {
  kicker: string;
  title: string;
  description: string;
  trustPills: string[];
  barLinks: FooterLink[];
  groups: FooterGroup[];
  utilityLinks: FooterUtilityLink[];
  contactLinks: FooterContactLink[];
  socialLinks: FooterSocialLink[];
  statusLabel: string;
};

const footerConfigByVariant: Record<NonNullable<FaithHubFooterProps["variant"]>, FooterVariantConfig> = {
  app: {
    kicker: "FaithHub Workspace",
    title: "Operate every ministry flow in one place",
    description:
      "Live sessions, series, events, giving, moderation, and governance modules are connected through one premium FaithHub shell.",
    trustPills: ["Verified communities", "Safe live engagement", "Governance ready"],
    barLinks: [
      { label: "User App", to: "/app/user/home" },
      { label: "Provider App", to: "/app/provider/dashboard" },
      { label: "Live Sessionz", to: "/app/user/live" },
      { label: "Series Library", to: "/app/user/series" },
      { label: "Events", to: "/app/user/events" },
      { label: "Giving", to: "/app/user/giving" },
      { label: "Help Center", to: "/app/user/settings" },
      { label: "Security", to: "/app/admin/security" },
    ],
    groups: [
      {
        title: "Workspace",
        links: [
          { label: "User Home", to: "/app/user/home" },
          { label: "Provider Dashboard", to: "/app/provider/dashboard" },
          { label: "Admin Overview", to: "/app/admin/overview" },
        ],
      },
      {
        title: "Live & Content",
        links: [
          { label: "Live Hub", to: "/app/user/live" },
          { label: "Series Library", to: "/app/user/series" },
          { label: "Live Operations", to: "/app/provider/live-ops" },
        ],
      },
      {
        title: "Community & Trust",
        links: [
          { label: "Events", to: "/app/user/events" },
          { label: "Giving", to: "/app/user/giving" },
          { label: "Reviews", to: "/app/user/reviews" },
        ],
      },
    ],
    utilityLinks: [
      { label: "Help Center", to: "/app/user/settings", icon: Headset },
      { label: "Trust Controls", to: "/app/admin/policy", icon: ShieldCheck },
    ],
    contactLinks: [
      { label: "Support Email", icon: Mail, href: "mailto:support@faithhub.app" },
      { label: "Trust & Safety", icon: ShieldCheck, href: "mailto:safety@faithhub.app" },
      { label: "Live Chat", icon: MessageSquare, to: "/app/user/live/chat" },
      { label: "Support Desk", icon: Headset, to: "/app/user/settings" },
    ],
    socialLinks: [
      { label: "Website", icon: Globe, href: "https://faithhub.app" },
      { label: "YouTube", icon: Youtube, href: "https://www.youtube.com/@faithhub" },
      { label: "Instagram", icon: Instagram, href: "https://www.instagram.com/faithhubapp" },
      { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/faithhub" },
    ],
    statusLabel: "Platform status: Healthy",
  },
  public: {
    kicker: "FaithHub Platform",
    title: "Digital faith experiences, professionally connected",
    description:
      "FaithHub brings worship, teachings, live participation, events, giving, and trusted community engagement into one scalable product system.",
    trustPills: ["Community-first design", "Trust built in", "Multi-role ready"],
    barLinks: [
      { label: "Landing", to: "/" },
      { label: "Shell Preview", to: "/shell-preview" },
      { label: "Access Gateway", to: "/access" },
      { label: "User App", to: "/app/user/home" },
      { label: "Provider App", to: "/app/provider/dashboard" },
      { label: "Live Sessionz", to: "/app/user/live" },
      { label: "Contact Hub", to: "/access" },
      { label: "Security", to: "/app/admin/security" },
    ],
    groups: [
      {
        title: "Explore",
        links: [
          { label: "Landing", to: "/" },
          { label: "Shell Preview", to: "/shell-preview" },
          { label: "Access Gateway", to: "/access" },
        ],
      },
      {
        title: "Core Journeys",
        links: [
          { label: "User App", to: "/app/user/home" },
          { label: "Provider App", to: "/app/provider/dashboard" },
          { label: "Live Sessionz", to: "/app/user/live" },
        ],
      },
      {
        title: "FaithHub Network",
        links: [
          { label: "Series Library", to: "/app/user/series" },
          { label: "Events & Marketplace", to: "/app/user/events" },
          { label: "Giving", to: "/app/user/giving" },
        ],
      },
    ],
    utilityLinks: [
      { label: "Contact Hub", to: "/access", icon: MessageSquare },
      { label: "Shell Demo", to: "/shell-preview", icon: Compass },
    ],
    contactLinks: [
      { label: "General Inquiries", icon: Mail, href: "mailto:hello@faithhub.app" },
      { label: "Partnerships", icon: Headset, href: "mailto:partnerships@faithhub.app" },
      { label: "Contact Hub", icon: MessageSquare, to: "/access" },
      { label: "Security", icon: ShieldCheck, to: "/app/admin/security" },
    ],
    socialLinks: [
      { label: "Website", icon: Globe, href: "https://faithhub.app" },
      { label: "YouTube", icon: Youtube, href: "https://www.youtube.com/@faithhub" },
      { label: "Instagram", icon: Instagram, href: "https://www.instagram.com/faithhubapp" },
      { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/faithhub" },
    ],
    statusLabel: "Platform status: Live",
  },
};

export default function FaithHubFooter({
  variant = "app",
  surface = "card",
  density = "comfortable",
  className = "",
}: FaithHubFooterProps) {
  const year = new Date().getFullYear();
  const config = footerConfigByVariant[variant];
  const band = surface === "band";
  const compact = density === "compact";
  const visibleTrustPills = compact ? config.trustPills.slice(0, 2) : config.trustPills;
  const visibleContactLinks = compact ? config.contactLinks.slice(0, 3) : config.contactLinks;
  const compactBandLinks = config.barLinks.slice(0, variant === "public" ? 7 : 6);

  if (band && compact) {
    return (
      <footer
        className={`border-t border-[color:var(--fh-footer-band-border)] bg-[color:var(--fh-footer-band-bg)] px-4 py-3 sm:px-5 ${className}`.trim()}
      >
        <div className="mx-auto flex max-w-[1860px] flex-col gap-2.5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--fh-footer-band-brand-border)] bg-[color:var(--fh-footer-band-brand-bg)] text-[11px] font-bold text-[color:var(--fh-footer-band-brand-text)]">
              FH
            </span>
            <p className="truncate text-[11px] text-[color:var(--fh-footer-band-text)]">
              &copy; {year} FaithHub | EVzone Super App | All rights reserved.
            </p>
          </div>

          <nav aria-label="Footer quick links" className="flex flex-wrap items-center gap-1.5">
            {compactBandLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="inline-flex min-h-[26px] items-center rounded-full border border-[color:var(--fh-footer-band-chip-border)] bg-[color:var(--fh-footer-band-chip-bg)] px-2.5 text-[11px] font-semibold text-[color:var(--fh-footer-band-link)] transition hover:text-[color:var(--fh-footer-band-link-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#03cd8c]/35"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex min-h-[25px] items-center rounded-full border border-[color:var(--fh-footer-band-status-border)] bg-[color:var(--fh-footer-band-status-bg)] px-2.5 text-[10px] font-semibold text-[color:var(--fh-footer-band-status-text)]">
              {config.statusLabel}
            </span>
            <div className="flex items-center gap-1">
              {config.socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Open FaithHub ${social.label}`}
                  title={social.label}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--fh-footer-band-chip-border)] bg-[color:var(--fh-footer-band-chip-bg)] text-[color:var(--fh-footer-band-chip-text)] transition hover:text-[color:var(--fh-footer-band-link-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#03cd8c]/35"
                >
                  <social.icon className="h-3 w-3" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer
      className={`${
        band
          ? `rounded-none border-x-0 border-b-0 border-t border-slate-700 bg-[linear-gradient(100deg,#121922,#1a2430)] shadow-none ${
              compact ? "px-4 py-3.5 sm:px-5 sm:py-4" : "px-5 py-5"
            }`
          : `rounded-[22px] border border-[var(--border)] bg-[color:var(--card)]/95 shadow-[0_8px_26px_rgba(15,23,42,0.08)] ${
              compact ? "px-4 py-3.5 sm:px-5 sm:py-4" : "px-4 py-4 sm:px-5 sm:py-5"
            }`
      } ${className}`.trim()}
    >
      <div
        className={`grid ${
          compact
            ? "gap-3 lg:grid-cols-[minmax(220px,0.95fr)_minmax(0,1.25fr)] lg:gap-4"
            : "gap-5 lg:grid-cols-[minmax(250px,1fr)_minmax(0,1.5fr)] lg:gap-6"
        }`}
      >
        <div className={compact ? "space-y-2" : "space-y-3"}>
          <div className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${band ? "text-slate-400" : "text-slate-500"}`}>
            {config.kicker}
          </div>
          <div className={`${compact ? "text-base" : "text-lg"} font-semibold tracking-tight ${band ? "text-slate-100" : "text-slate-900"}`}>
            {config.title}
          </div>
          <div className={`${compact ? "text-xs leading-5" : "text-sm leading-6"} ${band ? "text-slate-300" : "text-slate-600"}`}>
            {config.description}
          </div>

          <div className={`flex flex-wrap ${compact ? "gap-1.5" : "gap-2"}`}>
            {visibleTrustPills.map((pill) => (
              <span
                key={pill}
                className={`inline-flex items-center rounded-full ${compact ? "min-h-[24px] px-2.5 text-[10px]" : "min-h-[28px] px-3 text-[11px]"} font-semibold ${
                  band
                    ? "border border-slate-600 bg-slate-800/45 text-slate-200"
                    : "border border-slate-200 bg-[color:var(--surface)] text-slate-600"
                }`}
              >
                {pill}
              </span>
            ))}
          </div>

          <div className={`flex flex-wrap ${compact ? "gap-1.5 pt-0.5" : "gap-2 pt-1"}`}>
            {config.utilityLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`inline-flex items-center rounded-full font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#03cd8c]/35 ${
                  compact ? "min-h-[28px] gap-1 px-2.5 text-[11px]" : "min-h-[32px] gap-1.5 px-3 text-xs"
                } ${
                  band
                    ? "border border-slate-600 bg-slate-800/55 text-slate-100 hover:border-[#2fd49b] hover:text-[#8bf3cd]"
                    : "border border-slate-200 bg-[color:var(--surface)] text-slate-700 hover:border-[#03cd8c]/35 hover:text-[#049e6d]"
                }`}
              >
                <link.icon className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} />
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <nav aria-label="Footer links" className={`grid ${compact ? "gap-2.5 sm:grid-cols-2 xl:grid-cols-3" : "gap-3 sm:grid-cols-2 xl:grid-cols-3"}`}>
          {config.groups.map((group) => (
            <div
              key={group.title}
              className={`rounded-xl ${compact ? "p-2.5" : "p-3"} ${band ? "border border-slate-700 bg-slate-800/45" : "border border-slate-200 bg-[color:var(--surface)]"}`}
            >
              <div className={`text-[10px] font-semibold uppercase tracking-[0.15em] ${band ? "text-slate-400" : "text-slate-500"}`}>
                {group.title}
              </div>
              <div className={`flex flex-col ${compact ? "mt-1.5 gap-1.5" : "mt-2 gap-2"}`}>
                {group.links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`inline-flex items-center rounded-full font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#03cd8c]/35 ${
                      compact ? "min-h-[28px] px-2.5 text-[11px]" : "min-h-[32px] px-3 text-xs"
                    } ${
                      band
                        ? "border border-slate-600 bg-slate-900/45 text-slate-200 hover:border-[#2fd49b] hover:text-[#8bf3cd]"
                        : "border border-slate-200 bg-[color:var(--card)] text-slate-600 hover:border-[#03cd8c]/35 hover:text-[#049e6d]"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      <div className={`${compact ? "mt-3 pt-2.5" : "mt-4 pt-3"} flex flex-col gap-2.5 border-t lg:flex-row lg:items-center lg:justify-between ${band ? "border-slate-700" : "border-slate-200"}`}>
        <div className={`${compact ? "text-[10px]" : "text-[11px]"} ${band ? "text-slate-400" : "text-slate-500"}`}>
          &copy; {year} FaithHub | EVzone Super App | All rights reserved.
        </div>
        <div className={`flex flex-wrap items-center ${compact ? "gap-1.5" : "gap-2"}`}>
          {visibleContactLinks.map((link) =>
            link.to ? (
              <Link
                key={link.label}
                to={link.to}
                className={`inline-flex items-center rounded-full font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#03cd8c]/35 ${
                  compact ? "min-h-[26px] gap-1 px-2.5 text-[10px]" : "min-h-[30px] gap-1.5 px-3 text-[11px]"
                } ${
                  band
                    ? "border border-slate-600 bg-slate-800/55 text-slate-200 hover:border-[#2fd49b] hover:text-[#8bf3cd]"
                    : "border border-slate-200 bg-[color:var(--surface)] text-slate-600 hover:border-[#03cd8c]/35 hover:text-[#049e6d]"
                }`}
              >
                <link.icon className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} />
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target={link.external ?? link.href?.startsWith("http") ? "_blank" : undefined}
                rel={link.external ?? link.href?.startsWith("http") ? "noreferrer noopener" : undefined}
                className={`inline-flex items-center rounded-full font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#03cd8c]/35 ${
                  compact ? "min-h-[26px] gap-1 px-2.5 text-[10px]" : "min-h-[30px] gap-1.5 px-3 text-[11px]"
                } ${
                  band
                    ? "border border-slate-600 bg-slate-800/55 text-slate-200 hover:border-[#2fd49b] hover:text-[#8bf3cd]"
                    : "border border-slate-200 bg-[color:var(--surface)] text-slate-600 hover:border-[#03cd8c]/35 hover:text-[#049e6d]"
                }`}
              >
                <link.icon className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} />
                {link.label}
              </a>
            ),
          )}
        </div>

        <div className={`flex flex-wrap items-center ${compact ? "gap-1.5" : "gap-2"}`}>
          <div
            className={`inline-flex items-center rounded-full px-3 font-semibold ${
              compact ? "min-h-[26px] text-[10px]" : "min-h-[30px] text-[11px]"
            } ${
              band
                ? "border border-[#2aa77c] bg-[#123327] text-[#85f2c5]"
                : "border border-[#bfe9d9] bg-[#ecfff8] text-[#049e6d]"
            }`}
          >
            {config.statusLabel}
          </div>
          <div className={`hidden h-4 w-px sm:block ${band ? "bg-slate-600" : "bg-slate-200"}`} />
          <div className={`flex items-center ${compact ? "gap-0.5" : "gap-1"}`}>
            {config.socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Open FaithHub ${social.label}`}
                title={social.label}
                className={`inline-flex items-center justify-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#03cd8c]/35 ${
                  compact ? "h-7 w-7" : "h-8 w-8"
                } ${
                  band
                    ? "border border-slate-600 bg-slate-800/55 text-slate-200 hover:border-[#2fd49b] hover:text-[#8bf3cd]"
                    : "border border-slate-200 bg-[color:var(--surface)] text-slate-600 hover:border-[#03cd8c]/35 hover:text-[#049e6d]"
                }`}
              >
                <social.icon className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
