import { createTheme } from "@mui/material/styles";

export function evzoneTheme(mode: "light" | "dark") {
  const dark = mode === "dark";
  return createTheme({
    palette: {
      mode,
      primary: { main: dark ? "#34d399" : "#03cd8c", contrastText: "#ffffff" },
      secondary: { main: "#f77f00", contrastText: "#ffffff" },
      text: { primary: dark ? "#e8eef8" : "#0f172a", secondary: dark ? "#9fb0c5" : "#5b6676" },
      background: { default: dark ? "#0d141f" : "#eff3f4", paper: dark ? "#162233" : "#ffffff" },
      divider: dark ? "#243244" : "#d9e1e8",
    },
    shape: { borderRadius: 16 },
    typography: {
      fontFamily:
        '"Manrope", "Plus Jakarta Sans", "Segoe UI Variable", "Trebuchet MS", sans-serif',
      h1: { fontWeight: 700, letterSpacing: "-0.02em" },
      h2: { fontWeight: 700, letterSpacing: "-0.02em" },
      h3: { fontWeight: 700, letterSpacing: "-0.015em" },
      button: { fontWeight: 700, textTransform: "none", letterSpacing: "0.01em" },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: { body: { backgroundColor: dark ? "#0d141f" : "#eff3f4" } },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
        },
      },
    },
  });
}
