// @ts-nocheck
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  Fingerprint,
  KeyRound,
  Lock,
  Mail,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  WifiOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const tabs = [
  { key: "signin", label: "Sign in" },
  { key: "signup", label: "Create account" },
  { key: "recovery", label: "Recovery" },
];

const methods = [
  { key: "email", label: "Email", icon: Mail, helper: "Use email and passwordless OTP" },
  { key: "phone", label: "Phone", icon: Smartphone, helper: "Use phone number and SMS OTP" },
  { key: "passkey", label: "Passkey", icon: KeyRound, helper: "Fastest route on supported devices" },
];

const otpCells = ["1", "4", "7", "2", "9", "0"];

const trustPoints = [
  "Passwordless OTP, passkeys, and biometrics across devices.",
  "Risk-based step-up for unfamiliar sign-in patterns or sensitive actions.",
  "Trusted-device memory with explicit user control and easy revoke.",
  "Read-only offline access to cached library content when a valid session exists.",
];

function SegmentedTab({ active, label, onClick }) {
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

function MethodCard({ active, label, helper, icon: Icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-[24px] border p-4 text-left transition ${
        active
          ? "border-[#03cd8c] bg-[#ecfff8] shadow-lg shadow-[#03cd8c]/10"
          : "border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-slate-50"
      }`}
    >
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#03cd8c]/10 text-[#03cd8c]">
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-base font-semibold text-slate-900">{label}</div>
      <div className="mt-1 fh-body-tight text-slate-600">{helper}</div>
    </button>
  );
}

export default function FaithHubAuthCenter() {
  const [tab, setTab] = useState("signin");
  const [method, setMethod] = useState("email");
  const [showSecret, setShowSecret] = useState(false);
  const [trustDevice, setTrustDevice] = useState(true);
  const [stepUpRequired, setStepUpRequired] = useState(true);
  const [offlineLibraryEnabled] = useState(true);

  const title = useMemo(() => {
    if (tab === "signup") return "Create your FaithHub access";
    if (tab === "recovery") return "Recover access safely";
    return "Sign in to FaithHub";
  }, [tab]);

  const subtitle = useMemo(() => {
    if (tab === "signup") {
      return "Register with email or phone, enable passwordless entry, and keep enterprise sign-in available where EVzone supports it.";
    }
    if (tab === "recovery") {
      return "Restore access with trusted recovery routes, device validation, and security review for unusual activity.";
    }
    return "Accessible authentication with OTP, passkeys, biometrics, device trust, and risk-based step-up when required.";
  }, [tab]);

  const isPasskey = method === "passkey";

  return (
    <div className="fh-page-canvas min-h-screen text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-4 flex items-center justify-between rounded-[28px] border border-white/70 bg-white/85 px-4 py-3 shadow-sm backdrop-blur"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#03cd8c] text-white shadow-lg shadow-[#03cd8c]/20">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="fh-eyebrow text-[#03cd8c]">
                EVzone Super App
              </div>
              <div className="text-lg font-semibold">FaithHub Authentication Center</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="hidden rounded-full bg-[#f77f00]/10 px-3 py-1 text-[#f77f00] hover:bg-[#f77f00]/10 sm:flex">
              Accessible auth by design
            </Badge>
            <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-[#03cd8c]/30 hover:text-[#03cd8c]">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <div className="grid flex-1 gap-4 lg:grid-cols-[1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white/92 shadow-[0_24px_80px_-30px_rgba(15,23,42,0.25)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(3,205,140,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.08),transparent_20%)]" />
            <div className="relative z-10 fh-pad-hero">
              <div className="mb-6 flex flex-wrap items-center gap-2 rounded-[24px] bg-[#f7fbfa] p-2 ring-1 ring-slate-200/80">
                {tabs.map((item) => (
                  <SegmentedTab
                    key={item.key}
                    label={item.label}
                    active={tab === item.key}
                    onClick={() => setTab(item.key)}
                  />
                ))}
              </div>

              <div className="mb-6 max-w-2xl space-y-3">
                <div className="fh-eyebrow text-[#03cd8c]">
                  FH-U-002
                </div>
                <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">{title}</h1>
                <p className="max-w-2xl fh-body text-slate-600 sm:text-base">{subtitle}</p>
              </div>

              <div className="mb-6 grid gap-3 md:grid-cols-3">
                {methods.map((item) => (
                  <MethodCard
                    key={item.key}
                    {...item}
                    active={method === item.key}
                    onClick={() => setMethod(item.key)}
                  />
                ))}
              </div>

              <div className="grid gap-4 xl:grid-cols-[1.12fr_0.88fr]">
                <Card className="fh-interactive-card rounded-[28px] border-slate-200 bg-white shadow-sm">
                  <CardContent className="fh-pad-panel">
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-slate-900">
                          {tab === "recovery" ? "Recovery path" : "Authentication details"}
                        </div>
                        <div className="text-xs text-slate-500">
                          {isPasskey ? "Passkeys and biometrics make sign-in faster and safer." : "Use labels, clear hints, and passwordless OTP for accessible sign-in."}
                        </div>
                      </div>
                      <Badge className="rounded-full bg-[#03cd8c]/10 text-[#03cd8c] hover:bg-[#03cd8c]/10">
                        {method === "phone" ? "OTP" : method === "passkey" ? "Passkey" : "Email"}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      {!isPasskey && (
                        <label className="block space-y-2">
                          <span className="text-sm font-medium text-slate-700">
                            {method === "phone" ? "Phone number" : "Email address"}
                          </span>
                          <input
                            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-[#03cd8c] focus:bg-white focus:ring-4 focus:ring-[#03cd8c]/10"
                            placeholder={method === "phone" ? "+256 7XX XXX XXX" : "you@example.com"}
                            defaultValue={method === "phone" ? "+256 774 000 000" : "naomi@faithhub.com"}
                          />
                        </label>
                      )}

                      {tab !== "recovery" && !isPasskey && (
                        <label className="block space-y-2">
                          <span className="text-sm font-medium text-slate-700">
                            {tab === "signup" ? "Create secure fallback secret" : "Optional fallback secret"}
                          </span>
                          <div className="relative">
                            <input
                              type={showSecret ? "text" : "password"}
                              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 pr-12 text-sm outline-none transition focus:border-[#03cd8c] focus:bg-white focus:ring-4 focus:ring-[#03cd8c]/10"
                              defaultValue="faithhub-secure-access"
                            />
                            <button
                              type="button"
                              onClick={() => setShowSecret((prev) => !prev)}
                              className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-[#03cd8c]"
                            >
                              {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </label>
                      )}

                      {(tab === "signin" || tab === "recovery") && !isPasskey && (
                        <div className="fh-subcard-muted rounded-[24px] p-4">
                          <div className="mb-3 flex items-center justify-between gap-3">
                            <div>
                              <div className="text-sm font-semibold text-slate-900">One-time passcode</div>
                              <div className="text-xs text-slate-500">Passwordless OTP with large, easy-to-read input cells.</div>
                            </div>
                            <Button variant="ghost" className="rounded-full text-[#03cd8c] hover:bg-[#03cd8c]/10 hover:text-[#03cd8c]">
                              Resend
                            </Button>
                          </div>
                          <div className="grid grid-cols-6 gap-2">
                            {otpCells.map((cell, index) => (
                              <div
                                key={`${cell}-${index}`}
                                className="flex h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-lg font-semibold text-slate-900"
                              >
                                {cell}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {isPasskey && (
                        <div className="rounded-[24px] border border-[#03cd8c]/20 bg-[#ecfff8] p-5">
                          <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#03cd8c] text-white shadow-lg shadow-[#03cd8c]/20">
                              <Fingerprint className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="text-base font-semibold text-slate-900">Use passkey or biometric sign-in</div>
                              <div className="text-sm text-slate-600">Fastest path on supported browsers and devices.</div>
                            </div>
                          </div>
                          <div className="grid gap-3 sm:grid-cols-2">
                            <Button className="h-12 rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">Continue with passkey</Button>
                            <Button variant="outline" className="h-12 rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/30 hover:bg-white">
                              Use device biometric
                            </Button>
                          </div>
                        </div>
                      )}

                      {tab === "recovery" && (
                        <div className="rounded-[24px] border border-slate-200 bg-[#fff8ef] p-4">
                          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                            <Lock className="h-4 w-4 text-[#f77f00]" />
                            Recovery methods available
                          </div>
                          <div className="space-y-2 text-sm text-slate-600">
                            <div> Verified phone or email recovery with OTP and cooldown protection</div>
                            <div> Trusted device confirmation</div>
                            <div> Provider-admin or enterprise SSO recovery for supported organizations</div>
                          </div>
                        </div>
                      )}

                      <div className="grid gap-3 sm:grid-cols-2">
                        <button
                          onClick={() => setTrustDevice((prev) => !prev)}
                          className={`rounded-2xl border px-4 py-4 text-left transition ${
                            trustDevice
                              ? "border-[#03cd8c]/25 bg-[#ecfff8]"
                              : "border-slate-200 bg-white hover:border-[#03cd8c]/30"
                          }`}
                        >
                          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                            <ShieldCheck className="h-4 w-4 text-[#03cd8c]" />
                            Trusted device
                          </div>
                          <div className="text-sm text-slate-600">
                            {trustDevice ? "This device will be remembered after successful verification." : "This device will require full verification next time."}
                          </div>
                        </button>

                        <button
                          onClick={() => setStepUpRequired((prev) => !prev)}
                          className={`rounded-2xl border px-4 py-4 text-left transition ${
                            stepUpRequired
                              ? "border-[#f77f00]/25 bg-[#fff8ef]"
                              : "border-slate-200 bg-white hover:border-[#03cd8c]/30"
                          }`}
                        >
                          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                            <ShieldAlert className="h-4 w-4 text-[#f77f00]" />
                            Risk-based step-up
                          </div>
                          <div className="text-sm text-slate-600">
                            {stepUpRequired ? "New device or location detected. Passkey + OTP required." : "Normal risk state. Standard flow allowed."}
                          </div>
                        </button>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <Button className="h-12 rounded-2xl bg-[#03cd8c] text-base hover:bg-[#02b67c]">
                          {tab === "signup" ? "Create account" : tab === "recovery" ? "Continue recovery" : "Continue securely"}
                        </Button>
                        <Button
                          variant="outline"
                          className="h-12 rounded-2xl border-slate-200 bg-white text-base hover:border-[#03cd8c]/30 hover:bg-[#f7fffb]"
                        >
                          Continue with passkey
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <Card className="fh-interactive-card rounded-[28px] border-slate-200 bg-slate-950 text-white shadow-sm">
                    <CardContent className="fh-pad-panel">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <div>
                          <div className="fh-eyebrow text-[#8ef0ca]">
                            Enterprise-ready
                          </div>
                          <div className="mt-2 text-xl font-semibold">SSO and organization access</div>
                        </div>
                        <Building2 className="h-5 w-5 text-[#8ef0ca]" />
                      </div>

                      <div className="space-y-3 text-sm text-white/80">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                          <div className="text-sm font-semibold text-white">SAML / OIDC</div>
                          <div className="mt-1">For institutions using EVzone enterprise identity, providers and teams can access FaithHub with their existing organization login.</div>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                          <div className="text-sm font-semibold text-white">Role-aware entry</div>
                          <div className="mt-1">Users can enter as member, provider, moderator, or admin based on permissions refreshed at sign-in.</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="fh-interactive-card rounded-[28px] border-slate-200 bg-white shadow-sm">
                    <CardContent className="fh-pad-panel">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <div>
                          <div className="fh-eyebrow text-[#03cd8c]">
                            Trust and continuity
                          </div>
                          <div className="mt-2 text-xl font-semibold text-slate-900">What this page protects</div>
                        </div>
                        <Badge className="rounded-full bg-[#03cd8c]/10 text-[#03cd8c] hover:bg-[#03cd8c]/10">
                          FH-U-002 scope
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        {trustPoints.map((point) => (
                          <div key={point} className="flex gap-3 rounded-2xl border border-slate-100 bg-[#f8fafc] p-4">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#03cd8c]" />
                            <div className="fh-body-tight text-slate-600">{point}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {offlineLibraryEnabled && (
                    <Card className="fh-interactive-card rounded-[28px] border border-[#f77f00]/15 bg-[#fffaf3] shadow-sm">
                      <CardContent className="fh-pad-panel">
                        <div className="mb-3 flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f77f00]/10 text-[#f77f00]">
                            <WifiOff className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900">Offline read-only mode</div>
                            <div className="text-xs text-slate-500">Available when a previous valid session and cached library exist.</div>
                          </div>
                        </div>
                        <div className="rounded-2xl border border-dashed border-[#f77f00]/20 bg-white p-4 fh-body-tight text-slate-600">
                          Users can still open downloaded books, saved replays, and last-synced notes while the device is offline. Sensitive mutations wait until the connection is restored.
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.4 }}
            className="flex flex-col gap-4"
          >
            <Card className="fh-interactive-card overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-br from-[#03cd8c] via-[#22d39f] to-[#eafcf6] shadow-[0_24px_80px_-28px_rgba(3,205,140,0.45)]">
              <CardContent className="fh-pad-hero">
                <div className="mb-5 max-w-xl space-y-3 text-white">
                  <div className="fh-eyebrow text-white/90">Accessible and premium-ready</div>
                  <h2 className="text-3xl font-semibold leading-tight">Authentication that feels calm, clear, and trustworthy.</h2>
                  <p className="fh-body text-white/85 sm:text-base">
                    FaithHub avoids confusing puzzles, keeps labels visible, and balances convenience with protection across members, providers, and enterprise organizations.
                  </p>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-[28px] border border-white/15 bg-white/12 p-4 backdrop-blur sm:p-5">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div className="text-sm font-semibold text-white">Step-up security preview</div>
                      <Badge className="rounded-full bg-white/15 text-white hover:bg-white/15">Contextual only</Badge>
                    </div>
                    <div className="rounded-2xl border border-white/15 bg-slate-950/20 p-4 text-sm text-white/85">
                      New browser, unusual location, or provider-level action detected. Require passkey or biometric confirmation and fresh OTP before continuing.
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-white/15 bg-white/12 p-4 backdrop-blur sm:p-5">
                    <div className="mb-3 text-sm font-semibold text-white">Quick actions</div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Button className="h-12 rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90">Use Face / Touch ID</Button>
                      <Button variant="outline" className="h-12 rounded-2xl border-white/30 bg-transparent text-white hover:bg-white/10">
                        Send magic link
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card rounded-[32px] border border-white/60 bg-white/90 shadow-sm">
              <CardContent className="fh-pad-panel">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="fh-eyebrow text-[#03cd8c]">Assistive details</div>
                    <div className="mt-2 text-xl font-semibold text-slate-900">Accessibility notes</div>
                  </div>
                  <Badge className="rounded-full bg-slate-900 text-white hover:bg-slate-900">No cognitive puzzles</Badge>
                </div>
                <div className="grid gap-3 text-sm text-slate-600">
                  <div className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-4">Persistent field labels, high-contrast buttons, generous hit areas, and large OTP cells improve clarity on all devices.</div>
                  <div className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-4">Passkeys, biometrics, SMS OTP, and email OTP are visible as clear alternatives rather than hidden behind ambiguous flows.</div>
                  <div className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-4">Recovery routes stay visible without exposing account existence, preserving trust and security at the same time.</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}



