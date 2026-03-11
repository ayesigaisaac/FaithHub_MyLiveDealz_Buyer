import React, { Suspense, useMemo } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { evzoneTheme } from "@/theme/evzoneTheme";
import { useColorMode } from "@/theme/color-mode";
import { ScrollToTop } from "@/components/system/ScrollToTop";
import { defaultPageForRole, pageRegistry } from "@/config/pageRegistry";
import AppShellLayout from "@/components/layout/AppShellLayout";
import FaithHubLandingPageV2 from "@/pages/public/FaithHubLandingPageV2";
import FaithHubMultiRoleAppShell from "@/pages/public/FaithHubMultiRoleAppShell";

function RouteFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
      <div className="text-center">
        <div className="text-lg font-semibold text-slate-900">Loading FaithHub page</div>
        <div className="mt-2 text-sm text-slate-500">Preparing the selected route.</div>
      </div>
    </div>
  );
}

export default function AppRouter() {
  const { mode } = useColorMode();
  const muiTheme = useMemo(() => evzoneTheme(mode), [mode]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<FaithHubLandingPageV2 />} />
          <Route path="/shell-preview" element={<FaithHubMultiRoleAppShell />} />
          <Route path="/app-shell" element={<Navigate to={defaultPageForRole.user} replace />} />
          <Route path="/app" element={<Navigate to={defaultPageForRole.user} replace />} />
          <Route path="/app/user" element={<AppShellLayout />}>
            <Route index element={<Navigate to={defaultPageForRole.user} replace />} />
            {pageRegistry.filter((page) => page.role === "user").map((page) => {
              const Component = page.element;
              return (
                <Route
                  key={page.id}
                  path={page.path.replace("/app/user/", "")}
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <Component />
                    </Suspense>
                  }
                />
              );
            })}
            <Route path="*" element={<Navigate to={defaultPageForRole.user} replace />} />
          </Route>
          <Route path="/app/provider" element={<AppShellLayout />}>
            <Route index element={<Navigate to={defaultPageForRole.provider} replace />} />
            {pageRegistry.filter((page) => page.role === "provider").map((page) => {
              const Component = page.element;
              return (
                <Route
                  key={page.id}
                  path={page.path.replace("/app/provider/", "")}
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <Component />
                    </Suspense>
                  }
                />
              );
            })}
            <Route path="*" element={<Navigate to={defaultPageForRole.provider} replace />} />
          </Route>
          <Route path="/app/admin" element={<AppShellLayout />}>
            <Route index element={<Navigate to={defaultPageForRole.admin} replace />} />
            {pageRegistry.filter((page) => page.role === "admin").map((page) => {
              const Component = page.element;
              return (
                <Route
                  key={page.id}
                  path={page.path.replace("/app/admin/", "")}
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <Component />
                    </Suspense>
                  }
                />
              );
            })}
            <Route path="*" element={<Navigate to={defaultPageForRole.admin} replace />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
