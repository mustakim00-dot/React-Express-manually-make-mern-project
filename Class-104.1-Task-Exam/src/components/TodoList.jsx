import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { api } from "../api/ApiConnect";
import { useFilter } from "../hook/useFilter";
import { useTodos } from "../hook/useTodos";
import Loading from "../shard/Loading";
import Process from "../shard/Process";
import TodoItem from "./TodoItem";



const TodoList = ({ todos, onToggle, onEdit, onDelete }) => {
  const setTodos = useTodos((state) => state.setTodos);
  const users = useTodos((state) => state.todos);
  const filtered = useFilter((state) => state.filter);
  //const filteredTodos = todos.filter((t) => t.isComplete === (filter === 'completed'));

  const { isPending, isError, data, error, isSuccess } = useQuery({
    queryKey: ["users"],
    queryFn:async () => {
       const res = await api.get("/users/all-users");
       //console.log(res.data.data);
      return res.data.data;
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      setTodos(data);
    }
  }, [isSuccess, data, setTodos]);

  if (isPending) {
    return (
      <div>
        <Loading />
        <Process />
      </div>
    );
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  if (filtered === "active") {
    return (
      <div className="space-y-3">
        {users
          .filter((todo) => !todo.isComplete)
          .map((todo) => (
            <TodoItem key={todo._id} todo={todo} />
          ))}
      </div>
    );
  }
  if (filtered === "completed") {
    return (
      <div className="space-y-3">
        {users
          .filter((todo) => todo.isComplete)
          .map((todo) => (
            <TodoItem key={todo._id} todo={todo} />
          ))}
      </div>
    );
  }
  
  return (
    <>
     <div className="space-y-4">
      {Array.isArray(users) &&
        users.map((todo, index) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
            index={index}
          />
        ))}

      {users.length === 0 && (
        <div className="p-12 text-center">
          <div className="text-6xl mb-4 animate-bounce">🎯</div>
          <p className={"text-xl font-medium"}>No todos found! ✨</p>
        </div>
      )}
    </div>
    {/* <ModelOverlay /> */}
    </>
   
  );
};

export default TodoList;



