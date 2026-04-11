import { X, ArrowLeftRight } from "lucide-react";
import { useMemo } from "react";
import { compareRoles } from "../utils/search";
import type { GcpRole } from "../types";

interface RoleComparisonProps {
  roles: GcpRole[];
  onRemove: (role: GcpRole) => void;
  onClear: () => void;
}

export function RoleComparison({
  roles,
  onRemove,
  onClear,
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
        <div className="flex gap-2 mb-4">
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
          <div className="space-y-3">
            {[
              {
                label: "Shared",
                items: comparison.shared,
                dot: "bg-emerald-400",
                tag: "bg-emerald-50 text-emerald-600",
              },
              {
                label: `Only ${roles[0].title}`,
                items: comparison.onlyA,
                dot: "bg-brand-400",
                tag: "bg-brand-50 text-brand-600",
              },
              {
                label: `Only ${roles[1].title}`,
                items: comparison.onlyB,
                dot: "bg-violet-400",
                tag: "bg-violet-50 text-violet-600",
              },
            ].map((section) => (
              <div key={section.label}>
                <div className="flex items-center gap-2 mb-1.5">
                  <div
                    className={`h-2 w-2 rounded-full ${section.dot}`}
                  />
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {section.label} ({section.items.length})
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                  {section.items.length > 0 ? (
                    section.items.slice(0, 20).map((p) => (
                      <span
                        key={p}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${section.tag}`}
                      >
                        {p}
                      </span>
                    ))
                  ) : (
                    <span className="text-[10px] text-slate-300 italic">
                      None
                    </span>
                  )}
                  {section.items.length > 20 && (
                    <span className="text-[10px] text-slate-400 px-2 py-0.5">
                      +{section.items.length - 20} more
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
