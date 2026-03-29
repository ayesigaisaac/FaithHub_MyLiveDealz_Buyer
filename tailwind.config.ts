import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#16a34a",
        accent: "#f97316",
        dark: "#111827",
        light: "#f8fafc",
        "bg-primary": "#0B1220",
        "bg-sidebar": "#0F172A",
        "bg-surface": "#111827",
        "bg-elevated": "#1F2937",
        "text-primary": "#F9FAFB",
        "text-secondary": "#9CA3AF",
        "text-muted": "#6B7280",
        card: "#ffffff",
        evgreen: "#16a34a",
        evorange: "#f97316",
        evgray: "#a6a6a6",
        evlight: "#f2f2f2",
      },
      boxShadow: {
        soft: "0 24px 80px -30px rgba(15,23,42,0.25)",
      },
    },
  },
  plugins: [],
} satisfies Config;
