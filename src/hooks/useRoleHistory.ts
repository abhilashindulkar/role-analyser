import { useState, useCallback, useEffect } from "react";
import type { GcpRole } from "../types";

const STORAGE_KEY = "permiso-role-history";
const MAX_HISTORY = 10;

interface HistoryEntry {
  name: string;
  title: string;
  service: string;
  visitedAt: number;
}

function load(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignored
  }
  return [];
}

function save(entries: HistoryEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // ignored
  }
}

export function useRoleHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>(load);

  useEffect(() => {
    save(history);
  }, [history]);

  const recordVisit = useCallback((role: GcpRole) => {
    setHistory((prev) => {
      const filtered = prev.filter((h) => h.name !== role.name);
      return [
        {
          name: role.name,
          title: role.title,
          service: role.service,
          visitedAt: Date.now(),
        },
        ...filtered,
      ].slice(0, MAX_HISTORY);
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return { history, recordVisit, clearHistory } as const;
}
