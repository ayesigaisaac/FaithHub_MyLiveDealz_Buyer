import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        evgreen: "#03cd8c",
        evorange: "#f77f00",
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
