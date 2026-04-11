import { describe, it, expect } from "vitest";
import { findNarrowerRoles } from "../utils/narrowerRoles";
import type { GcpRole } from "../types";

const ADMIN: GcpRole = {
  name: "roles/storage.admin",
  title: "Storage Admin",
  description: "Full control",
  stage: "GA",
  permissions: [
    "storage.objects.get",
    "storage.objects.list",
    "storage.objects.create",
    "storage.objects.delete",
    "storage.buckets.get",
  ],
  service: "storage",
};

const VIEWER: GcpRole = {
  name: "roles/storage.objectViewer",
  title: "Storage Object Viewer",
  description: "Read access",
  stage: "GA",
  permissions: ["storage.objects.get", "storage.objects.list"],
  service: "storage",
};

const UNRELATED: GcpRole = {
  name: "roles/compute.viewer",
  title: "Compute Viewer",
  description: "Read compute",
  stage: "GA",
  permissions: ["compute.instances.get"],
  service: "compute",
};

describe("findNarrowerRoles", () => {
  it("finds strict subsets", () => {
    const suggestions = findNarrowerRoles(ADMIN, [ADMIN, VIEWER, UNRELATED]);
    expect(suggestions).toHaveLength(1);
    expect(suggestions[0].role.name).toBe("roles/storage.objectViewer");
    expect(suggestions[0].coveragePct).toBe(40);
  });

  it("returns empty when no subsets exist", () => {
    const suggestions = findNarrowerRoles(VIEWER, [ADMIN, VIEWER, UNRELATED]);
    expect(suggestions).toHaveLength(0);
  });
});
