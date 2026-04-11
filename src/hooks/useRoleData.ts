import { useState, useMemo, useCallback, useEffect } from "react";
import { ROLES_DATA as SEED_DATA } from "../data/roles";
import metadata from "../data/roles-metadata.json";
import { searchRoles, extractServices, getAllPermissions, resetFuseIndex } from "../utils/search";
import type { GcpRole, SearchFilters, GcpService } from "../types";

async function loadFullData(): Promise<GcpRole[] | null> {
  try {
    const resp = await fetch(`${import.meta.env.BASE_URL}gcp-roles.json`);
    if (!resp.ok) return null;
    const data: GcpRole[] = await resp.json();
    if (Array.isArray(data) && data.length > 0) return data;
  } catch {
    // file doesn't exist yet — fall back to seed data
  }
  return null;
}

export function useRoleData() {
  const [roles, setRoles] = useState<GcpRole[]>(SEED_DATA);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    services: [],
    stages: [],
    category: "all",
  });

  useEffect(() => {
    loadFullData().then((full) => {
      if (full) {
        setRoles(full);
        resetFuseIndex();
      }
      setLoading(false);
    });
  }, []);

  const filteredRoles = useMemo(
    () => searchRoles(roles, filters),
    [roles, filters]
  );

  const services: GcpService[] = useMemo(() => extractServices(roles), [roles]);
  const allPermissions = useMemo(() => getAllPermissions(roles), [roles]);

  const updateQuery = useCallback((query: string) => {
    setFilters((f) => ({ ...f, query }));
  }, []);

  const toggleService = useCallback((service: string) => {
    setFilters((f) => ({
      ...f,
      services: f.services.includes(service)
        ? f.services.filter((s) => s !== service)
        : [...f.services, service],
    }));
  }, []);

  const toggleStage = useCallback((stage: string) => {
    setFilters((f) => ({
      ...f,
      stages: f.stages.includes(stage)
        ? f.stages.filter((s) => s !== stage)
        : [...f.stages, stage],
    }));
  }, []);

  const setCategory = useCallback(
    (category: SearchFilters["category"]) => {
      setFilters((f) => ({ ...f, category }));
    },
    []
  );

  const clearFilters = useCallback(() => {
    setFilters({
      query: "",
      services: [],
      stages: [],
      category: "all",
    });
  }, []);

  const fetchedAt = metadata.fetched_at ?? null;

  return {
    roles,
    filteredRoles,
    filters,
    services,
    allPermissions,
    loading,
    fetchedAt,
    updateQuery,
    toggleService,
    toggleStage,
    setCategory,
    clearFilters,
  };
}
