import type { GcpRole } from "../types";

export interface NarrowerSuggestion {
  role: GcpRole;
  sharedPermissions: number;
  totalPermissions: number;
  coveragePct: number;
}

export function findNarrowerRoles(
  currentRole: GcpRole,
  allRoles: GcpRole[],
  limit = 5
): NarrowerSuggestion[] {
  const currentPerms = new Set(currentRole.permissions);
  if (currentPerms.size <= 2) return [];

  const suggestions: NarrowerSuggestion[] = [];

  for (const candidate of allRoles) {
    if (candidate.name === currentRole.name) continue;
    if (candidate.permissions.length >= currentRole.permissions.length) continue;
    if (candidate.permissions.length === 0) continue;

    const shared = candidate.permissions.filter((p) => currentPerms.has(p));
    if (shared.length === 0) continue;

    const isStrictSubset =
      shared.length === candidate.permissions.length &&
      shared.length < currentRole.permissions.length;

    if (!isStrictSubset) continue;

    suggestions.push({
      role: candidate,
      sharedPermissions: shared.length,
      totalPermissions: candidate.permissions.length,
      coveragePct: Math.round(
        (shared.length / currentRole.permissions.length) * 100
      ),
    });
  }

  return suggestions
    .sort((a, b) => b.sharedPermissions - a.sharedPermissions)
    .slice(0, limit);
}
