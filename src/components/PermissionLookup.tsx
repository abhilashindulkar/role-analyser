import { useState, useMemo } from "react";
import { Key, Search, ArrowLeft, Shield } from "lucide-react";
import { findRolesWithPermission } from "../utils/search";
import type { GcpRole } from "../types";

interface PermissionLookupProps {
  allRoles: GcpRole[];
  allPermissions: string[];
  initialPermission?: string;
  onRoleClick: (role: GcpRole) => void;
  onBack: () => void;
}

export function PermissionLookup({
  allRoles,
  allPermissions,
  initialPermission,
  onRoleClick,
  onBack,
}: PermissionLookupProps) {
  const [search, setSearch] = useState(initialPermission ?? "");

  const filteredPermissions = useMemo(() => {
    if (!search.trim()) return allPermissions.slice(0, 50);
    return allPermissions.filter((p) =>
      p.toLowerCase().includes(search.toLowerCase())
    );
  }, [allPermissions, search]);

  const [selectedPerm, setSelectedPerm] = useState<string | null>(
    initialPermission ?? null
  );

  const matchingRoles = useMemo(() => {
    if (!selectedPerm) return [];
    return findRolesWithPermission(allRoles, selectedPerm);
  }, [allRoles, selectedPerm]);

  return (
    <div className="max-w-5xl mx-auto animate-fade-up">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-brand-600 mb-6 transition-colors group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to roles
      </button>

      <div className="bg-surface-raised rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 bg-gradient-to-br from-amber-50/50 to-white border-b border-slate-100">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-gradient-to-br from-amber-100 to-orange-50 rounded-2xl p-3">
              <Key className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Permission Lookup
              </h2>
              <p className="text-sm text-slate-500">
                Find which roles include a specific permission
              </p>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelectedPerm(null);
              }}
              placeholder="Type a permission name... e.g. storage.objects.get"
              className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 transition-all"
            />
          </div>
        </div>

        <div className="flex divide-x divide-slate-100 min-h-[450px]">
          {/* Permission list */}
          <div className="w-1/2 overflow-y-auto max-h-[500px]">
            <div className="p-2">
              {filteredPermissions.map((perm) => (
                <button
                  key={perm}
                  onClick={() => {
                    setSelectedPerm(perm);
                    setSearch(perm);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 text-xs font-mono rounded-xl transition-all ${
                    selectedPerm === perm
                      ? "bg-brand-50 text-brand-700 font-medium border border-brand-100"
                      : "text-slate-500 hover:bg-slate-50 border border-transparent"
                  }`}
                >
                  {perm}
                </button>
              ))}
              {filteredPermissions.length === 0 && (
                <div className="p-8 text-center">
                  <Key className="h-8 w-8 text-slate-200 mx-auto mb-3" />
                  <p className="text-sm text-slate-400">No permissions found</p>
                </div>
              )}
            </div>
          </div>

          {/* Matching roles */}
          <div className="w-1/2 overflow-y-auto max-h-[500px] bg-slate-50/30">
            {selectedPerm ? (
              <div className="p-5">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  {matchingRoles.length} role{matchingRoles.length !== 1 && "s"}{" "}
                  with this permission
                </h3>
                <div className="space-y-2">
                  {matchingRoles.map((role) => (
                    <button
                      key={role.name}
                      onClick={() => onRoleClick(role)}
                      className="w-full text-left p-3.5 bg-surface-raised hover:bg-brand-50 rounded-xl border border-slate-200/80 hover:border-brand-200 transition-all group"
                    >
                      <div className="flex items-center gap-2">
                        <Shield className="h-3.5 w-3.5 text-brand-400 shrink-0" />
                        <p className="text-sm font-semibold text-slate-700 group-hover:text-brand-700 transition-colors truncate">
                          {role.title}
                        </p>
                      </div>
                      <p className="text-[11px] text-slate-400 font-mono mt-1 truncate">
                        {role.name}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        {role.service} &middot; {role.permissions.length}{" "}
                        permissions
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-100 mb-3">
                    <Key className="h-5 w-5 text-slate-300" />
                  </div>
                  <p className="text-sm text-slate-400">
                    Select a permission to see matching roles
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
