import React, { useState } from "react";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { routes } from "@/constants/routes";

const logoLandscapeSrc = "/assets/branding/logo-landscape.png";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const candidate = email.trim();
    if (!isValidEmail(candidate)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#020617] px-4 py-6 text-[#F9FAFB] sm:px-6 sm:py-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-[720px] items-center justify-center">
        <Card className="w-full rounded-2xl border border-white/10 bg-[#0b1220] shadow-[0_24px_60px_-34px_rgba(0,0,0,0.75)]">
          <CardContent className="space-y-6 p-6 sm:p-8">
            <img src={logoLandscapeSrc} alt="FaithHub" className="h-9 w-auto object-contain" />
            <div>
              <h1 className="text-2xl font-semibold">Reset your password</h1>
              <p className="mt-2 text-sm text-[#9CA3AF]">
                Enter your email and we will send reset instructions. This is a frontend mock flow.
              </p>
            </div>

            {sent ? (
              <div className="rounded-xl border border-[#03c8dc]/35 bg-[#03c8dc]/10 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#8be8f3]">
                  <ShieldCheck className="h-4 w-4" />
                  Reset instructions sent
                </div>
                <p className="mt-1 text-sm text-[#cdeef2]">
                  We sent instructions to <span className="font-medium">{email}</span>.
                </p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={submit}>
                <label htmlFor="forgot-email" className="block space-y-2">
                  <span className="text-sm font-medium text-[#E5E7EB]">Email address</span>
                  <div className="flex min-h-[48px] items-center gap-2 rounded-xl border border-white/10 bg-[#020617] px-3 focus-within:border-[#03c8dc] focus-within:ring-1 focus-within:ring-[#03c8dc]">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <input
                      id="forgot-email"
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
                {error ? <p className="text-sm text-[#f77f00]">{error}</p> : null}
                <Button
                  type="submit"
                  className="h-12 w-full rounded-xl bg-[#03c8dc] text-white transition hover:bg-[#02b4c6]"
                >
                  Send reset instructions
                </Button>
              </form>
            )}

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

