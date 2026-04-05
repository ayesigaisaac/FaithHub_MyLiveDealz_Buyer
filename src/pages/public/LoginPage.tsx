import React, { useEffect, useMemo, useState } from "react";
import { Apple, Building2, Eye, EyeOff, Lock, Mail, Sparkles, UserCircle2 } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/auth/AuthContext";
import { routes } from "@/constants/routes";
import { AUTH_NOTICE_REASONS } from "@/constants/auth";
import { trackEvent } from "@/data/tracker";
import { useColorMode } from "@/theme/color-mode";
import type { Role } from "@/types/roles";
import { isRole } from "@/auth/roleRouting";
import { roleLoginHeadings } from "@/features/auth/roleMeta";
import { consumeAuthNotice } from "@/auth/noticeStorage";
import { isValidEmail, isValidPassword } from "@/features/auth/validation";
import { defaultPageForRole } from "@/config/pageRegistry";

const logoPortraitSrc = "/assets/branding/logo-portrait.png";

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

function providerIcon(provider: SocialProvider) {
  if (provider === "google") return <Sparkles className="h-4 w-4" />;
  if (provider === "microsoft") return <Building2 className="h-4 w-4" />;
  if (provider === "apple") return <Apple className="h-4 w-4" />;
  return <UserCircle2 className="h-4 w-4" />;
}

