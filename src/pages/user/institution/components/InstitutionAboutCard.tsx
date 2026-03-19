import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { LeaderItem, ServiceScheduleItem } from "@/pages/user/institution/types";

type InstitutionAboutCardProps = {
  leaders: LeaderItem[];
  schedule: ServiceScheduleItem[];
};

export default function InstitutionAboutCard({
  leaders,
  schedule,
}: InstitutionAboutCardProps) {
  return (
    <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
      <CardContent className="fh-pad-panel">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <div className="text-lg font-semibold text-slate-900 sm:text-xl">
              About the institution
            </div>
            <div className="text-sm text-slate-500">
              Leaders, mission details, and weekly service rhythm.
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.62fr_0.38fr]">
          <div className="space-y-4">
            <div className="fh-subcard rounded-[24px] p-4">
              <div className="mb-2 text-sm font-semibold text-slate-900">Mission and community focus</div>
              <div className="fh-body text-slate-600">
                This institution serves a broad faith community through weekly worship, teaching
                series, prayer ministry, youth programs, missions, and pastoral support.
              </div>
            </div>

            <div className="fh-subcard rounded-[24px] p-4">
              <div className="mb-3 text-sm font-semibold text-slate-900">Leaders</div>
              <div className="space-y-3">
                {leaders.map((leader) => (
                  <div key={leader.name} className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-4">
                    <div className="text-sm font-semibold text-slate-900">{leader.name}</div>
                    <div className="text-sm text-slate-500">{leader.role}</div>
                    <div className="mt-1 text-sm text-slate-600">{leader.specialty}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3 fh-subcard rounded-[24px] p-4">
            <div className="text-sm font-semibold text-slate-900">Service schedule</div>
            {schedule.map((serviceItem) => (
              <div key={serviceItem.day} className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-4">
                <div className="text-sm font-semibold text-slate-900">{serviceItem.day}</div>
                <div className="text-sm text-slate-500">{serviceItem.time}</div>
                <div className="mt-1 text-sm text-slate-600">{serviceItem.note}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

