// @ts-nocheck
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  CheckCircle2,
  Filter,
  Globe2,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Clock3,
  WifiOff,
  Navigation,
  SlidersHorizontal,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const institutions = [
  {
    id: 1,
    name: "St. Maryâ€™s Cathedral",
    faith: "Christianity",
    denomination: "Catholic",
    language: "English",
    distance: 2.4,
    verified: true,
    sponsored: false,
    nearNow: true,
    serviceTime: "Service live now Â· 6:00 PM",
    x: "22%",
    y: "35%",
    location: "Kampala Central",
  },
  {
    id: 2,
    name: "Al Noor Community Centre",
    faith: "Islam",
    denomination: "Muslim Community",
    language: "Arabic",
    distance: 4.8,
    verified: true,
    sponsored: false,
    nearNow: true,
    serviceTime: "Reflection starts in 18 min",
    x: "62%",
    y: "44%",
    location: "Bugolobi",
  },
  {
    id: 3,
    name: "FaithHub Global Chapel",
    faith: "Christianity",
    denomination: "Pentecostal",
    language: "English",
    distance: 6.1,
    verified: true,
    sponsored: true,
    nearNow: false,
    serviceTime: "Series starts tomorrow Â· 7:30 PM",
    x: "48%",
    y: "66%",
    location: "Ntinda",
  },
  {
    id: 4,
    name: "Beth Shalom Fellowship",
    faith: "Judaism",
    denomination: "Undisclosed",
    language: "English",
    distance: 8.7,
    verified: false,
    sponsored: false,
    nearNow: false,
    serviceTime: "Sabbath gathering Â· Friday 6:15 PM",
    x: "74%",
    y: "24%",
    location: "Kololo",
  },
  {
    id: 5,
    name: "Kingdom Youth Movement",
    faith: "Christianity",
    denomination: "Interfaith",
    language: "English",
    distance: 3.6,
    verified: true,
    sponsored: false,
    nearNow: true,
    serviceTime: "Youth worship tonight Â· 8:00 PM",
    x: "32%",
    y: "58%",
    location: "Muyenga",
  },
];

const filters = {
  faith: ["All", "Christianity", "Islam", "Judaism", "Buddhism", "Hinduism"],
  denomination: ["All", "Catholic", "Pentecostal", "Muslim Community", "Interfaith", "Undisclosed"],
  language: ["All", "English", "Arabic", "French", "Swahili"],
  distance: ["All", "Within 3 km", "Within 5 km", "Within 10 km"],
};

