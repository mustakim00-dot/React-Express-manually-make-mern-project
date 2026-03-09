import { useState } from "react";
import AddTodoForm from "./AddTodoForm";
import FilterButtons from "./FilterButtons";
import Header from "./Header";
import Login from "./Login";
import TodoList from "./TodoList";

const MainApp = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Complete project documentation",
      description:
        "Write comprehensive documentation for the new feature including API references and examples",
      completed: false,
      timestamp: "Oct 1, 2025 10:30 AM",
    },
    {
      id: 2,
      title: "Review pull requests",
      description: "Check and approve pending pull requests from team members",
      completed: true,
      timestamp: "Oct 1, 2025 9:15 AM",
    },
    {
      id: 3,
      title: "Update database schema",
      description:
        "Add new tables and relationships for user authentication system",
      completed: false,
      timestamp: "Oct 1, 2025 8:00 AM",
    },
    {
      id: 4,
      title: "Team meeting at 3 PM",
      description: "",
      completed: false,
      timestamp: "Oct 1, 2025 7:30 AM",
    },
  ]);
const [Logins, setLogin, ] = useState(false);
  const [filter, setFilter] = useState("all");
  const [editingTodo, setEditingTodo] = useState(null);

  const addTodo = (title, description) => {
    const newTodo = {
      id: Date.now(),
      title,
      description,
      completed: false,
      timestamp: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    if (editingTodo && editingTodo.id === id) {
      setEditingTodo(null);
    }
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id, title, description) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title, description } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });


  const handleLogin = () => {
    setLogin(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">

        
        
        <div onClick={handleLogin} className="w-300 flex justify-end">
           <button className=" text-[40px] my-2  px-[100px] py-4 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-500/50 shadow-lg hover:shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40">LOG IN</button>
        </div>

       

        <Header />
        {Logins && <Login />}
        <AddTodoForm
          onAdd={addTodo}
          editingTodo={editingTodo}
          onUpdate={updateTodo}
          onCancelEdit={() => setEditingTodo(null)}
        />

        <FilterButtons currentFilter={filter} onFilterChange={setFilter} />

        
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onEdit={setEditingTodo}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  );
};

export default MainApp;
