import { createTheme } from "@mui/material/styles";

export function evzoneTheme(mode: "light" | "dark") {
  const dark = mode === "dark";
  return createTheme({
    palette: {
      mode,
      primary: { main: dark ? "#34d399" : "#03cd8c", contrastText: "#ffffff" },
      secondary: { main: "#f77f00", contrastText: "#ffffff" },
      text: { primary: dark ? "#e5e7eb" : "#1e293b", secondary: dark ? "#9ca3af" : "#64748b" },
      background: { default: dark ? "#0b0f19" : "#f2f2f2", paper: dark ? "#161b26" : "#ffffff" },
      divider: dark ? "#1f2937" : "#e2e8f0",
    },
    shape: { borderRadius: 20 },
    typography: {
      fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: { body: { backgroundColor: dark ? "#0b0f19" : "#f2f2f2" } },
      },
    },
  });
}
