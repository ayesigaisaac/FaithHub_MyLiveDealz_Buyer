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
                ? "border-[color:color-mix(in_srgb,var(--accent)_32%,var(--border)_68%)] bg-[color-mix(in_srgb,var(--accent)_13%,var(--card)_87%)] text-[var(--text-primary)] shadow-[0_16px_40px_rgba(3,205,140,0.16)]"
                : "border-[var(--border)] bg-[var(--card)] text-[var(--text-primary)] shadow-[0_10px_28px_rgba(15,23,42,0.05)] hover:-translate-y-0.5 hover:border-[color:color-mix(in_srgb,var(--accent)_28%,var(--border)_72%)]"
            }`}
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                  active
                    ? "bg-[var(--accent)] text-white shadow-sm shadow-[rgba(3,205,140,0.2)]"
                    : "bg-[var(--accent-soft)] text-[var(--accent)]"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>

              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  active ? "bg-[var(--accent-soft)] text-[var(--accent-strong)]" : "bg-[color-mix(in_srgb,var(--border)_70%,transparent_30%)] text-[var(--text-secondary)]"
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
                active ? "text-[var(--accent-strong)]" : "text-[var(--text-secondary)] group-hover:text-[var(--accent)]"
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

