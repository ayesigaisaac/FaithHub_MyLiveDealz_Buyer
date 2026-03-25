import React from "react";
import { MapPin } from "lucide-react";
import type { Institution } from "@/pages/user/discover/types";

type InstitutionMapProps = {
  institutions: Institution[];
};

export default function InstitutionMap({ institutions }: InstitutionMapProps) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-[#f8fafc] p-4 sm:p-5">
      <div className="relative h-[320px] overflow-hidden rounded-[24px] border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 sm:h-[420px]">
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] [background-size:38px_38px]" />
        <div className="absolute left-6 top-6 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">
          Kampala and nearby areas
        </div>
        {institutions.map((institution) => (
          <button
            type="button"
            key={institution.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: institution.mapX, top: institution.mapY }}
            data-action-label="Open profile"
          >
            <div className="group relative">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-full border-4 border-white shadow-sm ${
                  institution.sponsored
                    ? "bg-[#f77f00]"
                    : institution.verified
                      ? "bg-[#03cd8c]"
                      : "bg-slate-700"
                }`}
              >
                <MapPin className="h-4 w-4 text-white" />
              </div>
              <div className="absolute left-1/2 top-14 hidden w-56 -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-3 text-left shadow-xl group-hover:block">
                <div className="mb-1 text-sm font-semibold text-slate-900">{institution.name}</div>
                <div className="text-xs text-slate-500">
                  {institution.location} - {institution.distanceKm} km
                </div>
                <div className="mt-2 text-xs text-slate-600">{institution.serviceTime}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