type LoginFieldErrors = {
  email?: string;
  password?: string;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { role: roleParam } = useParams<{ role?: string }>();
  const { login, mockLoginAsRole, role: currentRole, isAuthenticated } = useAuth();
  const { mode } = useColorMode();
  const isDark = mode === "dark";

  const [email, setEmail] = useState("ayesigai921@gmail.com");
  const [password, setPassword] = useState("password");
  const [role, setRole] = useState<Role>("user");
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
  const routeRole = isRole(roleParam) ? roleParam : null;
  const roleLocked = Boolean(routeRole);
  const activeRoleMeta = roleLoginHeadings[role];

  useEffect(() => {
    if (routeRole) {
      setRole(routeRole);
    }
  }, [routeRole]);

  useEffect(() => {
    if (!routeRole || !isAuthenticated || currentRole !== routeRole) return;
    navigate(defaultPageForRole[routeRole], { replace: true });
  }, [currentRole, isAuthenticated, navigate, routeRole]);

  useEffect(() => {
    const reasonFromState = (location.state as { reason?: string } | null)?.reason;
    const reasonFromSession = consumeAuthNotice();
    const reason = reasonFromState || reasonFromSession;
    if (!reason) return;

    if (reason === AUTH_NOTICE_REASONS.sessionExpired) setMessage("Your session expired. Please sign in again.");
    else if (reason === AUTH_NOTICE_REASONS.logout) setMessage("You have been signed out successfully.");
    else if (reason === AUTH_NOTICE_REASONS.roleLoginRequired && routeRole)
      setMessage(`Please sign in as ${routeRole} to continue.`);
    else if (reason === AUTH_NOTICE_REASONS.authRequired) setMessage("Please sign in to continue.");

    if (typeof window !== "undefined") {
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const canSubmit = useMemo(
    () => isValidEmail(email) && isValidPassword(password),
    [email, password],
  );

  const redirectAfterLogin = (nextRole: Role) => {
    if (nextRole === "admin") return routes.app.admin.overview;
    if (nextRole === "provider") return routes.app.provider.dashboard;
    return routes.app.user.home;
  };

  const validateFields = () => {
    const errors: LoginFieldErrors = {};
    if (!isValidEmail(email)) errors.email = "Enter a valid email address.";
    if (!isValidPassword(password)) errors.password = "Password must be at least 6 characters.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (event?: React.FormEvent) => {
    event?.preventDefault();
    if (!validateFields()) {
      setMessage("Please fix the highlighted fields.");
      return;
    }
    setIsSubmitting(true);
    setMessage("");
    try {
      const user = await login({ email, password, role });
      trackEvent(
        "LOGIN_SUCCESS",
        { method: "password", role: user.role, email: user.email },
        { role: user.role },
      );
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
      const user = await mockLoginAsRole(role, "social");
      trackEvent(
        "LOGIN_SUCCESS",
        { method: "social", role: user.role, email: user.email },
        { role: user.role },
      );
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
    <div
      className={`min-h-screen px-4 py-8 ${
        isDark
          ? "bg-[radial-gradient(circle_at_top,rgba(3,200,220,0.12),transparent_35%),#020617] text-[#F9FAFB]"
          : "bg-[radial-gradient(circle_at_top,rgba(3,200,220,0.12),transparent_35%),#f3f6fb] text-[#0f172a]"
      }`}
    >
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center justify-center">
        <Card
          className={`w-full rounded-2xl shadow-lg transition-all duration-300 ${
            isDark
              ? "border border-white/10 bg-[#0f172a]"
              : "border border-slate-200 bg-white"
          }`}
        >
          <CardContent className="space-y-5 p-6 sm:space-y-6 sm:p-8">
            <div className="space-y-3 text-center">
              <img src={logoPortraitSrc} alt="FaithHub" className="mx-auto h-12 w-auto object-contain" />
              <div>
                <div className="mb-2 inline-flex rounded-full border border-[#03c8dc]/35 bg-[#03c8dc]/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#03c8dc]">
                  {activeRoleMeta.chip}
                </div>
                <h1 className={`text-2xl font-semibold ${isDark ? "text-[#F9FAFB]" : "text-slate-900"}`}>{activeRoleMeta.title}</h1>
                <p className={`mt-2 text-sm ${isDark ? "text-[#9CA3AF]" : "text-slate-600"}`}>
                  {activeRoleMeta.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className={`h-px flex-1 ${isDark ? "bg-white/10" : "bg-slate-200"}`} />
              <span className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${isDark ? "text-[#9CA3AF]" : "text-slate-500"}`}>
                login with email
              </span>
              <div className={`h-px flex-1 ${isDark ? "bg-white/10" : "bg-slate-200"}`} />
            </div>

            <section
              className={`rounded-xl p-2 ${
                isDark ? "border border-white/10 bg-[#020617]" : "border border-slate-200 bg-slate-50"
              }`}
            >
              <div className={`mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.14em] ${isDark ? "text-[#9CA3AF]" : "text-slate-500"}`}>
                Role
              </div>
              <div className="grid grid-cols-3 gap-2">
                {roleOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    disabled={roleLocked}
                    onClick={() => setRole(option.value)}
                    className={`min-h-[42px] rounded-lg text-sm font-semibold transition-all duration-200 ${
                      role === option.value
                        ? "border border-[#03c8dc] bg-[#03c8dc]/10 text-[#03c8dc]"
                        : isDark
                          ? "text-[#9CA3AF] hover:bg-white/5 hover:text-[#F9FAFB]"
                          : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                    } ${roleLocked ? "cursor-not-allowed opacity-70" : ""}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </section>

            <form className="space-y-4" onSubmit={handleLogin}>
              <label className="block space-y-2" htmlFor="login-email">
                <span className={`text-sm font-medium ${isDark ? "text-[#E5E7EB]" : "text-slate-700"}`}>
                  Email address
                </span>
                <div
                  className={`flex min-h-[48px] items-center gap-2 rounded-xl border px-3 transition-all duration-200 focus-within:ring-2 ${
                    fieldErrors.email
                      ? "border-[#f77f00]/70 focus-within:ring-[#f77f00]/20"
                      : isDark
                        ? "border-white/10 bg-[#020617] focus-within:border-[#03c8dc] focus-within:ring-[#03c8dc]/20"
                        : "border-slate-200 bg-white focus-within:border-[#03c8dc] focus-within:ring-[#03c8dc]/20"
                  }`}
                >
                  <Mail className="h-4 w-4 text-gray-400" />
                  <input
                    id="login-email"
                    type="email"
                    value={email}
                    onBlur={validateFields}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className={`w-full bg-transparent text-sm outline-none placeholder:text-gray-400 ${
                      isDark ? "text-[#F9FAFB]" : "text-slate-900"
                    }`}
                    required
                  />
                </div>
                {fieldErrors.email ? <p className="text-xs text-[#f77f00]">{fieldErrors.email}</p> : null}
              </label>

              <label className="block space-y-2" htmlFor="login-password">
                <span className={`text-sm font-medium ${isDark ? "text-[#E5E7EB]" : "text-slate-700"}`}>
                  Password
                </span>
                <div
                  className={`flex min-h-[48px] items-center gap-2 rounded-xl border px-3 transition-all duration-200 focus-within:ring-2 ${
                    fieldErrors.password
                      ? "border-[#f77f00]/70 focus-within:ring-[#f77f00]/20"
                      : isDark
                        ? "border-white/10 bg-[#020617] focus-within:border-[#03c8dc] focus-within:ring-[#03c8dc]/20"
                        : "border-slate-200 bg-white focus-within:border-[#03c8dc] focus-within:ring-[#03c8dc]/20"
                  }`}
                >
                  <Lock className="h-4 w-4 text-gray-400" />
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onBlur={validateFields}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    className={`w-full bg-transparent text-sm outline-none placeholder:text-gray-400 ${
                      isDark ? "text-[#F9FAFB]" : "text-slate-900"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                    className="min-h-[40px] min-w-[40px] text-gray-400 transition hover:text-[#03c8dc]"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {fieldErrors.password ? (
                  <p className="text-xs text-[#f77f00]">{fieldErrors.password}</p>
                ) : null}
              </label>

              <div className={`flex items-center justify-between text-sm ${isDark ? "text-[#9CA3AF]" : "text-slate-600"}`}>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={keepSignedIn}
                    onChange={(event) => setKeepSignedIn(event.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-[#03c8dc] focus:ring-[#03c8dc]"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  onClick={() => navigate(routes.public.forgotPassword)}
                  className="font-semibold text-[#f77f00] transition hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {message ? (
                <div className={`rounded-xl border border-[#03c8dc]/35 px-4 py-3 text-sm ${isDark ? "bg-[#03c8dc]/10 text-[#E5E7EB]" : "bg-[#e8fbff] text-slate-700"}`}>
                  {message}
                </div>
              ) : null}

              <Button
                type="submit"
                className="h-12 w-full rounded-xl bg-[#03c8dc] text-base font-semibold text-white shadow-[0_10px_24px_-12px_rgba(3,200,220,0.75)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#02b4c6]"
                disabled={!canSubmit || isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Login with email"}
              </Button>
            </form>

            <div className="flex items-center gap-3">
              <div className={`h-px flex-1 ${isDark ? "bg-white/10" : "bg-slate-200"}`} />
              <span className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${isDark ? "text-[#9CA3AF]" : "text-slate-500"}`}>
                or continue with
              </span>
              <div className={`h-px flex-1 ${isDark ? "bg-white/10" : "bg-slate-200"}`} />
            </div>

            <div className="space-y-2.5">
              {socialProviders.map((provider) => (
                <button
                  key={provider.id}
                  type="button"
                  onClick={() => handleSocialLogin(provider.id)}
                  disabled={isSubmitting}
                  className={`group flex min-h-[48px] w-full items-center gap-3 rounded-xl border px-4 text-left transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-70 ${
                    isDark
                      ? "border-white/10 bg-[#020617] hover:border-[#03c8dc]/40 hover:bg-white/5"
                      : "border-slate-200 bg-white hover:border-[#03c8dc]/35 hover:bg-slate-50"
                  }`}
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#03c8dc]/12 text-[#03c8dc] transition group-hover:bg-[#03c8dc]/20">
                    {providerIcon(provider.id)}
                  </span>
                  <span className={`text-sm font-medium ${isDark ? "text-[#F9FAFB]" : "text-slate-900"}`}>
                    {provider.label}
                  </span>
                </button>
              ))}
            </div>

            <p className={`text-center text-xs ${isDark ? "text-[#9CA3AF]" : "text-slate-500"}`}>
              New here?{" "}
              <button
                type="button"
                onClick={() => navigate(routes.public.signup)}
                className="font-semibold text-[#03c8dc] transition hover:underline"
              >
                Create an account
              </button>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
