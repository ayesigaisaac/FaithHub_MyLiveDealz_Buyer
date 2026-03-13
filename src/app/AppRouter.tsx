import React, { Suspense, useMemo } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { evzoneTheme } from "@/theme/evzoneTheme";
import { useColorMode } from "@/theme/color-mode";
import { ScrollToTop } from "@/components/system/ScrollToTop";
import RoleGuard from "@/components/system/guards/RoleGuard";
import TenantScopeGuard from "@/components/system/guards/TenantScopeGuard";
import { defaultPageForRole, pagesByRole, type RoleKey } from "@/config/pageRegistry";
import AppShellLayout from "@/components/layout/AppShellLayout";
import SuperAdminLayout from "@/layouts/SuperAdminLayout";
import TenantAdminLayout from "@/layouts/TenantAdminLayout";
import OpsLayout from "@/layouts/OpsLayout";
import EnterpriseModulePlaceholder from "@/pages/enterprise/EnterpriseModulePlaceholder";
import FaithHubLandingPageV2 from "@/pages/public/FaithHubLandingPageV2";
import FaithHubMultiRoleAppShell from "@/pages/public/FaithHubMultiRoleAppShell";
import FaithHubAccessGateway from "@/pages/public/FaithHubAccessGateway";
import OpsOverview from "@/pages/ops/OpsOverview";
import SuperAdminOverview from "@/pages/super-admin/SuperAdminOverview";
import TenantAdminOverview from "@/pages/tenant-admin/TenantAdminOverview";

const roleBasePath: Record<RoleKey, string> = {
  user: "/app/user",
  provider: "/app/provider",
  admin: "/app/admin",
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
          <Route path="/" element={<FaithHubLandingPageV2 />} />
          <Route path="/access" element={<FaithHubAccessGateway />} />
          <Route path="/shell-preview" element={<FaithHubMultiRoleAppShell />} />
          <Route
            path="/super-admin"
            element={
              <RoleGuard allowedRoles={["super_admin"]}>
                <SuperAdminLayout />
              </RoleGuard>
            }
          >
            <Route index element={<Navigate to="/super-admin/overview" replace />} />
            <Route path="overview" element={<SuperAdminOverview />} />
            <Route path=":module" element={<EnterpriseModulePlaceholder role="super_admin" />} />
            <Route path="*" element={<Navigate to="/super-admin/overview" replace />} />
          </Route>
          <Route
            path="/tenant-admin"
            element={
              <RoleGuard allowedRoles={["tenant_admin"]}>
                <TenantScopeGuard>
                  <TenantAdminLayout />
                </TenantScopeGuard>
              </RoleGuard>
            }
          >
            <Route index element={<Navigate to="/tenant-admin/overview" replace />} />
            <Route path="overview" element={<TenantAdminOverview />} />
            <Route path=":module" element={<EnterpriseModulePlaceholder role="tenant_admin" />} />
            <Route path="*" element={<Navigate to="/tenant-admin/overview" replace />} />
          </Route>
          <Route
            path="/ops"
            element={
              <RoleGuard allowedRoles={["ops", "moderator"]}>
                <TenantScopeGuard>
                  <OpsLayout />
                </TenantScopeGuard>
              </RoleGuard>
            }
          >
            <Route index element={<Navigate to="/ops/incidents" replace />} />
            <Route path="incidents" element={<OpsOverview />} />
            <Route path=":module" element={<EnterpriseModulePlaceholder role="ops" />} />
            <Route path="*" element={<Navigate to="/ops/incidents" replace />} />
          </Route>
          <Route path="/user" element={<Navigate to={defaultPageForRole.user} replace />} />
          <Route path="/provider" element={<Navigate to={defaultPageForRole.provider} replace />} />
          <Route path="/admin" element={<Navigate to={defaultPageForRole.admin} replace />} />
          <Route path="/app-shell" element={<Navigate to={defaultPageForRole.user} replace />} />
          <Route path="/app" element={<Navigate to={defaultPageForRole.user} replace />} />
          {roleOrder.map((role) => (
            <Route key={role} path={roleBasePath[role]} element={<AppShellLayout />}>
              <Route index element={<Navigate to={defaultPageForRole[role]} replace />} />
              {(pagesByRole[role] || []).map((page) => {
                const Component = page.element;
                return (
                  <Route
                    key={page.id}
                    path={getNestedRoutePath(page.path, role)}
                    element={
                      <Suspense fallback={<RouteFallback />}>
                        <Component />
                      </Suspense>
                    }
                  />
                );
              })}
              <Route path="*" element={<Navigate to={defaultPageForRole[role]} replace />} />
            </Route>
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
