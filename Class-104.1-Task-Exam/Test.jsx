<div>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Todo App Design</title>
  <div className="max-w-3xl mx-auto">
    {/* Header */}
    <div className="text-center mb-8">
      <h1 className="text-5xl font-bold text-gray-800 mb-2">My Todo List</h1>
      <p className="text-gray-600">Organize your tasks efficiently</p>
    </div>
    {/* Add Todo Form */}
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Task</h2>
      <div className="space-y-4">
        <input type="text" placeholder="Task title..." className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
        <textarea placeholder="Task description (optional)..." rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none" defaultValue={""} />
        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200">
          Add Task
        </button>
      </div>
    </div>
    {/* Filter Buttons */}
    <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
      <div className="flex gap-2 flex-wrap">
        <button className="flex-1 min-w-[100px] bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg">
          All
        </button>
        <button className="flex-1 min-w-[100px] bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-200">
          Active
        </button>
        <button className="flex-1 min-w-[100px] bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-200">
          Completed
        </button>
      </div>
    </div>
    {/* Todo List */}
    <div className="space-y-4">
      {/* Todo Item 1 - Active */}
      <div className="bg-white rounded-lg shadow-lg p-5 hover:shadow-xl transition duration-200">
        <div className="flex items-start gap-4">
          <div className="flex items-center h-6 mt-1">
            <input type="checkbox" className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Complete project documentation
            </h3>
            <p className="text-gray-600 text-sm mb-2">
              Write comprehensive documentation for the new feature including
              API references and examples
            </p>
            <span className="text-xs text-gray-400">Added: Oct 1, 2025 10:30 AM</span>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Todo Item 2 - Completed */}
      <div className="bg-white rounded-lg shadow-lg p-5 hover:shadow-xl transition duration-200">
        <div className="flex items-start gap-4">
          <div className="flex items-center h-6 mt-1">
            <input type="checkbox" defaultChecked className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-400 line-through mb-1">
              Review pull requests
            </h3>
            <p className="text-gray-400 text-sm mb-2 line-through">
              Check and approve pending pull requests from team members
            </p>
            <span className="text-xs text-gray-400">Added: Oct 1, 2025 9:15 AM</span>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Todo Item 3 - Active */}
      <div className="bg-white rounded-lg shadow-lg p-5 hover:shadow-xl transition duration-200">
        <div className="flex items-start gap-4">
          <div className="flex items-center h-6 mt-1">
            <input type="checkbox" className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Update database schema
            </h3>
            <p className="text-gray-600 text-sm mb-2">
              Add new tables and relationships for user authentication system
            </p>
            <span className="text-xs text-gray-400">Added: Oct 1, 2025 8:00 AM</span>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Todo Item 4 - Active (No Description) */}
      <div className="bg-white rounded-lg shadow-lg p-5 hover:shadow-xl transition duration-200">
        <div className="flex items-start gap-4">
          <div className="flex items-center h-6 mt-1">
            <input type="checkbox" className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Team meeting at 3 PM
            </h3>
            <span className="text-xs text-gray-400">Added: Oct 1, 2025 7:30 AM</span>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
