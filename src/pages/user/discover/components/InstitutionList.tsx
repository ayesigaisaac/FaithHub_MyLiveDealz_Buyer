import React from "react";
import { Clock3, MapPin, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Institution } from "@/pages/user/discover/types";

type InstitutionListProps = {
  institutions: Institution[];
};

export default function InstitutionList({ institutions }: InstitutionListProps) {
  if (!institutions.length) {
    return (
      <div className="rounded-[24px] border border-dashed border-slate-200 bg-[#f8fafc] p-8 text-center">
        <div className="text-lg font-semibold text-slate-900">No institutions matched</div>
        <div className="mt-2 text-sm text-slate-500">
          Try broadening one or more filters to see more institutions.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {institutions.map((institution) => (
        <div
          key={institution.id}
          className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#03cd8c]/35 hover:shadow-lg hover:shadow-[#03cd8c]/10"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <div className="text-lg font-semibold text-slate-900">{institution.name}</div>
                {institution.verified ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#ecfff8] px-2.5 py-1 text-xs font-semibold text-[#03cd8c]">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Verified
                  </span>
                ) : null}
                {institution.sponsored ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#fff8ef] px-2.5 py-1 text-xs font-semibold text-[#f77f00]">
                    <Star className="h-3.5 w-3.5" />
                    Sponsored
                  </span>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                <span>{institution.faith}</span>
                <span>-</span>
                <span>{institution.denomination}</span>
                <span>-</span>
                <span>{institution.language}</span>
                <span>-</span>
                <span>{institution.distanceKm} km away</span>
                <span>-</span>
                <span>{institution.followers}</span>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-600">
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 ring-1 ring-slate-200">
                  <MapPin className="h-4 w-4 text-[#03cd8c]" />
                  {institution.location}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 ring-1 ring-slate-200">
                  <Clock3 className="h-4 w-4 text-[#03cd8c]" />
                  {institution.serviceTime}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]" data-action-label="Open profile">
                Open profile
              </Button>
              <Button
                variant="outline"
                className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
              >
                Follow
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
