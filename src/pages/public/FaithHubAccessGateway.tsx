import React from "react";
import { ArrowRight, Building2, ExternalLink, Landmark, Lock, ShieldAlert, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const faithmartLogoLandscape = "/faithmart-logo-landscape.png";

const accessCards = [
  {
    title: "User Workspace",
    description: "Open the routed FaithHub user experience for discovery, live sessions, events, giving, and settings.",
    path: "/app/user/home?as=user",
    tone: "bg-[#ecfff8] text-[#03cd8c]",
    icon: Users,
  },
  {
    title: "Provider Workspace",
    description: "Open the institution workspace for dashboards, live operations, publishing, messaging, and funds.",
    path: "/app/provider/dashboard?as=provider&tenant=tenant-faithway",
    tone: "bg-[#fff8ef] text-[#f77f00]",
    icon: Landmark,
  },
  {
    title: "Super Admin",
    description: "Open platform-wide control for tenants, providers, users, incidents, billing, and feature governance.",
    path: "/super-admin/overview?as=super_admin",
    tone: "bg-slate-900 text-white",
    icon: Lock,
  },
  {
    title: "Tenant Admin",
    description: "Open institution-level workspace for members, events, sessions, branding, and moderation.",
    path: "/tenant-admin/overview?as=tenant_admin&tenant=tenant-faithway",
    tone: "bg-[#eff6ff] text-[#1d4ed8]",
    icon: Building2,
  },
  {
    title: "Ops / Safety",
    description: "Open trust and safety workflows for reports, incidents, verification, and audit trail operations.",
    path: "/ops/incidents?as=ops&tenant=tenant-faithway",
    tone: "bg-[#fef2f2] text-[#b91c1c]",
    icon: ShieldAlert,
  },
];

export default function FaithHubAccessGateway() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[radial-gradient(circle_at_top_right,rgba(3,205,140,0.12),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.08),transparent_18%)] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="flex min-w-0 items-center gap-3 text-left">
            <img src={faithmartLogoLandscape} alt="FaithMart" className="h-12 w-auto max-w-[15rem] object-contain sm:h-14 sm:max-w-[18rem]" />
          </Link>
          <Link
            to="/"
            className="inline-flex min-h-[42px] items-center justify-center rounded-2xl border border-slate-200 bg-white px-[14px] text-[0.9rem] font-bold tracking-[0.01em] text-slate-900 transition hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
          >
            Return to Landing
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <Card className="fh-interactive-card rounded-[32px] border-slate-200 bg-white/95 shadow-[0_30px_90px_-40px_rgba(15,23,42,0.32)]">
          <CardContent className="fh-pad-surface">
            <div className="inline-flex items-center rounded-full bg-[#ecfff8] px-3 py-1 fh-eyebrow-soft text-[#03cd8c]">
              Internal Preview Access
            </div>
            <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              Open any FaithHub dashboard without typing deep routes.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              This gateway is for development, QA, demos, and stakeholder walkthroughs. The public landing page still
              presents only User and Provider experiences.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {accessCards.map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title} className="rounded-[28px] border-slate-200 bg-[#f8fafc] shadow-sm">
                    <CardContent className="p-6">
                      <div className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.tone}`}>
                        {item.title}
                      </div>
                      <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-900 ring-1 ring-slate-200">
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="mt-4 fh-body text-slate-600">{item.description}</p>
                      <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-slate-500">
                        {item.path}
                      </div>
                      <Link
                        to={item.path}
                        className="mt-5 inline-flex min-h-[42px] w-full items-center justify-center rounded-2xl bg-[#03cd8c] px-[14px] text-[0.9rem] font-bold tracking-[0.01em] text-white shadow-[var(--shadow-soft)] transition hover:brightness-105"
                      >
                        Open Workspace
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
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


