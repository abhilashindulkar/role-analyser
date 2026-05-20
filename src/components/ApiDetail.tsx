import { useMemo } from "react";
import {
  ArrowLeft,
  BookOpen,
  Boxes,
  Cloud,
  Copy,
  ExternalLink,
  Key,
  Shield,
} from "lucide-react";
import type { GcpApi, GcpRole } from "../types";
import { findRolesForApi } from "../utils/apiSearch";

interface ApiDetailProps {
  api: GcpApi;
  allRoles: GcpRole[];
  onBack: () => void;
  onRoleClick: (role: GcpRole) => void;
  onPermissionClick: (permission: string) => void;
}

const STAGE_STYLES: Record<string, string> = {
  GA: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800",
  BETA: "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-200/60 dark:border-amber-800",
  ALPHA: "bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 border-orange-200/60 dark:border-orange-800",
  DEPRECATED: "bg-red-50 dark:bg-red-950/30 text-red-500 dark:text-red-400 border-red-200/60 dark:border-red-800",
};

export function ApiDetail({
  api,
  allRoles,
  onBack,
  onRoleClick,
  onPermissionClick,
}: ApiDetailProps) {
  const matchingRoles = useMemo(
    () => findRolesForApi(api, allRoles),
    [api, allRoles]
  );

  const allApiPermissions = useMemo(() => {
    const prefix = `${api.permissionPrefix}.`;
    const set = new Set<string>();
    for (const role of allRoles) {
      for (const p of role.permissions) {
        if (p.startsWith(prefix)) set.add(p);
      }
    }
    return [...set].sort();
  }, [api, allRoles]);

  const copyName = () => {
    navigator.clipboard?.writeText(api.name);
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-up">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-slate-400 dark:text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 mb-6 transition-colors group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to APIs
      </button>

      <div className="bg-surface-raised dark:bg-dark-raised rounded-2xl border border-slate-200/80 dark:border-dark-border shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 bg-gradient-to-br from-sky-50/50 to-white dark:from-sky-950/20 dark:to-dark-raised border-b border-slate-100 dark:border-dark-border">
          <div className="flex items-start gap-4">
            <div className="shrink-0 bg-gradient-to-br from-sky-100 to-brand-50 dark:from-sky-950/40 dark:to-brand-950/40 rounded-2xl p-3">
              <Cloud className="h-6 w-6 text-sky-500 dark:text-sky-400" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {api.title}
                </h1>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                    STAGE_STYLES[api.stage] ?? STAGE_STYLES.GA
                  }`}
                >
                  {api.stage}
                </span>
                {api.enabledByDefault && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                    Enabled by default
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1.5">
                <code className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  {api.name}
                </code>
                <button
                  onClick={copyName}
                  className="p-1 text-slate-300 dark:text-slate-600 hover:text-brand-500 transition-colors"
                  title="Copy API name"
                >
                  <Copy className="h-3 w-3" />
                </button>
                <span className="text-[11px] px-2 py-0.5 bg-slate-100 dark:bg-dark-surface rounded-md text-slate-500 dark:text-slate-400">
                  {api.category}
                </span>
              </div>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                {api.summary}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href={api.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  Documentation
                  <ExternalLink className="h-3 w-3 opacity-70" />
                </a>
                {api.consoleUrl && (
                  <a
                    href={api.consoleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border hover:border-brand-300 dark:hover:border-brand-700 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-lg transition-colors"
                  >
                    <Boxes className="h-3.5 w-3.5" />
                    Open in Console
                    <ExternalLink className="h-3 w-3 opacity-70" />
                  </a>
                )}
                <a
                  href={`https://console.cloud.google.com/apis/library/${api.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border hover:border-brand-300 dark:hover:border-brand-700 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-lg transition-colors"
                >
                  Enable in API Library
                  <ExternalLink className="h-3 w-3 opacity-70" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 dark:divide-dark-border">
          <div className="p-5 text-center">
            <div className="text-3xl font-bold text-brand-600 dark:text-brand-400 tabular-nums">
              {matchingRoles.length}
            </div>
            <div className="text-[11px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500 mt-1">
              Roles
            </div>
          </div>
          <div className="p-5 text-center">
            <div className="text-3xl font-bold text-violet-600 dark:text-violet-400 tabular-nums">
              {allApiPermissions.length}
            </div>
            <div className="text-[11px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500 mt-1">
              Permissions
            </div>
          </div>
          <div className="p-5 text-center">
            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {api.permissionPrefix}.*
            </div>
            <div className="text-[11px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500 mt-1">
              Prefix
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-dark-border">
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-4 w-4 text-brand-500" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Roles using this API
              </h3>
              <span className="text-xs text-slate-400 dark:text-slate-500">
                ({matchingRoles.length})
              </span>
            </div>
            {matchingRoles.length > 0 ? (
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {matchingRoles.map((role) => (
                  <button
                    key={role.name}
                    onClick={() => onRoleClick(role)}
                    className="w-full text-left p-3 bg-white dark:bg-dark-surface hover:bg-brand-50 dark:hover:bg-brand-950/30 rounded-xl border border-slate-200/80 dark:border-dark-border hover:border-brand-200 dark:hover:border-brand-700 transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <Shield className="h-3.5 w-3.5 text-brand-400 shrink-0" />
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors truncate">
                        {role.title}
                      </p>
                    </div>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 font-mono mt-1 truncate">
                      {role.name}
                    </p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                      {role.service} &middot; {role.permissions.length}{" "}
                      permissions
                    </p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <Shield className="h-8 w-8 text-slate-200 dark:text-slate-700 mx-auto mb-3" />
                <p className="text-sm text-slate-400 dark:text-slate-500">
                  No roles in the dataset use this API yet
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                  Try refreshing the role data
                </p>
              </div>
            )}
          </div>

          <div className="p-6 sm:p-8 bg-slate-50/30 dark:bg-dark-surface/30">
            <div className="flex items-center gap-2 mb-4">
              <Key className="h-4 w-4 text-amber-500" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Permissions
              </h3>
              <span className="text-xs text-slate-400 dark:text-slate-500">
                ({allApiPermissions.length})
              </span>
            </div>
            {allApiPermissions.length > 0 ? (
              <div className="space-y-1 max-h-[500px] overflow-y-auto pr-1">
                {allApiPermissions.map((perm) => (
                  <button
                    key={perm}
                    onClick={() => onPermissionClick(perm)}
                    className="w-full text-left px-3 py-2 text-xs font-mono rounded-lg text-slate-500 dark:text-slate-400 hover:bg-amber-50 dark:hover:bg-amber-950/20 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
                  >
                    {perm}
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <Key className="h-8 w-8 text-slate-200 dark:text-slate-700 mx-auto mb-3" />
                <p className="text-sm text-slate-400 dark:text-slate-500">
                  No permissions found for prefix{" "}
                  <code className="font-mono">{api.permissionPrefix}.*</code>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
