// @ts-nocheck
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Globe2,
  Heart,
  HeartHandshake,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Mic2,
  Phone,
  PlayCircle,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Ticket,
  Users,
  WifiOff,
  Accessibility,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const serviceSchedule = [
  { day: "Sunday", time: "8:00 AM  Main Service", note: "Wheelchair seating and quiet area available" },
  { day: "Wednesday", time: "6:30 PM  Midweek Teaching", note: "Live Sessionz + in-person hybrid" },
  { day: "Friday", time: "7:30 PM  Youth Fellowship", note: "Youth and family participation" },
];

const leaders = [
  { name: "Rev. Naomi Kato", role: "Lead Pastor", specialty: "Teaching, counseling, women fellowship" },
  { name: "Daniel Ssentamu", role: "Youth Director", specialty: "Youth programs, live worship nights" },
  { name: "Aisha Nabirye", role: "Community Care Lead", specialty: "Prayer support, missions, family outreach" },
];

const events = [
  { title: "Youth Worship Camp", date: "1215 Aug", type: "Camp", price: "FaithMart ticket" },
  { title: "Marketplace Day", date: "20 Aug", type: "Marketplace", price: "Vendor booths + merch" },
  { title: "Baptism Sunday", date: "01 Sep", type: "Baptism", price: "Free registration" },
];

const series = [
  { title: "Walking in Wisdom", meta: "8 episodes  Episode 4 live tonight" },
  { title: "Mercy in Motion", meta: "6 episodes  Replay available" },
  { title: "Faith That Builds", meta: "New series  Starts next week" },
];

const channels = [
  { name: "WhatsApp", description: "Start conversation with the institution" },
  { name: "Telegram", description: "Receive updates and quick responses" },
  { name: "RCS", description: "Verified branded messaging on supported devices" },
  { name: "In-app chat", description: "Prayer requests, member support, event updates" },
];

const donationFunds = [
  { title: "General Giving", amount: "$24,500 raised", goal: "$40,000 goal", width: "61%" },
  { title: "Mission Outreach", amount: "$12,900 raised", goal: "$20,000 goal", width: "64%" },
  { title: "Childrens Ministry", amount: "$8,700 raised", goal: "$15,000 goal", width: "58%" },
];

