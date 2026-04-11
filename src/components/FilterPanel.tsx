import { Filter, ChevronDown, ChevronUp, X, Server } from "lucide-react";
import { useState } from "react";
import type { GcpService, SearchFilters } from "../types";

interface FilterPanelProps {
  services: GcpService[];
  filters: SearchFilters;
  onToggleService: (service: string) => void;
  onToggleStage: (stage: string) => void;
  onSetCategory: (category: SearchFilters["category"]) => void;
  onClear: () => void;
  onServiceClick?: (service: string) => void;
}

const STAGES = ["GA", "BETA", "ALPHA", "DEPRECATED", "EAP"] as const;
const CATEGORIES = [
  { value: "all" as const, label: "All" },
  { value: "basic" as const, label: "Basic" },
  { value: "predefined" as const, label: "Predefined" },
] as const;

export function FilterPanel({
  services,
  filters,
  onToggleService,
  onToggleStage,
  onSetCategory,
  onClear,
  onServiceClick,
}: FilterPanelProps) {
  const [showServices, setShowServices] = useState(false);
  const activeCount =
    filters.services.length +
    filters.stages.length +
    (filters.category !== "all" ? 1 : 0);

  return (
    <div className="bg-surface-raised dark:bg-dark-raised rounded-2xl border border-slate-200/80 dark:border-dark-border shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          <h3 className="font-bold text-slate-600 dark:text-slate-300 text-xs uppercase tracking-widest">Filters</h3>
          {activeCount > 0 && (
            <span className="text-[10px] font-bold bg-brand-50 dark:bg-brand-950/30 text-brand-600 dark:text-brand-400 px-1.5 py-0.5 rounded-md border border-brand-100 dark:border-brand-800">{activeCount}</span>
          )}
        </div>
        {activeCount > 0 && (
          <button onClick={onClear} className="text-[11px] text-slate-400 dark:text-slate-500 hover:text-red-500 flex items-center gap-1 transition-colors font-medium">
            <X className="h-3 w-3" />Clear
          </button>
        )}
      </div>

      <div className="mb-4">
        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-widest">Category</p>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => (
            <button key={cat.value} onClick={() => onSetCategory(cat.value)} className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${
              filters.category === cat.value
                ? "bg-brand-50 dark:bg-brand-950/30 text-brand-700 dark:text-brand-400 border border-brand-200 dark:border-brand-800"
                : "bg-slate-50 dark:bg-dark-surface text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-border border border-transparent"
            }`}>{cat.label}</button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-widest">Stage</p>
        <div className="flex flex-wrap gap-1.5">
          {STAGES.map((stage) => (
            <button key={stage} onClick={() => onToggleStage(stage)} className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${
              filters.stages.includes(stage)
                ? "bg-brand-50 dark:bg-brand-950/30 text-brand-700 dark:text-brand-400 border border-brand-200 dark:border-brand-800"
                : "bg-slate-50 dark:bg-dark-surface text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-border border border-transparent"
            }`}>{stage}</button>
          ))}
        </div>
      </div>

      <div>
        <button onClick={() => setShowServices(!showServices)} className="flex items-center justify-between w-full mb-2 group">
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Services{filters.services.length > 0 && <span className="ml-1 text-brand-600 dark:text-brand-400">({filters.services.length})</span>}
          </p>
          {showServices ? <ChevronUp className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600" /> : <ChevronDown className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600" />}
        </button>
        {showServices && (
          <div className="max-h-60 overflow-y-auto space-y-0.5 pr-1">
            {services.map((svc) => (
              <div key={svc.name} className="flex items-center gap-1">
                <button
                  onClick={() => onToggleService(svc.name)}
                  className={`flex-1 flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-all ${
                    filters.services.includes(svc.name)
                      ? "bg-brand-50 dark:bg-brand-950/30 text-brand-700 dark:text-brand-400 font-medium"
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-dark-surface"
                  }`}
                >
                  <span className="truncate">{svc.displayName}</span>
                  <span className="text-slate-300 dark:text-slate-600 ml-2 shrink-0 tabular-nums">{svc.roleCount}</span>
                </button>
                {onServiceClick && (
                  <button onClick={() => onServiceClick(svc.name)} className="shrink-0 p-1.5 text-slate-300 dark:text-slate-600 hover:text-brand-500 dark:hover:text-brand-400 rounded-lg transition-colors" title={`View ${svc.displayName} details`}>
                    <Server className="h-3 w-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
