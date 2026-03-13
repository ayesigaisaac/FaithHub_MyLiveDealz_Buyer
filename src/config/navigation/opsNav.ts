import {
  ClipboardCheck,
  FileWarning,
  LayoutDashboard,
  ShieldAlert,
  ShieldCheck,
  Siren,
} from "lucide-react";
import type { EnterpriseNavItem } from "@/types/enterprise";

export const opsNav: EnterpriseNavItem[] = [
  {
    id: "ops-overview",
    label: "Incident Center",
    route: "/ops/incidents",
    icon: LayoutDashboard,
    permission: "manage_incidents",
  },
  {
    id: "ops-reports",
    label: "Reports",
    route: "/ops/reports",
    icon: FileWarning,
    permission: "manage_incidents",
  },
  {
    id: "ops-verification",
    label: "Verification Queue",
    route: "/ops/verification",
    icon: ClipboardCheck,
    permission: "manage_verification",
  },
  {
    id: "ops-moderation",
    label: "Moderation",
    route: "/ops/moderation",
    icon: ShieldCheck,
    permission: "manage_moderation",
  },
  {
    id: "ops-session-safety",
    label: "Session Safety",
    route: "/ops/session-safety",
    icon: Siren,
    permission: "manage_incidents",
    badge: "hot",
  },
  {
    id: "ops-audit",
    label: "Audit Trails",
    route: "/ops/audit-trails",
    icon: ShieldAlert,
    permission: "view_audit_logs",
  },
];
