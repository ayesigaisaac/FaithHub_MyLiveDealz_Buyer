// @ts-nocheck
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, CalendarDays, ChevronRight, Clock3, Radio, Users, Wifi, WifiOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const scheduleDays = [
  {
    day: "Today",
    sessions: [
      { title: "Evening Prayer Revival", time: "7:30 PM", lane: "Main auditorium", team: "7 crew assigned" },
      { title: "Family Prayer Circle", time: "9:00 PM", lane: "Family ministry lane", team: "4 crew assigned" },
    ],
  },
  {
    day: "Tomorrow",
    sessions: [
      { title: "Youth Impact Night", time: "6:30 PM", lane: "Youth studio", team: "6 crew assigned" },
      { title: "Leadership Mentorship Live", time: "8:00 PM", lane: "Leadership channel", team: "5 crew assigned" },
    ],
  },
  {
    day: "Saturday",
    sessions: [
      { title: "Marketplace Day Launch", time: "10:00 AM", lane: "Event stage", team: "9 crew assigned" },
      { title: "Healing Worship Room", time: "5:00 PM", lane: "Prayer room", team: "5 crew assigned" },
    ],
  },
];

const scheduleTasks = [
  "Confirm host roster and backup producer",
  "Verify captions and translation packs",
  "Re-check stream destinations and ingest health",
  "Schedule reminder messages for priority audiences",
];

export default function FaithHubLiveSchedule() {
  const navigate = useNavigate();
  const [offlineReadOnly, setOfflineReadOnly] = useState(false);
  const [selectedDay, setSelectedDay] = useState("Today");

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
              <div className="text-lg font-semibold">Live Schedule</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 md:flex">
              {offlineReadOnly ? <WifiOff className="h-4 w-4 text-[#f77f00]" /> : <Wifi className="h-4 w-4 text-[#03cd8c]" />}
              {offlineReadOnly ? "Cached calendar only" : "Scheduling controls active"}
            </div>
            <button type="button" className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:text-slate-900">
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
                    <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">Live operations calendar</Badge>
                    <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">Scheduling, staffing, reminders, readiness</Badge>
                  </div>
                  <div className="grid gap-5 lg:grid-cols-[0.64fr_0.36fr]">
                    <div className="space-y-4">
                      <div className="fh-kicker text-white/90">Plan every live touchpoint</div>
                      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                        Keep the provider calendar coordinated across broadcasts, people, reminders, and venue readiness.
                      </h1>
                      <p className="max-w-2xl fh-body text-white/90 sm:text-base">
                        This schedule page gives ministries one operating surface for upcoming Live Sessionz, crew assignments, rehearsal timing, audience reminders, and handoff into studio or live operations.
                      </p>
                    </div>
                    <div className="rounded-[28px] border border-white/15 bg-white/12 p-4 backdrop-blur">
                      <div className="mb-3 text-sm font-semibold text-white">Next action</div>
                      <div className="rounded-[24px] border border-white/15 bg-white/10 p-4">
                        <div className="fh-kicker-muted text-white/70">Upcoming slot</div>
                        <div className="mt-1 text-2xl font-semibold text-white">Evening Prayer Revival</div>
                        <div className="mt-2 text-sm text-white/80">Crew confirmation closes in 2 hours.</div>
                      </div>
                      <div className="mt-4 fh-actions-grid">
                        <Button className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90" onClick={() => navigate("/app/provider/live-builder")}>
                          Open live builder
                        </Button>
                        <Button
                          variant="outline"
                          className="rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/15"
                          onClick={() => setOfflineReadOnly((prev) => !prev)}
                        >
                          {offlineReadOnly ? "Go live" : "Read only"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-slate-900 sm:text-xl">Scheduled sessions</div>
                    <div className="text-sm text-slate-500">Open the calendar day and move directly into the right provider workflow.</div>
                  </div>
                  <Button variant="ghost" className="rounded-full text-[#03cd8c] hover:bg-[#03cd8c]/10 hover:text-[#03cd8c]" onClick={() => navigate("/app/provider/live-ops")}>
                    Open live ops
                  </Button>
                </div>
                <div className="mb-4 flex flex-wrap gap-2">
                  {scheduleDays.map((item) => (
                    <button
                      key={item.day}
                      type="button"
                      onClick={() => setSelectedDay(item.day)}
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${selectedDay === item.day ? "border-slate-200 bg-white text-slate-900" : "border-slate-200 bg-white text-slate-700 hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"}`}
                    >
                      {item.day}
                    </button>
                  ))}
                </div>
                <div className="space-y-3">
                  {scheduleDays.find((item) => item.day === selectedDay)?.sessions.map((session) => (
                    <button
                      key={session.title}
                      type="button"
                      onClick={() => navigate("/app/provider/live-studio")}
                      className="flex w-full items-center justify-between gap-3 rounded-[24px] border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
                    >
                      <div>
                        <div className="text-base font-semibold text-slate-900">{session.title}</div>
                        <div className="mt-1 text-sm text-slate-500">{session.time} - {session.lane}</div>
                        <div className="mt-2 text-sm text-slate-600">{session.team}</div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-slate-400" />
                    </button>
                  ))}
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
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-white sm:text-xl">Readiness checklist</div>
                    <div className="text-sm text-white/70">Use one route from schedule into each operational tool.</div>
                  </div>
                  <Badge className="rounded-full bg-white/10 text-white hover:bg-white/10">
                    <Clock3 className="mr-1 h-3.5 w-3.5" /> 4 critical tasks
                  </Badge>
                </div>
                <div className="space-y-3">
                  {scheduleTasks.map((task) => (
                    <div key={task} className="rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm text-white/80 backdrop-blur">
                      {task}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-slate-900 sm:text-xl">Fast links</div>
                    <div className="text-sm text-slate-500">Move from calendar planning into the next provider surface.</div>
                  </div>
                  <Badge className="rounded-full bg-[#ecfff8] text-[#03cd8c] hover:bg-[#ecfff8]">
                    <Users className="mr-1 h-3.5 w-3.5" /> Crew handoff
                  </Badge>
                </div>
                <div className="grid gap-3">
                  <Button className="justify-between rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]" onClick={() => navigate("/app/provider/live-studio")}>
                    Open studio <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="justify-between rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]" onClick={() => navigate("/app/provider/notifications")}>
                    Notify audience <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="justify-between rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]" onClick={() => navigate("/app/provider/stream-to-platforms")}>
                    Stream destinations <ChevronRight className="h-4 w-4" />
                  </Button>
                  <div className="fh-subcard-muted rounded-[24px] p-4 text-sm text-slate-600">
                    The schedule is now a real routed provider page, so dashboard and shell actions can open a concrete calendar surface instead of a dead-end.
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}



