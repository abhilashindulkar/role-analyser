import { Shield, ChevronRight, GitCompare, Fingerprint } from "lucide-react";
import type { GcpRole } from "../types";

interface RoleCardProps {
  role: GcpRole;
  onClick: (role: GcpRole) => void;
  onCompare?: (role: GcpRole) => void;
  isComparing?: boolean;
  compact?: boolean;
}

const STAGE_STYLES: Record<string, string> = {
  GA: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800",
  BETA: "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-200/60 dark:border-amber-800",
  ALPHA: "bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 border-orange-200/60 dark:border-orange-800",
  DEPRECATED: "bg-red-50 dark:bg-red-950/30 text-red-500 dark:text-red-400 border-red-200/60 dark:border-red-800",
  EAP: "bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border-purple-200/60 dark:border-purple-800",
};

function permissionBar(count: number) {
  const width = Math.min(count / 80, 1) * 100;
  const color =
    count < 10 ? "bg-emerald-400" : count < 30 ? "bg-brand-400" : count < 60 ? "bg-amber-400" : "bg-red-400";
  return { width: `${width}%`, color };
}

export function RoleCard({ role, onClick, onCompare, isComparing, compact }: RoleCardProps) {
  const isBasic = ["roles/viewer", "roles/editor", "roles/owner"].includes(role.name);
  const bar = permissionBar(role.permissions.length);

  return (
    <div
      className={`group relative bg-surface-raised dark:bg-dark-raised rounded-2xl border transition-all duration-200 cursor-pointer ${
        isComparing
          ? "border-brand-300 dark:border-brand-600 ring-2 ring-brand-100 dark:ring-brand-900 shadow-md"
          : "border-slate-200/80 dark:border-dark-border hover:border-brand-200 dark:hover:border-brand-700 hover:shadow-lg shadow-sm"
      }`}
      onClick={() => onClick(role)}
    >
      <div className={compact ? "p-4" : "p-5"}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className={`shrink-0 mt-0.5 rounded-xl p-2 transition-transform group-hover:scale-110 ${
              isBasic
                ? "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 text-amber-500"
                : "bg-gradient-to-br from-brand-50 to-violet-50 dark:from-brand-950/40 dark:to-violet-950/40 text-brand-500"
            }`}>
              {isBasic ? <Fingerprint className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm leading-snug group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">
                {role.title}
              </h3>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 font-mono mt-0.5 truncate">{role.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${STAGE_STYLES[role.stage] ?? STAGE_STYLES.GA}`}>
              {role.stage}
            </span>
            <ChevronRight className="h-4 w-4 text-slate-200 dark:text-slate-700 group-hover:text-brand-400 group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>

        {!compact && role.description && (
          <p className="mt-2.5 text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">{role.description}</p>
        )}

        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-16 h-1.5 bg-slate-100 dark:bg-dark-surface rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${bar.color} transition-all`} style={{ width: bar.width }} />
              </div>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 whitespace-nowrap">
                <span className="font-semibold text-slate-600 dark:text-slate-300">{role.permissions.length}</span> perms
              </span>
            </div>
            <span className="text-[11px] px-2 py-0.5 bg-slate-50 dark:bg-dark-surface rounded-lg text-slate-400 dark:text-slate-500 truncate max-w-[120px]">
              {role.service}
            </span>
          </div>
          {onCompare && (
            <button
              onClick={(e) => { e.stopPropagation(); onCompare(role); }}
              className={`shrink-0 p-1.5 rounded-lg transition-all ${
                isComparing
                  ? "bg-brand-100 dark:bg-brand-900 text-brand-600 dark:text-brand-400"
                  : "text-slate-200 dark:text-slate-700 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-950/30"
              }`}
              title="Compare role"
            >
              <GitCompare className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
