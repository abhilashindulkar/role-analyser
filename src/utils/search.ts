import Fuse, { type IFuseOptions } from "fuse.js";
import type { GcpRole, GcpService, SearchFilters } from "../types";

const fuseOptions: IFuseOptions<GcpRole> = {
  keys: [
    { name: "name", weight: 0.3 },
    { name: "title", weight: 0.3 },
    { name: "description", weight: 0.2 },
    { name: "permissions", weight: 0.15 },
    { name: "service", weight: 0.05 },
  ],
  threshold: 0.35,
  includeScore: true,
  ignoreLocation: true,
  useExtendedSearch: true,
};

let fuseInstance: Fuse<GcpRole> | null = null;

function getFuse(roles: GcpRole[]): Fuse<GcpRole> {
  if (!fuseInstance) {
    fuseInstance = new Fuse(roles, fuseOptions);
  }
  return fuseInstance;
}

export function resetFuseIndex(): void {
  fuseInstance = null;
}

export function searchRoles(
  roles: GcpRole[],
  filters: SearchFilters
): GcpRole[] {
  let results = roles;

  if (filters.query.trim()) {
    const fuse = getFuse(roles);
    results = fuse.search(filters.query).map((r) => r.item);
  }

  if (filters.services.length > 0) {
    results = results.filter((r) => filters.services.includes(r.service));
  }

  if (filters.stages.length > 0) {
    results = results.filter((r) => filters.stages.includes(r.stage));
  }

  if (filters.category !== "all") {
    results = results.filter((r) => {
      switch (filters.category) {
        case "basic":
          return ["roles/viewer", "roles/editor", "roles/owner"].includes(
            r.name
          );
        case "predefined":
          return (
            !["roles/viewer", "roles/editor", "roles/owner"].includes(
              r.name
            ) && r.name.startsWith("roles/")
          );
        case "custom":
          return !r.name.startsWith("roles/");
      }
    });
  }

  return results;
}

export function extractServices(roles: GcpRole[]): GcpService[] {
  const serviceMap = new Map<
    string,
    { roleCount: number; permissions: Set<string> }
  >();

  for (const role of roles) {
    const existing = serviceMap.get(role.service);
    if (existing) {
      existing.roleCount++;
      role.permissions.forEach((p) => existing.permissions.add(p));
    } else {
      serviceMap.set(role.service, {
        roleCount: 1,
        permissions: new Set(role.permissions),
      });
    }
  }

  return Array.from(serviceMap.entries())
    .map(([name, data]) => ({
      name,
      displayName: name,
      roleCount: data.roleCount,
      permissionCount: data.permissions.size,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function findRolesWithPermission(
  roles: GcpRole[],
  permission: string
): GcpRole[] {
  return roles.filter((r) => r.permissions.includes(permission));
}

export function compareRoles(
  roleA: GcpRole,
  roleB: GcpRole
): {
  shared: string[];
  onlyA: string[];
  onlyB: string[];
} {
  const setA = new Set(roleA.permissions);
  const setB = new Set(roleB.permissions);

  const shared = [...setA].filter((p) => setB.has(p));
  const onlyA = [...setA].filter((p) => !setB.has(p));
  const onlyB = [...setB].filter((p) => !setA.has(p));

  return { shared, onlyA, onlyB };
}

export function getAllPermissions(roles: GcpRole[]): string[] {
  const perms = new Set<string>();
  for (const role of roles) {
    for (const p of role.permissions) {
      perms.add(p);
    }
  }
  return [...perms].sort();
}
