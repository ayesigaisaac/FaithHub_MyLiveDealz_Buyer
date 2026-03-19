import React from "react";
import { ChevronRight } from "lucide-react";
import type { HomeIntent } from "@/pages/user/home/types";

type IntentCardsProps = {
  intents: HomeIntent[];
  activeIntentId: string;
  onSelect: (intentId: string) => void;
};

export default function IntentCards({
  intents,
  activeIntentId,
  onSelect,
}: IntentCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
      {intents.map((intent, index) => {
        const Icon = intent.icon;
        const active = activeIntentId === intent.id;

        return (
          <button
            key={intent.id}
            type="button"
            onClick={() => onSelect(intent.id)}
            data-action-label={intent.actionLabel}
            className={`group flex min-w-0 min-h-[250px] flex-col rounded-[22px] border p-6 text-left transition ${
              active
                ? "border-emerald-200 bg-[linear-gradient(180deg,rgba(16,185,129,0.14),rgba(16,185,129,0.05))] text-[var(--text-primary)] shadow-[0_16px_40px_rgba(16,185,129,0.16)]"
                : "border-slate-200/90 bg-white text-[var(--text-primary)] shadow-[0_10px_28px_rgba(15,23,42,0.05)] hover:-translate-y-0.5 hover:border-emerald-200"
            }`}
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                  active
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                    : "bg-[#03cd8c]/10 text-emerald-600"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>

              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  active ? "bg-white/80 text-emerald-700" : "bg-slate-50 text-slate-500"
                }`}
              >
                {`0${index + 1}`}
              </span>
            </div>

            <div className="text-[1.22rem] font-semibold leading-8 text-[var(--text-primary)]">
              {intent.title}
            </div>

            <div
              className={`mt-3 text-[15px] leading-7 ${
                active ? "text-[var(--text-primary)]/80" : "text-[var(--text-secondary)]"
              }`}
            >
              {intent.description}
            </div>

            <div
              className={`mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold ${
                active ? "text-emerald-700" : "text-slate-500 group-hover:text-emerald-600"
              }`}
            >
              Open
              <ChevronRight className="h-3.5 w-3.5" />
            </div>
          </button>
        );
      })}
    </div>
  );
}

