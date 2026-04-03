import React, { Suspense, useMemo } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useAuth } from "@/auth/AuthContext";
import { evzoneTheme } from "@/theme/evzoneTheme";
import { useColorMode } from "@/theme/color-mode";
import { ScrollToTop } from "@/components/system/ScrollToTop";
import { Button } from "@/components/ui/button";
import {
  defaultPageForRole,
  getRoutePatterns,
  pagesByRole,
  type RoleKey,
} from "@/config/pageRegistry";
import { routes } from "@/constants/routes";
import { routeShortcuts } from "@/constants/routeShortcuts";
import Layout from "@/components/layout/Layout";
import LoginPage from "@/pages/public/LoginPage";
import ProtectedRoute from "@/routes/ProtectedRoute";

const roleBasePath: Record<RoleKey, string> = {
  user: routes.app.user.base,
  provider: routes.app.provider.base,
  admin: routes.app.admin.base,
};

const counselingRouteByRole: Record<RoleKey, string> = {
  user: routes.app.user.counseling,
  provider: routes.app.provider.counseling,
  admin: routes.app.admin.counseling,
};

const resourcesRouteByRole: Record<RoleKey, string> = {
  user: routes.app.user.resources,
  provider: routes.app.provider.resources,
  admin: routes.app.admin.overview,
};

const communityRouteByRole: Record<RoleKey, string> = {
  user: routes.app.user.community,
  provider: routes.app.provider.community,
  admin: routes.app.admin.overview,
};

const walletRouteByRole: Record<RoleKey, string> = {
  user: routes.app.user.wallet,
  provider: routes.app.provider.wallet,
  admin: routes.app.admin.finance,
};

const noticeboardRouteByRole: Record<RoleKey, string> = {
  user: routes.app.user.noticeboard,
  provider: routes.app.provider.noticeboard,
  admin: routes.app.admin.noticeboard,
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

function RoleRouteNotFound({ role }: { role: RoleKey }) {
  const navigate = useNavigate();
  const location = useLocation();
  const roleLabel = role === "admin" ? "Admin" : role === "provider" ? "Provider" : "User";

  return (
    <div className="fh-surface-card flex min-h-[40vh] items-center justify-center rounded-[28px] p-8">
      <div className="max-w-md text-center">
        <div className="text-xl font-semibold text-[var(--text-primary)]">Page not found</div>
        <div className="mt-2 text-sm text-[var(--text-secondary)]">
          No route was found for <span className="font-semibold">{location.pathname}</span>.
        </div>
        <div className="mt-5">
          <Button onClick={() => navigate(defaultPageForRole[role])}>
            Go to {roleLabel} dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}

function LegacyRoleRedirect({ role }: { role: RoleKey }) {
  const location = useLocation();
  const prefix = `/${role}`;
  const suffix = location.pathname.startsWith(prefix) ? location.pathname.slice(prefix.length) : "";
  return <Navigate to={`/app/${role}${suffix}${location.search}${location.hash}`} replace />;
}

function FundAliasRedirect() {
  const { role } = useAuth();
  const { slug = "" } = useParams<{ slug: string }>();
  const targetPath =
    role === "provider"
      ? routes.app.provider.fundDetailBySlug(slug)
      : role === "admin"
      ? routes.app.admin.finance
      : routes.app.user.fundDetailBySlug(slug);
  return <Navigate to={targetPath} replace />;
}

export default function AppRouter() {
  const { mode } = useColorMode();
  const { role } = useAuth();
  const muiTheme = useMemo(() => evzoneTheme(mode), [mode]);
  const roleHomePath = defaultPageForRole[role];

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path={routes.public.landing} element={<Navigate to={roleHomePath} replace />} />
            <Route path={routes.public.access} element={<LoginPage />} />
            <Route path={routes.public.shellPreview} element={<Navigate to={roleHomePath} replace />} />
            <Route path="/enterprise/*" element={<Navigate to={`${routes.app.admin.overview}?admin=1`} replace />} />
            <Route path="/super-admin/*" element={<Navigate to={`${routes.app.admin.overview}?admin=1`} replace />} />
            <Route path="/tenant-admin/*" element={<Navigate to={`${routes.app.admin.overview}?admin=1`} replace />} />
            <Route
              path="/ops/*"
              element={<Navigate to={`${routes.app.admin.liveModeration}?admin=1`} replace />}
            />
            <Route path="/resources" element={<Navigate to={resourcesRouteByRole[role]} replace />} />
            <Route path="/community" element={<Navigate to={communityRouteByRole[role]} replace />} />
            <Route path="/counseling" element={<Navigate to={counselingRouteByRole[role]} replace />} />
            <Route path="/wallet" element={<Navigate to={walletRouteByRole[role]} replace />} />
            <Route path="/noticeboard" element={<Navigate to={noticeboardRouteByRole[role]} replace />} />
            <Route path="/fund/:slug" element={<FundAliasRedirect />} />
            {Object.entries(routeShortcuts).map(([legacyPath, targetPath]) => (
              <Route
                key={`shortcut:${legacyPath}`}
                path={legacyPath}
                element={<Navigate to={targetPath} replace />}
              />
            ))}
            <Route path={`${routes.aliases.user}/*`} element={<LegacyRoleRedirect role="user" />} />
            <Route path={`${routes.aliases.provider}/*`} element={<LegacyRoleRedirect role="provider" />} />
            <Route path={`${routes.aliases.admin}/*`} element={<LegacyRoleRedirect role="admin" />} />
            <Route path={routes.app.shell} element={<Navigate to={roleHomePath} replace />} />
            <Route path={routes.app.root} element={<Navigate to={roleHomePath} replace />} />
            {roleOrder.map((role) => (
              <Route key={role} path={roleBasePath[role]} element={<ProtectedRoute roles={[role]} />}>
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
                <Route path="*" element={<RoleRouteNotFound role={role} />} />
              </Route>
            ))}
            <Route path="*" element={<RoleRouteNotFound role={role} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
