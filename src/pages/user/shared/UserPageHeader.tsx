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
    <div className="mb-4 flex items-center justify-between rounded-[28px] border border-white/70 bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#03cd8c] text-white shadow-lg shadow-[#03cd8c]/20">
          {icon}
        </div>
        <div>
          <div className="fh-eyebrow text-[#03cd8c]">
            {subtitle}
          </div>
          <div className="text-lg font-semibold">{title}</div>
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
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-[#03cd8c]/30 hover:text-[#03cd8c]"
        >
          <Bell className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

