import Fuse, { type IFuseOptions } from "fuse.js";
import type { ApiFilters, GcpApi, GcpRole } from "../types";

const fuseOptions: IFuseOptions<GcpApi> = {
  keys: [
    { name: "name", weight: 0.35 },
    { name: "title", weight: 0.3 },
    { name: "summary", weight: 0.2 },
    { name: "category", weight: 0.1 },
    { name: "permissionPrefix", weight: 0.05 },
  ],
  threshold: 0.35,
  includeScore: true,
  ignoreLocation: true,
};

let fuseInstance: Fuse<GcpApi> | null = null;

function getFuse(apis: GcpApi[]): Fuse<GcpApi> {
  if (!fuseInstance) {
    fuseInstance = new Fuse(apis, fuseOptions);
  }
  return fuseInstance;
}

export function resetApiFuseIndex(): void {
  fuseInstance = null;
}

export function searchApis(apis: GcpApi[], filters: ApiFilters): GcpApi[] {
  let results = apis;

  if (filters.query.trim()) {
    const fuse = getFuse(apis);
    results = fuse.search(filters.query).map((r) => r.item);
  }

  if (filters.categories.length > 0) {
    results = results.filter((a) => filters.categories.includes(a.category));
  }

  if (filters.stages.length > 0) {
    results = results.filter((a) => filters.stages.includes(a.stage));
  }

  return results;
}

export function findRolesForApi(api: GcpApi, roles: GcpRole[]): GcpRole[] {
  const prefix = `${api.permissionPrefix}.`;
  return roles
    .filter((r) => r.permissions.some((p) => p.startsWith(prefix)))
    .sort((a, b) => a.permissions.length - b.permissions.length);
}

export function countPermissionsForApi(api: GcpApi, roles: GcpRole[]): number {
  const prefix = `${api.permissionPrefix}.`;
  const seen = new Set<string>();
  for (const role of roles) {
    for (const perm of role.permissions) {
      if (perm.startsWith(prefix)) seen.add(perm);
    }
  }
  return seen.size;
}
