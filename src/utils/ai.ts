import type { GcpRole, AiRecommendation } from "../types";

const USE_CASE_KEYWORDS: Record<string, { permissions: string[]; weight: number }[]> = {
  "read data": [
    { permissions: ["get", "list", "getData"], weight: 1 },
  ],
  "write data": [
    { permissions: ["create", "update", "updateData", "delete"], weight: 1 },
  ],
  "deploy": [
    { permissions: ["create", "update", "deploy"], weight: 1 },
  ],
  "manage": [
    { permissions: ["create", "delete", "update", "setIamPolicy"], weight: 1 },
  ],
  "view": [
    { permissions: ["get", "list"], weight: 1 },
  ],
  "upload": [
    { permissions: ["create", "upload", "sourceCodeSet"], weight: 1 },
  ],
  "invoke": [
    { permissions: ["invoke", "run"], weight: 1 },
  ],
  "monitor": [
    { permissions: ["list", "get", "timeSeries"], weight: 1 },
  ],
  "log": [
    { permissions: ["logEntries", "logs"], weight: 1 },
  ],
  "secret": [
    { permissions: ["secrets", "versions", "access"], weight: 1 },
  ],
  "network": [
    { permissions: ["networks", "firewalls", "subnetworks"], weight: 1 },
  ],
  "database": [
    { permissions: ["databases", "instances", "connect"], weight: 1 },
  ],
  "storage": [
    { permissions: ["buckets", "objects"], weight: 1 },
  ],
  "kubernetes": [
    { permissions: ["clusters", "pods", "deployments", "nodes"], weight: 1 },
  ],
  "container": [
    { permissions: ["clusters", "pods", "deployments", "nodes"], weight: 1 },
  ],
  "ml": [
    { permissions: ["models", "endpoints", "datasets", "trainingPipelines"], weight: 1 },
  ],
  "ai": [
    { permissions: ["models", "endpoints", "datasets", "predict"], weight: 1 },
  ],
  "pubsub": [
    { permissions: ["topics", "subscriptions", "publish", "consume"], weight: 1 },
  ],
  "messaging": [
    { permissions: ["topics", "subscriptions", "publish", "consume"], weight: 1 },
  ],
  "build": [
    { permissions: ["builds", "create", "triggers"], weight: 1 },
  ],
  "ci/cd": [
    { permissions: ["builds", "create", "triggers", "repositories"], weight: 1 },
  ],
  "iam": [
    { permissions: ["roles", "serviceAccounts", "setIamPolicy", "getIamPolicy"], weight: 1 },
  ],
  "security": [
    { permissions: ["setIamPolicy", "getIamPolicy", "roles"], weight: 1 },
  ],
};

function scoreRole(role: GcpRole, query: string): number {
  const queryLower = query.toLowerCase();
  const words = queryLower.split(/\s+/);
  let score = 0;

  // Service name matching
  if (role.service.toLowerCase().includes(queryLower)) {
    score += 30;
  }
  for (const word of words) {
    if (role.service.toLowerCase().includes(word)) {
      score += 10;
    }
    if (role.title.toLowerCase().includes(word)) {
      score += 15;
    }
    if (role.description.toLowerCase().includes(word)) {
      score += 5;
    }
  }

  // Use-case keyword matching
  for (const word of words) {
    const keywords = USE_CASE_KEYWORDS[word];
    if (keywords) {
      for (const kw of keywords) {
        for (const perm of role.permissions) {
          for (const kwPerm of kw.permissions) {
            if (perm.includes(kwPerm)) {
              score += 3 * kw.weight;
            }
          }
        }
      }
    }
  }

  // Least-privilege bonus: prefer roles with fewer permissions
  const permCount = role.permissions.length;
  if (permCount <= 5) score += 10;
  else if (permCount <= 15) score += 5;
  else if (permCount >= 30) score -= 5;

  // Penalise basic roles (overly broad)
  if (["roles/viewer", "roles/editor", "roles/owner"].includes(role.name)) {
    score -= 15;
  }

  return score;
}

export function getRecommendations(
  roles: GcpRole[],
  userQuery: string
): AiRecommendation[] {
  const scored = roles
    .map((role) => ({
      role,
      score: scoreRole(role, userQuery),
    }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const maxScore = scored[0]?.score ?? 1;

  return scored.map(({ role, score }) => ({
    role,
    score: Math.round((score / maxScore) * 100),
    reason: generateReason(role, userQuery),
  }));
}

function generateReason(role: GcpRole, query: string): string {
  const queryLower = query.toLowerCase();
  const words = queryLower.split(/\s+/);
  const reasons: string[] = [];

  const isReadOnly = words.some((w) =>
    ["view", "read", "list", "get", "monitor"].includes(w)
  );
  const isAdmin = words.some((w) =>
    ["manage", "admin", "full", "control"].includes(w)
  );

  if (isReadOnly && role.title.toLowerCase().includes("viewer")) {
    reasons.push("Provides read-only access following least-privilege principle");
  }

  if (isAdmin && role.title.toLowerCase().includes("admin")) {
    reasons.push("Provides full administrative control");
  }

  const matchingServices = words.filter(
    (w) =>
      role.service.toLowerCase().includes(w) ||
      role.name.toLowerCase().includes(w)
  );
  if (matchingServices.length > 0) {
    reasons.push(`Directly targets ${role.service}`);
  }

  const permCount = role.permissions.length;
  if (permCount <= 5) {
    reasons.push("Narrow scope with minimal permissions (least-privilege)");
  } else if (permCount <= 15) {
    reasons.push("Moderate scope with balanced permissions");
  }

  if (reasons.length === 0) {
    reasons.push(
      `${role.title} grants ${permCount} permission${permCount === 1 ? "" : "s"} for ${role.service}`
    );
  }

  return reasons.join(". ") + ".";
}

export function generateChatResponse(
  _userQuery: string,
  recommendations: AiRecommendation[]
): string {
  if (recommendations.length === 0) {
    return [
      "I couldn't find specific roles matching your query. Try describing your use case differently, for example:",
      "",
      '- "I need to read Cloud Storage objects"',
      '- "deploy Cloud Run services"',
      '- "manage BigQuery datasets"',
      '- "view Kubernetes clusters"',
      "",
      "You can mention a GCP service name and an action (view, manage, deploy, etc.).",
    ].join("\n");
  }

  const top = recommendations[0];
  const lines = [
    `Based on your needs, I recommend **${top.role.title}** (\`${top.role.name}\`).`,
    "",
    `> ${top.role.description}`,
    "",
    `${top.reason}`,
    "",
  ];

  if (recommendations.length > 1) {
    lines.push("**Other options to consider:**");
    lines.push("");
    for (const rec of recommendations.slice(1)) {
      lines.push(
        `- **${rec.role.title}** (\`${rec.role.name}\`) — ${rec.reason} (${rec.score}% match)`
      );
    }
    lines.push("");
  }

  lines.push(
    "**Tip:** Follow the *principle of least privilege* — use the most restrictive role that still allows the required actions."
  );

  return lines.join("\n");
}
