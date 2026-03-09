import { useEffect } from "react";

export const useKeyboardEvent = (key, handler, isActive) => {
  useEffect(() => {
    if (!isActive) return;
    const handleKeyDown = (e) => {
      if (e.key === key) {
        handler(e);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [key, handler, isActive]);
};
