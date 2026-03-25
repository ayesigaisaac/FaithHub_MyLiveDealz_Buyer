// @ts-nocheck
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  MapPin,
  QrCode,
  Route,
  Save,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Ticket,
  Users,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const agendaItems = [
  { title: "Arrival and accreditation", time: "Day 1  8:30 AM", type: "Check-in" },
  { title: "Main worship session", time: "Day 1  10:00 AM", type: "Main session" },
  { title: "Breakout teaching rooms", time: "Day 1  2:00 PM", type: "Breakout" },
  { title: "Marketplace and merch zone", time: "Day 1  5:00 PM", type: "Commerce" },
  { title: "Closing prayer and departure", time: "Day 2  4:00 PM", type: "Closing" },
];

const volunteers = [
  { name: "Aisha Nabirye", role: "Prayer desk lead", state: "Assigned" },
  { name: "Daniel Ssentamu", role: "Stage and AV lead", state: "Assigned" },
  { name: "Samuel Otema", role: "Check-in supervisor", state: "Assigned" },
  { name: "Grace Nanfuka", role: "Merch and vendor desk", state: "Pending" },
];

const tickets = [
  { sku: "FH-CAMP-STD-001", title: "Standard Pass", price: "$45", linked: true },
  { sku: "FH-CAMP-VIP-001", title: "VIP Pass", price: "$95", linked: true },
  { sku: "FH-BOOTH-VENDOR-001", title: "Vendor Booth", price: "$80", linked: true },
];

const venues = [
  { name: "Main Hall", routing: "Primary program feed", state: "Active" },
  { name: "Breakout Room A", routing: "Breakout feed 1", state: "Ready" },
  { name: "Marketplace Court", routing: "Event and merch zone", state: "Draft" },
];

