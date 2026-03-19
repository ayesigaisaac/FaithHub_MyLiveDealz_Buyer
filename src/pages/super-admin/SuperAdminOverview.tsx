import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const kpis = [
  { label: "Total Tenants", value: "248", note: "+9 this month" },
  { label: "Active Providers", value: "4,912", note: "93% verified" },
  { label: "Live Incidents", value: "17", note: "5 high priority" },
  { label: "Verification Queue", value: "126", note: "SLA 6h" },
  { label: "GMV (30d)", value: "$4.8M", note: "+12.4%" },
  { label: "Failed Payments", value: "0.9%", note: "stable" },
];

const systemSignals = [
  "Moderation backlog is elevated in East Africa region.",
  "Verification volume spiked 21% after weekend campaigns.",
  "API p95 latency remains within target threshold.",
];

export default function SuperAdminOverview() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {kpis.map((item) => (
          <Card key={item.label} className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <CardContent className="p-5">
              <div className="fh-eyebrow text-slate-500">{item.label}</div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">{item.value}</div>
              <div className="mt-1 text-sm text-slate-500">{item.note}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="fh-interactive-card rounded-3xl border border-slate-200 bg-white shadow-sm">
        <CardContent className="p-5">
          <div className="fh-kicker-subtle text-slate-500">Platform Signals</div>
          <div className="mt-3 space-y-3">
            {systemSignals.map((signal) => (
              <div key={signal} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {signal}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


