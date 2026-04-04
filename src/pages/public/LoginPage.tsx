import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/auth/AuthContext";
import { routes } from "@/constants/routes";
import { trackEvent } from "@/data/tracker";
import type { Role } from "@/types/roles";

const logoPortraitSrc = "/assets/branding/logo-portrait.png";
const logoLandscapeSrc = "/assets/branding/logo-landscape.png";

type SocialProvider = "google" | "microsoft" | "apple" | "evzone";

const socialProviders: Array<{
  id: SocialProvider;
  label: string;
  description: string;
}> = [
  { id: "google", label: "Continue with Google", description: "Use your Google account" },
  { id: "microsoft", label: "Continue with Microsoft", description: "Use your Microsoft account" },
  { id: "apple", label: "Continue with Apple", description: "Use your Apple ID" },
  { id: "evzone", label: "Continue with EVzone", description: "Use EVzone SSO" },
];

const roleOptions: Array<{ value: Role; label: string; hint: string }> = [
  { value: "user", label: "User", hint: "Home, live, community, giving" },
  { value: "provider", label: "Provider", hint: "Content, events, analytics" },
  { value: "admin", label: "Admin", hint: "Policy, security, finance" },
];

function getSocialBadge(provider: SocialProvider) {
  if (provider === "google") return { mark: "G", tone: "bg-[#fef3f2] text-[#db4437]" };
  if (provider === "microsoft") return { mark: "M", tone: "bg-[#f2f7ff] text-[#2563eb]" };
  if (provider === "apple") return { mark: "A", tone: "bg-slate-100 text-slate-900" };
  return { mark: "EV", tone: "bg-[#ecfff8] text-[#03cd8c]" };
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, mockLoginAsRole, role: currentRole } = useAuth();

  const [email, setEmail] = useState("ayesigai921@gmail.com");
  const [password, setPassword] = useState("password");
  const [role, setRole] = useState<Role>("user");
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = useMemo(
    () => email.trim().length > 3 && password.trim().length > 3,
    [email, password],
  );

  const redirectAfterLogin = () => "/home";

  const handleLogin = async (event?: React.FormEvent) => {
    event?.preventDefault();
    if (!canSubmit) {
      setMessage("Enter a valid email and password.");
      return;
    }
    setIsSubmitting(true);
    setMessage("");
    try {
      const user = await login({ email, password, role });
      trackEvent(
        "ROLE_SWITCH",
        { fromRole: currentRole, toRole: user.role, trigger: "access" },
        { role: user.role },
      );
      navigate(redirectAfterLogin());
    } catch (error) {
      const detail = error instanceof Error ? error.message : "Unable to sign in.";
      setMessage(detail);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = async (provider: SocialProvider) => {
    setIsSubmitting(true);
    setMessage("");
    try {
      const user = await mockLoginAsRole(role);
      trackEvent(
        "ROLE_SWITCH",
        { fromRole: currentRole, toRole: user.role, trigger: "access" },
        { role: user.role },
      );
      trackEvent(
        "CLICK_BUTTON",
        { id: `social-${provider}`, label: `Social ${provider}`, location: routes.public.login },
        { role: user.role },
      );
      navigate(redirectAfterLogin());
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-[#0B1220] dark:text-[#F9FAFB]">
      <div className="grid min-h-screen lg:grid-cols-[1fr_minmax(520px,46%)]">
        <aside className="relative hidden overflow-hidden lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(3,205,140,0.35),transparent_42%),radial-gradient(circle_at_84%_10%,rgba(247,127,0,0.28),transparent_32%),radial-gradient(circle_at_65%_90%,rgba(59,130,246,0.22),transparent_40%),linear-gradient(140deg,#0b1220_0%,#0f1f3f_54%,#132a54_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.1),transparent_28%)]" />
          <div className="relative z-10 flex h-full w-full flex-col justify-between px-12 py-14 xl:px-16">
            <div>
              <img src={logoLandscapeSrc} alt="FaithHub" className="h-10 w-auto object-contain" />
              <div className="mt-12 max-w-[560px]">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90">
                  <Sparkles className="h-3.5 w-3.5 text-[#03cd8c]" />
                  Unified role access
                </div>
                <h1 className="mt-5 text-5xl font-semibold leading-[1.04] tracking-tight text-white xl:text-[3.6rem]">
                  Access FaithHub with one secure login.
                </h1>
                <p className="mt-5 max-w-lg text-base leading-7 text-white/80">
                  Built for members, providers, and admins with mock-auth speed and production-grade UI clarity.
                </p>
              </div>
            </div>

            <div className="grid max-w-[560px] gap-3">
              <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <ShieldCheck className="h-4 w-4 text-[#03cd8c]" />
                  Trusted session flow
                </div>
                <p className="mt-1 text-sm text-white/75">
                  Role-aware redirects, protected routes, and local session persistence.
                </p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <CheckCircle2 className="h-4 w-4 text-[#03cd8c]" />
                  Seamless social sign-in
                </div>
                <p className="mt-1 text-sm text-white/75">
                  Google, Microsoft, Apple, and EVzone entry with instant workspace selection.
                </p>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex min-h-screen items-center justify-center px-3 py-4 sm:px-6 sm:py-8 lg:px-10">
          <Card className="w-full max-w-[520px] rounded-3xl border border-slate-200/80 bg-white shadow-[0_32px_72px_-40px_rgba(15,23,42,0.5)] dark:border-white/10 dark:bg-[#111827]">
            <CardContent className="space-y-5 p-5 sm:space-y-6 sm:p-8">
              <div className="space-y-3 sm:space-y-4">
                <img src={logoPortraitSrc} alt="FaithHub" className="h-12 w-auto object-contain lg:hidden" />
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-[#9CA3AF]">
                    Welcome back
                  </div>
                  <h2 className="mt-2 text-3xl font-semibold leading-tight text-slate-900 dark:text-[#F9FAFB]">
                    Sign in to continue
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-[#9CA3AF]">
                    Choose your workspace role, then sign in with social or email.
                  </p>
                </div>
              </div>

              <section className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3 dark:border-white/10 dark:bg-white/[0.02] sm:p-3.5">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-[#9CA3AF]">
                  Workspace role
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {roleOptions.map((option) => {
                    const active = role === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setRole(option.value)}
                        aria-pressed={active}
                        title={option.hint}
                        className={`min-h-[44px] rounded-xl px-2.5 py-2 text-sm font-semibold transition-all duration-200 sm:px-3 ${
                          active
                            ? "bg-[#03cd8c]/15 text-[#02b87c] ring-1 ring-[#03cd8c]/35 dark:bg-[#03cd8c]/20 dark:text-[#03cd8c]"
                            : "text-slate-600 hover:bg-white hover:text-slate-900 dark:text-[#9CA3AF] dark:hover:bg-white/10 dark:hover:text-[#F9FAFB]"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </section>

              <div className="grid gap-2.5 sm:gap-3">
                {socialProviders.map((provider) => {
                  const badge = getSocialBadge(provider.id);
                  return (
                    <button
                      key={provider.id}
                      type="button"
                      onClick={() => handleSocialLogin(provider.id)}
                      className="flex min-h-[48px] w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-3.5 text-left transition-all duration-200 hover:border-[#03cd8c]/35 hover:bg-[#f8fffc] disabled:cursor-not-allowed disabled:opacity-70 dark:border-white/10 dark:bg-[#0f172a] dark:hover:bg-[#1F2937] sm:px-4"
                      aria-label={provider.label}
                      disabled={isSubmitting}
                    >
                      <span
                        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${badge.tone}`}
                      >
                        {badge.mark}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-slate-900 dark:text-[#F9FAFB]">
                          {provider.label}
                        </span>
                        <span className="block truncate text-xs text-slate-500 dark:text-[#9CA3AF]">
                          {provider.description}
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 text-slate-400" />
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-[#6B7280]">
                  or continue with email
                </div>
                <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
              </div>

              <form className="space-y-3.5 sm:space-y-4" onSubmit={handleLogin}>
                <label htmlFor="login-email" className="block space-y-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-[#F9FAFB]">Email address</span>
                  <div className="flex min-h-[48px] items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 transition focus-within:border-[#03cd8c] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#03cd8c]/10 dark:border-white/10 dark:bg-[#0f172a] dark:focus-within:bg-[#111827]">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-[#F9FAFB] dark:placeholder:text-[#9CA3AF]"
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                    />
                  </div>
                </label>

                <label htmlFor="login-password" className="block space-y-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-[#F9FAFB]">Password</span>
                  <div className="flex min-h-[48px] items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 transition focus-within:border-[#03cd8c] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#03cd8c]/10 dark:border-white/10 dark:bg-[#0f172a] dark:focus-within:bg-[#111827]">
                    <Lock className="h-4 w-4 text-slate-400" />
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-[#F9FAFB] dark:placeholder:text-[#9CA3AF]"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="min-h-[40px] min-w-[40px] text-slate-500 transition hover:text-[#03cd8c]"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </label>

                <div className="flex flex-col items-start justify-between gap-2 text-sm text-slate-600 dark:text-[#9CA3AF] sm:flex-row sm:items-center sm:gap-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={keepSignedIn}
                      onChange={(event) => setKeepSignedIn(event.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-[#03cd8c] focus:ring-[#03cd8c]"
                    />
                    Keep me signed in
                  </label>
                  <button
                    type="button"
                    onClick={() => setMessage("Password recovery is coming soon in this mock flow.")}
                    className="font-semibold text-[#03cd8c] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                {message ? (
                  <div className="rounded-xl border border-[rgba(3,205,140,0.25)] bg-[#ecfff8] px-4 py-3 text-sm text-slate-700 dark:bg-[#03cd8c]/10 dark:text-[#F9FAFB]">
                    {message}
                  </div>
                ) : null}

                <Button
                  type="submit"
                  className="h-12 w-full rounded-xl bg-[#03cd8c] text-base font-semibold text-white transition hover:bg-[#02b87c] sm:h-12"
                  disabled={!canSubmit || isSubmitting}
                >
                  Sign in
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