function FilterChip({ active, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
        active
          ? "border-[#03cd8c] bg-[#03cd8c] text-white shadow-lg shadow-sm/20"
          : "border-slate-200 bg-white text-slate-700 hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
      }`}
    >
      {label}
    </button>
  );
}

function SectionHeader({ title, subtitle, action = "See more" }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div>
        <div className="text-lg font-semibold text-slate-900 sm:text-xl">{title}</div>
        <div className="text-sm text-slate-500">{subtitle}</div>
      </div>
      <Button variant="ghost" className="rounded-full text-[#03cd8c] hover:bg-[#03cd8c]/10 hover:text-[#03cd8c]">
        {action}
      </Button>
    </div>
  );
}

export default function DiscoverInstitutions() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState("list");
  const [offlineMode, setOfflineMode] = useState(false);
  const [activeFaith, setActiveFaith] = useState("All");
  const [activeDenomination, setActiveDenomination] = useState("All");
  const [activeLanguage, setActiveLanguage] = useState("All");
  const [activeDistance, setActiveDistance] = useState("Within 10 km");

  const filteredInstitutions = useMemo(() => {
    return institutions.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.location.toLowerCase().includes(search.toLowerCase());
      const matchesFaith = activeFaith === "All" || item.faith === activeFaith;
      const matchesDenomination = activeDenomination === "All" || item.denomination === activeDenomination;
      const matchesLanguage = activeLanguage === "All" || item.language === activeLanguage;
      const matchesDistance =
        activeDistance === "All" ||
        (activeDistance === "Within 3 km" && item.distance <= 3) ||
        (activeDistance === "Within 5 km" && item.distance <= 5) ||
        (activeDistance === "Within 10 km" && item.distance <= 10);

      return matchesSearch && matchesFaith && matchesDenomination && matchesLanguage && matchesDistance;
    });
  }, [search, activeFaith, activeDenomination, activeLanguage, activeDistance]);

  const nearbyNow = filteredInstitutions.filter((item) => item.nearNow);

  return (
    <div className="min-h-screen bg-[#f2f2f2] text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-4 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm backdrop-blur"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#03cd8c] text-white shadow-lg shadow-sm/20">
              <Globe2 className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#03cd8c]">EVzone Super App</div>
              <div className="text-lg font-semibold">Discover Institutions</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {offlineMode && (
              <div className="hidden items-center gap-2 rounded-full border border-[#f77f00]/20 bg-[#fff8ef] px-3 py-2 text-sm text-[#8b5a00] md:flex">
                <WifiOff className="h-4 w-4" />
                Cached nearby institutions
              </div>
            )}
            <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-[#03cd8c]/30 hover:text-[#03cd8c]">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="space-y-4"
          >
            <Card className="fh-card relative overflow-visible rounded-xl border border-slate-200 bg-gradient-to-br from-[#03cd8c] via-[#1fd29d] to-[#ebfcf6] shadow-sm">
              <CardContent className="fh-card-content p-5 sm:p-7">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.1),transparent_22%)]" />
                <div className="relative z-10 text-white">
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full bg-white text-[#03cd8c] hover:bg-white">Find the right institution fast</Badge>
                    <Badge className="rounded-full bg-slate-900/85 text-white hover:bg-slate-900">List + map discovery</Badge>
                  </div>

                  <div className="max-w-3xl space-y-3">
                    <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white/90">Search, filter, and verify</div>
                    <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                      Discover faith institutions near you or across denominations with clarity and trust.
                    </h1>
                    <p className="max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
                      Browse by faith family, denomination, language, distance, and service availability. Switch between a clean list and a map view, while surfaced featured placements remain clearly labeled.
                    </p>
                  </div>

                  <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto_auto]">
                    <div className="relative">
                      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search institution or location"
                        className="h-12 w-full rounded-2xl border border-white/20 bg-white/12 pl-11 pr-4 text-sm text-white placeholder:text-white/70 outline-none backdrop-blur transition focus:border-white/45 focus:bg-white/18"
                      />
                    </div>
                    <Button
                      variant="outline"
                      className="h-12 rounded-2xl border-white/25 bg-white/10 text-white hover:bg-white/15"
                      onClick={() => setView((prev) => (prev === "list" ? "map" : "list"))}
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      {view === "list" ? "Map view" : "List view"}
                    </Button>
                    <Button
                      variant="outline"
                      className="h-12 rounded-2xl border-white/25 bg-white/10 text-white hover:bg-white/15"
                      onClick={() => setOfflineMode((prev) => !prev)}
                    >
                      <WifiOff className="mr-2 h-4 w-4" />
                      {offlineMode ? "Go online" : "Offline cache"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-card rounded-xl border border-slate-200 bg-white shadow-sm">
              <CardContent className="fh-card-content p-5 sm:p-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#03cd8c]">Filters</div>
                    <div className="mt-2 text-xl font-semibold text-slate-900">Refine discovery</div>
                  </div>
                  <Badge className="rounded-full bg-[#ecfff8] text-[#03cd8c] hover:bg-[#ecfff8]">
                    <Filter className="mr-1 h-3.5 w-3.5" />
                    Transparent matching
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="mb-2 text-sm font-semibold text-slate-900">Faith family</div>
                    <div className="flex flex-wrap gap-2">
                      {filters.faith.map((item) => (
                        <FilterChip key={item} label={item} active={activeFaith === item} onClick={() => setActiveFaith(item)} />
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-3">
                    <div>
                      <div className="mb-2 text-sm font-semibold text-slate-900">Denomination</div>
                      <div className="flex flex-wrap gap-2">
                        {filters.denomination.map((item) => (
                          <FilterChip key={item} label={item} active={activeDenomination === item} onClick={() => setActiveDenomination(item)} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="mb-2 text-sm font-semibold text-slate-900">Language</div>
                      <div className="flex flex-wrap gap-2">
                        {filters.language.map((item) => (
                          <FilterChip key={item} label={item} active={activeLanguage === item} onClick={() => setActiveLanguage(item)} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="mb-2 text-sm font-semibold text-slate-900">Distance</div>
                      <div className="flex flex-wrap gap-2">
                        {filters.distance.map((item) => (
                          <FilterChip key={item} label={item} active={activeDistance === item} onClick={() => setActiveDistance(item)} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-card rounded-xl border border-slate-200 bg-white shadow-sm">
              <CardContent className="fh-card-content p-5 sm:p-6">
                <SectionHeader
                  title={view === "list" ? "Institution results" : "Map discovery"}
                  subtitle={view === "list" ? "Verified institutions, service activity, language, and distance cues." : "Visualize nearby institutions and switch back to the detailed list anytime."}
                  action="Open filters"
                />

                {view === "list" ? (
                  <div className="space-y-3">
                    {filteredInstitutions.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#03cd8c]/35 hover:shadow-lg hover:shadow-sm/10"
                      >
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                          <div className="min-w-0 flex-1">
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              <div className="text-lg font-semibold text-slate-900">{item.name}</div>
                              {item.verified && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-[#ecfff8] px-2.5 py-1 text-xs font-semibold text-[#03cd8c]">
                                  <ShieldCheck className="h-3.5 w-3.5" />
                                  Verified
                                </span>
                              )}
                              {item.sponsored && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-[#fff8ef] px-2.5 py-1 text-xs font-semibold text-[#f77f00]">
                                  <Star className="h-3.5 w-3.5" />
                                  Sponsored
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                              <span>{item.faith}</span>
                              <span>â€¢</span>
                              <span>{item.denomination}</span>
                              <span>â€¢</span>
                              <span>{item.language}</span>
                              <span>â€¢</span>
                              <span>{item.distance} km away</span>
                            </div>
                            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-600">
                              <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 ring-1 ring-slate-200">
                                <MapPin className="h-4 w-4 text-[#03cd8c]" />
                                {item.location}
                              </span>
                              <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 ring-1 ring-slate-200">
                                <Clock3 className="h-4 w-4 text-[#03cd8c]" />
                                {item.serviceTime}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">Open profile</Button>
                            <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                              Follow
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-slate-200 bg-[#f8fafc] p-4 sm:p-5">
                    <div className="relative h-[520px] overflow-visible rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100">
                      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] [background-size:38px_38px]" />
                      <div className="absolute left-6 top-6 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">
                        Kampala and nearby areas
                      </div>
                      {filteredInstitutions.map((item) => (
                        <button
                          key={item.id}
                          className="absolute -translate-x-1/2 -translate-y-1/2"
                          style={{ left: item.x, top: item.y }}
                        >
                          <div className="group relative">
                            <div className={`flex h-11 w-11 items-center justify-center rounded-full border-4 border-white shadow-lg ${item.sponsored ? "bg-[#f77f00]" : item.verified ? "bg-[#03cd8c]" : "bg-slate-700"}`}>
                              <MapPin className="h-4 w-4 text-white" />
                            </div>
                            <div className="absolute left-1/2 top-14 hidden w-56 -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-3 text-left shadow-xl group-hover:block">
                              <div className="mb-1 text-sm font-semibold text-slate-900">{item.name}</div>
                              <div className="text-xs text-slate-500">{item.location} Â· {item.distance} km</div>
                              <div className="mt-2 text-xs text-slate-600">{item.serviceTime}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.4 }}
            className="space-y-4"
          >
            <Card className="fh-card rounded-xl border border-slate-200 bg-slate-950 text-white shadow-sm">
              <CardContent className="fh-card-content p-5 sm:p-6">
                <SectionHeader
                  title="Near me now"
                  subtitle="Institutions with active or soon-starting services nearby."
                  action="Use my location"
                />
                <div className="space-y-3">
                  {nearbyNow.map((item) => (
                    <div key={item.id} className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <div className="text-base font-semibold text-white">{item.name}</div>
                        {item.verified && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white">
                            <CheckCircle2 className="h-3.5 w-3.5 text-[#8ef0ca]" />
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-white/70">{item.location} Â· {item.distance} km away</div>
                      <div className="mt-3 flex items-center gap-2 text-sm text-white/85">
                        <Clock3 className="h-4 w-4 text-[#8ef0ca]" />
                        {item.serviceTime}
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white">Open</Button>
                        <Button variant="outline" className="rounded-2xl border-white/15 bg-transparent text-white hover:bg-white/10">
                          Directions
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="fh-card rounded-xl border border-[#f77f00]/20 bg-[#fffaf3] shadow-sm">
              <CardContent className="fh-card-content p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f77f00]">Sponsored placement</div>
                    <div className="mt-2 text-xl font-semibold text-slate-900">Featured institution listing</div>
                  </div>
                  <Badge className="rounded-full bg-[#f77f00]/10 text-[#f77f00] hover:bg-[#f77f00]/10">Sponsored</Badge>
                </div>
                <div className="rounded-xl border border-[#f77f00]/15 bg-white p-4 shadow-sm">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <Sparkles className="h-4 w-4 text-[#f77f00]" />
                    FaithHub Global Chapel
                  </div>
                  <div className="text-sm leading-6 text-slate-600">
                    Featured placements remain clearly labeled and are controlled through transparent admin promotion rules so discovery stays trustworthy.
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">Explore profile</Button>
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#ecfff8] px-3 py-1 text-xs font-medium text-[#03cd8c]">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Transparent ad policy
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-card rounded-xl border border-slate-200 bg-white shadow-sm">
              <CardContent className="fh-card-content p-5 sm:p-6">
                <SectionHeader
                  title="Geo and discovery controls"
                  subtitle="Location-aware without losing clarity or consent."
                  action="Manage"
                />
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-[#f8fafc] p-4">
                    <Navigation className="mt-0.5 h-4 w-4 shrink-0 text-[#03cd8c]" />
                    <div>
                      Use geocoding and map search to surface nearby institutions, service schedules, and venue context with clear permission boundaries.
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-[#f8fafc] p-4">
                    <SlidersHorizontal className="mt-0.5 h-4 w-4 shrink-0 text-[#03cd8c]" />
                    <div>
                      Cache the last known nearby results so users can still discover institutions even with weak connectivity.
                    </div>
                  </div>
                  <button className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-left font-semibold text-slate-900 transition hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                    Open advanced filter drawer
                    <ChevronRight className="h-4 w-4 text-slate-500" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}


