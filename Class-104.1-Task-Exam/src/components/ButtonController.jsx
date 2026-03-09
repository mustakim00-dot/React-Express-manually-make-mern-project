//import { useMutation } from "@tanstack/react-query";
//import { useState } from "react";
import { Bounce, toast } from "react-toastify";
// import { api } from "../../api/ApiConnect";
import { useModal } from "../hook/useModal";
import { useShowModal } from "../hook/useShowModal"; // Zustand hook
// import { queryClient } from "../../main";
// import EditTodoInput from "../input/EditTodoInput";
// import ModalContent from "../modals/ModalContent";
// import ModalHeader from "../modals/ModalHeader";
// import Modals from "../modals/Modals";
import { useState } from "react";
import { useEditTodo } from "../hook/useEditTodo";
// import { Modal } from "../../modal/Modal";
// import { ModalFooter } from "../../modal/ModalFooter";
// import { ModalHeader } from "../../modal/ModalHeader";
// import { ModelBody } from "../../modal/ModelBody";

const ActionButton = ({
  onClick,
  children,
  className = "",
  variant = "primary",
  disabled = false,
  type = "button",
  actionType,
  id,
}) => {
  //const [Open, setOpen] = useState(false);
  const [modelType, setModalType] = useState(null);
  const {isOpen, onOpen} = useShowModal(); // Zustand hook
  //const { setEditTodoId } = useEditTodo(); // Zustand hook
  const baseClasses =
    "px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 transform focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105 active:scale-95";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 focus:ring-purple-500/50 shadow-blue-500/25",
    danger:
      "bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 focus:ring-red-500/50 shadow-red-500/25",
    success:
      "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 focus:ring-green-500/50 shadow-green-500/25",
    ghost:
      "bg-white/20 backdrop-blur-sm text-gray-700 hover:bg-white/30 focus:ring-gray-500/50 border border-white/30",
  };

  const variantClasses = variants[variant] || variants.primary;
  //const [open, setOpen] = useState(false);
  //const { onOpen } = useShowModal(); // Zustand hook
  const { setEditTodoId } = useEditTodo(); // Zustand hook

  const formModal = useModal();

//   const mutation = useMutation({
//     mutationFn: (newTodo) => {
//       return api.delete(`/todos/${id}`);
//     },
//     onSuccess: (res) => {
//       queryClient.invalidateQueries({ queryKey: ["todos"] });
//       toast(res.data.message, {
//         position: "top-center",
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: false,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "dark",
//         transition: Bounce,
//       });
//     },
//   });

  const handleAction = () => {
    if (actionType === "edit") {
      onOpen();
      //setModalType("edit")
      // setOpen(true);
      setEditTodoId(id);
    }else if (actionType === "password") {
      onOpen();
      setEditTodoId(id);
      //setModalType("password")
      //setOpen(true);
    }else if (actionType === "delete") {
      mutation.mutate();
      if (mutation.isSuccess) {
      } else if (mutation.isError) {
        toast(mutation.error.response.data.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    }
  };

  return (
    <>
      <div>
        <button
          onClick={handleAction}
          type={type}
          // onClick={onClick}
          disabled={disabled}
          className={`${baseClasses} ${variantClasses} ${className}`}
        >
          {children}
        </button>
      </div>
      {/* <ModelOverlay isOpen={Open} onClose={() => setOpen(false)} />    */}
      {/* <ModelOverlay  />    */}
      {/* <Modals /> */}

{
  // isOpen && (<Modal>
  //       <ModalHeader>
  //         {
  //           modelType === "edit" ? "User Data Input" : "Password Data Input"
  //         }
  //       </ModalHeader>
  //       <ModalContent>
  //         {modelType === "edit" && <UserUpdate />}
  //         {modelType === "password" && <PasswordUpdate />}
  //         {/* <PasswordUpdate /> */}
  //       </ModalContent>
  //     </Modal>)
}
      

    </>
  );
};
export default ActionButton;
