import { useState, useMemo } from "react";
import {
  ArrowLeftRight,
  Search,
  Shield,
  Fingerprint,
  ChevronDown,
  Check,
  X as XIcon,
  Circle,
} from "lucide-react";
import { compareRoles } from "../utils/search";
import type { GcpRole } from "../types";

interface ComparisonViewProps {
  allRoles: GcpRole[];
  initialRoles: GcpRole[];
  onRoleClick: (role: GcpRole) => void;
  onBack: () => void;
}

type DiffFilter = "all" | "shared" | "onlyA" | "onlyB";

const ROLE_A_COLORS = {
  bg: "bg-sky-50",
  bgStrong: "bg-sky-100",
  border: "border-sky-200",
  text: "text-sky-700",
  textLight: "text-sky-500",
  accent: "bg-sky-500",
  iconBg: "bg-sky-100 text-sky-600",
  gradient: "from-sky-50 to-sky-100/50",
  gradientHeader: "from-sky-600 to-sky-700",
  pill: "bg-sky-50 text-sky-700 border-sky-200",
  pillActive: "bg-sky-100 text-sky-800 border-sky-300",
  rowTint: "bg-sky-50/40",
};

const ROLE_B_COLORS = {
  bg: "bg-amber-50",
  bgStrong: "bg-amber-100",
  border: "border-amber-200",
  text: "text-amber-700",
  textLight: "text-amber-500",
  accent: "bg-amber-500",
  iconBg: "bg-amber-100 text-amber-600",
  gradient: "from-amber-50 to-amber-100/50",
  gradientHeader: "from-amber-600 to-amber-700",
  pill: "bg-amber-50 text-amber-700 border-amber-200",
  pillActive: "bg-amber-100 text-amber-800 border-amber-300",
  rowTint: "bg-amber-50/40",
};

