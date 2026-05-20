export interface GcpPermission {
  name: string;
  description?: string;
}

export interface GcpRole {
  name: string;
  title: string;
  description: string;
  stage: "GA" | "BETA" | "ALPHA" | "DEPRECATED" | "EAP";
  permissions: string[];
  service: string;
  etag?: string;
}

export interface GcpService {
  name: string;
  displayName: string;
  roleCount: number;
  permissionCount: number;
}

export type RoleCategory = "predefined" | "basic" | "custom";

export interface SearchFilters {
  query: string;
  services: string[];
  stages: string[];
  category: RoleCategory | "all";
}

export interface ComparisonSet {
  roles: GcpRole[];
}

export interface AiRecommendation {
  role: GcpRole;
  reason: string;
  score: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  recommendations?: AiRecommendation[];
  timestamp: Date;
}

export type ApiCategory =
  | "Compute"
  | "Storage & Databases"
  | "Data Analytics"
  | "AI & ML"
  | "Networking"
  | "Security & Identity"
  | "DevOps & CI/CD"
  | "Operations"
  | "Integration"
  | "Management"
  | "Other";

export interface GcpApi {
  name: string;
  title: string;
  summary: string;
  category: ApiCategory;
  permissionPrefix: string;
  stage: "GA" | "BETA" | "ALPHA" | "DEPRECATED";
  docsUrl: string;
  consoleUrl?: string;
  enabledByDefault?: boolean;
}

export interface ApiFilters {
  query: string;
  categories: ApiCategory[];
  stages: string[];
}
