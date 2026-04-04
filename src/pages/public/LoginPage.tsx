import React, { useMemo, useState } from "react";
import {
  Apple,
  CheckCircle2,
  Eye,
  EyeOff,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/auth/AuthContext";
import { routes } from "@/constants/routes";
import { trackEvent } from "@/data/tracker";
import type { Role } from "@/types/roles";

const logoPortraitSrc = "/assets/branding/logo-portrait.png";

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

  const canSubmit = useMemo(() => email.trim().length > 3 && password.trim().length > 3, [
    email,
    password,
  ]);

  const redirectAfterLogin = (nextRole: Role) => {
    return "/home";
  };

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
      navigate(redirectAfterLogin(user.role));
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
      navigate(redirectAfterLogin(user.role));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(3,205,140,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.08),transparent_18%)] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-[1100px] gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col justify-center">
          <div className="max-w-xl space-y-6">
            <div className="inline-flex items-center gap-3 rounded-3xl border border-slate-200 bg-white/90 px-5 py-3 shadow-sm">
              <img src={logoPortraitSrc} alt="FaithHub" className="h-14 w-auto object-contain" />
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  FaithHub
                </div>
                <div className="text-lg font-semibold text-slate-900">Welcome back</div>
              </div>
            </div>

            <div>
              <h1 className="text-4xl font-semibold leading-tight text-slate-900">
                Sign in to access your FaithHub workspace
              </h1>
              <p className="mt-3 text-base text-slate-600">
                Choose your role, pick a login method, and jump straight into your dashboard experience.
              </p>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white/90 p-5 shadow-sm">
              <div className="text-sm font-semibold text-slate-900">Select a role</div>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {roleOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setRole(option.value)}
                    className={`rounded-2xl border px-4 py-3 text-left transition ${
                      role === option.value
                        ? "border-[rgba(3,205,140,0.4)] bg-[#ecfff8] text-slate-900"
                        : "border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
                    }`}
                    aria-pressed={role === option.value}
                  >
                    <div className="text-sm font-semibold">{option.label}</div>
                    <div className="mt-1 text-xs text-slate-500">{option.hint}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white/90 p-5 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <ShieldCheck className="h-4 w-4 text-[#03cd8c]" />
                Trusted sign-in
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Your session is stored securely on this device when “Keep me signed in” is enabled.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle2 className="h-4 w-4 text-[#03cd8c]" />
                Frontend-only mock authentication (no backend required).
              </div>
            </div>
          </div>
        </div>

        <Card className="fh-interactive-card rounded-[32px] border-slate-200 bg-white shadow-sm">
          <CardContent className="p-6 sm:p-8">
            <div className="space-y-4">
              {socialProviders.map((provider) => (
                <button
                  key={provider.id}
                  type="button"
                  onClick={() => handleSocialLogin(provider.id)}
                  className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-900 transition hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
                  aria-label={provider.label}
                  disabled={isSubmitting}
                >
                  <span>{provider.label}</span>
                  <span className="text-xs text-slate-500">{provider.description}</span>
                </button>
              ))}

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  or
                </div>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <form className="space-y-4" onSubmit={handleLogin}>
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-slate-700">Email address</span>
                  <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="w-full bg-transparent text-sm text-slate-700 outline-none"
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                    />
                  </div>
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-medium text-slate-700">Password</span>
                  <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="w-full bg-transparent text-sm text-slate-700 outline-none"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="text-slate-500 hover:text-[#03cd8c]"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </label>

                <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
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
                  <div className="rounded-2xl border border-[rgba(3,205,140,0.25)] bg-[#ecfff8] px-4 py-3 text-sm text-slate-700">
                    {message}
                  </div>
                ) : null}

                <Button
                  type="submit"
                  className="h-12 w-full rounded-2xl bg-[#03cd8c] text-base font-semibold hover:bg-[#02b87c]"
                  disabled={!canSubmit || isSubmitting}
                >
                  Sign in
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
