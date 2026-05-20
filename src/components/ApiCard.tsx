import { ChevronRight, Cloud, ExternalLink, Shield } from "lucide-react";
import type { GcpApi, GcpRole } from "../types";
import { countPermissionsForApi, findRolesForApi } from "../utils/apiSearch";

interface ApiCardProps {
  api: GcpApi;
  roles: GcpRole[];
  onClick: (api: GcpApi) => void;
}

const STAGE_STYLES: Record<string, string> = {
  GA: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800",
  BETA: "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-200/60 dark:border-amber-800",
  ALPHA: "bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 border-orange-200/60 dark:border-orange-800",
  DEPRECATED: "bg-red-50 dark:bg-red-950/30 text-red-500 dark:text-red-400 border-red-200/60 dark:border-red-800",
};

export function ApiCard({ api, roles, onClick }: ApiCardProps) {
  const matchingRoleCount = findRolesForApi(api, roles).length;
  const permissionCount = countPermissionsForApi(api, roles);

  return (
    <div
      onClick={() => onClick(api)}
      className="group relative bg-surface-raised dark:bg-dark-raised rounded-2xl border border-slate-200/80 dark:border-dark-border hover:border-brand-200 dark:hover:border-brand-700 hover:shadow-lg shadow-sm transition-all duration-200 cursor-pointer"
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="shrink-0 mt-0.5 rounded-xl p-2 bg-gradient-to-br from-sky-50 to-brand-50 dark:from-sky-950/40 dark:to-brand-950/40 text-sky-500 dark:text-sky-400 group-hover:scale-110 transition-transform">
              <Cloud className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm leading-snug group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">
                {api.title}
              </h3>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 font-mono mt-0.5 truncate">
                {api.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                STAGE_STYLES[api.stage] ?? STAGE_STYLES.GA
              }`}
            >
              {api.stage}
            </span>
            <ChevronRight className="h-4 w-4 text-slate-200 dark:text-slate-700 group-hover:text-brand-400 group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>

        <p className="mt-2.5 text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
          {api.summary}
        </p>

        <div className="mt-3 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 min-w-0 flex-wrap">
            <span className="text-[11px] px-2 py-0.5 bg-slate-50 dark:bg-dark-surface rounded-lg text-slate-500 dark:text-slate-400 truncate max-w-[160px]">
              {api.category}
            </span>
            {api.enabledByDefault && (
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                Default-on
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500">
              <Shield className="h-3 w-3 text-brand-400" />
              <span className="font-semibold text-slate-600 dark:text-slate-300 tabular-nums">
                {matchingRoleCount}
              </span>
              roles
            </span>
            <span className="text-[11px] text-slate-400 dark:text-slate-500">
              <span className="font-semibold text-slate-600 dark:text-slate-300 tabular-nums">
                {permissionCount}
              </span>{" "}
              perms
            </span>
            <a
              href={api.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1 text-slate-300 dark:text-slate-600 hover:text-brand-500 transition-colors"
              title="Open documentation"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
