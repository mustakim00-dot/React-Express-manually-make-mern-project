import { useEffect, useRef } from "react";

export const useFocusTrap = (ref, isActive) => {
  const previousFocus = useRef(null);
  useEffect(() => {
    if (isActive) {
      previousFocus.current = document.activeElement;
      ref.current?.focus();
      return () => {
        previousFocus.current?.focus();
      };
    }
  }, [isActive, ref]);
  const handleTabKey = (e) => {
    if (e.key !== "Tab" || !isActive) return;
    const focusableElements = ref.current?.querySelectorAll(
      'button:not(:disabled),[href],input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex]:not([tabindex="-1"])'
    );
    if (!focusableElements?.length) return;
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  };
  return handleTabKey;
};
