export const ModelBody = ({ children, className = "" }) => {
  return (
    <div className={`flex-1 overflow-y-auto p-6 bg-white ${className}`}>
      {children}
    </div>
  );
};
