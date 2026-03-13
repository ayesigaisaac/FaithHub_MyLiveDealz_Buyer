import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const summaryCards = [
  { label: "Members", value: "18,402", note: "+3.1% this month" },
  { label: "Upcoming Events", value: "34", note: "12 ticketed" },
  { label: "Live Sessions", value: "11", note: "2 currently streaming" },
  { label: "Moderation Cases", value: "9", note: "all within SLA" },
];

const priorities = [
  "Approve pending provider booths for the Easter marketplace.",
  "Review youth-session moderation policy adjustments.",
  "Finalize local branding for the regional event campaign.",
];

export default function TenantAdminOverview() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((item) => (
          <Card key={item.label} className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <CardContent className="p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{item.label}</div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">{item.value}</div>
              <div className="mt-1 text-sm text-slate-500">{item.note}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <CardContent className="p-5">
          <div className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Priority Queue</div>
          <div className="mt-3 space-y-3">
            {priorities.map((task) => (
              <div key={task} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {task}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
