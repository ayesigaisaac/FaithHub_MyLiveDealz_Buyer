import React, { useMemo, useState } from "react";
import {
  Compass,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DashboardActionItem,
  DashboardSectionHeader,
  DashboardStatCard,
} from "@/components/dashboard";
import UserActionBar from "@/pages/user/shared/UserActionBar";
import {
  discoverFilterOptions,
  defaultDiscoverFilters,
} from "@/pages/user/discover/constants";
import { discoverInstitutions } from "@/pages/user/discover/mockData";
import {
  filterDiscoverInstitutions,
  getActiveFilterCount,
  getNearbyNowInstitutions,
} from "@/pages/user/discover/utils";
import type { DiscoverFilters, DiscoverViewMode } from "@/pages/user/discover/types";

export default function DiscoverInstitutions() {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<DiscoverViewMode>("list");
  const [filters, setFilters] = useState<DiscoverFilters>(defaultDiscoverFilters);

  const filteredInstitutions = useMemo(
    () => filterDiscoverInstitutions(discoverInstitutions, search, filters),
    [search, filters],
  );

  const nearbyNowInstitutions = useMemo(
    () => getNearbyNowInstitutions(filteredInstitutions),
    [filteredInstitutions],
  );

  const activeFilterCount = useMemo(() => getActiveFilterCount(filters), [filters]);

  const verifiedCount = useMemo(
    () => filteredInstitutions.filter((institution) => institution.verified).length,
    [filteredInstitutions],
  );

  const sponsoredCount = useMemo(
    () => filteredInstitutions.filter((institution) => institution.sponsored).length,
    [filteredInstitutions],
  );

  const setFilterValue = <K extends keyof DiscoverFilters>(key: K, value: DiscoverFilters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-4">
      <Card className="fh-interactive-card overflow-hidden rounded-[24px] border border-[var(--border)] bg-[linear-gradient(109deg,rgba(14,165,233,0.12),rgba(248,251,252,0.94)_35%,rgba(3,205,140,0.1))] shadow-[var(--shadow-soft)]">
        <CardContent className="p-4 sm:p-5 lg:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0">
              <div className="fh-label text-slate-500">Discover</div>
              <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Discover Institutions</h2>
              <p className="mt-2 text-sm text-slate-600">Find nearby worship communities, live sessions, and trusted institutions.</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge className="rounded-full border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                  Nearby now: {nearbyNowInstitutions.length}
                </Badge>
                <Badge className="rounded-full border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-100">
                  Active filters: {activeFilterCount}
                </Badge>
                <Badge className="rounded-full border-slate-200 bg-white text-slate-600 hover:bg-white">
                  Verified communities
                </Badge>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 xl:w-auto xl:min-w-[430px]">
              <label className="flex min-h-[42px] items-center gap-2 rounded-xl border border-[var(--border)] bg-white px-3 text-sm text-slate-500">
                <Search className="h-4 w-4 shrink-0" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search institutions or location"
                  className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </label>

              <div className="flex flex-wrap items-center justify-end gap-2">
                <div className="inline-flex items-center rounded-xl border border-[var(--border)] bg-white p-1">
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      viewMode === "list" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    List
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("map")}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      viewMode === "map" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    Map
                  </button>
                </div>

                <Button
                  variant="outline"
                  data-action-label="Open profile"
                  className="h-10 rounded-xl border-slate-200 bg-white px-4 text-sm text-slate-700 hover:bg-slate-50"
                >
                  Open profile
                </Button>
                <Button
                  data-action-label="Join live"
                  className="h-10 rounded-xl bg-[#03cd8c] px-4 text-sm text-white hover:bg-[#03cd8c]"
                >
                  Join live
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <FilterSelect
              label="Faith"
              value={filters.faith}
              options={discoverFilterOptions.faith}
              onChange={(value) => setFilterValue("faith", value)}
            />
            <FilterSelect
              label="Denomination"
              value={filters.denomination}
              options={discoverFilterOptions.denomination}
              onChange={(value) => setFilterValue("denomination", value)}
            />
            <FilterSelect
              label="Language"
              value={filters.language}
              options={discoverFilterOptions.language}
              onChange={(value) => setFilterValue("language", value)}
            />
            <FilterSelect
              label="Distance"
              value={filters.distance}
              options={discoverFilterOptions.distance}
              onChange={(value) => setFilterValue("distance", value as DiscoverFilters["distance"])}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          label="Results"
          value={String(filteredInstitutions.length)}
          hint="Institutions match current filters"
          tone="emerald"
          icon={<Compass className="h-4 w-4" />}
        />
        <DashboardStatCard
          label="Nearby now"
          value={String(nearbyNowInstitutions.length)}
          hint="Active services close to your location"
          tone="orange"
          icon={<MapPin className="h-4 w-4" />}
        />
        <DashboardStatCard
          label="Verified"
          value={String(verifiedCount)}
          hint="Identity and trust checks passed"
          tone="slate"
          icon={<ShieldCheck className="h-4 w-4" />}
        />
        <DashboardStatCard
          label="Sponsored"
          value={String(sponsoredCount)}
          hint="Clearly labeled promoted placements"
          tone="emerald"
          icon={<Users className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr_1fr]">
        <Card className="fh-interactive-card fh-surface-card rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <DashboardSectionHeader
              title="Institution Results"
              subtitle={viewMode === "list" ? "List view with trust and service signals" : "Map view with nearby context"}
              action={
                <button
                  type="button"
                  data-action-label="Explore profile"
                  className="text-sm font-semibold text-slate-500 transition hover:text-slate-800"
                >
                  Explore profile
                </button>
              }
            />

            <div className="space-y-2">
              {filteredInstitutions.slice(0, 6).map((institution) => (
                <button
                  key={institution.id}
                  type="button"
                  data-action-label="Open profile"
                  className="group w-full rounded-xl border border-[var(--border)] bg-white p-3 text-left transition hover:border-[#c8f0e0]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{institution.name}</div>
                      <div className="mt-1 text-xs text-slate-500">{institution.location} · {institution.distanceKm} km</div>
                      <div className="mt-1 text-xs text-slate-500">{institution.serviceTime}</div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      {institution.verified ? (
                        <span className="rounded-full bg-[#ecfff8] px-2 py-0.5 text-[11px] font-semibold text-[#049e6d]">Verified</span>
                      ) : (
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">Pending</span>
                      )}
                      {institution.sponsored ? (
                        <span className="rounded-full bg-[#fff3e8] px-2 py-0.5 text-[11px] font-semibold text-[#cc6500]">Sponsored</span>
                      ) : null}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="fh-interactive-card fh-surface-card rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <DashboardSectionHeader
              title="Discovery Map"
              subtitle="Visual location context for nearby communities"
            />

            <div className="relative h-[280px] overflow-hidden rounded-xl border border-[var(--border)] bg-[linear-gradient(145deg,#f8fbfc,#eef3f7)] sm:h-[320px]">
              <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] [background-size:34px_34px]" />

              {filteredInstitutions.map((institution) => (
                <button
                  key={institution.id}
                  type="button"
                  data-action-label="Open profile"
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: institution.mapX, top: institution.mapY }}
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#03cd8c] text-white shadow-sm">
                    <MapPin className="h-3.5 w-3.5" />
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-3 text-xs text-slate-500">
              {viewMode === "map"
                ? "Map mode is active. Tap any marker to open the institution profile."
                : "Switch to map mode for route-aware discovery and venue context."}
            </div>
          </CardContent>
        </Card>

        <Card className="fh-interactive-card fh-surface-card rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <DashboardSectionHeader
              title="Action Center"
              subtitle="Quick discovery actions"
              action={
                <button
                  type="button"
                  aria-label="Open discover settings"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-white text-slate-600"
                >
                  <Sparkles className="h-4 w-4" />
                </button>
              }
            />

            <div className="space-y-2">
              <DashboardActionItem
                title="Open featured profile"
                detail="Jump directly to the highest-engagement institution nearby."
                actionLabel="Open profile"
                tone="elevated"
              />
              <DashboardActionItem
                title="Compare nearby options"
                detail="Review institutions currently live or starting soon."
                actionLabel="Explore profile"
              />
              <DashboardActionItem
                title="Join a live service"
                detail="Enter a waiting room and participate in chat and Q&A."
                actionLabel="Join live"
              />
            </div>

            <div className="mt-3 fh-subcard-accent rounded-xl p-3">
              <div className="fh-label text-emerald-700">Smart insight</div>
              <div className="mt-1 text-sm font-semibold text-slate-900">Nearby verified communities get higher replay completion</div>
              <p className="mt-1 text-xs text-slate-600">
                Users who start from verified profiles are more likely to continue into live and events.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <UserActionBar
        actions={[
          {
            id: "discover-open-profile",
            label: "Open profile",
            dataActionLabel: "Open profile",
          },
          {
            id: "discover-join-live",
            label: "Join live",
            dataActionLabel: "Join live",
            variant: "default",
          },
        ]}
      />
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm font-medium tracking-normal text-slate-700"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

