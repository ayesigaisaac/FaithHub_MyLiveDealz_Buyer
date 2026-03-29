import { createTheme } from "@mui/material/styles";
import { evZonePalette } from "@/theme/tokens";

export function evzoneTheme(mode: "light" | "dark") {
  const dark = mode === "dark";
  return createTheme({
    palette: {
      mode,
      primary: { main: evZonePalette.primary, contrastText: "#ffffff" },
      secondary: { main: evZonePalette.accent, contrastText: "#ffffff" },
      text: {
        primary: dark ? evZonePalette.textPrimaryDark : evZonePalette.textPrimaryLight,
        secondary: dark ? evZonePalette.textSecondaryDark : evZonePalette.textSecondaryLight,
      },
      background: {
        default: dark ? evZonePalette.bgPrimaryDark : evZonePalette.bgPrimaryLight,
        paper: dark ? evZonePalette.bgSurfaceDark : evZonePalette.bgSurfaceLight,
      },
      divider: dark ? evZonePalette.borderDark : evZonePalette.borderLight,
    },
    shape: { borderRadius: 16 },
    typography: {
      fontFamily:
        '"Inter", "Manrope", "Plus Jakarta Sans", "Segoe UI Variable", "Trebuchet MS", sans-serif',
      h1: { fontWeight: 700, letterSpacing: "-0.02em" },
      h2: { fontWeight: 700, letterSpacing: "-0.02em" },
      h3: { fontWeight: 700, letterSpacing: "-0.015em" },
      button: { fontWeight: 700, textTransform: "none", letterSpacing: "0.01em" },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: dark ? evZonePalette.bgPrimaryDark : evZonePalette.bgPrimaryLight,
          },
        },
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
