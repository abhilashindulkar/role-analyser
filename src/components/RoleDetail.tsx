import {
  ArrowLeft, Shield, Copy, Check, ExternalLink, Search,
  Fingerprint, Download, ChevronDown, TrendingDown,
} from "lucide-react";
import { useState, useMemo } from "react";
import { downloadRole, copyToClipboard } from "../utils/exportRole";
import { findNarrowerRoles } from "../utils/narrowerRoles";
import type { ExportFormat } from "../utils/exportRole";
import type { GcpRole } from "../types";

interface RoleDetailProps {
  role: GcpRole;
  allRoles: GcpRole[];
  onBack: () => void;
  onPermissionClick: (permission: string) => void;
  onRoleClick: (role: GcpRole) => void;
}

export function RoleDetail({ role, allRoles, onBack, onPermissionClick, onRoleClick }: RoleDetailProps) {
  const [copied, setCopied] = useState(false);
  const [permFilter, setPermFilter] = useState("");
  const [exportOpen, setExportOpen] = useState(false);
  const [downloaded, setDownloaded] = useState<ExportFormat | null>(null);

  const groupedPermissions = useMemo(() => {
    const groups: Record<string, string[]> = {};
    const filtered = permFilter
      ? role.permissions.filter((p) => p.toLowerCase().includes(permFilter.toLowerCase()))
      : role.permissions;
    for (const perm of filtered) {
      const group = perm.split(".").length >= 2 ? perm.split(".")[0] : "other";
      if (!groups[group]) groups[group] = [];
      groups[group].push(perm);
    }
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [role.permissions, permFilter]);

  const filteredCount = groupedPermissions.reduce((sum, [, p]) => sum + p.length, 0);

  const relatedRoles = useMemo(
    () => allRoles.filter((r) => r.name !== role.name && r.service === role.service).slice(0, 6),
    [allRoles, role]
  );

  const narrowerRoles = useMemo(
    () => findNarrowerRoles(role, allRoles),
    [role, allRoles]
  );

  function handleCopy() {
    copyToClipboard(role.name);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleExport(format: ExportFormat) {
    downloadRole(role, format);
    setDownloaded(format);
    setTimeout(() => setDownloaded(null), 2000);
  }

  const isBasic = ["roles/viewer", "roles/editor", "roles/owner"].includes(role.name);

  return (
    <div className="max-w-4xl mx-auto animate-fade-up">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-400 dark:text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 mb-6 transition-colors group">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />Back to roles
      </button>

      <div className="bg-surface-raised dark:bg-dark-raised rounded-2xl border border-slate-200/80 dark:border-dark-border shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-50 to-white dark:from-dark-surface dark:to-dark-raised border-b border-slate-100 dark:border-dark-border">
          <div className="flex items-start gap-4">
            <div className={`shrink-0 rounded-2xl p-3.5 ${isBasic ? "bg-gradient-to-br from-amber-100 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 text-amber-500" : "bg-gradient-to-br from-brand-100 to-violet-50 dark:from-brand-950/40 dark:to-violet-950/40 text-brand-500"}`}>
              {isBasic ? <Fingerprint className="h-7 w-7" /> : <Shield className="h-7 w-7" />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{role.title}</h1>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800">{role.stage}</span>
                  {isBasic && <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800">Basic</span>}
                </div>
                {/* Export dropdown */}
                <div className="relative shrink-0">
                  <button onClick={() => setExportOpen(!exportOpen)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg hover:border-brand-200 dark:hover:border-brand-700 transition-colors">
                    <Download className="h-3.5 w-3.5" />Export<ChevronDown className="h-3 w-3" />
                  </button>
                  {exportOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setExportOpen(false)} />
                      <div className="absolute right-0 top-full mt-1 w-44 bg-surface-raised dark:bg-dark-raised border border-slate-200 dark:border-dark-border rounded-xl shadow-xl z-50 overflow-hidden">
                        {(["json", "yaml", "terraform"] as ExportFormat[]).map((fmt) => (
                          <button key={fmt} onClick={() => { handleExport(fmt); setExportOpen(false); }} className="w-full text-left px-4 py-2.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-brand-950/30 transition-colors flex items-center justify-between">
                            <span>{fmt === "terraform" ? "Terraform (HCL)" : fmt.toUpperCase()}</span>
                            {downloaded === fmt && <Check className="h-3 w-3 text-emerald-500" />}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <code className="text-sm text-slate-400 dark:text-slate-500 font-mono">{role.name}</code>
                <button onClick={handleCopy} className="p-1 hover:bg-slate-100 dark:hover:bg-dark-surface rounded-lg transition-colors" title="Copy role name">
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600 hover:text-slate-500" />}
                </button>
              </div>
              {role.description && <p className="mt-4 text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">{role.description}</p>}
              <div className="mt-4 flex items-center gap-4 flex-wrap">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{role.service}</span>
                <div className="w-px h-4 bg-slate-200 dark:bg-dark-border" />
                <span className="text-sm text-slate-400 dark:text-slate-500"><span className="font-bold text-brand-600 dark:text-brand-400">{role.permissions.length}</span> permissions</span>
                <div className="w-px h-4 bg-slate-200 dark:bg-dark-border" />
                <a href={`https://cloud.google.com/iam/docs/understanding-roles#${role.name.replace("roles/", "")}`} target="_blank" rel="noopener noreferrer" className="text-sm text-brand-500 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 flex items-center gap-1 transition-colors font-medium">
                  GCP Docs<ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Narrower role suggestions */}
        {narrowerRoles.length > 0 && (
          <div className="px-6 sm:px-8 py-4 bg-amber-50/50 dark:bg-amber-950/10 border-b border-slate-100 dark:border-dark-border">
            <div className="flex items-center gap-2 mb-3">
              <TrendingDown className="h-4 w-4 text-amber-500" />
              <h2 className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">Narrower alternatives</h2>
            </div>
            <p className="text-xs text-amber-600/70 dark:text-amber-400/60 mb-3">These roles are strict subsets of this role's permissions. Consider them for tighter access.</p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {narrowerRoles.map((s) => (
                <button key={s.role.name} onClick={() => onRoleClick(s.role)} className="shrink-0 p-3 bg-white dark:bg-dark-raised rounded-xl border border-amber-200 dark:border-amber-800/50 hover:border-brand-300 dark:hover:border-brand-600 hover:shadow-sm transition-all text-left max-w-[200px]">
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">{s.role.title}</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-0.5 truncate">{s.role.name}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">{s.totalPermissions} perms</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">{s.coveragePct}% coverage</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Permissions */}
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4 mb-5">
            <h2 className="text-sm font-bold text-slate-700 dark:text-slate-200">
              Permissions
              {permFilter && <span className="font-normal text-slate-400 dark:text-slate-500 ml-1.5">({filteredCount} of {role.permissions.length})</span>}
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-300 dark:text-slate-600" />
              <input type="text" value={permFilter} onChange={(e) => setPermFilter(e.target.value)} placeholder="Filter..." className="pl-9 pr-3 py-1.5 text-sm border border-slate-200 dark:border-dark-border dark:bg-dark-surface dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 w-48 transition-all" />
            </div>
          </div>
          <div className="space-y-5">
            {groupedPermissions.map(([group, perms]) => (
              <div key={group}>
                <h3 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2.5 flex items-center gap-2">
                  {group}<span className="text-slate-300 dark:text-slate-600 font-normal">{perms.length}</span>
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {[...perms].sort().map((perm) => (
                    <button key={perm} onClick={() => onPermissionClick(perm)} className="text-xs font-mono px-2.5 py-1 bg-slate-50 dark:bg-dark-surface hover:bg-brand-50 dark:hover:bg-brand-950/30 text-slate-500 dark:text-slate-400 hover:text-brand-700 dark:hover:text-brand-400 rounded-lg transition-all border border-transparent hover:border-brand-200 dark:hover:border-brand-700" title={`See all roles with ${perm}`}>
                      {perm}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {relatedRoles.length > 0 && (
          <div className="p-6 sm:p-8 border-t border-slate-100 dark:border-dark-border bg-slate-50/50 dark:bg-dark-surface/50">
            <h2 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-4">Other {role.service} roles</h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {relatedRoles.map((r) => (
                <button key={r.name} onClick={() => onRoleClick(r)} className="flex items-center justify-between p-3.5 bg-surface-raised dark:bg-dark-raised rounded-xl border border-slate-200/80 dark:border-dark-border hover:border-brand-200 dark:hover:border-brand-700 hover:shadow-sm transition-all text-left group">
                  <div className="min-w-0">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">{r.title}</span>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 font-mono mt-0.5 truncate">{r.name}</p>
                  </div>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 ml-3 shrink-0 font-medium">{r.permissions.length}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
