import React from "react";
import { useParams } from "react-router-dom";
import { roleDisplayName } from "@/config/permissions";
import { Card, CardContent } from "@/components/ui/card";
import type { AppRole } from "@/types/enterprise";

type EnterpriseModulePlaceholderProps = {
  role: AppRole;
};

function toTitleCase(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(" ");
}

export default function EnterpriseModulePlaceholder({ role }: EnterpriseModulePlaceholderProps) {
  const params = useParams();
  const section = params.module || "overview";

  return (
    <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-6">
        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{roleDisplayName[role]} Module</div>
        <div className="mt-2 text-2xl font-semibold text-slate-900">{toTitleCase(section)}</div>
        <div className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          This route is wired into the enterprise shell and permissions system. Replace this placeholder with a dedicated module page when feature details are ready.
        </div>
      </CardContent>
    </Card>
  );
}
