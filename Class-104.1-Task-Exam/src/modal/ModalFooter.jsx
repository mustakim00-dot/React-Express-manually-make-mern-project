export const ModalFooter = ({ children, className = "" }) => {
  return (
    <div
      className={`flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50
    rounded-b-lg ${className}`}
    >
      {children}
    </div>
  );
};
