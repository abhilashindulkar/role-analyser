import { useCallback, useEffect, useMemo, useState } from "react";
import { APIS_DATA as SEED_APIS } from "../data/apis";
import { resetApiFuseIndex, searchApis } from "../utils/apiSearch";
import type { ApiCategory, ApiFilters, GcpApi } from "../types";

async function loadFullApis(): Promise<GcpApi[] | null> {
  try {
    const resp = await fetch(`${import.meta.env.BASE_URL}gcp-apis.json`);
    if (!resp.ok) return null;
    const data: GcpApi[] = await resp.json();
    if (Array.isArray(data) && data.length > 0) return data;
  } catch {
    // optional remote dataset not present — fall back to bundled data
  }
  return null;
}

export function useApiData() {
  const [apis, setApis] = useState<GcpApi[]>(SEED_APIS);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ApiFilters>({
    query: "",
    categories: [],
    stages: [],
  });

  useEffect(() => {
    loadFullApis().then((full) => {
      if (full) {
        setApis(full);
        resetApiFuseIndex();
      }
      setLoading(false);
    });
  }, []);

  const filteredApis = useMemo(
    () => searchApis(apis, filters),
    [apis, filters]
  );

  const categories: ApiCategory[] = useMemo(() => {
    const set = new Set<ApiCategory>();
    for (const api of apis) set.add(api.category);
    return [...set].sort();
  }, [apis]);

  const updateQuery = useCallback((query: string) => {
    setFilters((f) => ({ ...f, query }));
  }, []);

  const toggleCategory = useCallback((category: ApiCategory) => {
    setFilters((f) => ({
      ...f,
      categories: f.categories.includes(category)
        ? f.categories.filter((c) => c !== category)
        : [...f.categories, category],
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

  const clearFilters = useCallback(() => {
    setFilters({ query: "", categories: [], stages: [] });
  }, []);

  return {
    apis,
    filteredApis,
    filters,
    categories,
    loading,
    updateQuery,
    toggleCategory,
    toggleStage,
    clearFilters,
  };
}
