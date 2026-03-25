import React from "react";
import type { DonationMode } from "@/pages/user/giving/types";

const donationModes: DonationMode[] = ["One-time", "Weekly", "Monthly", "Quarterly"];

type DonationModeToggleProps = {
  mode: DonationMode;
  onChange: (nextMode: DonationMode) => void;
};

export default function DonationModeToggle({ mode, onChange }: DonationModeToggleProps) {
  return (
    <div>
      <div className="mb-2 text-sm font-medium text-slate-700">Frequency</div>
      <div className="flex flex-wrap gap-2">
        {donationModes.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              mode === item
                ? "border-slate-200 bg-white text-slate-900 shadow-sm"
                : "border-slate-200 bg-white text-slate-700 hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