function TabButton({ active, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
        active
          ? "bg-[#03cd8c] text-white shadow-lg shadow-[#03cd8c]/20"
          : "bg-white text-slate-600 hover:bg-slate-50"
      }`}
    >
      {label}
    </button>
  );
}

function SectionHeader({ title, subtitle, action = "See all" }) {
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

export default function InstitutionProfile() {
  const [activeTab, setActiveTab] = useState("overview");
  const [following, setFollowing] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [memberMode, setMemberMode] = useState(false);
  const [prayerText, setPrayerText] = useState("Please pray for our family and our upcoming mission trip.");

  return (
    <div className="min-h-screen bg-[#f2f2f2] text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-4 flex items-center justify-between rounded-[28px] border border-white/70 bg-white/90 px-4 py-3 shadow-sm backdrop-blur"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#03cd8c] text-white shadow-lg shadow-[#03cd8c]/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#03cd8c]">EVzone Super App</div>
              <div className="text-lg font-semibold">Institution Profile</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {offlineMode && (
              <div className="hidden items-center gap-2 rounded-full border border-[#f77f00]/20 bg-[#fff8ef] px-3 py-2 text-sm text-[#8b5a00] md:flex">
                <WifiOff className="h-4 w-4" />
                Cached profile mode
              </div>
            )}
            <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-[#03cd8c]/30 hover:text-[#03cd8c]">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <div className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="space-y-4"
          >
            <Card className="relative overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-br from-[#03cd8c] via-[#21d29d] to-[#eafcf6] shadow-[0_24px_80px_-28px_rgba(3,205,140,0.45)]">
              <CardContent className="p-5 sm:p-7">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.1),transparent_22%)]" />
                <div className="relative z-10 text-white">
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">Verified institution</Badge>
                    <Badge className="rounded-full bg-slate-900/85 text-white hover:bg-slate-900">Live + series + events + giving</Badge>
                  </div>

                  <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-3xl space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">St. Marys Cathedral</h1>
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold text-white">
                          <ShieldCheck className="h-3.5 w-3.5" />
                          Verified
                        </span>
                      </div>
                      <p className="max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
                        A multi-generational faith institution with live services, organized teaching series, events, counseling, giving, and community engagement across FaithHub and FaithMart.
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-white/90">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                          <MapPin className="h-4 w-4" />
                          Kampala Central
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                          <Clock3 className="h-4 w-4" />
                          Sunday 8:00 AM  Wednesday 6:30 PM
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                          <Users className="h-4 w-4" />
                          18.2k followers
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90"
                        onClick={() => setFollowing((prev) => !prev)}
                      >
                        <Heart className="mr-2 h-4 w-4" />
                        {following ? "Following" : "Follow"}
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-2xl border-white/25 bg-white/10 text-white hover:bg-white/15"
                        onClick={() => setOfflineMode((prev) => !prev)}
                      >
                        <WifiOff className="mr-2 h-4 w-4" />
                        {offlineMode ? "Go online" : "Offline cache"}
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 rounded-[24px] bg-white/12 p-2 backdrop-blur">
                    {[
                      { key: "overview", label: "Overview" },
                      { key: "series", label: "Series" },
                      { key: "events", label: "Events" },
                      { key: "giving", label: "Giving" },
                      { key: "channels", label: "Channels" },
                    ].map((item) => (
                      <TabButton key={item.key} label={item.label} active={activeTab === item.key} onClick={() => setActiveTab(item.key)} />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <SectionHeader
                  title="About the institution"
                  subtitle="Core information, leaders, venue details, and accessible contact paths."
                  action="Share"
                />

                <div className="grid gap-4 lg:grid-cols-[0.62fr_0.38fr]">
                  <div className="space-y-4">
                    <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="mb-2 text-sm font-semibold text-slate-900">Mission and community focus</div>
                      <div className="text-sm leading-7 text-slate-600">
                        This institution serves a broad faith community through weekly worship, structured teaching series, prayer ministry, outreach, youth programs, family support, missions, marketplace days, and pastoral counseling.
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="mb-3 text-sm font-semibold text-slate-900">Leaders</div>
                      <div className="space-y-3">
                        {leaders.map((leader) => (
                          <div key={leader.name} className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-4">
                            <div className="text-sm font-semibold text-slate-900">{leader.name}</div>
                            <div className="text-sm text-slate-500">{leader.role}</div>
                            <div className="mt-1 text-sm text-slate-600">{leader.specialty}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-[24px] border border-slate-200 bg-[#f8fafc] p-4">
                      <div className="mb-3 text-sm font-semibold text-slate-900">Location and contact</div>
                      <div className="space-y-3 text-sm text-slate-600">
                        <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-3">
                          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#03cd8c]" />
                          <div>Millennium House Campus, Kampala Central, Uganda</div>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-2">
                          <Button variant="outline" className="justify-start rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                            <Phone className="mr-2 h-4 w-4 text-[#03cd8c]" />
                            Call office
                          </Button>
                          <Button variant="outline" className="justify-start rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                            <Mail className="mr-2 h-4 w-4 text-[#03cd8c]" />
                            Send email
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-slate-200 bg-[#ecfff8] p-4">
                      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <Accessibility className="h-4 w-4 text-[#03cd8c]" />
                        Venue accessibility information
                      </div>
                      <div className="space-y-2 text-sm text-slate-600">
                        <div> Step-free entrance and dedicated seating</div>
                        <div> Quiet room for families and children</div>
                        <div> Accessible washrooms and usher support</div>
                        <div> Audio support and transcript availability for some sessions</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <SectionHeader
                  title="Service times, events, and series"
                  subtitle="Everything members and visitors need to join, attend, and keep up."
                  action="Open calendar"
                />

                <div className="grid gap-4 xl:grid-cols-3">
                  <div className="xl:col-span-1 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="mb-3 text-sm font-semibold text-slate-900">Service schedule</div>
                    <div className="space-y-3">
                      {serviceSchedule.map((item) => (
                        <div key={item.day} className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-4">
                          <div className="text-sm font-semibold text-slate-900">{item.day}</div>
                          <div className="text-sm text-slate-500">{item.time}</div>
                          <div className="mt-1 text-sm text-slate-600">{item.note}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="xl:col-span-1 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="mb-3 text-sm font-semibold text-slate-900">Teaching series</div>
                    <div className="space-y-3">
                      {series.map((item) => (
                        <div key={item.title} className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                              <div className="mt-1 text-sm text-slate-600">{item.meta}</div>
                            </div>
                            <BookOpen className="h-4 w-4 text-[#03cd8c]" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="xl:col-span-1 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="mb-3 text-sm font-semibold text-slate-900">Faith events</div>
                    <div className="space-y-3">
                      {events.map((item) => (
                        <div key={item.title} className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                              <div className="text-sm text-slate-500">{item.date}  {item.type}</div>
                              <div className="mt-1 text-sm text-slate-600">{item.price}</div>
                            </div>
                            <Ticket className="h-4 w-4 text-[#f77f00]" />
                          </div>
                        </div>
                      ))}
                    </div>
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
            <Card className="rounded-[32px] border border-white/60 bg-slate-950 text-white shadow-[0_24px_80px_-30px_rgba(15,23,42,0.55)]">
              <CardContent className="p-5 sm:p-6">
                <SectionHeader
                  title="Start conversation"
                  subtitle="Institution channels and guided prayer support entry points."
                  action="Manage alerts"
                />
                <div className="space-y-3">
                  {channels.map((channel) => (
                    <div key={channel.name} className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur">
                      <div className="mb-1 flex items-center justify-between gap-3">
                        <div className="text-base font-semibold text-white">{channel.name}</div>
                        <Badge className="rounded-full bg-white/10 text-white hover:bg-white/10">Channel</Badge>
                      </div>
                      <div className="text-sm text-white/70">{channel.description}</div>
                      <div className="mt-4 flex gap-2">
                        <Button className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Start
                        </Button>
                        <Button variant="outline" className="rounded-2xl border-white/15 bg-transparent text-white hover:bg-white/10">
                          Learn more
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <SectionHeader
                  title="Prayer request"
                  subtitle="A guided request form with safe institutional routing."
                  action="History"
                />
                <div className="space-y-4">
                  <div className="rounded-[24px] border border-slate-200 bg-[#f8fafc] p-4">
                    <div className="mb-2 text-sm font-semibold text-slate-900">Request message</div>
                    <textarea
                      value={prayerText}
                      onChange={(e) => setPrayerText(e.target.value)}
                      rows={5}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#03cd8c] focus:ring-4 focus:ring-[#03cd8c]/10"
                    />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">
                      <Send className="mr-2 h-4 w-4" />
                      Send request
                    </Button>
                    <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                      <Mic2 className="mr-2 h-4 w-4 text-[#03cd8c]" />
                      Add voice note
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <SectionHeader
                  title="Giving, membership, and event upsells"
                  subtitle="Donations, subscriptions, and FaithMart-linked event journeys."
                  action="Wallet"
                />
                <div className="space-y-3">
                  {donationFunds.map((item) => (
                    <div key={item.title} className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="mb-1 text-sm font-semibold text-slate-900">{item.title}</div>
                      <div className="text-sm text-slate-500">{item.amount}  {item.goal}</div>
                      <div className="mt-3 h-2 rounded-full bg-slate-100">
                        <div className="h-2 rounded-full bg-[#03cd8c]" style={{ width: item.width }} />
                      </div>
                    </div>
                  ))}

                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button
                      className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]"
                      disabled={offlineMode}
                    >
                      <HeartHandshake className="mr-2 h-4 w-4" />
                      {offlineMode ? "Donate unavailable offline" : "Donate now"}
                    </Button>
                    <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                      <Star className="mr-2 h-4 w-4 text-[#03cd8c]" />
                      Subscribe / join membership
                    </Button>
                  </div>

                  <div className="rounded-[24px] border border-[#f77f00]/20 bg-[#fff8ef] p-4">
                    <div className="mb-2 text-sm font-semibold text-slate-900">FaithMart integration</div>
                    <div className="text-sm leading-6 text-slate-600">
                      Event tickets, vendor booth access, branded merchandise, and marketplace-day products route through FaithMart with clean institution context and event-aware upsells.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#03cd8c]">Members-only area</div>
                    <div className="mt-2 text-xl font-semibold text-slate-900">Private institution section</div>
                  </div>
                  <Button
                    variant="outline"
                    className="rounded-full border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
                    onClick={() => setMemberMode((prev) => !prev)}
                  >
                    {memberMode ? "Member view on" : "Preview lock state"}
                  </Button>
                </div>

                {!memberMode ? (
                  <div className="rounded-[28px] border border-dashed border-slate-200 bg-[#f8fafc] p-6 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white">
                      <Lock className="h-6 w-6" />
                    </div>
                    <div className="mb-2 text-lg font-semibold text-slate-900">Members-only resources</div>
                    <div className="mx-auto max-w-md text-sm leading-6 text-slate-600">
                      Premium or membership-gated content may include private notes, internal replays, institution documents, volunteer rosters, and exclusive group communication channels.
                    </div>
                    <div className="mt-5 flex justify-center gap-2">
                      <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">Unlock membership</Button>
                      <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                        View benefits
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-[28px] border border-[#03cd8c]/15 bg-[#ecfff8] p-5">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <CheckCircle2 className="h-4 w-4 text-[#03cd8c]" />
                      Membership active
                    </div>
                    <div className="space-y-3 text-sm text-slate-600">
                      <div className="rounded-2xl border border-white bg-white p-4">Private leader notes and replay extras</div>
                      <div className="rounded-2xl border border-white bg-white p-4">Members-only event discounts and reserved ticket windows</div>
                      <div className="rounded-2xl border border-white bg-white p-4">Institution channels, internal announcements, and deeper study library</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

