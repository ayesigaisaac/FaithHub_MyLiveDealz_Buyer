import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#03cd8c",
        accent: "#f77f00",
        dark: "#0B1220",
        light: "#f2f2f2",
        "bg-primary": "#0B1220",
        "bg-sidebar": "#111827",
        "bg-surface": "#111827",
        "bg-elevated": "#1F2937",
        "text-primary": "#F9FAFB",
        "text-secondary": "#9CA3AF",
        "text-muted": "#a6a6a6",
        card: "#ffffff",
        evgreen: "#03cd8c",
        evorange: "#f77f00",
        evgray: "#a6a6a6",
        evlight: "#f2f2f2",
        surface: "#111827",
      },
      boxShadow: {
        soft: "0 24px 80px -30px rgba(15,23,42,0.25)",
      },
    },
  },
  plugins: [],
} satisfies Config;
