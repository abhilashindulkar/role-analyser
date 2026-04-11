import { Search, X, Command } from "lucide-react";

interface SearchBarProps {
  query: string;
  onChange: (query: string) => void;
  placeholder?: string;
  resultCount?: number;
  totalCount?: number;
}

export function SearchBar({
  query,
  onChange,
  placeholder = "Search roles, permissions, or services...",
  resultCount,
  totalCount,
}: SearchBarProps) {
  return (
    <div className="relative">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-brand-500 transition-colors" />
        <input
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-24 py-4 bg-surface-raised border border-slate-200/80 rounded-2xl text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 shadow-sm hover:shadow-md hover:border-slate-300 transition-all text-[15px]"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {query ? (
            <button
              onClick={() => onChange("")}
              className="p-1.5 text-slate-300 hover:text-slate-500 hover:bg-slate-100 rounded-lg transition-all"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-slate-300 bg-slate-50 rounded-md border border-slate-200">
              <Command className="h-2.5 w-2.5" />K
            </kbd>
          )}
        </div>
      </div>
      {resultCount !== undefined && totalCount !== undefined && (
        <div className="mt-2.5 flex items-center justify-between px-1">
          <p className="text-sm text-slate-400">
            {query ? (
              <>
                <span className="font-semibold text-slate-600">
                  {resultCount}
                </span>{" "}
                of {totalCount} roles
              </>
            ) : (
              <>
                <span className="font-semibold text-slate-600">
                  {totalCount}
                </span>{" "}
                roles available
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
