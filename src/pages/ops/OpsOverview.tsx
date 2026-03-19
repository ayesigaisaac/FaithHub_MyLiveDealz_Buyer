import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const opsCards = [
  { label: "Open Incidents", value: "41", note: "8 critical" },
  { label: "Reports In Queue", value: "289", note: "12% aged > 24h" },
  { label: "Verification Checks", value: "73", note: "automated assist enabled" },
  { label: "Audit Alerts", value: "6", note: "permission escalations" },
];

const escalationItems = [
  "Escalate coordinated abuse reports for regional live session channels.",
  "Validate suspicious payout account changes from newly onboarded providers.",
  "Review repeated permission edits from one tenant admin group.",
];

export default function OpsOverview() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        {opsCards.map((item) => (
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
          <div className="fh-kicker-subtle text-slate-500">Escalation Priorities</div>
          <div className="mt-3 space-y-3">
            {escalationItems.map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}



