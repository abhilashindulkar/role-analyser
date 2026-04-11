import { useMemo } from "react";
import type { GcpRole } from "../types";

interface PermissionChartProps {
  roles: GcpRole[];
}

export function PermissionChart({ roles }: PermissionChartProps) {
  const buckets = useMemo(() => {
    const ranges = [
      { label: "1-5", min: 1, max: 5 },
      { label: "6-10", min: 6, max: 10 },
      { label: "11-20", min: 11, max: 20 },
      { label: "21-50", min: 21, max: 50 },
      { label: "51-100", min: 51, max: 100 },
      { label: "100+", min: 101, max: Infinity },
    ];

    return ranges.map((r) => ({
      label: r.label,
      count: roles.filter(
        (role) =>
          role.permissions.length >= r.min &&
          role.permissions.length <= r.max
      ).length,
    }));
  }, [roles]);

  const maxCount = Math.max(...buckets.map((b) => b.count), 1);

  return (
    <div>
      <h3 className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
        Permission Distribution
      </h3>
      <div className="flex items-end gap-1.5 h-20">
        {buckets.map((bucket) => {
          const height =
            maxCount > 0 ? (bucket.count / maxCount) * 100 : 0;
          return (
            <div key={bucket.label} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 tabular-nums">
                {bucket.count}
              </span>
              <div className="w-full bg-slate-100 dark:bg-dark-surface rounded-t-sm overflow-hidden relative" style={{ height: "60px" }}>
                <div
                  className="absolute bottom-0 w-full bg-gradient-to-t from-brand-500 to-brand-400 rounded-t-sm transition-all"
                  style={{ height: `${height}%` }}
                />
              </div>
              <span className="text-[9px] text-slate-400 dark:text-slate-500 font-medium">
                {bucket.label}
              </span>
            </div>
          );
        })}
      </div>
      <p className="text-[9px] text-slate-300 dark:text-slate-600 text-center mt-1.5">
        Permissions per role
      </p>
    </div>
  );
}
