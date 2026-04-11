import { useMemo, useState } from "react";
import { ArrowLeft, Shield, Search } from "lucide-react";
import type { GcpRole } from "../types";

interface ServiceDetailProps {
  serviceName: string;
  allRoles: GcpRole[];
  onRoleClick: (role: GcpRole) => void;
  onBack: () => void;
}

export function ServiceDetail({
  serviceName,
  allRoles,
  onRoleClick,
  onBack,
}: ServiceDetailProps) {
  const [search, setSearch] = useState("");

  const serviceRoles = useMemo(() => {
    let roles = allRoles.filter((r) => r.service === serviceName);
    if (search.trim()) {
      const q = search.toLowerCase();
      roles = roles.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.name.toLowerCase().includes(q)
      );
    }
    return roles.sort(
      (a, b) => b.permissions.length - a.permissions.length
    );
  }, [allRoles, serviceName, search]);

  const allPerms = useMemo(() => {
    const s = new Set<string>();
    for (const r of serviceRoles) {
      for (const p of r.permissions) s.add(p);
    }
    return s.size;
  }, [serviceRoles]);

  const maxPerms = serviceRoles[0]?.permissions.length ?? 1;

  return (
    <div className="max-w-4xl mx-auto animate-fade-up">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-brand-600 dark:text-slate-500 dark:hover:text-brand-400 mb-6 transition-colors group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
        Back
      </button>

      <div className="bg-surface-raised dark:bg-dark-raised rounded-2xl border border-slate-200/80 dark:border-dark-border shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 bg-gradient-to-br from-emerald-50/50 to-white dark:from-emerald-950/20 dark:to-dark-raised border-b border-slate-100 dark:border-dark-border">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            {serviceName}
          </h1>
          <div className="flex items-center gap-4 mt-2 text-sm text-slate-500 dark:text-slate-400">
            <span>
              <span className="font-bold text-slate-700 dark:text-slate-200">
                {serviceRoles.length}
              </span>{" "}
              roles
            </span>
            <span>
              <span className="font-bold text-slate-700 dark:text-slate-200">
                {allPerms.toLocaleString()}
              </span>{" "}
              unique permissions
            </span>
          </div>

          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 dark:text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter roles in this service..."
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-dark-border dark:bg-dark-surface dark:text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400"
            />
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="space-y-2">
            {serviceRoles.map((role) => {
              const barWidth =
                maxPerms > 0
                  ? (role.permissions.length / maxPerms) * 100
                  : 0;

              return (
                <button
                  key={role.name}
                  onClick={() => onRoleClick(role)}
                  className="w-full text-left p-4 rounded-xl border border-slate-200/80 dark:border-dark-border bg-white dark:bg-dark-raised hover:border-brand-200 dark:hover:border-brand-700 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <Shield className="h-3.5 w-3.5 text-brand-400 shrink-0" />
                        <span className="font-semibold text-sm text-slate-700 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                          {role.title}
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-dark-surface text-slate-400 dark:text-slate-500">
                          {role.stage}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {role.name}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-300 tabular-nums shrink-0">
                      {role.permissions.length}
                    </span>
                  </div>
                  <div className="mt-2.5 h-1.5 bg-slate-100 dark:bg-dark-surface rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-400 to-brand-500 rounded-full transition-all"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {serviceRoles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm text-slate-400 dark:text-slate-500">
                No roles found for this service
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
