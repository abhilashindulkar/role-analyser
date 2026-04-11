import { describe, it, expect } from "vitest";
import {
  searchRoles,
  extractServices,
  findRolesWithPermission,
  compareRoles,
  getAllPermissions,
} from "../utils/search";
import type { GcpRole } from "../types";

const MOCK_ROLES: GcpRole[] = [
  {
    name: "roles/storage.objectViewer",
    title: "Storage Object Viewer",
    description: "Read access to objects",
    stage: "GA",
    permissions: ["storage.objects.get", "storage.objects.list"],
    service: "storage",
  },
  {
    name: "roles/storage.admin",
    title: "Storage Admin",
    description: "Full control of storage",
    stage: "GA",
    permissions: [
      "storage.objects.get",
      "storage.objects.list",
      "storage.objects.create",
      "storage.objects.delete",
      "storage.buckets.get",
      "storage.buckets.create",
    ],
    service: "storage",
  },
  {
    name: "roles/viewer",
    title: "Viewer",
    description: "Read access to all resources",
    stage: "GA",
    permissions: ["resourcemanager.projects.get"],
    service: "iam",
  },
  {
    name: "roles/compute.viewer",
    title: "Compute Viewer",
    description: "Read access to Compute Engine",
    stage: "BETA",
    permissions: ["compute.instances.get", "compute.instances.list"],
    service: "compute",
  },
];

describe("searchRoles", () => {
  it("returns all roles with empty query", () => {
    const results = searchRoles(MOCK_ROLES, {
      query: "",
      services: [],
      stages: [],
      category: "all",
    });
    expect(results).toHaveLength(4);
  });

  it("filters by service", () => {
    const results = searchRoles(MOCK_ROLES, {
      query: "",
      services: ["storage"],
      stages: [],
      category: "all",
    });
    expect(results).toHaveLength(2);
    expect(results.every((r) => r.service === "storage")).toBe(true);
  });

  it("filters by stage", () => {
    const results = searchRoles(MOCK_ROLES, {
      query: "",
      services: [],
      stages: ["BETA"],
      category: "all",
    });
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe("roles/compute.viewer");
  });

  it("filters by basic category", () => {
    const results = searchRoles(MOCK_ROLES, {
      query: "",
      services: [],
      stages: [],
      category: "basic",
    });
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe("roles/viewer");
  });

  it("filters by predefined category", () => {
    const results = searchRoles(MOCK_ROLES, {
      query: "",
      services: [],
      stages: [],
      category: "predefined",
    });
    expect(results).toHaveLength(3);
    expect(results.every((r) => r.name !== "roles/viewer")).toBe(true);
  });
});

describe("extractServices", () => {
  it("extracts unique services with counts", () => {
    const services = extractServices(MOCK_ROLES);
    expect(services).toHaveLength(3);

    const storage = services.find((s) => s.name === "storage");
    expect(storage).toBeDefined();
    expect(storage!.roleCount).toBe(2);
  });
});

describe("findRolesWithPermission", () => {
  it("finds roles containing a permission", () => {
    const roles = findRolesWithPermission(MOCK_ROLES, "storage.objects.get");
    expect(roles).toHaveLength(2);
  });

  it("returns empty for unknown permission", () => {
    const roles = findRolesWithPermission(MOCK_ROLES, "nonexistent.perm");
    expect(roles).toHaveLength(0);
  });
});

describe("compareRoles", () => {
  it("computes shared and unique permissions", () => {
    const result = compareRoles(MOCK_ROLES[0], MOCK_ROLES[1]);
    expect(result.shared).toEqual(
      expect.arrayContaining(["storage.objects.get", "storage.objects.list"])
    );
    expect(result.shared).toHaveLength(2);
    expect(result.onlyA).toHaveLength(0);
    expect(result.onlyB).toHaveLength(4);
  });
});

describe("getAllPermissions", () => {
  it("returns sorted unique permissions", () => {
    const perms = getAllPermissions(MOCK_ROLES);
    expect(perms.length).toBeGreaterThan(0);
    for (let i = 1; i < perms.length; i++) {
      expect(perms[i] >= perms[i - 1]).toBe(true);
    }
    const unique = new Set(perms);
    expect(unique.size).toBe(perms.length);
  });
});
