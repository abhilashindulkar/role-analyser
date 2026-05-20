import { useCallback, useRef } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useSearchParams,
  useLocation,
  useParams,
  Link,
} from "react-router-dom";
import {
  Shield,
  Key,
  Sparkles,
  LayoutGrid,
  Github,
  Search,
  ArrowRight,
  ArrowLeftRight,
  Layers,
  Lock,
  Zap,
  Moon,
  Sun,
  Clock,
  Trash2,
  Boxes,
  Cloud,
} from "lucide-react";
import { SearchBar } from "./components/SearchBar";
import { FilterPanel } from "./components/FilterPanel";
import { RoleCard } from "./components/RoleCard";
import { RoleDetail } from "./components/RoleDetail";
import { RoleComparison } from "./components/RoleComparison";
import { ComparisonView } from "./components/ComparisonView";
import { AiChat } from "./components/AiChat";
import { PermissionLookup } from "./components/PermissionLookup";
import { ServiceDetail } from "./components/ServiceDetail";
import { PermissionChart } from "./components/PermissionChart";
import { ApiBrowser } from "./components/ApiBrowser";
import { ApiDetail } from "./components/ApiDetail";
import { APIS_DATA } from "./data/apis";
import { useRoleData } from "./hooks/useRoleData";
import { useDarkMode } from "./hooks/useDarkMode";
import { useRoleHistory } from "./hooks/useRoleHistory";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { GcpApi, GcpRole } from "./types";

