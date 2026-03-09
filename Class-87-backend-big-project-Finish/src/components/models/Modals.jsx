import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useShowModal } from "../../hook/useShowModal";

const Modals = ({ children }) => {
  const { isOpen, onClose } = useShowModal();
  const modalRoot = document.getElementById("modal-root");
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div>
      {/* Modal toggle */}
      {/* <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
    Toggle modal
  </button> */}
      {/* Main modal */}
      <div
        onClick={onClose}
        id="authentication-modal"
        tabIndex={-1}
        aria-hidden="true"
        className=" flex bg-slate-400/5 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-dvh max-h-full"
      >
        <div
          className="relative p-4 w-full max-w-md max-h-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal content */}

          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            {/* Modal header */}
            {children}
            {/* Modal body */}
          </div>
        </div>
      </div>
    </div>,
    modalRoot,
  );
};
export default Modals;
