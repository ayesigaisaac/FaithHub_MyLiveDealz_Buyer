import { createTheme } from "@mui/material/styles";

export const evzoneTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#03cd8c", contrastText: "#ffffff" },
    secondary: { main: "#f77f00", contrastText: "#ffffff" },
    text: { primary: "#1e293b", secondary: "#64748b" },
    background: { default: "#f2f2f2", paper: "#ffffff" },
  },
  shape: { borderRadius: 20 },
  typography: {
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: { body: { backgroundColor: "#f2f2f2" } },
    },
  },
});
