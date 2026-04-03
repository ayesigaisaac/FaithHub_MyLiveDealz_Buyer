import React from "react";
import { ArrowRight, Building2, ExternalLink, Landmark, Lock, ShieldAlert, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/auth/AuthContext";
import { trackEvent } from "@/data/tracker";
import type { Role } from "@/types/roles";

const logoPortraitSrc = "/assets/branding/logo-portrait.png";

const accessCards = [
  {
    title: "User Workspace",
    description: "Open the routed FaithHub user experience for discovery, live sessions, events, giving, and settings.",
    path: "/app/user/home?as=user",
    tone: "bg-[#ecfff8] text-[#03cd8c]",
    icon: Users,
    role: "user" as Role,
  },
  {
    title: "Provider Workspace",
    description: "Open the institution workspace for dashboards, live operations, publishing, messaging, and funds.",
    path: "/app/provider/dashboard?as=provider&tenant=tenant-faithway",
    tone: "bg-[#fff8ef] text-[#f77f00]",
    icon: Landmark,
    role: "provider" as Role,
  },
  {
    title: "Super Admin",
    description: "Open platform-wide control for tenants, providers, users, incidents, billing, and feature governance.",
    path: "/app/admin/overview?admin=1&as=super_admin",
    tone: "bg-slate-100 text-slate-700",
    icon: Lock,
    role: "admin" as Role,
  },
  {
    title: "Tenant Admin",
    description: "Open institution-level workspace for members, events, sessions, branding, and moderation.",
    path: "/app/admin/overview?admin=1&as=tenant_admin&tenant=tenant-faithway",
    tone: "bg-[#eff6ff] text-[#1d4ed8]",
    icon: Building2,
    role: "admin" as Role,
  },
  {
    title: "Ops / Safety",
    description: "Open trust and safety workflows for reports, incidents, verification, and audit trail operations.",
    path: "/app/admin/live-moderation?admin=1&as=ops&tenant=tenant-faithway",
    tone: "bg-[#fef2f2] text-[#b91c1c]",
    icon: ShieldAlert,
    role: "admin" as Role,
  },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { mockLoginAsRole, role: currentRole } = useAuth();

  const openWorkspace = async (role: Role, path: string) => {
    await mockLoginAsRole(role);
    trackEvent(
      "ROLE_SWITCH",
      {
        fromRole: currentRole,
        toRole: role,
        trigger: "access",
      },
      { role },
    );
    navigate(path);
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-[radial-gradient(circle_at_top_right,rgba(3,205,140,0.12),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.08),transparent_18%)] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mb-8 flex justify-end">
          <Link
            to="/"
            className="inline-flex min-h-[42px] items-center justify-center rounded-2xl border border-slate-200 bg-white/90 px-[14px] text-[0.9rem] font-bold tracking-[0.01em] text-slate-900 transition hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
          >
            Return to Landing
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <Card className="fh-interactive-card rounded-[32px] border-[var(--border)] bg-[var(--card)] shadow-[var(--fh-shadow-card)]">
          <CardContent className="fh-pad-surface space-y-6">
            <div className="mx-auto max-w-md text-center">
              <div className="inline-flex items-center justify-center rounded-3xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--card)_92%,transparent_8%)] px-5 py-4 shadow-[var(--shadow-soft)]">
                <img
                  src={logoPortraitSrc}
                  alt="FaithHub"
                  className="h-28 w-auto object-contain sm:h-32"
                />
              </div>
              <h1 className="mt-5 text-3xl font-semibold leading-tight text-[var(--text-primary)] sm:text-4xl">
                Sign in to FaithHub workspace
              </h1>
              <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">
                Choose your role and continue with the right dashboard experience.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {accessCards.map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title} className="fh-surface-card rounded-[24px] border-[var(--border)] bg-[var(--surface)] shadow-[var(--fh-shadow-card)]">
                    <CardContent className="p-6">
                      <div className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.tone}`}>
                        {item.title}
                      </div>
                      <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--card)] text-[var(--text-primary)]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="mt-4 fh-body text-[var(--text-secondary)]">{item.description}</p>
                      <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-xs font-semibold text-[var(--text-secondary)]">
                        {item.path}
                      </div>
                      <button
                        type="button"
                        onClick={() => openWorkspace(item.role, item.path)}
                        className="mt-5 inline-flex min-h-[42px] w-full items-center justify-center rounded-2xl bg-[var(--accent)] px-[14px] text-[0.9rem] font-bold tracking-[0.01em] text-white shadow-[var(--shadow-soft)] transition hover:bg-[var(--accent-strong)]"
                      >
                        Open Workspace
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
