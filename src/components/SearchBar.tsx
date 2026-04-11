import { forwardRef } from "react";
import { Search, X, Command } from "lucide-react";

interface SearchBarProps {
  query: string;
  onChange: (query: string) => void;
  placeholder?: string;
  resultCount?: number;
  totalCount?: number;
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  function SearchBar(
    {
      query,
      onChange,
      placeholder = "Search roles, permissions, or services...",
      resultCount,
      totalCount,
    },
    ref
  ) {
    return (
      <div className="relative">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 dark:text-slate-600 group-focus-within:text-brand-500 transition-colors" />
          <input
            ref={ref}
            type="text"
            value={query}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-12 pr-24 py-4 bg-surface-raised dark:bg-dark-raised border border-slate-200/80 dark:border-dark-border rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all text-[15px]"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {query ? (
              <button
                onClick={() => onChange("")}
                className="p-1.5 text-slate-300 dark:text-slate-600 hover:text-slate-500 dark:hover:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-surface rounded-lg transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            ) : (
              <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-slate-300 dark:text-slate-600 bg-slate-50 dark:bg-dark-surface rounded-md border border-slate-200 dark:border-dark-border">
                <Command className="h-2.5 w-2.5" />K
              </kbd>
            )}
          </div>
        </div>
        {resultCount !== undefined && totalCount !== undefined && (
          <div className="mt-2.5 flex items-center justify-between px-1">
            <p className="text-sm text-slate-400 dark:text-slate-500">
              {query ? (
                <>
                  <span className="font-semibold text-slate-600 dark:text-slate-300">{resultCount}</span> of {totalCount} roles
                </>
              ) : (
                <>
                  <span className="font-semibold text-slate-600 dark:text-slate-300">{totalCount}</span> roles available
                </>
              )}
            </p>
          </div>
        )}
      </div>
    );
  }
);
