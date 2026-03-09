import { twMerge } from "tailwind-merge";

// {onClick, disabled;}
const AddButton = ({ className = "", title = "Create Account" }) => {
  return (
    <button
      //onClick={onClick}
      //disabled={disabled}
      className={twMerge(
        "my-2  px-[277px] py-4 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-500/50 shadow-lg hover:shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40",
        className
      )}
    >
      <span className=" w-50 flex items-center mx-6 gap-2 justify-center">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        {title}
      </span>
    </button>
  );
};

export default AddButton;
