import { X, ArrowLeftRight, Maximize2 } from "lucide-react";
import { useMemo } from "react";
import { compareRoles } from "../utils/search";
import type { GcpRole } from "../types";

interface RoleComparisonProps {
  roles: GcpRole[];
  onRemove: (role: GcpRole) => void;
  onClear: () => void;
  onViewFull: () => void;
}

export function RoleComparison({
  roles,
  onRemove,
  onClear,
  onViewFull,
}: RoleComparisonProps) {
  const comparison = useMemo(() => {
    if (roles.length !== 2) return null;
    return compareRoles(roles[0], roles[1]);
  }, [roles]);

  if (roles.length === 0) return null;

  return (
    <div className="bg-surface-raised rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden animate-fade-up">
      <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-brand-50 to-violet-50">
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="h-4 w-4 text-brand-500" />
          <h3 className="font-bold text-slate-700 text-xs uppercase tracking-widest">
            Compare
          </h3>
        </div>
        <button
          onClick={onClear}
          className="text-[11px] text-slate-400 hover:text-red-500 transition-colors font-medium"
        >
          Clear
        </button>
      </div>

      <div className="p-4">
        <div className="flex gap-2 mb-3">
          {roles.map((role) => (
            <div
              key={role.name}
              className="flex-1 flex items-center justify-between p-2.5 bg-brand-50/50 rounded-xl border border-brand-100"
            >
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-700 truncate">
                  {role.title}
                </p>
                <p className="text-[10px] text-slate-400">
                  {role.permissions.length} perms
                </p>
              </div>
              <button
                onClick={() => onRemove(role)}
                className="shrink-0 p-1 hover:bg-brand-100 rounded-lg transition-colors"
              >
                <X className="h-3 w-3 text-slate-400" />
              </button>
            </div>
          ))}
          {roles.length < 2 && (
            <div className="flex-1 flex items-center justify-center p-2.5 border-2 border-dashed border-slate-200 rounded-xl">
              <p className="text-[11px] text-slate-300">Pick another role</p>
            </div>
          )}
        </div>

        {comparison && (
          <div className="space-y-2 mb-3">
            {[
              {
                label: "Shared",
                count: comparison.shared.length,
                dot: "bg-emerald-400",
              },
              {
                label: `Only ${roles[0].title}`,
                count: comparison.onlyA.length,
                dot: "bg-brand-400",
              },
              {
                label: `Only ${roles[1].title}`,
                count: comparison.onlyB.length,
                dot: "bg-violet-400",
              },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${s.dot}`} />
                <span className="text-[11px] text-slate-500 truncate flex-1">
                  {s.label}
                </span>
                <span className="text-[11px] font-bold text-slate-600">
                  {s.count}
                </span>
              </div>
            ))}
          </div>
        )}

        {roles.length === 2 && (
          <button
            onClick={onViewFull}
            className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-brand-600 bg-brand-50 hover:bg-brand-100 rounded-xl transition-colors border border-brand-100"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            View full diff
          </button>
        )}
      </div>
    </div>
  );
}