function RolePicker({
  roles,
  selected,
  onSelect,
  side,
}: {
  roles: GcpRole[];
  selected: GcpRole | null;
  onSelect: (role: GcpRole) => void;
  side: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return roles.slice(0, 30);
    const q = search.toLowerCase();
    return roles.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q) ||
        r.service.toLowerCase().includes(q)
    );
  }, [roles, search]);

  const isBasic = selected
    ? ["roles/viewer", "roles/editor", "roles/owner"].includes(selected.name)
    : false;

  const colors = side === "left" ? ROLE_A_COLORS : ROLE_B_COLORS;
  const label = side === "left" ? "A" : "B";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${
          selected
            ? `bg-gradient-to-br ${colors.gradient} ${colors.border} hover:shadow-md`
            : "bg-slate-50 border-dashed border-slate-200 hover:border-slate-300"
        }`}
      >
        {selected ? (
          <div className="flex items-start gap-3">
            <div className={`shrink-0 rounded-xl p-2.5 ${colors.iconBg}`}>
              {isBasic ? (
                <Fingerprint className="h-5 w-5" />
              ) : (
                <Shield className="h-5 w-5" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`text-[10px] font-black uppercase tracking-widest ${colors.textLight}`}
                >
                  Role {label}
                </span>
              </div>
              <p className={`font-bold text-base ${colors.text} break-words`}>
                {selected.title}
              </p>
              <p className="text-xs text-slate-400 font-mono mt-1 break-all">
                {selected.name}
              </p>
              <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                <span>{selected.service}</span>
                <span>&middot;</span>
                <span className="font-semibold text-slate-600">
                  {selected.permissions.length}
                </span>{" "}
                permissions
              </div>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-300 shrink-0 mt-1" />
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 py-6 text-slate-400">
            <Shield className="h-5 w-5" />
            <span className="text-sm font-medium">
              Select Role {label}
            </span>
            <ChevronDown className="h-4 w-4" />
          </div>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 right-0 mt-2 bg-surface-raised rounded-2xl border border-slate-200 shadow-2xl z-50 overflow-hidden max-h-[400px] flex flex-col">
            <div className="p-3 border-b border-slate-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-300" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search roles..."
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400"
                  autoFocus
                />
              </div>
            </div>
            <div className="overflow-y-auto flex-1">
              {filtered.map((role) => (
                <button
                  key={role.name}
                  onClick={() => {
                    onSelect(role);
                    setOpen(false);
                    setSearch("");
                  }}
                  className={`w-full text-left px-4 py-3 border-b border-slate-50 hover:bg-brand-50/50 transition-colors ${
                    selected?.name === role.name ? "bg-brand-50" : ""
                  }`}
                >
                  <p className="text-sm font-semibold text-slate-700">
                    {role.title}
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono">
                    {role.name}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {role.service} &middot; {role.permissions.length} perms
                  </p>
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="p-4 text-sm text-slate-400 text-center">
                  No roles found
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function ComparisonView({
  allRoles,
  initialRoles,
  onRoleClick,
  onBack,
}: ComparisonViewProps) {
  const [roleA, setRoleA] = useState<GcpRole | null>(initialRoles[0] ?? null);
  const [roleB, setRoleB] = useState<GcpRole | null>(initialRoles[1] ?? null);
  const [diffFilter, setDiffFilter] = useState<DiffFilter>("all");
  const [permSearch, setPermSearch] = useState("");

  const comparison = useMemo(() => {
    if (!roleA || !roleB) return null;
    return compareRoles(roleA, roleB);
  }, [roleA, roleB]);

  const allPerms = useMemo(() => {
    if (!roleA || !roleB || !comparison) return [];
    const perms = new Set([...roleA.permissions, ...roleB.permissions]);
    return [...perms].sort();
  }, [roleA, roleB, comparison]);

  const filteredPerms = useMemo(() => {
    if (!comparison) return [];

    let perms: string[];
    switch (diffFilter) {
      case "shared":
        perms = comparison.shared;
        break;
      case "onlyA":
        perms = comparison.onlyA;
        break;
      case "onlyB":
        perms = comparison.onlyB;
        break;
      default:
        perms = allPerms;
    }

    if (permSearch.trim()) {
      const q = permSearch.toLowerCase();
      perms = perms.filter((p) => p.toLowerCase().includes(q));
    }

    return perms.sort();
  }, [comparison, diffFilter, allPerms, permSearch]);

  const groupedPerms = useMemo(() => {
    const groups: Record<string, string[]> = {};
    for (const perm of filteredPerms) {
      const group = perm.split(".")[0] ?? "other";
      if (!groups[group]) groups[group] = [];
      groups[group].push(perm);
    }
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredPerms]);

  function getPermStatus(perm: string): "shared" | "onlyA" | "onlyB" {
    if (!comparison) return "shared";
    if (comparison.onlyA.includes(perm)) return "onlyA";
    if (comparison.onlyB.includes(perm)) return "onlyB";
    return "shared";
  }

  const overlapPct =
    allPerms.length > 0 && comparison
      ? Math.round((comparison.shared.length / allPerms.length) * 100)
      : 0;

  return (
    <div className="max-w-6xl mx-auto animate-fade-up">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-brand-100 to-violet-100 rounded-2xl p-3">
            <ArrowLeftRight className="h-6 w-6 text-brand-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Compare Roles
            </h1>
            <p className="text-sm text-slate-400">
              Side-by-side permission diff between two roles
            </p>
          </div>
        </div>
        <button
          onClick={onBack}
          className="text-sm text-slate-400 hover:text-brand-600 transition-colors font-medium flex items-center gap-1.5"
        >
          <XIcon className="h-4 w-4" />
          Close
        </button>
      </div>

      {/* Role pickers */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <RolePicker
          roles={allRoles}
          selected={roleA}
          onSelect={setRoleA}
          side="left"
        />
        <RolePicker
          roles={allRoles}
          selected={roleB}
          onSelect={setRoleB}
          side="right"
        />
      </div>

      {/* Diff content */}
      {comparison && roleA && roleB ? (
        <div className="bg-surface-raised rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          {/* Summary bar */}
          <div className="px-6 py-5 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
            <div className="flex items-center gap-5 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="h-3.5 w-3.5 rounded-full bg-emerald-400 ring-2 ring-emerald-100" />
                <span className="text-sm">
                  <span className="font-bold text-slate-700">
                    {comparison.shared.length}
                  </span>{" "}
                  <span className="text-slate-400">shared</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3.5 w-3.5 rounded-full bg-sky-400 ring-2 ring-sky-100" />
                <span className="text-sm">
                  <span className="font-bold text-slate-700">
                    {comparison.onlyA.length}
                  </span>{" "}
                  <span className="text-slate-400">
                    only in{" "}
                    <span className="font-medium text-sky-600">
                      {roleA.title}
                    </span>
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3.5 w-3.5 rounded-full bg-amber-400 ring-2 ring-amber-100" />
                <span className="text-sm">
                  <span className="font-bold text-slate-700">
                    {comparison.onlyB.length}
                  </span>{" "}
                  <span className="text-slate-400">
                    only in{" "}
                    <span className="font-medium text-amber-600">
                      {roleB.title}
                    </span>
                  </span>
                </span>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">
                  {overlapPct}% overlap
                </span>
              </div>
            </div>

            {/* Visual overlap bar */}
            <div className="mt-3 flex h-2.5 rounded-full overflow-hidden bg-slate-100">
              {allPerms.length > 0 && (
                <>
                  <div
                    className="bg-sky-400 transition-all"
                    style={{
                      width: `${(comparison.onlyA.length / allPerms.length) * 100}%`,
                    }}
                  />
                  <div
                    className="bg-emerald-400 transition-all"
                    style={{
                      width: `${(comparison.shared.length / allPerms.length) * 100}%`,
                    }}
                  />
                  <div
                    className="bg-amber-400 transition-all"
                    style={{
                      width: `${(comparison.onlyB.length / allPerms.length) * 100}%`,
                    }}
                  />
                </>
              )}
            </div>
          </div>

          {/* Filter + search */}
          <div className="px-6 py-3 border-b border-slate-100 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => setDiffFilter("all")}
                className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-all border ${
                  diffFilter === "all"
                    ? "bg-slate-100 text-slate-700 border-slate-300"
                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-50 border-transparent"
                }`}
              >
                All
                <span className="ml-1 opacity-50">{allPerms.length}</span>
              </button>
              <button
                onClick={() => setDiffFilter("shared")}
                className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-all border ${
                  diffFilter === "shared"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "text-slate-400 hover:text-emerald-600 hover:bg-emerald-50/50 border-transparent"
                }`}
              >
                Shared
                <span className="ml-1 opacity-50">
                  {comparison.shared.length}
                </span>
              </button>
              <button
                onClick={() => setDiffFilter("onlyA")}
                className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-all border ${
                  diffFilter === "onlyA"
                    ? ROLE_A_COLORS.pillActive + " border-sky-300"
                    : "text-slate-400 hover:text-sky-600 hover:bg-sky-50/50 border-transparent"
                }`}
              >
                Only {roleA.title}
                <span className="ml-1 opacity-50">
                  {comparison.onlyA.length}
                </span>
              </button>
              <button
                onClick={() => setDiffFilter("onlyB")}
                className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-all border ${
                  diffFilter === "onlyB"
                    ? ROLE_B_COLORS.pillActive + " border-amber-300"
                    : "text-slate-400 hover:text-amber-600 hover:bg-amber-50/50 border-transparent"
                }`}
              >
                Only {roleB.title}
                <span className="ml-1 opacity-50">
                  {comparison.onlyB.length}
                </span>
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-300" />
              <input
                type="text"
                value={permSearch}
                onChange={(e) => setPermSearch(e.target.value)}
                placeholder="Filter permissions..."
                className="pl-9 pr-3 py-1.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 w-52"
              />
            </div>
          </div>

          {/* Permission diff table */}
          <div className="max-h-[600px] overflow-y-auto">
            {/* Column headers */}
            <div className="sticky top-0 z-10 grid grid-cols-[1fr_140px_140px] border-b border-slate-200">
              <div className="bg-slate-50 px-6 py-3 flex items-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Permission
                </span>
              </div>
              <div className="bg-sky-50 px-3 py-3 flex items-center justify-center border-l border-sky-100">
                <span className="text-[11px] font-bold text-sky-600 uppercase tracking-widest text-center break-words leading-tight">
                  {roleA.title}
                </span>
              </div>
              <div className="bg-amber-50 px-3 py-3 flex items-center justify-center border-l border-amber-100">
                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-widest text-center break-words leading-tight">
                  {roleB.title}
                </span>
              </div>
            </div>

            {groupedPerms.map(([group, perms]) => (
              <div key={group}>
                <div className="px-6 py-2 bg-slate-50/80 border-b border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {group}
                    <span className="text-slate-300 font-semibold ml-1.5">
                      {perms.length}
                    </span>
                  </span>
                </div>
                {perms.map((perm) => {
                  const status = getPermStatus(perm);
                  const inA = status === "shared" || status === "onlyA";
                  const inB = status === "shared" || status === "onlyB";

                  return (
                    <div
                      key={perm}
                      className={`grid grid-cols-[1fr_140px_140px] border-b border-slate-50 hover:bg-slate-50/80 transition-colors ${
                        status === "shared"
                          ? ""
                          : status === "onlyA"
                            ? ROLE_A_COLORS.rowTint
                            : ROLE_B_COLORS.rowTint
                      }`}
                    >
                      <div className="px-6 py-2.5 flex items-center min-w-0">
                        <span
                          className="text-xs font-mono text-slate-600 break-all"
                          title={perm}
                        >
                          {perm}
                        </span>
                      </div>
                      <div
                        className={`px-3 py-2.5 flex items-center justify-center border-l ${
                          inA
                            ? status === "onlyA"
                              ? "border-sky-100 bg-sky-50/50"
                              : "border-slate-50"
                            : "border-slate-50"
                        }`}
                      >
                        {inA ? (
                          <div
                            className={`flex items-center gap-1.5 ${
                              status === "shared"
                                ? "text-emerald-500"
                                : "text-sky-600"
                            }`}
                          >
                            <Check className="h-4 w-4" />
                            <span className="text-[10px] font-bold uppercase">
                              {status === "shared" ? "Yes" : "Only"}
                            </span>
                          </div>
                        ) : (
                          <Circle className="h-3.5 w-3.5 text-slate-200" />
                        )}
                      </div>
                      <div
                        className={`px-3 py-2.5 flex items-center justify-center border-l ${
                          inB
                            ? status === "onlyB"
                              ? "border-amber-100 bg-amber-50/50"
                              : "border-slate-50"
                            : "border-slate-50"
                        }`}
                      >
                        {inB ? (
                          <div
                            className={`flex items-center gap-1.5 ${
                              status === "shared"
                                ? "text-emerald-500"
                                : "text-amber-600"
                            }`}
                          >
                            <Check className="h-4 w-4" />
                            <span className="text-[10px] font-bold uppercase">
                              {status === "shared" ? "Yes" : "Only"}
                            </span>
                          </div>
                        ) : (
                          <Circle className="h-3.5 w-3.5 text-slate-200" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}

            {filteredPerms.length === 0 && (
              <div className="py-16 text-center">
                <Search className="h-8 w-8 text-slate-200 mx-auto mb-3" />
                <p className="text-sm text-slate-400">
                  No permissions match the current filter
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-surface-raised rounded-2xl border border-slate-200/80 shadow-sm p-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 mb-4">
            <ArrowLeftRight className="h-7 w-7 text-slate-300" />
          </div>
          <h3 className="text-lg font-semibold text-slate-600">
            Pick two roles to compare
          </h3>
          <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
            Select roles from the dropdowns above, or click the compare icon on
            any role card in the Explore view, then come here.
          </p>
        </div>
      )}
    </div>
  );
}
