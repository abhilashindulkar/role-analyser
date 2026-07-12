import { useState, useEffect } from "react";

const STORAGE_KEY = "permiso-visitor-count";
const SESSION_KEY = "permiso-session-counted";

export function useVisitorCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const stored = parseInt(localStorage.getItem(STORAGE_KEY) ?? "0", 10);
    const alreadyCounted = sessionStorage.getItem(SESSION_KEY);

    if (!alreadyCounted) {
      const next = stored + 1;
      localStorage.setItem(STORAGE_KEY, String(next));
      sessionStorage.setItem(SESSION_KEY, "1");
      setCount(next);
    } else {
      setCount(stored);
    }
  }, []);

  return count;
}
