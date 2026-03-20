import React from "react";
import { Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { discoverFilterOptions } from "@/pages/user/discover/constants";
import type { DiscoverFilters } from "@/pages/user/discover/types";

type DiscoverFiltersPanelProps = {
  filters: DiscoverFilters;
  onChange: (nextFilters: DiscoverFilters) => void;
  onReset: () => void;
  activeCount: number;
};

function FilterChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
        active
          ? "border-[#03cd8c] bg-[#03cd8c] text-white shadow-lg shadow-[#03cd8c]/20"
          : "border-slate-200 bg-white text-slate-700 hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
      }`}
    >
      {label}
    </button>
  );
}

export default function DiscoverFiltersPanel({
  filters,
  onChange,
  onReset,
  activeCount,
}: DiscoverFiltersPanelProps) {
  return (
    <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
      <CardContent className="fh-pad-panel">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <div className="hidden text-[#03cd8c]">
              Filters
            </div>
            <div className="mt-2 text-xl font-semibold text-slate-900">Refine discovery</div>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="rounded-full bg-[#ecfff8] text-[#03cd8c] hover:bg-[#ecfff8]">
              <Filter className="mr-1 h-3.5 w-3.5" />
              {activeCount > 0 ? `${activeCount} active` : "Transparent matching"}
            </Badge>
            <Button
              variant="ghost"
              className="rounded-full text-[#03cd8c] hover:bg-[#03cd8c]/10 hover:text-[#03cd8c]"
              onClick={onReset}
            >
              Reset
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="mb-2 text-sm font-semibold text-slate-900">Faith family</div>
            <div className="flex flex-wrap gap-2">
              {discoverFilterOptions.faith.map((option) => (
                <FilterChip
                  key={option}
                  label={option}
                  active={filters.faith === option}
                  onClick={() => onChange({ ...filters, faith: option })}
                />
              ))}
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div>
              <div className="mb-2 text-sm font-semibold text-slate-900">Denomination</div>
              <div className="flex flex-wrap gap-2">
                {discoverFilterOptions.denomination.map((option) => (
                  <FilterChip
                    key={option}
                    label={option}
                    active={filters.denomination === option}
                    onClick={() => onChange({ ...filters, denomination: option })}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 text-sm font-semibold text-slate-900">Language</div>
              <div className="flex flex-wrap gap-2">
                {discoverFilterOptions.language.map((option) => (
                  <FilterChip
                    key={option}
                    label={option}
                    active={filters.language === option}
                    onClick={() => onChange({ ...filters, language: option })}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 text-sm font-semibold text-slate-900">Distance</div>
              <div className="flex flex-wrap gap-2">
                {discoverFilterOptions.distance.map((option) => (
                  <FilterChip
                    key={option}
                    label={option}
                    active={filters.distance === option}
                    onClick={() => onChange({ ...filters, distance: option })}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

