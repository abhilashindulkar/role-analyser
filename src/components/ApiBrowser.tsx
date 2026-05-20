import { useMemo } from "react";
import { Boxes, Search, X } from "lucide-react";
import { useApiData } from "../hooks/useApiData";
import { ApiCard } from "./ApiCard";
import type { ApiCategory, GcpApi, GcpRole } from "../types";

interface ApiBrowserProps {
  roles: GcpRole[];
  onApiClick: (api: GcpApi) => void;
}

const STAGES = ["GA", "BETA", "ALPHA", "DEPRECATED"] as const;

export function ApiBrowser({ roles, onApiClick }: ApiBrowserProps) {
  const {
    apis,
    filteredApis,
    filters,
    categories,
    updateQuery,
    toggleCategory,
    toggleStage,
    clearFilters,
  } = useApiData();

  const categoryCounts = useMemo(() => {
    const counts = new Map<ApiCategory, number>();
    for (const api of apis) {
      counts.set(api.category, (counts.get(api.category) ?? 0) + 1);
    }
    return counts;
  }, [apis]);

  const hasActiveFilters =
    filters.query.length > 0 ||
    filters.categories.length > 0 ||
    filters.stages.length > 0;

  return (
    <div className="max-w-6xl mx-auto animate-fade-up">
      <div className="bg-surface-raised dark:bg-dark-raised rounded-2xl border border-slate-200/80 dark:border-dark-border shadow-sm overflow-hidden mb-6">
        <div className="p-6 sm:p-8 bg-gradient-to-br from-sky-50/50 to-white dark:from-sky-950/10 dark:to-dark-raised border-b border-slate-100 dark:border-dark-border">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-gradient-to-br from-sky-100 to-brand-50 dark:from-sky-950/40 dark:to-brand-950/40 rounded-2xl p-3">
              <Boxes className="h-6 w-6 text-sky-500 dark:text-sky-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                GCP APIs
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Browse {apis.length} Google Cloud service APIs and the IAM roles
                that use them
              </p>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 dark:text-slate-600" />
            <input
              type="text"
              value={filters.query}
              onChange={(e) => updateQuery(e.target.value)}
              placeholder="Search by API name, title, or category... e.g. compute, bigquery, vertex ai"
              className="w-full pl-11 pr-11 py-3 border border-slate-200 dark:border-dark-border dark:bg-dark-surface dark:text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 transition-all"
            />
            {filters.query && (
              <button
                onClick={() => updateQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-300 dark:text-slate-600 hover:text-slate-500 dark:hover:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-surface rounded-lg transition-all"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="px-6 sm:px-8 py-4 flex flex-wrap items-center gap-2 border-b border-slate-100 dark:border-dark-border">
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mr-2">
            Category
          </span>
          {categories.map((cat) => {
            const active = filters.categories.includes(cat);
            return (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                  active
                    ? "bg-brand-50 dark:bg-brand-950/30 border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-400 font-semibold"
                    : "bg-white dark:bg-dark-surface border-slate-200 dark:border-dark-border text-slate-500 dark:text-slate-400 hover:border-brand-200 dark:hover:border-brand-700 hover:text-brand-600 dark:hover:text-brand-400"
                }`}
              >
                {cat}
                <span className="ml-1.5 text-[10px] text-slate-400 dark:text-slate-500">
                  {categoryCounts.get(cat) ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        <div className="px-6 sm:px-8 py-4 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mr-2">
            Stage
          </span>
          {STAGES.map((stage) => {
            const active = filters.stages.includes(stage);
            return (
              <button
                key={stage}
                onClick={() => toggleStage(stage)}
                className={`text-[11px] px-2.5 py-1 rounded-md border font-semibold transition-all ${
                  active
                    ? "bg-brand-50 dark:bg-brand-950/30 border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-400"
                    : "bg-white dark:bg-dark-surface border-slate-200 dark:border-dark-border text-slate-500 dark:text-slate-400 hover:border-brand-200 dark:hover:border-brand-700"
                }`}
              >
                {stage}
              </button>
            );
          })}

          <div className="flex-1" />

          <span className="text-xs text-slate-400 dark:text-slate-500">
            <span className="font-semibold text-slate-600 dark:text-slate-300">
              {filteredApis.length}
            </span>{" "}
            of {apis.length}
          </span>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-brand-600 dark:text-brand-400 hover:underline font-medium"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {filteredApis.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {filteredApis.map((api, i) => (
            <div
              key={api.name}
              className="animate-fade-up"
              style={{ animationDelay: `${Math.min(i * 20, 240)}ms` }}
            >
              <ApiCard api={api} roles={roles} onClick={onApiClick} />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center animate-fade-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 dark:bg-dark-raised mb-4">
            <Boxes className="h-7 w-7 text-slate-300 dark:text-slate-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-300">
            No APIs match your search
          </h3>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-1 max-w-sm mx-auto">
            Try a different keyword or clear your filters
          </p>
          <button
            onClick={clearFilters}
            className="mt-5 text-sm text-brand-600 hover:text-brand-700 dark:text-brand-400 font-semibold px-4 py-2 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-950/30 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
