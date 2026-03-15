import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import UserPageShell from "@/pages/user/shared/UserPageShell";
import UserPageHeader from "@/pages/user/shared/UserPageHeader";
import UserActionBar from "@/pages/user/shared/UserActionBar";
import DiscoverHero from "@/pages/user/discover/components/DiscoverHero";
import DiscoverFiltersPanel from "@/pages/user/discover/components/DiscoverFiltersPanel";
import InstitutionList from "@/pages/user/discover/components/InstitutionList";
import InstitutionMap from "@/pages/user/discover/components/InstitutionMap";
import NearbyNowPanel from "@/pages/user/discover/components/NearbyNowPanel";
import SponsoredPanel from "@/pages/user/discover/components/SponsoredPanel";
import GeoControlsPanel from "@/pages/user/discover/components/GeoControlsPanel";
import { defaultDiscoverFilters } from "@/pages/user/discover/constants";
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
  const [offlineMode, setOfflineMode] = useState(false);
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

  return (
    <UserPageShell
      header={
        <UserPageHeader
          icon={<Compass className="h-5 w-5" />}
          title="Discover Institutions"
          offline={offlineMode}
          offlineLabel="Cached nearby institutions"
        />
      }
      hero={
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-4"
        >
          <DiscoverHero
            search={search}
            onSearchChange={setSearch}
            viewMode={viewMode}
            onToggleView={() => setViewMode((prev) => (prev === "list" ? "map" : "list"))}
            offlineMode={offlineMode}
            onToggleOfflineMode={() => setOfflineMode((prev) => !prev)}
            resultCount={filteredInstitutions.length}
          />
        </motion.div>
      }
      main={
        <>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.4 }}
          >
            <DiscoverFiltersPanel
              filters={filters}
              onChange={setFilters}
              onReset={() => setFilters(defaultDiscoverFilters)}
              activeCount={activeFilterCount}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
              <CardContent className="fh-pad-panel">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-slate-900 sm:text-xl">
                      {viewMode === "list" ? "Institution results" : "Map discovery"}
                    </div>
                    <div className="text-sm text-slate-500">
                      {viewMode === "list"
                        ? "Verified institutions, service activity, language, and distance cues."
                        : "Visualize nearby institutions and switch back to the detailed list anytime."}
                    </div>
                  </div>
                </div>

                {viewMode === "list" ? (
                  <InstitutionList institutions={filteredInstitutions} />
                ) : (
                  <InstitutionMap institutions={filteredInstitutions} />
                )}
              </CardContent>
            </Card>
          </motion.div>
        </>
      }
      aside={
        <>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.4 }}
          >
            <NearbyNowPanel institutions={nearbyNowInstitutions} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            <SponsoredPanel />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <GeoControlsPanel />
          </motion.div>
        </>
      }
      stickyFooter={
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
      }
    />
  );
}

