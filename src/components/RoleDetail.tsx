import {
  ArrowLeft,
  Shield,
  Copy,
  Check,
  ExternalLink,
  Search,
  Fingerprint,
} from "lucide-react";
import { useState, useMemo } from "react";
import type { GcpRole } from "../types";

interface RoleDetailProps {
  role: GcpRole;
  allRoles: GcpRole[];
  onBack: () => void;
  onPermissionClick: (permission: string) => void;
}

export function RoleDetail({
  role,
  allRoles,
  onBack,
  onPermissionClick,
}: RoleDetailProps) {
  const [copied, setCopied] = useState(false);
  const [permFilter, setPermFilter] = useState("");

  const groupedPermissions = useMemo(() => {
    const groups: Record<string, string[]> = {};
    const filtered = permFilter
      ? role.permissions.filter((p) =>
          p.toLowerCase().includes(permFilter.toLowerCase())
        )
      : role.permissions;

    for (const perm of filtered) {
      const parts = perm.split(".");
      const group = parts.length >= 2 ? parts[0] : "other";
      if (!groups[group]) groups[group] = [];
      groups[group].push(perm);
    }
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [role.permissions, permFilter]);

  const filteredCount = groupedPermissions.reduce(
    (sum, [, p]) => sum + p.length,
    0
  );

  const relatedRoles = useMemo(
    () =>
      allRoles
        .filter((r) => r.name !== role.name && r.service === role.service)
        .slice(0, 6),
    [allRoles, role]
  );

  function handleCopy() {
    navigator.clipboard.writeText(role.name);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const isBasic = ["roles/viewer", "roles/editor", "roles/owner"].includes(
    role.name
  );

  return (
    <div className="max-w-4xl mx-auto animate-fade-up">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-brand-600 mb-6 transition-colors group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to roles
      </button>

      <div className="bg-surface-raised rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-br from-slate-50 to-white border-b border-slate-100">
          <div className="flex items-start gap-4">
            <div
              className={`shrink-0 rounded-2xl p-3.5 ${
                isBasic
                  ? "bg-gradient-to-br from-amber-100 to-orange-50 text-amber-500"
                  : "bg-gradient-to-br from-brand-100 to-violet-50 text-brand-500"
              }`}
            >
              {isBasic ? (
                <Fingerprint className="h-7 w-7" />
              ) : (
                <Shield className="h-7 w-7" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {role.title}
                </h1>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                  {role.stage}
                </span>
                {isBasic && (
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-amber-50 text-amber-600 border border-amber-200/60">
                    Basic
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <code className="text-sm text-slate-400 font-mono">
                  {role.name}
                </code>
                <button
                  onClick={handleCopy}
                  className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Copy role name"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 text-slate-300 hover:text-slate-500" />
                  )}
                </button>
              </div>
              {role.description && (
                <p className="mt-4 text-[15px] text-slate-600 leading-relaxed">
                  {role.description}
                </p>
              )}
              <div className="mt-4 flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1.5 text-sm text-slate-400">
                  <span className="font-medium text-slate-600">
                    {role.service}
                  </span>
                </div>
                <div className="w-px h-4 bg-slate-200" />
                <div className="flex items-center gap-1.5 text-sm text-slate-400">
                  <span className="font-bold text-brand-600">
                    {role.permissions.length}
                  </span>{" "}
                  permissions
                </div>
                <div className="w-px h-4 bg-slate-200" />
                <a
                  href={`https://cloud.google.com/iam/docs/understanding-roles#${role.name.replace("roles/", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brand-500 hover:text-brand-700 flex items-center gap-1 transition-colors font-medium"
                >
                  GCP Docs
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Permissions */}
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4 mb-5">
            <h2 className="text-sm font-bold text-slate-700">
              Permissions
              {permFilter && (
                <span className="font-normal text-slate-400 ml-1.5">
                  ({filteredCount} of {role.permissions.length})
                </span>
              )}
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-300" />
              <input
                type="text"
                value={permFilter}
                onChange={(e) => setPermFilter(e.target.value)}
                placeholder="Filter..."
                className="pl-9 pr-3 py-1.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 w-48 transition-all"
              />
            </div>
          </div>

          <div className="space-y-5">
            {groupedPermissions.map(([group, perms]) => (
              <div key={group}>
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2.5 flex items-center gap-2">
                  {group}
                  <span className="text-slate-300 font-normal">
                    {perms.length}
                  </span>
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {perms.sort().map((perm) => (
                    <button
                      key={perm}
                      onClick={() => onPermissionClick(perm)}
                      className="text-xs font-mono px-2.5 py-1 bg-slate-50 hover:bg-brand-50 text-slate-500 hover:text-brand-700 rounded-lg transition-all border border-transparent hover:border-brand-200"
                      title={`See all roles with ${perm}`}
                    >
                      {perm}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Roles */}
        {relatedRoles.length > 0 && (
          <div className="p-6 sm:p-8 border-t border-slate-100 bg-slate-50/50">
            <h2 className="text-sm font-bold text-slate-700 mb-4">
              Other {role.service} roles
            </h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {relatedRoles.map((r) => (
                <button
                  key={r.name}
                  onClick={() => onPermissionClick(r.name)}
                  className="flex items-center justify-between p-3.5 bg-surface-raised rounded-xl border border-slate-200/80 hover:border-brand-200 hover:shadow-sm transition-all text-left group"
                >
                  <div className="min-w-0">
                    <span className="text-sm font-medium text-slate-700 group-hover:text-brand-700 transition-colors">
                      {r.title}
                    </span>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5 truncate">
                      {r.name}
                    </p>
                  </div>
                  <span className="text-[11px] text-slate-400 ml-3 shrink-0 font-medium">
                    {r.permissions.length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
