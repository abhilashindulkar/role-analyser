import { useEffect } from "react";

interface ShortcutHandlers {
  onSearch: () => void;
  onEscape: () => void;
}

export function useKeyboardShortcuts({ onSearch, onEscape }: ShortcutHandlers) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onSearch();
      }

      if (e.key === "Escape") {
        const active = document.activeElement;
        if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement) {
          active.blur();
        } else {
          onEscape();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSearch, onEscape]);
}
