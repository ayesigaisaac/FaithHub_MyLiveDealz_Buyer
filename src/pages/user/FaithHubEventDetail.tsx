// @ts-nocheck
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  BadgeCheck,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck2,
  Globe2,
  HeartHandshake,
  MapPin,
  MessageSquare,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Ticket,
  Users,
  WifiOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const schedule = [
  { time: "Day 1  9:00 AM", title: "Arrival, accreditation, orientation" },
  { time: "Day 1  2:00 PM", title: "Opening worship and keynote" },
  { time: "Day 2  10:00 AM", title: "Prayer circles and breakout sessions" },
  { time: "Day 2  4:30 PM", title: "Marketplace showcase and networking" },
  { time: "Day 3  8:00 AM", title: "Closing charge and departure" },
];

const speakers = [
  { name: "Rev. Naomi Kato", role: "Lead Speaker", note: "Teaching and spiritual direction" },
  { name: "Daniel Ssentamu", role: "Youth Director", note: "Community building and breakout facilitation" },
  { name: "Aisha Nabirye", role: "Prayer Coordinator", note: "Prayer rooms and pastoral care" },
];

const tickets = [
  { title: "Standard Pass", price: "$45", note: "General entry and agenda access" },
  { title: "VIP Pass", price: "$95", note: "Priority seating, meet-and-greet, premium kit" },
  { title: "Youth Group Bundle", price: "$240", note: "6-seat discounted package" },
];

const merchBundles = [
  { title: "Retreat notebook + lanyard", note: "FaithMart merch bundle" },
  { title: "VIP devotional kit", note: "Premium physical pack" },
  { title: "Marketplace vendor starter booth", note: "FaithMart booth add-on" },
];

const waivers = [
  "Participants must review transport and accommodation guidance before payment completion.",
  "Children and minors may require guardian acknowledgment depending on event policy.",
  "Certain outdoor activities may require health or safety disclosures before check-in.",
  "Digital tickets and entry passes remain subject to institution and organizer terms.",
];

