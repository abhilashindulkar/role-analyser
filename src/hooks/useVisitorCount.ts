import { useState, useEffect } from "react";

const SESSION_KEY = "permiso-tally-counted";
const TALLY_URL = "https://tally.yuki.sh/hits/permiso-role-analyser/visits.json";

export function useVisitorCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const alreadyCounted = sessionStorage.getItem(SESSION_KEY);
    const url = alreadyCounted ? `${TALLY_URL}?mode=read` : TALLY_URL;

    fetch(url)
      .then((r) => r.json())
      .then((data: { visit: number }) => {
        if (!alreadyCounted) {
          sessionStorage.setItem(SESSION_KEY, "1");
        }
        setCount(data.visit ?? 0);
      })
      .catch(() => {
        // silently fail — counter is non-critical
      });
  }, []);

  return count;
}
