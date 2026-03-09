import { useEffect, useState } from "react";

export const usePortal = (id = "modals-rootes") => {
  const [container, setContainer] = useState(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    let element = document.getElementById(id);
    if (!element) {
      element = document.createElement("div");
      element.id = id;
      document.body.appendChild(element);
    }
    setContainer(element);

    return () => {
      if (element && element.childElementCount === 0 && element.id === id) {
        element.remove();
      }
      //  if (element && element.parentNode) {
      //    element.parentNode.removeChild(element);
      //  }
    };
  }, [id]);
  return container;
};
