const FilterButtons = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
  ];

  return (
    <div className="w-206 mt-6 bg-white rounded-lg shadow-lg p-4 mb-6">
      <div className="flex gap-2 flex-wrap">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`flex-1 min-w-[100px] font-semibold py-2 px-4 rounded-lg transition duration-200 ${
              currentFilter === filter.value
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};
export default FilterButtons;