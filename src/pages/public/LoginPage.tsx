import React, { useMemo, useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
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
}> = [
  { id: "google", label: "Continue with Google" },
  { id: "microsoft", label: "Continue with Microsoft" },
  { id: "apple", label: "Continue with Apple" },
  { id: "evzone", label: "Continue with EVzone" },
];

const roleOptions: Array<{ value: Role; label: string }> = [
  { value: "user", label: "User" },
  { value: "provider", label: "Provider" },
  { value: "admin", label: "Admin" },
];

function getSocialBadge(provider: SocialProvider) {
  if (provider === "google") return { mark: "G", tone: "bg-[#fff1ef] text-[#db4437]" };
  if (provider === "microsoft") return { mark: "M", tone: "bg-[#eff6ff] text-[#2563eb]" };
  if (provider === "apple") return { mark: "A", tone: "bg-[#f3f4f6] text-[#111827]" };
  return { mark: "EV", tone: "bg-[#e8fbff] text-[#03c8dc]" };
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
    <div className="min-h-screen bg-[#020617] px-4 py-6 text-[#F9FAFB] sm:px-6 sm:py-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-[1040px] items-center">
        <Card className="w-full overflow-hidden rounded-[24px] border border-white/10 bg-[#0b1220] shadow-[0_30px_80px_-42px_rgba(0,0,0,0.8)]">
          <div className="grid lg:grid-cols-2">
            <aside className="relative bg-gradient-to-br from-[#0f172a] to-[#022c22] p-6 sm:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(3,200,220,0.28),transparent_38%),radial-gradient(circle_at_84%_10%,rgba(247,127,0,0.23),transparent_30%)]" />
              <div className="relative z-10 space-y-8">
                <img src={logoLandscapeSrc} alt="FaithHub" className="h-9 w-auto object-contain" />
                <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
                  Welcome back to FaithHub
                </h1>
                <p className="text-sm leading-7 text-white/80">
                  Sign in quickly and continue your role-based workspace experience.
                </p>

                <div className="space-y-3.5">
                  {socialProviders.map((provider) => {
                    const badge = getSocialBadge(provider.id);
                    return (
                      <button
                        key={provider.id}
                        type="button"
                        onClick={() => handleSocialLogin(provider.id)}
                        disabled={isSubmitting}
                        className="flex min-h-[50px] w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-left transition-all duration-200 hover:bg-white/5 hover:shadow-[0_0_0_1px_rgba(3,200,220,0.22)] disabled:cursor-not-allowed disabled:opacity-70"
                        aria-label={provider.label}
                      >
                        <span
                          className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${badge.tone}`}
                        >
                          {badge.mark}
                        </span>
                        <span className="text-sm font-medium text-white">{provider.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>

            <main className="p-5 sm:p-8">
              <div className="mb-5 lg:hidden">
                <img src={logoPortraitSrc} alt="FaithHub" className="h-12 w-auto object-contain" />
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0f172a] p-6 shadow-xl sm:p-10">
                <div>
                  <h2 className="text-2xl font-semibold text-[#F9FAFB]">Login to your account</h2>
                  <p className="mt-2 text-sm text-[#9CA3AF]">
                    Use your email credentials and continue to your dashboard.
                  </p>
                </div>

                <section className="mt-8 rounded-xl border border-white/10 bg-[#020617] p-2">
                  <div className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9CA3AF]">
                    Role
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
                          className={`min-h-[44px] rounded-lg px-2 py-2 text-sm font-semibold transition-all duration-200 ${
                            active
                              ? "border border-[#03c8dc] bg-[#03c8dc]/10 text-[#03c8dc]"
                              : "border border-transparent text-[#9CA3AF] hover:bg-white/5 hover:text-[#F9FAFB]"
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </section>

                <form className="mt-8 space-y-8" onSubmit={handleLogin}>
                <label htmlFor="login-email" className="block space-y-2">
                  <span className="text-sm font-medium text-[#E5E7EB]">Email address</span>
                  <div className="flex min-h-[48px] items-center gap-2 rounded-xl border border-white/10 bg-[#020617] px-3 transition-all duration-200 focus-within:border-[#03c8dc] focus-within:ring-1 focus-within:ring-[#03c8dc]">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="w-full bg-transparent text-sm text-[#F9FAFB] outline-none placeholder:text-gray-400"
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                    />
                  </div>
                </label>

                <label htmlFor="login-password" className="block space-y-2">
                  <span className="text-sm font-medium text-[#E5E7EB]">Password</span>
                  <div className="flex min-h-[48px] items-center gap-2 rounded-xl border border-white/10 bg-[#020617] px-3 transition-all duration-200 focus-within:border-[#03c8dc] focus-within:ring-1 focus-within:ring-[#03c8dc]">
                    <Lock className="h-4 w-4 text-gray-400" />
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="w-full bg-transparent text-sm text-[#F9FAFB] outline-none placeholder:text-gray-400"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="min-h-[40px] min-w-[40px] text-gray-400 transition hover:text-[#03c8dc]"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </label>

                <div className="flex flex-col items-start justify-between gap-2 text-sm text-[#9CA3AF] sm:flex-row sm:items-center">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={keepSignedIn}
                      onChange={(event) => setKeepSignedIn(event.target.checked)}
                      className="h-4 w-4 rounded border-white/20 bg-[#020617] text-[#03c8dc] focus:ring-[#03c8dc]"
                    />
                    Keep me signed in
                  </label>
                  <button
                    type="button"
                    onClick={() => setMessage("Password recovery is coming soon in this mock flow.")}
                    className="font-semibold text-[#f77f00] transition hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                {message ? (
                  <div className="rounded-xl border border-[#03c8dc]/30 bg-[#03c8dc]/10 px-4 py-3 text-sm text-[#E5E7EB]">
                    {message}
                  </div>
                ) : null}

                <Button
                  type="submit"
                  className="h-12 w-full rounded-xl bg-[#03c8dc] py-3 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.01] hover:bg-[#02b4c6]"
                  disabled={!canSubmit || isSubmitting}
                >
                  Login with email
                </Button>
                </form>
              </div>

              <p className="mt-4 text-xs leading-5 text-[#9CA3AF]">
                Access is protected. Session data is stored locally for frontend authentication.
              </p>
            </main>
          </div>
        </Card>
      </div>
    </div>
  );
}
