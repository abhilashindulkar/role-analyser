import type { GcpRole } from "../types";

export function roleToJson(role: GcpRole): string {
  return JSON.stringify(
    {
      name: role.name,
      title: role.title,
      description: role.description,
      stage: role.stage,
      service: role.service,
      permissions: role.permissions,
    },
    null,
    2
  );
}

function yamlEscape(value: string): string {
  if (/[":{}[\],&*?|>!%#@`\n]/.test(value)) {
    return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  }
  return value;
}

export function roleToYaml(role: GcpRole): string {
  const lines = [
    `name: ${role.name}`,
    `title: ${yamlEscape(role.title)}`,
    `description: ${yamlEscape(role.description)}`,
    `stage: ${role.stage}`,
    `service: ${role.service}`,
    `permissions:`,
    ...role.permissions.map((p) => `  - ${p}`),
  ];
  return lines.join("\n");
}

export function roleToTerraform(role: GcpRole): string {
  const resourceName = role.name
    .replace("roles/", "")
    .replace(/[./-]/g, "_");

  return [
    `# Bind "${role.title}" to a member`,
    `resource "google_project_iam_member" "${resourceName}" {`,
    `  project = var.project_id`,
    `  role    = "${role.name}"`,
    `  member  = "serviceAccount:\${var.service_account_email}"`,
    `}`,
    ``,
    `# Alternatively, use google_project_iam_binding for group assignment:`,
    `# resource "google_project_iam_binding" "${resourceName}" {`,
    `#   project = var.project_id`,
    `#   role    = "${role.name}"`,
    `#   members = [`,
    `#     "serviceAccount:\${var.service_account_email}",`,
    `#   ]`,
    `# }`,
  ].join("\n");
}

export type ExportFormat = "json" | "yaml" | "terraform";

export function exportRole(role: GcpRole, format: ExportFormat): string {
  switch (format) {
    case "json":
      return roleToJson(role);
    case "yaml":
      return roleToYaml(role);
    case "terraform":
      return roleToTerraform(role);
  }
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

const FORMAT_EXTENSIONS: Record<ExportFormat, string> = {
  json: ".json",
  yaml: ".yaml",
  terraform: ".tf",
};

const FORMAT_MIME: Record<ExportFormat, string> = {
  json: "application/json",
  yaml: "text/yaml",
  terraform: "text/plain",
};

export function downloadRole(role: GcpRole, format: ExportFormat): void {
  const content = exportRole(role, format);
  const fileName =
    role.name.replace("roles/", "").replace(/[./-]/g, "_") +
    FORMAT_EXTENSIONS[format];

  const blob = new Blob([content], { type: FORMAT_MIME[format] });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
