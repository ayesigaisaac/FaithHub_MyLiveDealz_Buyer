import React, { Suspense, useMemo } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { evzoneTheme } from "@/theme/evzoneTheme";
import { useColorMode } from "@/theme/color-mode";
import { ScrollToTop } from "@/components/system/ScrollToTop";
import {
  defaultPageForRole,
  getRoutePatterns,
  pagesByRole,
  type RoleKey,
} from "@/config/pageRegistry";
import { routes } from "@/constants/routes";
import AppShellLayout from "@/components/layout/AppShellLayout";
import FaithHubLandingPageV2 from "@/pages/public/FaithHubLandingPageV2";
import FaithHubMultiRoleAppShell from "@/pages/public/FaithHubMultiRoleAppShell";
import FaithHubAccessGateway from "@/pages/public/FaithHubAccessGateway";

const roleBasePath: Record<RoleKey, string> = {
  user: routes.app.user.base,
  provider: routes.app.provider.base,
  admin: routes.app.admin.base,
};

const roleOrder: RoleKey[] = ["user", "provider", "admin"];

function getNestedRoutePath(path: string, role: RoleKey) {
  const basePath = roleBasePath[role];
  if (path === basePath) return "";
  return path.startsWith(`${basePath}/`) ? path.slice(basePath.length + 1) : path;
}

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
          <Route path={routes.public.landing} element={<FaithHubLandingPageV2 />} />
          <Route path={routes.public.access} element={<FaithHubAccessGateway />} />
          <Route path={routes.public.shellPreview} element={<FaithHubMultiRoleAppShell />} />
          <Route path="/super-admin/*" element={<Navigate to={`${routes.app.admin.overview}?admin=1`} replace />} />
          <Route path="/tenant-admin/*" element={<Navigate to={`${routes.app.admin.overview}?admin=1`} replace />} />
          <Route
            path="/ops/*"
            element={<Navigate to={`${routes.app.admin.liveModeration}?admin=1`} replace />}
          />
          <Route path={routes.aliases.user} element={<Navigate to={defaultPageForRole.user} replace />} />
          <Route
            path={routes.aliases.provider}
            element={<Navigate to={defaultPageForRole.provider} replace />}
          />
          <Route path={routes.aliases.admin} element={<Navigate to={defaultPageForRole.admin} replace />} />
          <Route path={routes.app.shell} element={<Navigate to={defaultPageForRole.user} replace />} />
          <Route path={routes.app.root} element={<Navigate to={defaultPageForRole.user} replace />} />
          {roleOrder.map((role) => (
            <Route key={role} path={roleBasePath[role]} element={<AppShellLayout />}>
              <Route index element={<Navigate to={defaultPageForRole[role]} replace />} />
              {(pagesByRole[role] || []).map((page) => {
                const Component = page.element;
                const paths = getRoutePatterns(page);
                return paths.map((path) => (
                  <Route
                    key={`${page.id}:${path}`}
                    path={getNestedRoutePath(path, role)}
                    element={
                      <Suspense fallback={<RouteFallback />}>
                        <Component />
                      </Suspense>
                    }
                  />
                ));
              })}
              <Route path="*" element={<Navigate to={defaultPageForRole[role]} replace />} />
            </Route>
          ))}
          <Route path="*" element={<Navigate to={routes.public.landing} replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
