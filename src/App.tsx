import { useState, useCallback } from "react";
import {
  Shield,
  Key,
  Sparkles,
  LayoutGrid,
  Github,
  Search,
  ArrowRight,
  Layers,
  Lock,
  Zap,
} from "lucide-react";
import { SearchBar } from "./components/SearchBar";
import { FilterPanel } from "./components/FilterPanel";
import { RoleCard } from "./components/RoleCard";
import { RoleDetail } from "./components/RoleDetail";
import { RoleComparison } from "./components/RoleComparison";
import { AiChat } from "./components/AiChat";
import { PermissionLookup } from "./components/PermissionLookup";
import { useRoleData } from "./hooks/useRoleData";
import type { GcpRole } from "./types";

type View = "browse" | "detail" | "permissions" | "advisor";

export default function App() {
  const {
    roles,
    filteredRoles,
    filters,
    services,
    allPermissions,
    loading,
    updateQuery,
    toggleService,
    toggleStage,
    setCategory,
    clearFilters,
  } = useRoleData();

  const [view, setView] = useState<View>("browse");
  const [selectedRole, setSelectedRole] = useState<GcpRole | null>(null);
  const [compareRoles, setCompareRoles] = useState<GcpRole[]>([]);
  const [permLookup, setPermLookup] = useState<string | undefined>(undefined);
  const [showHero, setShowHero] = useState(true);

  const handleRoleClick = useCallback((role: GcpRole) => {
    setSelectedRole(role);
    setView("detail");
  }, []);

  const handleCompareToggle = useCallback((role: GcpRole) => {
    setCompareRoles((prev) => {
      if (prev.some((r) => r.name === role.name)) {
        return prev.filter((r) => r.name !== role.name);
      }
      if (prev.length >= 2) {
        return [prev[1], role];
      }
      return [...prev, role];
    });
  }, []);

  const handlePermissionClick = useCallback((permission: string) => {
    setPermLookup(permission);
    setView("permissions");
  }, []);

  const navItems = [
    { id: "browse" as const, label: "Explore", icon: LayoutGrid },
    { id: "permissions" as const, label: "Permissions", icon: Key },
    { id: "advisor" as const, label: "Advisor", icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="bg-brand-950 sticky top-0 z-50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <button
              onClick={() => {
                setView("browse");
                setSelectedRole(null);
                setShowHero(true);
              }}
              className="flex items-center gap-2.5 group"
            >
              <div className="bg-gradient-to-br from-brand-400 to-brand-600 rounded-lg p-1.5 group-hover:shadow-lg group-hover:shadow-brand-500/20 transition-shadow">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Permiso
              </span>
            </button>

            <nav className="flex items-center gap-0.5">
              {navItems.map((item) => {
                const isActive =
                  view === item.id ||
                  (view === "detail" && item.id === "browse");
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setView(item.id);
                      setSelectedRole(null);
                      setShowHero(false);
                    }}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/50 hover:text-white/80 hover:bg-white/5"
                    }`}
                  >
                    <item.icon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </button>
                );
              })}
              <div className="w-px h-5 bg-white/10 mx-2" />
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-white/40 hover:text-white/70 transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {view === "browse" && !selectedRole && showHero && (
        <div className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 animate-gradient">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-brand-700)_0%,_transparent_50%)] opacity-30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--color-brand-600)_0%,_transparent_50%)] opacity-20" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="max-w-2xl animate-fade-up">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold text-brand-300 bg-brand-800/50 px-3 py-1 rounded-full border border-brand-700/50">
                  {roles.length} roles indexed
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
                GCP IAM roles,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-400">
                  finally readable.
                </span>
              </h1>
              <p className="mt-5 text-lg text-brand-200/80 leading-relaxed max-w-lg">
                Search {allPermissions.length.toLocaleString()} permissions
                across {services.length} services. Compare roles, reverse-lookup
                permissions, and get AI recommendations.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setShowHero(false);
                    document
                      .getElementById("search-section")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white text-brand-900 font-semibold rounded-xl hover:bg-brand-50 transition-colors shadow-lg shadow-black/20"
                >
                  <Search className="h-4 w-4" />
                  Start exploring
                </button>
                <button
                  onClick={() => {
                    setView("advisor");
                    setShowHero(false);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/15 transition-colors border border-white/10"
                >
                  <Sparkles className="h-4 w-4" />
                  Ask the advisor
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Feature highlights */}
            <div className="mt-14 grid sm:grid-cols-3 gap-4 max-w-3xl">
              {[
                {
                  icon: Layers,
                  title: "Role comparison",
                  desc: "Side-by-side permission diffs",
                },
                {
                  icon: Lock,
                  title: "Least privilege",
                  desc: "AI picks the narrowest role",
                },
                {
                  icon: Zap,
                  title: "Reverse lookup",
                  desc: "Permission to roles, instantly",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5"
                >
                  <f.icon className="h-5 w-5 text-brand-300 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {f.title}
                    </p>
                    <p className="text-xs text-brand-300/70 mt-0.5">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin" />
          </div>
        )}

        {!loading && view === "detail" && selectedRole ? (
          <RoleDetail
            role={selectedRole}
            allRoles={roles}
            onBack={() => setView("browse")}
            onPermissionClick={handlePermissionClick}
          />
        ) : !loading && view === "permissions" ? (
          <PermissionLookup
            allRoles={roles}
            allPermissions={allPermissions}
            initialPermission={permLookup}
            onRoleClick={handleRoleClick}
            onBack={() => {
              setView("browse");
              setPermLookup(undefined);
            }}
          />
        ) : !loading && view === "advisor" ? (
          <div className="max-w-2xl mx-auto">
            <AiChat roles={roles} onRoleClick={handleRoleClick} />
          </div>
        ) : !loading ? (
          /* Browse View */
          <div className="flex gap-6" id="search-section">
            {/* Sidebar */}
            <aside className="w-72 shrink-0 hidden lg:block space-y-5">
              <FilterPanel
                services={services}
                filters={filters}
                onToggleService={toggleService}
                onToggleStage={toggleStage}
                onSetCategory={setCategory}
                onClear={clearFilters}
              />

              {compareRoles.length > 0 && (
                <RoleComparison
                  roles={compareRoles}
                  onRemove={(role) =>
                    setCompareRoles((prev) =>
                      prev.filter((r) => r.name !== role.name)
                    )
                  }
                  onClear={() => setCompareRoles([])}
                />
              )}

              {/* Stats */}
              <div className="bg-surface-raised rounded-2xl border border-slate-200/80 shadow-sm p-5">
                <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-3">
                  Coverage
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      label: "Roles",
                      value: roles.length,
                      color: "text-brand-600",
                      bg: "bg-brand-50",
                    },
                    {
                      label: "Permissions",
                      value: allPermissions.length,
                      color: "text-violet-600",
                      bg: "bg-violet-50",
                    },
                    {
                      label: "Services",
                      value: services.length,
                      color: "text-emerald-600",
                      bg: "bg-emerald-50",
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className={`flex items-center justify-between ${stat.bg} rounded-xl px-4 py-2.5`}
                    >
                      <span className="text-xs font-medium text-slate-500">
                        {stat.label}
                      </span>
                      <span className={`text-lg font-bold ${stat.color}`}>
                        {stat.value.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <SearchBar
                query={filters.query}
                onChange={(q) => {
                  updateQuery(q);
                  setShowHero(false);
                }}
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

              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-2">
                {filteredRoles.map((role, i) => (
                  <div
                    key={role.name}
                    className="animate-fade-up"
                    style={{ animationDelay: `${Math.min(i * 30, 300)}ms` }}
                  >
                    <RoleCard
                      role={role}
                      onClick={handleRoleClick}
                      onCompare={handleCompareToggle}
                      isComparing={compareRoles.some(
                        (r) => r.name === role.name
                      )}
                    />
                  </div>
                ))}
              </div>

              {filteredRoles.length === 0 && (
                <div className="mt-16 text-center animate-fade-up">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 mb-4">
                    <Search className="h-7 w-7 text-slate-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-600">
                    No roles match your search
                  </h3>
                  <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
                    Try different keywords or clear filters to see all roles
                  </p>
                  <button
                    onClick={clearFilters}
                    className="mt-5 text-sm text-brand-600 hover:text-brand-700 font-semibold px-4 py-2 rounded-lg hover:bg-brand-50 transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            Permiso - Open source GCP IAM explorer.
            Data sourced from Google Cloud documentation.
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-400 hover:text-brand-600 transition-colors"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
