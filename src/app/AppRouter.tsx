import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { evzoneTheme } from "@/theme/evzoneTheme";
import { ScrollToTop } from "@/components/system/ScrollToTop";
import { pageRegistry } from "@/config/pageRegistry";
import AppShellLayout from "@/components/layout/AppShellLayout";
import FaithHubLandingPageV2 from "@/pages/public/FaithHubLandingPageV2";
import FaithHubMultiRoleAppShell from "@/pages/public/FaithHubMultiRoleAppShell";

function RouteFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="text-center">
        <div className="text-lg font-semibold text-slate-900">Loading FaithHub pageâ€¦</div>
        <div className="mt-2 text-sm text-slate-500">Preparing the selected route.</div>
      </div>
    </div>
  );
}

export default function AppRouter() {
  return (
    <ThemeProvider theme={evzoneTheme}>
      <CssBaseline />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<FaithHubLandingPageV2 />} />
          <Route path="/shell-preview" element={<FaithHubMultiRoleAppShell />} />
          <Route path="/app-shell" element={<Navigate to="/app/user/home" replace />} />
          <Route path="/app" element={<Navigate to="/app/user/home" replace />} />
          <Route path="/app/user" element={<AppShellLayout />}>
            {pageRegistry.filter((page) => page.role === 'user').map((page) => {
              const Component = page.element;
              return <Route key={page.id} path={page.path.replace('/app/user/', '')} element={<Suspense fallback={<RouteFallback />}><Component /></Suspense>} />;
            })}
          </Route>
          <Route path="/app/provider" element={<AppShellLayout />}>
            {pageRegistry.filter((page) => page.role === 'provider').map((page) => {
              const Component = page.element;
              return <Route key={page.id} path={page.path.replace('/app/provider/', '')} element={<Suspense fallback={<RouteFallback />}><Component /></Suspense>} />;
            })}
          </Route>
          <Route path="/app/admin" element={<AppShellLayout />}>
            {pageRegistry.filter((page) => page.role === 'admin').map((page) => {
              const Component = page.element;
              return <Route key={page.id} path={page.path.replace('/app/admin/', '')} element={<Suspense fallback={<RouteFallback />}><Component /></Suspense>} />;
            })}
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}