function VirtualRoleGrid({
  roles,
  onRoleClick,
  onCompare,
  compareRoles,
}: {
  roles: GcpRole[];
  onRoleClick: (role: GcpRole) => void;
  onCompare: (role: GcpRole) => void;
  compareRoles: GcpRole[];
}) {
  const parentRef = useRef<HTMLDivElement>(null);
  const cols = 2;
  const rowCount = Math.ceil(roles.length / cols);

  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 180,
    overscan: 5,
  });

  return (
    <div ref={parentRef} className="h-[calc(100vh-280px)] overflow-auto">
      <div
        className="relative w-full"
        style={{ height: `${virtualizer.getTotalSize()}px` }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const startIdx = virtualRow.index * cols;
          const rowRoles = roles.slice(startIdx, startIdx + cols);

          return (
            <div
              key={virtualRow.key}
              className="absolute top-0 left-0 w-full grid gap-3 sm:grid-cols-2 px-0.5"
              style={{
                transform: `translateY(${virtualRow.start}px)`,
                height: `${virtualRow.size}px`,
              }}
            >
              {rowRoles.map((role) => (
                <RoleCard
                  key={role.name}
                  role={role}
                  onClick={onRoleClick}
                  onCompare={onCompare}
                  isComparing={compareRoles.some(
                    (r) => r.name === role.name
                  )}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BrowsePage({
  data,
  compareRoles,
  onCompareToggle,
  onRoleClick,
  searchRef,
}: {
  data: ReturnType<typeof useRoleData>;
  compareRoles: GcpRole[];
  onCompareToggle: (role: GcpRole) => void;
  onRoleClick: (role: GcpRole) => void;
  searchRef: React.RefObject<HTMLInputElement | null>;
}) {
  const navigate = useNavigate();
  const {
    roles,
    filteredRoles,
    filters,
    services,
    allPermissions,
    updateQuery,
    toggleService,
    toggleStage,
    setCategory,
    clearFilters,
  } = data;

  return (
    <div className="flex gap-6" id="search-section">
      <aside className="w-72 shrink-0 hidden lg:block space-y-5">
        <FilterPanel
          services={services}
          filters={filters}
          onToggleService={toggleService}
          onToggleStage={toggleStage}
          onSetCategory={setCategory}
          onClear={clearFilters}
          onServiceClick={(svc) => navigate(`/service/${encodeURIComponent(svc)}`)}
        />

        {compareRoles.length > 0 && (
          <RoleComparison
            roles={compareRoles}
            onRemove={(role) =>
              onCompareToggle(role)
            }
            onClear={() =>
              compareRoles.forEach((r) => onCompareToggle(r))
            }
            onViewFull={() => {
              const params = new URLSearchParams();
              if (compareRoles[0]) params.set("a", compareRoles[0].name);
              if (compareRoles[1]) params.set("b", compareRoles[1].name);
              navigate(`/compare?${params.toString()}`);
            }}
          />
        )}

        <PermissionChart roles={roles} />

        <div className="bg-surface-raised dark:bg-dark-raised rounded-2xl border border-slate-200/80 dark:border-dark-border shadow-sm p-5">
          <h3 className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
            Coverage
          </h3>
          <div className="space-y-3">
            {[
              { label: "Roles", value: roles.length, color: "text-brand-600 dark:text-brand-400", bg: "bg-brand-50 dark:bg-brand-950/30" },
              { label: "Permissions", value: allPermissions.length, color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-950/30" },
              { label: "Services", value: services.length, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
            ].map((stat) => (
              <div key={stat.label} className={`flex items-center justify-between ${stat.bg} rounded-xl px-4 py-2.5`}>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{stat.label}</span>
                <span className={`text-lg font-bold ${stat.color}`}>{stat.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <SearchBar
          ref={searchRef}
          query={filters.query}
          onChange={updateQuery}
          resultCount={filteredRoles.length}
          totalCount={roles.length}
        />

        <div className="lg:hidden mt-4">
          <FilterPanel
            services={services}
            filters={filters}
            onToggleService={toggleService}
            onToggleStage={toggleStage}
            onSetCategory={setCategory}
            onClear={clearFilters}
          />
        </div>

        {filteredRoles.length > 40 ? (
          <div className="mt-5">
            <VirtualRoleGrid
              roles={filteredRoles}
              onRoleClick={onRoleClick}
              onCompare={onCompareToggle}
              compareRoles={compareRoles}
            />
          </div>
        ) : (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {filteredRoles.map((role, i) => (
              <div
                key={role.name}
                className="animate-fade-up"
                style={{ animationDelay: `${Math.min(i * 30, 300)}ms` }}
              >
                <RoleCard
                  role={role}
                  onClick={onRoleClick}
                  onCompare={onCompareToggle}
                  isComparing={compareRoles.some((r) => r.name === role.name)}
                />
              </div>
            ))}
          </div>
        )}

        {filteredRoles.length === 0 && (
          <div className="mt-16 text-center animate-fade-up">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 dark:bg-dark-raised mb-4">
              <Search className="h-7 w-7 text-slate-300 dark:text-slate-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-300">No roles match your search</h3>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1 max-w-sm mx-auto">Try different keywords or clear filters</p>
            <button onClick={clearFilters} className="mt-5 text-sm text-brand-600 hover:text-brand-700 dark:text-brand-400 font-semibold px-4 py-2 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-950/30 transition-colors">
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const data = useRoleData();
  const { dark, toggle: toggleDark } = useDarkMode();
  const { history, recordVisit, clearHistory } = useRoleHistory();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchRef = useRef<HTMLInputElement>(null);

  const { roles, services, allPermissions, loading } = data;
  const loc = useLocation();

  const compareRolesFromParams = useCallback((): GcpRole[] => {
    const a = searchParams.get("a");
    const b = searchParams.get("b");
    const result: GcpRole[] = [];
    if (a) {
      const role = roles.find((r) => r.name === a);
      if (role) result.push(role);
    }
    if (b) {
      const role = roles.find((r) => r.name === b);
      if (role) result.push(role);
    }
    return result;
  }, [searchParams, roles]);

  const compareRolesState = compareRolesFromParams();

  const handleRoleClick = useCallback(
    (role: GcpRole) => {
      recordVisit(role);
      navigate(`/role/${encodeURIComponent(role.name)}`);
    },
    [navigate, recordVisit]
  );

  const handleCompareToggle = useCallback(
    (role: GcpRole) => {
      const current = compareRolesState;
      let next: GcpRole[];
      if (current.some((r) => r.name === role.name)) {
        next = current.filter((r) => r.name !== role.name);
      } else if (current.length >= 2) {
        next = [current[1], role];
      } else {
        next = [...current, role];
      }
      const params = new URLSearchParams(searchParams);
      params.delete("a");
      params.delete("b");
      if (next[0]) params.set("a", next[0].name);
      if (next[1]) params.set("b", next[1].name);
      navigate(`?${params.toString()}`, { replace: true });
    },
    [compareRolesState, navigate, searchParams]
  );

  useKeyboardShortcuts({
    onSearch: () => {
      navigate("/");
      setTimeout(() => searchRef.current?.focus(), 100);
    },
    onEscape: () => navigate(-1),
  });

  const navItems = [
    { to: "/", label: "Explore", icon: LayoutGrid },
    { to: "/compare", label: "Compare", icon: ArrowLeftRight },
    { to: "/permissions", label: "Permissions", icon: Key },
    { to: "/apis", label: "APIs", icon: Boxes },
    { to: "/advisor", label: "Advisor", icon: Sparkles },
  ];

  const handleApiClick = useCallback(
    (api: GcpApi) => {
      navigate(`/api/${encodeURIComponent(api.name)}`);
    },
    [navigate]
  );

  const isHome = loc.pathname === "/" || loc.pathname === "";

  return (
    <div className="min-h-screen bg-surface dark:bg-dark-surface transition-colors">
      {/* Header */}
      <header className="bg-brand-950 sticky top-0 z-50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="bg-gradient-to-br from-brand-400 to-brand-600 rounded-lg p-1.5 group-hover:shadow-lg group-hover:shadow-brand-500/20 transition-shadow">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">Permiso</span>
            </Link>

            <nav className="flex items-center gap-0.5">
              {navItems.map((item) => {
                const isActive =
                  loc.pathname === item.to ||
                  (loc.pathname.startsWith("/role/") && item.to === "/") ||
                  (loc.pathname.startsWith("/service/") && item.to === "/") ||
                  (loc.pathname.startsWith("/api/") && item.to === "/apis");
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      isActive ? "bg-white/10 text-white" : "text-white/50 hover:text-white/80 hover:bg-white/5"
                    }`}
                  >
                    <item.icon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{item.label}</span>
                    {item.to === "/compare" && compareRolesState.length > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center bg-brand-400 text-white text-[9px] font-bold rounded-full">
                        {compareRolesState.length}
                      </span>
                    )}
                  </Link>
                );
              })}
              <div className="w-px h-5 bg-white/10 mx-2" />
              <button onClick={toggleDark} className="p-2 text-white/40 hover:text-white/70 transition-colors" aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>
                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <a href="https://github.com/abhilashindulkar/role-analyser" target="_blank" rel="noopener noreferrer" className="p-2 text-white/40 hover:text-white/70 transition-colors" aria-label="View source on GitHub">
                <Github className="h-4 w-4" />
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      {isHome && !loading && (
        <div className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 animate-gradient">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-brand-700)_0%,_transparent_50%)] opacity-30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--color-brand-600)_0%,_transparent_50%)] opacity-20" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="max-w-2xl animate-fade-up">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold text-brand-300 bg-brand-800/50 px-3 py-1 rounded-full border border-brand-700/50">
                  {roles.length} roles &middot; {APIS_DATA.length} APIs indexed
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
                GCP IAM and APIs,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-400">finally readable.</span>
              </h1>
              <p className="mt-5 text-lg text-brand-200/80 leading-relaxed max-w-lg">
                Search {allPermissions.length.toLocaleString()} permissions across {services.length} services and browse {APIS_DATA.length} Google Cloud APIs. Compare roles, reverse-lookup permissions, and get AI recommendations.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => { searchRef.current?.focus(); document.getElementById("search-section")?.scrollIntoView({ behavior: "smooth" }); }} className="flex items-center gap-2 px-5 py-2.5 bg-white text-brand-900 font-semibold rounded-xl hover:bg-brand-50 transition-colors shadow-lg shadow-black/20">
                  <Search className="h-4 w-4" />Start exploring
                </button>
                <Link to="/compare" className="flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/15 transition-colors border border-white/10">
                  <ArrowLeftRight className="h-4 w-4" />Compare roles
                </Link>
                <Link to="/apis" className="flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/15 transition-colors border border-white/10">
                  <Boxes className="h-4 w-4" />Browse APIs
                </Link>
                <Link to="/advisor" className="flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/15 transition-colors border border-white/10">
                  <Sparkles className="h-4 w-4" />Ask the advisor<ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="mt-14 grid sm:grid-cols-3 gap-4 max-w-3xl">
              {[
                { icon: Layers, title: "Role comparison", desc: "Side-by-side permission diffs", to: "/compare" },
                { icon: Lock, title: "Least privilege", desc: "AI picks the narrowest role", to: "/advisor" },
                { icon: Zap, title: "Reverse lookup", desc: "Permission to roles, instantly", to: "/permissions" },
              ].map((f) => (
                <Link key={f.title} to={f.to} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all text-left">
                  <f.icon className="h-5 w-5 text-brand-300 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-white">{f.title}</p>
                    <p className="text-xs text-brand-300/70 mt-0.5">{f.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 border-4 border-brand-200 dark:border-brand-800 border-t-brand-500 rounded-full animate-spin" />
          </div>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {history.length > 0 && (
                    <div className="mb-6 animate-fade-up">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                          <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Recently viewed</span>
                        </div>
                        <button onClick={clearHistory} className="text-[11px] text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1">
                          <Trash2 className="h-3 w-3" />Clear
                        </button>
                      </div>
                      <div className="flex gap-2 overflow-x-auto pb-1">
                        {history.map((h) => (
                          <Link key={h.name} to={`/role/${encodeURIComponent(h.name)}`} className="shrink-0 flex items-center gap-2 px-3 py-2 bg-surface-raised dark:bg-dark-raised rounded-xl border border-slate-200/80 dark:border-dark-border hover:border-brand-200 dark:hover:border-brand-700 transition-colors">
                            <Shield className="h-3 w-3 text-brand-400" />
                            <span className="text-xs font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap">{h.title}</span>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500">{h.service}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  <BrowsePage
                    data={data}
                    compareRoles={compareRolesState}
                    onCompareToggle={handleCompareToggle}
                    onRoleClick={handleRoleClick}
                    searchRef={searchRef}
                  />
                </>
              }
            />
            <Route
              path="/role/:roleName"
              element={
                <RoleDetailRoute
                  roles={roles}
                  onPermissionClick={(p) => navigate(`/permissions?q=${encodeURIComponent(p)}`)}
                  onRoleClick={handleRoleClick}
                />
              }
            />
            <Route
              path="/compare"
              element={
                <ComparisonView
                  allRoles={roles}
                  initialRoles={compareRolesState}
                  onRoleClick={handleRoleClick}
                  onBack={() => navigate("/")}
                />
              }
            />
            <Route
              path="/permissions"
              element={
                <PermissionLookupRoute
                  roles={roles}
                  allPermissions={data.allPermissions}
                  onRoleClick={handleRoleClick}
                />
              }
            />
            <Route
              path="/advisor"
              element={
                <div className="max-w-2xl mx-auto">
                  <AiChat roles={roles} onRoleClick={handleRoleClick} />
                </div>
              }
            />
            <Route
              path="/service/:serviceName"
              element={
                <ServiceDetailRoute
                  roles={roles}
                  onRoleClick={handleRoleClick}
                />
              }
            />
            <Route
              path="/apis"
              element={
                <ApiBrowser roles={roles} onApiClick={handleApiClick} />
              }
            />
            <Route
              path="/api/:apiName"
              element={
                <ApiDetailRoute
                  roles={roles}
                  onBack={() => navigate("/apis")}
                  onRoleClick={handleRoleClick}
                  onPermissionClick={(p) =>
                    navigate(`/permissions?q=${encodeURIComponent(p)}`)
                  }
                />
              }
            />
          </Routes>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 dark:border-dark-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <p className="text-xs text-slate-400 dark:text-slate-500">Permiso - Open source GCP IAM and API explorer. Data sourced from Google Cloud documentation and the APIs Discovery directory.</p>
          <div className="flex items-center gap-4">
            <kbd className="hidden sm:inline text-[10px] text-slate-400 dark:text-slate-500">
              <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-dark-raised rounded border border-slate-200 dark:border-dark-border font-mono">Ctrl+K</kbd> to search
            </kbd>
            <a href="https://github.com/abhilashindulkar/role-analyser" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 dark:text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function RoleDetailRoute({
  roles,
  onPermissionClick,
  onRoleClick,
}: {
  roles: GcpRole[];
  onPermissionClick: (perm: string) => void;
  onRoleClick: (role: GcpRole) => void;
}) {
  const navigate = useNavigate();
  const { roleName: rawRoleName } = useParams();
  const roleName = decodeURIComponent(rawRoleName ?? "");
  const role = roles.find((r) => r.name === roleName);
  if (!role) {
    return (
      <div className="text-center py-20">
        <Shield className="h-12 w-12 text-slate-200 dark:text-slate-700 mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-slate-600 dark:text-slate-300">Role not found</h2>
        <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">{roleName}</p>
        <Link to="/" className="mt-4 inline-block text-sm text-brand-600 dark:text-brand-400 font-medium">Go back</Link>
      </div>
    );
  }
  return (
    <RoleDetail
      role={role}
      allRoles={roles}
      onBack={() => navigate("/")}
      onPermissionClick={onPermissionClick}
      onRoleClick={onRoleClick}
    />
  );
}

function PermissionLookupRoute({
  roles,
  allPermissions,
  onRoleClick,
}: {
  roles: GcpRole[];
  allPermissions: string[];
  onRoleClick: (role: GcpRole) => void;
}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") ?? undefined;
  return (
    <PermissionLookup
      allRoles={roles}
      allPermissions={allPermissions}
      initialPermission={q}
      onRoleClick={onRoleClick}
      onBack={() => navigate("/")}
    />
  );
}

function ServiceDetailRoute({
  roles,
  onRoleClick,
}: {
  roles: GcpRole[];
  onRoleClick: (role: GcpRole) => void;
}) {
  const navigate = useNavigate();
  const { serviceName: rawServiceName } = useParams();
  const serviceName = decodeURIComponent(rawServiceName ?? "");
  return (
    <ServiceDetail
      serviceName={serviceName}
      allRoles={roles}
      onRoleClick={onRoleClick}
      onBack={() => navigate("/")}
    />
  );
}

function ApiDetailRoute({
  roles,
  onBack,
  onRoleClick,
  onPermissionClick,
}: {
  roles: GcpRole[];
  onBack: () => void;
  onRoleClick: (role: GcpRole) => void;
  onPermissionClick: (perm: string) => void;
}) {
  const { apiName: rawApiName } = useParams();
  const apiName = decodeURIComponent(rawApiName ?? "");
  const api = APIS_DATA.find((a) => a.name === apiName);
  if (!api) {
    return (
      <div className="text-center py-20">
        <Cloud className="h-12 w-12 text-slate-200 dark:text-slate-700 mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-slate-600 dark:text-slate-300">
          API not found
        </h2>
        <p className="text-sm text-slate-400 dark:text-slate-500 mt-1 font-mono">
          {apiName}
        </p>
        <Link
          to="/apis"
          className="mt-4 inline-block text-sm text-brand-600 dark:text-brand-400 font-medium"
        >
          Back to APIs
        </Link>
      </div>
    );
  }
  return (
    <ApiDetail
      api={api}
      allRoles={roles}
      onBack={onBack}
      onRoleClick={onRoleClick}
      onPermissionClick={onPermissionClick}
    />
  );
}
