import React from "react";
import { Bell, Wifi, WifiOff } from "lucide-react";

type UserPageHeaderProps = {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  offline?: boolean;
  offlineLabel?: string;
};

export default function UserPageHeader({
  icon,
  title,
  subtitle = "EVzone Super App",
  offline = false,
  offlineLabel = "Cached mode",
}: UserPageHeaderProps) {
  return (
    <div className="fh-page-header mb-4 flex flex-wrap items-center justify-between gap-2.5 rounded-[24px] px-3 py-2.5 sm:gap-3 sm:rounded-[28px] sm:px-4 sm:py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#03cd8c] text-white shadow-lg shadow-[#03cd8c]/20 sm:h-11 sm:w-11 sm:rounded-2xl">
          {icon}
        </div>
        <div>
          <div className="fh-eyebrow text-[#03cd8c]">
            {subtitle}
          </div>
          <div className="text-base font-semibold sm:text-lg">{title}</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 md:flex">
          {offline ? (
            <WifiOff className="h-4 w-4 text-[#f77f00]" />
          ) : (
            <Wifi className="h-4 w-4 text-[#03cd8c]" />
          )}
          {offline ? offlineLabel : "Live data"}
        </div>
        <button
          type="button"
          aria-label="Open alerts"
          data-action-label="Open alerts"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-[#03cd8c]/30 hover:text-[#03cd8c] sm:h-11 sm:w-11 sm:rounded-2xl"
        >
          <Bell className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

