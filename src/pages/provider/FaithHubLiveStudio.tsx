// @ts-nocheck
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Bell,
  Captions,
  Clapperboard,
  Languages,
  LayoutTemplate,
  Mic,
  MicOff,
  MonitorPlay,
  PlayCircle,
  Radio,
  Save,
  ScreenShare,
  Settings2,
  Sparkles,
  Users,
  Video,
  VideoOff,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const cohosts = [
  { name: "Naomi Kato", role: "Host", state: "Live in studio" },
  { name: "Daniel Ssentamu", role: "Producer", state: "Connected" },
  { name: "Aisha Nabirye", role: "Prayer lead", state: "Invited" },
];

const overlays = [
  { name: "Lower third", active: true },
  { name: "Donate CTA", active: true },
  { name: "Prayer request QR", active: false },
  { name: "Series title card", active: true },
];

const scenes = [
  { name: "Main camera", type: "Program" },
  { name: "Speaker + scripture", type: "Split layout" },
  { name: "Prayer moment", type: "Soft overlay" },
  { name: "Closing CTA", type: "End card" },
];

const checklist = [
  "Camera and microphone permissions granted",
  "Encoder and scene assets verified",
  "Captioning and translation preferences configured",
  "Host and producer roles confirmed",
  "Back-up communication path established",
];

