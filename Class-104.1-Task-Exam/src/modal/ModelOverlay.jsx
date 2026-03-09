// // const ModelOverlay = ({ onClick }) => {
// //   return (
// //     <div
// //       className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-fadeIn"
// //       onClick={onClick}
// //       aria-hidden="true"
// //     />
// //   );
// // };
// // export default ModelOverlay;

// import { useEffect } from "react";
// import { createPortal } from "react-dom";
// import { useShowModal } from "../hook/useShowModal";



// const ModelOverlay = ({ children }) => {
//   const { isOpen, onClose } = useShowModal();
//   const modalRoot = document.getElementById("modal-root");
//   useEffect(()=>{
//     const handleKeyDown = (e) => {
//       console.log(e.key);
      
//       if (e.key === "Escape") {
//         onClose();
//       }
//     }
//     document.addEventListener("keydown", handleKeyDown);
//       return () => {
//         document.removeEventListener("keydown", handleKeyDown);
//       }
//   },[onClose])
//   if(!isOpen){
//     return null;
//   }
//   return createPortal(
//     <div>
//       {/* Modal toggle */}
//       {/* <button
//         data-modal-target="authentication-modal"
//         data-modal-toggle="authentication-modal"
//         className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
//         type="button"
//       >
//         Toggle modal
//       </button> */}
//       {/* Main modal */}
//       <div
//       onClick={onClose}
//         id="authentication-modal"
//         tabIndex={-1}
//         aria-hidden="true"
//         className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-dvh max-h-full bg-slate-500/40"
//       >
//         <div className="relative p-4 w-full max-w-md max-h-full " onClick={(e) => e.stopPropagation()}>
//           {/* Modal content */}
//           {children}
//           <div className="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
//             {/* Modal header */}
//             {/* <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
//               <h3 className="text-lg font-medium text-heading">
//                 Sign in to our platform
//               </h3>
//               <button
//               onClick={onClose}
//                 type="button"
//                 className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
//                 data-modal-hide="authentication-modal"
//               >
//                 <svg
//                   className="w-5 h-5"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   width={24}
//                   height={24}
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18 17.94 6M18 18 6.06 6"
//                   />
//                 </svg>
//                 <span className="sr-only">Close modal</span>
//               </button>
//             </div> */}

//             {/* Modal body */}
            

//           </div>
//         </div>
//       </div>
//     </div>,
//     modalRoot
//   );
// };
// export default ModelOverlay;





// {/* <form action="#" className="pt-4 md:pt-6">
//   <div className="mb-4">
//     <label
//       htmlFor="email"
//       className="block mb-2.5 text-sm font-medium text-heading"
//     >
//       Your email
//     </label>
//     <input
//       type="email"
//       id="email"
//       className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
//       placeholder="example@company.com"
//       required
//     />
//   </div>
//   <div>
//     <label
//       htmlFor="password"
//       className="block mb-2.5 text-sm font-medium text-heading"
//     >
//       Your password
//     </label>
//     <input
//       type="password"
//       id="password"
//       className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
//       placeholder="•••••••••"
//       required
//     />
//   </div>
//   <div className="flex items-start my-6">
//     <div className="flex items-center">
//       <input
//         id="checkbox-remember"
//         type="checkbox"
//         defaultValue
//         className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
//       />
//       <label
//         htmlFor="checkbox-remember"
//         className="ms-2 text-sm font-medium text-heading"
//       >
//         Remember me
//       </label>
//     </div>
//     <a
//       href="#"
//       className="ms-auto text-sm font-medium text-fg-brand hover:underline"
//     >
//       Lost Password?
//     </a>
//   </div>
//   <button
//     type="submit"
//     className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none w-full mb-3"
//   >
//     Login to your account
//   </button>
//   <div className="text-sm font-medium text-body">
//     Not registered?{" "}
//     <a href="#" className="text-fg-brand hover:underline">
//       Create account
//     </a>
//   </div>
// </form>; */}