export default function FaithHubEventDetail() {
  const [rsvp, setRsvp] = useState("Going");
  const [offlineMode, setOfflineMode] = useState(true);
  const [vipPreview, setVipPreview] = useState(true);
  const [waiverAccepted, setWaiverAccepted] = useState(true);
  const [chatEnabled, setChatEnabled] = useState(true);

  return (
    <div className="fh-page-canvas min-h-0 text-slate-900">
      <div className="w-full max-w-none px-4 py-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="fh-page-header mb-4 flex items-center justify-between rounded-[28px] px-4 py-3"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 shadow-[0_12px_24px_rgba(15,23,42,0.08)]">
              <Ticket className="h-5 w-5" />
            </div>
            <div>
              <div className="hidden text-[#03cd8c]">EVzone Super App</div>
              <div className="text-lg font-semibold">Event Detail</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {offlineMode && (
              <div className="hidden items-center gap-2 rounded-full border border-[#f77f00]/20 bg-[#fff8ef] px-3 py-2 text-sm text-[#8b5a00] md:flex">
                <WifiOff className="h-4 w-4" />
                Wallet pass cached
              </div>
            )}
            <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:text-slate-900">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <div className="grid gap-4 xl:grid-cols-[1.12fr_0.88fr]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="space-y-4"
          >
            <Card className="fh-interactive-card fh-surface-card overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
              <CardContent className="fh-pad-hero">
                <div className="space-y-5 text-slate-900">
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-100">Faith event + FaithMart commerce</Badge>
                    <Badge className="rounded-full border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-100">Schedule, speakers, tickets, waivers</Badge>
                  </div>

                  <div className="grid gap-5 lg:grid-cols-[0.65fr_0.35fr]">
                    <div className="space-y-4">
                      <div className="fh-kicker text-slate-700">Youth Worship Camp</div>
                      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                        A full event detail page with RSVP, venue context, ticketing, chat, waivers, and offline-ready pass handling.
                      </h1>
                      <p className="max-w-2xl fh-body text-slate-600 sm:text-base">
                        This page helps a user move from understanding the event to booking, preparing, chatting, and entering with confidence. It brings together venue intelligence, schedule, speakers, FaithMart ticketing, and event safety guidance.
                      </p>

                      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-700">
                        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-slate-700">
                          <CalendarDays className="h-4 w-4" />
                          1215 Aug
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-slate-700">
                          <MapPin className="h-4 w-4" />
                          Entebbe
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-slate-700">
                          <Users className="h-4 w-4" />
                          Youth Church audience
                        </span>
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.96))] p-4 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
                      <div className="mb-3 aspect-video overflow-hidden rounded-[22px] border border-slate-200 bg-white">
                        <div className="relative h-full w-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_40%),linear-gradient(152deg,rgba(15,23,42,0.75),rgba(15,23,42,0.34))]">
                          <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                            Event spotlight
                          </div>
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/70 to-transparent px-3 pb-3 pt-5">
                            <div className="text-sm font-semibold text-white">Youth Worship Camp</div>
                            <div className="text-xs text-white/80">12 to 15 Aug, Entebbe</div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-2 text-sm font-semibold text-slate-700">Your event status</div>
                      <div className="mb-3 text-2xl font-semibold text-slate-900">{rsvp}</div>
                      <div className="fh-actions-grid">
                        <Button className="rounded-2xl bg-[#059669] text-white hover:bg-[#047857]">RSVP</Button>
                        <Button
                          variant="outline"
                          className="rounded-2xl border-slate-200 bg-white text-slate-700 hover:border-[#059669]/25 hover:bg-slate-50"
                          onClick={() => setOfflineMode((prev) => !prev)}
                        >
                          {offlineMode ? "Online mode" : "Offline pass"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Schedule and speakers"
                  subtitle="A structured event view for planning and attendance confidence."
                />
                <div className="grid gap-4 lg:grid-cols-[0.56fr_0.44fr]">
                  <div className="fh-subcard rounded-[24px] p-4">
                    <div className="mb-3 text-sm font-semibold text-slate-900">Event schedule</div>
                    <div className="space-y-3">
                      {schedule.map((item) => (
                        <div key={item.time} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-[#f8fafc] p-3">
                          <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{item.time}</div>
                          <div className="fh-body-tight text-slate-700">{item.title}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="fh-subcard rounded-[24px] p-4">
                    <div className="mb-3 text-sm font-semibold text-slate-900">Speakers and facilitators</div>
                    <div className="space-y-3">
                      {speakers.map((speaker) => (
                        <div key={speaker.name} className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-4">
                          <div className="text-sm font-semibold text-slate-900">{speaker.name}</div>
                          <div className="text-sm text-slate-500">{speaker.role}</div>
                          <div className="mt-1 text-sm text-slate-600">{speaker.note}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Venue and event chat"
                  subtitle="Location clarity, event communication, and safety readiness in one place."
                />
                <div className="grid gap-4 lg:grid-cols-[0.5fr_0.5fr]">
                  <div className="fh-subcard rounded-[24px] p-4">
                    <div className="mb-3 text-sm font-semibold text-slate-900">Venue</div>
                    <div className="mb-4 aspect-[16/10] overflow-hidden rounded-[22px] border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-200">
                      <div className="relative h-full w-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.72),transparent_45%),linear-gradient(150deg,#f8fafc_0%,#e8eef5_100%)]">
                        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200">
                          Venue map preview
                        </div>
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/20 to-transparent px-3 pb-3 pt-6 text-xs text-slate-700">
                          Lake Victoria Retreat Centre
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm text-slate-600">
                      <div className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-3">Lake Victoria Retreat Centre, Entebbe</div>
                      <div className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-3">Parking, check-in gate, and accessible entry points shown in the in-app map.</div>
                      <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50">
                        <MapPin className="mr-2 h-4 w-4 text-slate-700" /> Get directions
                      </Button>
                    </div>
                  </div>

                  <div className="fh-subcard rounded-[24px] p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div className="text-sm font-semibold text-slate-900">Event chat channel</div>
                      <Button
                        variant="outline"
                        className="rounded-full border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                        onClick={() => setChatEnabled((prev) => !prev)}
                      >
                        {chatEnabled ? "Channel on" : "Preview off"}
                      </Button>
                    </div>
                    {chatEnabled ? (
                      <div className="space-y-3">
                        <div className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-3 text-sm text-slate-600">Travel coordination, updates, FAQs, and community preparation can happen here before and during the event.</div>
                        <div className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-3 text-sm text-slate-600">Moderation and safety notices remain pinned at the top of the event conversation.</div>
                        <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">
                          <MessageSquare className="mr-2 h-4 w-4" /> Join event chat
                        </Button>
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-dashed border-slate-200 bg-[#f8fafc] p-6 text-center text-sm text-slate-600">
                        Event chat is hidden in this preview state.
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.4 }}
            className="space-y-4"
          >
            <Card className="fh-interactive-card fh-surface-dark rounded-[32px] text-white">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Tickets and FaithMart links"
                  subtitle="RSVP, purchase, and bundle flows connected to event commerce."
                  action="Wallet"
                />
                <div className="space-y-3">
                  {tickets.map((ticket) => (
                    <div key={ticket.title} className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur">
                      <div className="mb-1 text-base font-semibold text-white">{ticket.title}</div>
                      <div className="text-sm text-white/70">{ticket.note}</div>
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="text-xl font-semibold text-white">{ticket.price}</div>
                        <Button className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90">Buy in FaithMart</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-warm rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="hidden text-[#f77f00]">Premium upsells</div>
                    <div className="mt-2 text-xl font-semibold text-slate-900">VIP tickets and merch bundles</div>
                  </div>
                  <Button
                    variant="outline"
                    className="rounded-full border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
                    onClick={() => setVipPreview((prev) => !prev)}
                  >
                    {vipPreview ? "VIP preview on" : "Preview VIP layer"}
                  </Button>
                </div>
                <div className="space-y-3">
                  {vipPreview ? (
                    merchBundles.map((item) => (
                      <div key={item.title} className="fh-subcard-warm rounded-[24px] p-4 shadow-sm">
                        <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-900">
                          <ShoppingBag className="h-4 w-4 text-[#f77f00]" /> {item.title}
                        </div>
                        <div className="text-sm text-slate-600">{item.note}</div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-[24px] border border-dashed border-[#f77f00]/20 bg-white p-6 text-center text-sm text-slate-600">
                      VIP and merch bundle previews are hidden in this state.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Safety guidance and waivers"
                  subtitle="Protect the user before they arrive on-site."
                  action="Review"
                />
                <div className="space-y-3 text-sm text-slate-600">
                  {waivers.map((item) => (
                    <div key={item} className="fh-subcard-muted rounded-[24px] p-4">
                      {item}
                    </div>
                  ))}
                  <button
                    onClick={() => setWaiverAccepted((prev) => !prev)}
                    className={`w-full rounded-2xl border px-4 py-3 text-left font-semibold transition ${
                      waiverAccepted
                        ? "border-slate-200 bg-slate-50 text-slate-900"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {waiverAccepted ? <CheckCircle2 className="h-4 w-4 text-slate-700" /> : <AlertTriangle className="h-4 w-4 text-[#f77f00]" />}
                      {waiverAccepted ? "Waiver acknowledged" : "Acknowledge waiver"}
                    </div>
                  </button>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Offline pass and wallet cache"
                  subtitle="Prepare for weak connectivity at the venue gate."
                  action="Details"
                />
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="fh-subcard-muted rounded-[24px] p-4">
                    Event passes can be stored into wallet cache so the user can still show their access token when connectivity is unstable.
                  </div>
                  <div className="fh-subcard-muted rounded-[24px] p-4">
                    Ticket validation can use a short-lived offline token for venue-side confirmation before the device reconnects.
                  </div>
                  <div className="fh-subcard-accent rounded-[24px] p-4">
                    <div className="mb-2 flex items-center gap-2 font-semibold text-slate-900">
                      <FileCheck2 className="h-4 w-4 text-slate-700" /> Wallet-ready pass status
                    </div>
                    <div>Pass cached with event title, attendee name, access class, and a time-limited validation token.</div>
                  </div>
                  <Button className="w-full rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">
                    <BadgeCheck className="mr-2 h-4 w-4" /> Open pass preview
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

function SectionHeader({ title, subtitle, action = "See all" }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div>
        <div className="text-lg font-semibold text-slate-900 sm:text-xl">{title}</div>
      </div>
      <Button variant="ghost" className="rounded-full text-slate-700 hover:bg-slate-100 hover:text-slate-900">
        {action}
      </Button>
    </div>
  );
}





