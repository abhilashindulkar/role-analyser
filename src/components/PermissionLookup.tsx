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

export function PermissionLookup({ allRoles, allPermissions, initialPermission, onRoleClick, onBack }: PermissionLookupProps) {
  const [search, setSearch] = useState(initialPermission ?? "");
  const [selectedPerm, setSelectedPerm] = useState<string | null>(initialPermission ?? null);

  const filteredPermissions = useMemo(() => {
    if (!search.trim()) return allPermissions.slice(0, 50);
    return allPermissions.filter((p) => p.toLowerCase().includes(search.toLowerCase()));
  }, [allPermissions, search]);

  const matchingRoles = useMemo(() => {
    if (!selectedPerm) return [];
    return findRolesWithPermission(allRoles, selectedPerm);
  }, [allRoles, selectedPerm]);

  return (
    <div className="max-w-5xl mx-auto animate-fade-up">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-400 dark:text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 mb-6 transition-colors group">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />Back to roles
      </button>

      <div className="bg-surface-raised dark:bg-dark-raised rounded-2xl border border-slate-200/80 dark:border-dark-border shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 bg-gradient-to-br from-amber-50/50 to-white dark:from-amber-950/10 dark:to-dark-raised border-b border-slate-100 dark:border-dark-border">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-gradient-to-br from-amber-100 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 rounded-2xl p-3">
              <Key className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Permission Lookup</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Find which roles include a specific permission</p>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 dark:text-slate-600" />
            <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setSelectedPerm(null); }} placeholder="Type a permission name... e.g. storage.objects.get" className="w-full pl-11 pr-4 py-3 border border-slate-200 dark:border-dark-border dark:bg-dark-surface dark:text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 transition-all" />
          </div>
        </div>

        <div className="flex divide-x divide-slate-100 dark:divide-dark-border min-h-[450px]">
          <div className="w-1/2 overflow-y-auto max-h-[500px]">
            <div className="p-2">
              {filteredPermissions.map((perm) => (
                <button key={perm} onClick={() => { setSelectedPerm(perm); setSearch(perm); }} className={`w-full text-left px-3.5 py-2.5 text-xs font-mono rounded-xl transition-all ${
                  selectedPerm === perm ? "bg-brand-50 dark:bg-brand-950/30 text-brand-700 dark:text-brand-400 font-medium border border-brand-100 dark:border-brand-800" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-dark-surface border border-transparent"
                }`}>{perm}</button>
              ))}
              {filteredPermissions.length === 0 && (
                <div className="p-8 text-center">
                  <Key className="h-8 w-8 text-slate-200 dark:text-slate-700 mx-auto mb-3" />
                  <p className="text-sm text-slate-400 dark:text-slate-500">No permissions found</p>
                </div>
              )}
            </div>
          </div>

          <div className="w-1/2 overflow-y-auto max-h-[500px] bg-slate-50/30 dark:bg-dark-surface/30">
            {selectedPerm ? (
              <div className="p-5">
                <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
                  {matchingRoles.length} role{matchingRoles.length !== 1 && "s"} with this permission
                </h3>
                <div className="space-y-2">
                  {matchingRoles.map((role) => (
                    <button key={role.name} onClick={() => onRoleClick(role)} className="w-full text-left p-3.5 bg-surface-raised dark:bg-dark-raised hover:bg-brand-50 dark:hover:bg-brand-950/30 rounded-xl border border-slate-200/80 dark:border-dark-border hover:border-brand-200 dark:hover:border-brand-700 transition-all group">
                      <div className="flex items-center gap-2">
                        <Shield className="h-3.5 w-3.5 text-brand-400 shrink-0" />
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors truncate">{role.title}</p>
                      </div>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 font-mono mt-1 truncate">{role.name}</p>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">{role.service} &middot; {role.permissions.length} permissions</p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-100 dark:bg-dark-raised mb-3"><Key className="h-5 w-5 text-slate-300 dark:text-slate-600" /></div>
                  <p className="text-sm text-slate-400 dark:text-slate-500">Select a permission to see matching roles</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