export default function FaithHubLiveStudio() {
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [interactiveMode, setInteractiveMode] = useState(true);
  const [captionsOn, setCaptionsOn] = useState(true);
  const [translationOn, setTranslationOn] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [brandedScenes, setBrandedScenes] = useState(true);
  const [multitrack, setMultitrack] = useState(true);
  const [cloudMixer, setCloudMixer] = useState(true);
  const [producerRoles, setProducerRoles] = useState(true);

  return (
    <div className="fh-page-canvas min-h-screen text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="fh-page-header mb-4 flex items-center justify-between rounded-[28px] px-4 py-3"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#03cd8c] text-white shadow-lg shadow-[#03cd8c]/20">
              <MonitorPlay className="h-5 w-5" />
            </div>
            <div>
              <div className="hidden text-[#03cd8c]">EVzone Super App</div>
              <div className="text-lg font-semibold">Live Studio</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 md:flex">
              {offlineMode ? <WifiOff className="h-4 w-4 text-[#f77f00]" /> : <Wifi className="h-4 w-4 text-[#03cd8c]" />}
              {offlineMode ? "Studio unavailable offline" : "Studio connected"}
            </div>
            <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-[#03cd8c]/30 hover:text-[#03cd8c]">
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
            <Card className="fh-interactive-card relative overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-br from-[#03cd8c] via-[#1fd29d] to-[#eafcf6] shadow-[0_24px_80px_-28px_rgba(3,205,140,0.45)]">
              <CardContent className="fh-pad-hero">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.12),transparent_22%)]" />
                <div className="relative z-10 text-white">
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">Studio control room</Badge>
                    <Badge className="rounded-full bg-slate-900/85 text-white hover:bg-slate-900">Host controls, scenes, overlays, interactivity</Badge>
                  </div>
                  <div className="grid gap-5 lg:grid-cols-[0.63fr_0.37fr]">
                    <div className="space-y-4">
                      <div className="fh-kicker text-white/90">Broadcast like a premium creator stack</div>
                      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                        A live studio for faith broadcasting with host controls, collaboration, overlays, and low-latency interaction.
                      </h1>
                      <p className="max-w-2xl fh-body text-white/90 sm:text-base">
                        Live Studio gives providers the real control room: camera, microphone, screen share, overlays, captions, translation, CTA placement, and premium production tooling like branded scenes and producer roles.
                      </p>
                    </div>
                    <div className="rounded-[28px] border border-white/15 bg-white/12 p-4 backdrop-blur">
                      <div className="mb-3 text-sm font-semibold text-white">Interactive mode</div>
                      <div className="rounded-[24px] border border-white/15 bg-white/10 p-4">
                        <div className="fh-kicker-muted text-white/70">Latency profile</div>
                        <div className="mt-1 text-3xl font-semibold text-white">{interactiveMode ? "Real-time" : "Standard"}</div>
                        <div className="mt-2 text-sm text-white/80">{interactiveMode ? "Low-latency interactive mode active for faster audience response." : "Standard studio latency mode active."}</div>
                      </div>
                      <div className="mt-4 fh-actions-grid">
                        <Button className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90" disabled={offlineMode}>
                          Go live
                        </Button>
                        <Button
                          variant="outline"
                          className="rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/15"
                          onClick={() => setOfflineMode((prev) => !prev)}
                        >
                          {offlineMode ? "Reconnect" : "Offline preview"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {offlineMode ? (
              <Card className="fh-interactive-card fh-surface-warm rounded-[32px]">
                <CardContent className="fh-pad-panel">
                  <div className="mb-4 text-lg font-semibold text-slate-900">Offline studio checklist</div>
                  <div className="space-y-3">
                    {checklist.map((item) => (
                      <div key={item} className="fh-subcard-warm rounded-[24px] p-4 text-sm text-slate-600">
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 fh-subcard-warm rounded-[24px] p-4 text-sm text-slate-600">
                    Studio hosting controls are unavailable offline. Providers can still review readiness, scenes, and role setup before reconnecting.
                  </div>
                </CardContent>
              </Card>
            ) : (
              <>
                <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
                  <CardContent className="fh-pad-panel">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-lg font-semibold text-slate-900 sm:text-xl">Program preview and device controls</div>
                        <div className="text-sm text-slate-500">Core host actions inside the studio.</div>
                      </div>
                      <Badge className="rounded-full bg-[#ecfff8] text-[#03cd8c] hover:bg-[#ecfff8]">Live control</Badge>
                    </div>
                    <div className="mb-4 h-[340px] rounded-[28px] bg-gradient-to-br from-slate-100 to-slate-200" />
                    <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-4">
                      <button
                        onClick={() => setCameraOn((prev) => !prev)}
                        className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${cameraOn ? "border-[#03cd8c]/15 bg-[#ecfff8] text-slate-900" : "border-slate-200 bg-white text-slate-700"}`}
                      >
                        {cameraOn ? <Video className="mr-2 inline h-4 w-4 text-[#03cd8c]" /> : <VideoOff className="mr-2 inline h-4 w-4 text-[#f77f00]" />}
                        {cameraOn ? "Camera on" : "Camera off"}
                      </button>
                      <button
                        onClick={() => setMicOn((prev) => !prev)}
                        className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${micOn ? "border-[#03cd8c]/15 bg-[#ecfff8] text-slate-900" : "border-slate-200 bg-white text-slate-700"}`}
                      >
                        {micOn ? <Mic className="mr-2 inline h-4 w-4 text-[#03cd8c]" /> : <MicOff className="mr-2 inline h-4 w-4 text-[#f77f00]" />}
                        {micOn ? "Mic on" : "Mic off"}
                      </button>
                      <button
                        onClick={() => setScreenSharing((prev) => !prev)}
                        className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${screenSharing ? "border-[#03cd8c]/15 bg-[#ecfff8] text-slate-900" : "border-slate-200 bg-white text-slate-700"}`}
                      >
                        <ScreenShare className="mr-2 inline h-4 w-4 text-[#03cd8c]" />
                        {screenSharing ? "Stop share" : "Screen share"}
                      </button>
                      <button
                        onClick={() => setInteractiveMode((prev) => !prev)}
                        className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${interactiveMode ? "border-[#03cd8c]/15 bg-[#ecfff8] text-slate-900" : "border-slate-200 bg-white text-slate-700"}`}
                      >
                        <Radio className="mr-2 inline h-4 w-4 text-[#03cd8c]" />
                        {interactiveMode ? "Interactive on" : "Interactive off"}
                      </button>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid gap-4 lg:grid-cols-[0.52fr_0.48fr]">
                  <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
                    <CardContent className="fh-pad-panel">
                      <div className="mb-4 text-lg font-semibold text-slate-900">Co-hosts and producer roles</div>
                      <div className="space-y-3">
                        {cohosts.map((person) => (
                          <div key={person.name} className="fh-subcard rounded-[24px] p-4">
                            <div className="mb-1 text-sm font-semibold text-slate-900">{person.name}</div>
                            <div className="text-xs text-slate-500">{person.role}</div>
                            <div className="mt-1 text-sm text-slate-600">{person.state}</div>
                          </div>
                        ))}
                        <button
                          onClick={() => setProducerRoles((prev) => !prev)}
                          className={`w-full rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${producerRoles ? "border-[#03cd8c]/15 bg-[#ecfff8] text-slate-900" : "border-slate-200 bg-white text-slate-700"}`}
                        >
                          <Users className="mr-2 inline h-4 w-4 text-[#03cd8c]" />
                          {producerRoles ? "Producer role controls enabled" : "Enable producer roles"}
                        </button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
                    <CardContent className="fh-pad-panel">
                      <div className="mb-4 text-lg font-semibold text-slate-900">Overlays and CTA slots</div>
                      <div className="space-y-3">
                        {overlays.map((item) => (
                          <button
                            key={item.name}
                            className={`flex w-full items-center justify-between gap-3 rounded-[24px] border px-4 py-4 text-left transition ${item.active ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                          >
                            <div className="text-sm font-semibold text-slate-900">{item.name}</div>
                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.active ? "bg-[#03cd8c] text-white" : "bg-slate-100 text-slate-700"}`}>
                              {item.active ? "Active" : "Off"}
                            </span>
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.35 }}
            className="space-y-4"
          >
            <Card className="fh-interactive-card fh-surface-dark rounded-[32px] text-white">
              <CardContent className="fh-pad-panel">
                <div className="mb-4 text-lg font-semibold text-white">Captions, translation, and response profile</div>
                <div className="space-y-3">
                  <button
                    onClick={() => setCaptionsOn((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${captionsOn ? "border-[#03cd8c]/30 bg-[#03cd8c]/15 text-white" : "border-white/10 bg-white/5 text-white/80"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <Captions className="h-4 w-4 text-[#8ef0ca]" /> Live captions
                    </div>
                    <div className="text-sm text-white/75">{captionsOn ? "Real-time captions are enabled for the studio output." : "Captions are currently off."}</div>
                  </button>
                  <button
                    onClick={() => setTranslationOn((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${translationOn ? "border-[#03cd8c]/30 bg-[#03cd8c]/15 text-white" : "border-white/10 bg-white/5 text-white/80"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <Languages className="h-4 w-4 text-[#8ef0ca]" /> Live translation
                    </div>
                    <div className="text-sm text-white/75">{translationOn ? "Translation overlays are active for supported languages." : "Translation is disabled."}</div>
                  </button>
                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm text-white/80 backdrop-blur">
                    Interactive real-time mode is designed for tighter response windows and conversation-led live sessions, supporting a more immediate audience feel.
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <div className="mb-4 text-lg font-semibold text-slate-900">Scenes and production layout</div>
                <div className="space-y-3">
                  {scenes.map((scene) => (
                    <div key={scene.name} className="fh-subcard rounded-[24px] p-4">
                      <div className="mb-1 text-sm font-semibold text-slate-900">{scene.name}</div>
                      <div className="text-sm text-slate-600">{scene.type}</div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                    <LayoutTemplate className="mr-2 h-4 w-4 text-[#03cd8c]" /> Edit scenes
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-warm rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-slate-900">Premium studio pack</div>
                    <div className="text-sm text-slate-500">Advanced production controls for larger institutions.</div>
                  </div>
                  <Badge className="rounded-full bg-[#f77f00]/10 text-[#f77f00] hover:bg-[#f77f00]/10">Premium</Badge>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={() => setBrandedScenes((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${brandedScenes ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <Clapperboard className="h-4 w-4 text-[#03cd8c]" /> Branded scenes
                    </div>
                    <div className="text-sm text-slate-600">{brandedScenes ? "Custom branded scene system is enabled." : "Default scene styling only."}</div>
                  </button>
                  <button
                    onClick={() => setMultitrack((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${multitrack ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <PlayCircle className="h-4 w-4 text-[#03cd8c]" /> Multitrack recording
                    </div>
                    <div className="text-sm text-slate-600">{multitrack ? "Program, isolated inputs, and selected overlays can be recorded separately." : "Single program recording only."}</div>
                  </button>
                  <button
                    onClick={() => setCloudMixer((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${cloudMixer ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <Settings2 className="h-4 w-4 text-[#03cd8c]" /> Cloud mixer
                    </div>
                    <div className="text-sm text-slate-600">{cloudMixer ? "Centralized mixing and production routing are active in preview." : "Local-only scene switching mode."}</div>
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




