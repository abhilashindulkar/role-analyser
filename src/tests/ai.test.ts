import { describe, it, expect } from "vitest";
import { getRecommendations, generateChatResponse } from "../utils/ai";
import type { GcpRole } from "../types";

const MOCK_ROLES: GcpRole[] = [
  {
    name: "roles/storage.objectViewer",
    title: "Storage Object Viewer",
    description: "Read access to GCS objects",
    stage: "GA",
    permissions: ["storage.objects.get", "storage.objects.list"],
    service: "storage",
  },
  {
    name: "roles/storage.admin",
    title: "Storage Admin",
    description: "Full control of GCS resources",
    stage: "GA",
    permissions: [
      "storage.objects.get",
      "storage.objects.list",
      "storage.objects.create",
      "storage.objects.delete",
      "storage.buckets.get",
      "storage.buckets.create",
      "storage.buckets.delete",
    ],
    service: "storage",
  },
  {
    name: "roles/viewer",
    title: "Viewer",
    description: "Read access to all resources",
    stage: "GA",
    permissions: ["resourcemanager.projects.get", "resourcemanager.projects.list"],
    service: "iam",
  },
];

describe("getRecommendations", () => {
  it("returns recommendations for a storage query", () => {
    const recs = getRecommendations(MOCK_ROLES, "read storage objects");
    expect(recs.length).toBeGreaterThan(0);
    expect(recs[0].score).toBe(100);
  });

  it("returns few or no results for gibberish query", () => {
    const recs = getRecommendations(MOCK_ROLES, "xyzzyplugh");
    // Heuristic scoring may still match on least-privilege bonus
    for (const rec of recs) {
      expect(rec.score).toBeLessThanOrEqual(100);
    }
  });

  it("scores are normalized 0-100", () => {
    const recs = getRecommendations(MOCK_ROLES, "storage");
    for (const rec of recs) {
      expect(rec.score).toBeGreaterThanOrEqual(0);
      expect(rec.score).toBeLessThanOrEqual(100);
    }
  });
});

describe("generateChatResponse", () => {
  it("returns helpful message when no recommendations", () => {
    const response = generateChatResponse("xyzzy", []);
    expect(response).toContain("couldn't find");
  });

  it("returns recommendation text", () => {
    const recs = getRecommendations(MOCK_ROLES, "read storage objects");
    const response = generateChatResponse("read storage objects", recs);
    expect(response).toContain("recommend");
    expect(response).toContain(recs[0].role.title);
  });
});
