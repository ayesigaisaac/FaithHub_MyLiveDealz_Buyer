import React, { useMemo, useState } from "react";
import { ArrowLeft, Lock, Mail, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { routes } from "@/constants/routes";
import { useAuth } from "@/auth/AuthContext";
import { useColorMode } from "@/theme/color-mode";
import type { Role } from "@/types/roles";
import { defaultPageForRole } from "@/config/pageRegistry";
import {
  isValidEmail,
  isValidPassword,
  validateConfirmPassword,
} from "@/features/auth/validation";
import { trackEvent } from "@/data/tracker";

const logoLandscapeSrc = "/assets/branding/logo-landscape.png";

const roleOptions: Array<{ value: Role; label: string }> = [
  { value: "user", label: "User" },
  { value: "provider", label: "Provider" },
  { value: "admin", label: "Admin" },
];

export default function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { mode } = useColorMode();
  const isDark = mode === "dark";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<Role>("user");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = useMemo(
    () => isValidEmail(email) && isValidPassword(password) && validateConfirmPassword(password, confirmPassword),
    [email, password, confirmPassword],
  );

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (!isValidPassword(password)) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (!validateConfirmPassword(password, confirmPassword)) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setIsSubmitting(true);
    try {
      const user = await login({ email, password, role });
      trackEvent("SIGNUP_SUCCESS", { role: user.role, email: user.email }, { role: user.role });
      navigate(defaultPageForRole[user.role]);
    } catch (exception) {
      const detail = exception instanceof Error ? exception.message : "Unable to create account.";
      setError(detail);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`min-h-screen px-4 py-6 sm:px-6 sm:py-8 ${
        isDark ? "bg-[#020617] text-[#F9FAFB]" : "bg-[#f3f6fb] text-[#0f172a]"
      }`}
    >
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-[760px] items-center justify-center">
        <Card
          className={`w-full rounded-2xl shadow-[0_24px_60px_-34px_rgba(0,0,0,0.45)] ${
            isDark ? "border border-white/10 bg-[#0b1220]" : "border border-slate-200 bg-white"
          }`}
        >
          <CardContent className="space-y-6 p-6 sm:p-8">
            <img src={logoLandscapeSrc} alt="FaithHub" className="h-9 w-auto object-contain" />
            <div>
              <h1 className="text-2xl font-semibold">Create your FaithHub account</h1>
              <p className={`mt-2 text-sm ${isDark ? "text-[#9CA3AF]" : "text-slate-600"}`}>
                Mock onboarding flow with role selection. No backend required.
              </p>
            </div>

            <form className="space-y-5" onSubmit={submit}>
              <label className="block space-y-2" htmlFor="signup-email">
                <span className={`text-sm font-medium ${isDark ? "text-[#E5E7EB]" : "text-slate-700"}`}>
                  Email address
                </span>
                <div
                  className={`flex min-h-[48px] items-center gap-2 rounded-xl border px-3 focus-within:border-[#03c8dc] focus-within:ring-1 focus-within:ring-[#03c8dc] ${
                    isDark ? "border-white/10 bg-[#020617]" : "border-slate-200 bg-white"
                  }`}
                >
                  <Mail className="h-4 w-4 text-gray-400" />
                  <input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className={`w-full bg-transparent text-sm outline-none placeholder:text-gray-400 ${
                      isDark ? "text-[#F9FAFB]" : "text-slate-900"
                    }`}
                    autoComplete="email"
                    required
                  />
                </div>
              </label>

              <div className="space-y-2">
                <span className={`text-sm font-medium ${isDark ? "text-[#E5E7EB]" : "text-slate-700"}`}>Role</span>
                <div
                  className={`grid grid-cols-3 gap-2 rounded-xl border p-2 ${
                    isDark ? "border-white/10 bg-[#020617]" : "border-slate-200 bg-white"
                  }`}
                >
                  {roleOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setRole(option.value)}
                      className={`min-h-[44px] rounded-lg text-sm font-semibold transition ${
                        role === option.value
                          ? "border border-[#03c8dc] bg-[#03c8dc]/10 text-[#03c8dc]"
                          : isDark
                            ? "text-[#9CA3AF] hover:bg-white/5 hover:text-[#F9FAFB]"
                            : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <label className="block space-y-2" htmlFor="signup-password">
                <span className={`text-sm font-medium ${isDark ? "text-[#E5E7EB]" : "text-slate-700"}`}>
                  Password
                </span>
                <div
                  className={`flex min-h-[48px] items-center gap-2 rounded-xl border px-3 focus-within:border-[#03c8dc] focus-within:ring-1 focus-within:ring-[#03c8dc] ${
                    isDark ? "border-white/10 bg-[#020617]" : "border-slate-200 bg-white"
                  }`}
                >
                  <Lock className="h-4 w-4 text-gray-400" />
                  <input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Minimum 6 characters"
                    className={`w-full bg-transparent text-sm outline-none placeholder:text-gray-400 ${
                      isDark ? "text-[#F9FAFB]" : "text-slate-900"
                    }`}
                    autoComplete="new-password"
                    required
                  />
                </div>
              </label>

              <label className="block space-y-2" htmlFor="signup-confirm-password">
                <span className={`text-sm font-medium ${isDark ? "text-[#E5E7EB]" : "text-slate-700"}`}>
                  Confirm password
                </span>
                <div
                  className={`flex min-h-[48px] items-center gap-2 rounded-xl border px-3 focus-within:border-[#03c8dc] focus-within:ring-1 focus-within:ring-[#03c8dc] ${
                    isDark ? "border-white/10 bg-[#020617]" : "border-slate-200 bg-white"
                  }`}
                >
                  <UserRound className="h-4 w-4 text-gray-400" />
                  <input
                    id="signup-confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Retype password"
                    className={`w-full bg-transparent text-sm outline-none placeholder:text-gray-400 ${
                      isDark ? "text-[#F9FAFB]" : "text-slate-900"
                    }`}
                    autoComplete="new-password"
                    required
                  />
                </div>
              </label>

              {error ? <p className="text-sm text-[#f77f00]">{error}</p> : null}

              <Button
                type="submit"
                className="h-12 w-full rounded-xl bg-[#03c8dc] text-white transition hover:bg-[#02b4c6]"
                disabled={!canSubmit || isSubmitting}
              >
                {isSubmitting ? "Creating account..." : "Create account"}
              </Button>
            </form>

            <button
              type="button"
              onClick={() => navigate(routes.public.login)}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#f77f00] transition hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to login
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
