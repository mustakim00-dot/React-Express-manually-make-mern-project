import { useRef } from "react";
import { createPortal } from "react-dom";
import { useBodyScrollLock } from "../hook/useBodyScrollLock";
import { useFocusTrap } from "../hook/useFocusTrap";
import { useKeyboardEvent } from "../hook/useKeyboardEvent";
import { ModalContext } from "../hook/useModalContext";
import { usePortal } from "../hook/usePortal";
import ModelOverlay from "./ModelOverlay";

export const Modal = ({
  isOpen,
  onClose,
  children,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  size = "md",
}) => {
  const modalRef = useRef(null);
  const portalContainer = usePortal();

  useBodyScrollLock(isOpen);
  const handleTabKey = useFocusTrap(modalRef, isOpen);
  useKeyboardEvent("Escape", onClose, isOpen && closeOnEsc);

  //if(!isOpen) return null;
  if (!isOpen || !portalContainer) return null;
  const contextValue = {
    onClose,
    size,
  };

  const modalContent = (
    <ModalContext.Provider value={contextValue}>
      <div>
        <ModelOverlay onClick={closeOnOverlayClick ? onClose : undefined} />
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          onKeyDown={handleTabKey}
          className="relative z-10 w-full max-h-[90vh] flex flex-col"
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  );
  if (!portalContainer) return null;
  return createPortal(modalContent, portalContainer);
};