export default function FaithHubEventsManager() {
  const [offlineDraft, setOfflineDraft] = useState(true);
  const [checkinMode, setCheckinMode] = useState(true);
  const [offlineTokenCheckin, setOfflineTokenCheckin] = useState(true);
  const [multiVenueRouting, setMultiVenueRouting] = useState(true);
  const [advancedTicketRules, setAdvancedTicketRules] = useState(true);
  const [capacity, setCapacity] = useState("850");
  const [eventType, setEventType] = useState("Camp");
  const [visibility, setVisibility] = useState("Public");

  const linkedTicketCount = useMemo(() => tickets.filter((ticket) => ticket.linked).length, []);

  return (
    <div className="fh-page-canvas min-h-screen text-slate-900">
      <div className="w-full max-w-none px-4 py-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="fh-page-header mb-4 flex items-center justify-between rounded-[28px] px-4 py-3"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 shadow-sm">
              <CalendarDays className="h-5 w-5" />
            </div>
            <div>
              <div className="hidden text-[#03cd8c]">EVzone Super App</div>
              <div className="text-lg font-semibold">Events Manager</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 md:flex">
              {offlineDraft ? <WifiOff className="h-4 w-4 text-[#f77f00]" /> : <Wifi className="h-4 w-4 text-[#03cd8c]" />}
              {offlineDraft ? "Draft + offline check-in support" : "Event manager synced"}
            </div>
            <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:text-slate-900">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <div className="grid gap-4 xl:grid-cols-[1.12fr_0.88fr]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.35 }}
            className="space-y-4"
          >
            <Card className="fh-interactive-card relative overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-br from-[#03cd8c] via-[#20cf9c] to-[#eafcf6] shadow-[0_24px_80px_-28px_rgba(3,205,140,0.45)]">
              <CardContent className="fh-pad-hero">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.12),transparent_22%)]" />
                <div className="relative z-10 text-white">
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">Event operations builder</Badge>
                    <Badge className="rounded-full bg-slate-900/85 text-white hover:bg-slate-900">Agenda, volunteers, tickets, check-in</Badge>
                  </div>
                  <div className="grid gap-5 lg:grid-cols-[0.64fr_0.36fr]">
                    <div className="space-y-4">
                      <div className="fh-kicker text-white/90">Run the event, not just the page</div>
                      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                        Create faith events with ticketing, agendas, volunteer roles, and check-in workflows in one premium manager.
                      </h1>
                      <p className="max-w-2xl fh-body text-white/90 sm:text-base">
                        Events Manager is built for camps, trips, baptisms, crusades, missions, conferences, and marketplace days. It brings FaithMart ticketing, venue routing, volunteer planning, and offline-ready check-in into a single provider workspace.
                      </p>
                    </div>
                    <div className="rounded-[28px] border border-white/15 bg-white/12 p-4 backdrop-blur">
                      <div className="mb-3 text-sm font-semibold text-white">Event snapshot</div>
                      <div className="rounded-[24px] border border-white/15 bg-white/10 p-4">
                        <div className="fh-kicker-muted text-white/70">Linked ticket SKUs</div>
                        <div className="mt-1 text-3xl font-semibold text-white">{linkedTicketCount}</div>
                        <div className="mt-2 text-sm text-white/80">Capacity: {capacity} attendees</div>
                      </div>
                      <div className="mt-4 fh-actions-grid">
                        <Button className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90">Create event</Button>
                        <Button
                          variant="outline"
                          className="rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/15"
                          onClick={() => setOfflineDraft((prev) => !prev)}
                        >
                          {offlineDraft ? "Save draft" : "Publish live"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 lg:grid-cols-[0.5fr_0.5fr]">
              <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
                <CardContent className="fh-pad-panel">
                  <div className="mb-4 text-lg font-semibold text-slate-900">Event basics</div>
                  <div className="space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <label className="block space-y-2">
                        <span className="text-sm font-medium text-slate-700">Event title</span>
                        <input className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 text-sm outline-none focus:border-[#03cd8c]" defaultValue="Youth Worship Camp 2026" />
                      </label>
                      <label className="block space-y-2">
                        <span className="text-sm font-medium text-slate-700">Event type</span>
                        <select value={eventType} onChange={(e) => setEventType(e.target.value)} className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 text-sm outline-none focus:border-[#03cd8c]">
                          <option>Camp</option>
                          <option>Trip</option>
                          <option>Baptism</option>
                          <option>Crusade</option>
                          <option>Mission</option>
                          <option>Marketplace Day</option>
                        </select>
                      </label>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <label className="block space-y-2">
                        <span className="text-sm font-medium text-slate-700">Start</span>
                        <input type="date" className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 text-sm outline-none focus:border-[#03cd8c]" defaultValue="2026-08-12" />
                      </label>
                      <label className="block space-y-2">
                        <span className="text-sm font-medium text-slate-700">End</span>
                        <input type="date" className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 text-sm outline-none focus:border-[#03cd8c]" defaultValue="2026-08-15" />
                      </label>
                      <label className="block space-y-2">
                        <span className="text-sm font-medium text-slate-700">Capacity</span>
                        <input value={capacity} onChange={(e) => setCapacity(e.target.value)} className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 text-sm outline-none focus:border-[#03cd8c]" />
                      </label>
                    </div>
                    <label className="block space-y-2">
                      <span className="text-sm font-medium text-slate-700">Visibility</span>
                      <select value={visibility} onChange={(e) => setVisibility(e.target.value)} className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 text-sm outline-none focus:border-[#03cd8c]">
                        <option>Public</option>
                        <option>Followers only</option>
                        <option>Members only</option>
                      </select>
                    </label>
                  </div>
                </CardContent>
              </Card>

              <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
                <CardContent className="fh-pad-panel">
                  <div className="mb-4 text-lg font-semibold text-slate-900">FaithMart ticket links</div>
                  <div className="space-y-3">
                    {tickets.map((ticket) => (
                      <div key={ticket.sku} className="fh-subcard rounded-[24px] p-4">
                        <div className="mb-1 text-sm font-semibold text-slate-900">{ticket.title}</div>
                        <div className="text-xs text-slate-500">{ticket.sku}</div>
                        <div className="mt-2 flex items-center justify-between gap-3">
                          <div className="text-sm text-slate-600">{ticket.price}</div>
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${ticket.linked ? "bg-[#ecfff8] text-[#03cd8c]" : "bg-slate-100 text-slate-700"}`}>
                            {ticket.linked ? "Linked" : "Not linked"}
                          </span>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                      <Ticket className="mr-2 h-4 w-4 text-[#03cd8c]" /> Link more SKUs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Multi-session agenda and volunteers"
                  subtitle="Plan the event flow and operational teams in one place."
                />
                <div className="grid gap-4 lg:grid-cols-[0.52fr_0.48fr]">
                  <div className="space-y-3">
                    {agendaItems.map((item) => (
                      <div key={item.title} className="fh-subcard rounded-[24px] p-4">
                        <div className="mb-1 text-sm font-semibold text-slate-900">{item.title}</div>
                        <div className="text-xs text-slate-500">{item.time}</div>
                        <div className="mt-1 text-sm text-slate-600">{item.type}</div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {volunteers.map((person) => (
                      <div key={person.name} className="fh-subcard rounded-[24px] p-4">
                        <div className="mb-1 text-sm font-semibold text-slate-900">{person.name}</div>
                        <div className="text-xs text-slate-500">{person.role}</div>
                        <div className="mt-2 inline-flex rounded-full bg-[#ecfff8] px-3 py-1 text-xs font-semibold text-[#03cd8c]">
                          {person.state}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.35 }}
            className="space-y-4"
          >
            <Card className="fh-interactive-card fh-surface-dark rounded-[32px] text-white">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Check-in mode"
                  subtitle="Move attendees through the gate with reliability, even when connectivity is weak."
                  action="Stations"
                />
                <div className="space-y-3">
                  <button
                    onClick={() => setCheckinMode((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${checkinMode ? "border-[#03cd8c]/30 bg-[#03cd8c]/15 text-white" : "border-white/10 bg-white/5 text-white/80"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <ClipboardCheck className="h-4 w-4 text-[#8ef0ca]" /> Check-in operations
                    </div>
                    <div className="text-sm text-white/75">{checkinMode ? "Check-in scanner and gate dashboard enabled." : "Check-in mode disabled."}</div>
                  </button>
                  <button
                    onClick={() => setOfflineTokenCheckin((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${offlineTokenCheckin ? "border-[#03cd8c]/30 bg-[#03cd8c]/15 text-white" : "border-white/10 bg-white/5 text-white/80"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <QrCode className="h-4 w-4 text-[#8ef0ca]" /> Offline scanned tokens
                    </div>
                    <div className="text-sm text-white/75">{offlineTokenCheckin ? "Scanned tokens can validate offline and sync later." : "Online-only ticket validation."}</div>
                  </button>
                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm text-white/80 backdrop-blur">
                    Offline check-in supports time-limited scanned tokens that can sync to the central ledger after connectivity returns.
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-warm rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Premium routing and ticket rules"
                  subtitle="Advanced operations for larger or more complex faith events."
                  action="Premium"
                />
                <div className="space-y-3">
                  <button
                    onClick={() => setMultiVenueRouting((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${multiVenueRouting ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <Route className="h-4 w-4 text-[#03cd8c]" /> Multi-venue routing
                    </div>
                    <div className="text-sm text-slate-600">{multiVenueRouting ? "Venues and live/event operations can route across multiple locations." : "Single venue mode active."}</div>
                  </button>
                  <button
                    onClick={() => setAdvancedTicketRules((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${advancedTicketRules ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <BadgeCheck className="h-4 w-4 text-[#03cd8c]" /> Advanced ticket rules
                    </div>
                    <div className="text-sm text-slate-600">{advancedTicketRules ? "Conditional access rules, ticket classes, and check-in constraints are enabled." : "Basic ticket validation only."}</div>
                  </button>
                  <div className="space-y-3">
                    {venues.map((venue) => (
                      <div key={venue.name} className="fh-subcard-warm rounded-[24px] p-4 shadow-sm">
                        <div className="mb-1 text-sm font-semibold text-slate-900">{venue.name}</div>
                        <div className="text-xs text-slate-500">{venue.routing}</div>
                        <div className="mt-2 inline-flex rounded-full bg-[#fff8ef] px-3 py-1 text-xs font-semibold text-[#f77f00]">
                          {venue.state}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Monetization posture"
                  subtitle="Event revenue can combine tickets, booths, and merch in one ecosystem."
                  action="Revenue"
                />
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="fh-subcard-muted rounded-[24px] p-4">
                    Ticket fees can be collected through linked FaithMart SKUs while booth access and event merchandise expand revenue options.
                  </div>
                  <div className="fh-subcard-muted rounded-[24px] p-4">
                    Marketplace Days can connect event registration directly to vendor merchandise and booth purchases.
                  </div>
                  <Button className="w-full rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">
                    <ShoppingBag className="mr-2 h-4 w-4" /> Open merch and ticket revenue setup
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}


function SectionHeader({ title, subtitle, action = "View all" }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div>
        <div className="text-lg font-semibold text-slate-900 sm:text-xl">{title}</div>
      </div>
      <Button variant="ghost" className="rounded-full text-[#03cd8c] hover:bg-[#03cd8c]/10 hover:text-[#03cd8c]">
        {action}
      </Button>
    </div>
  );
}




