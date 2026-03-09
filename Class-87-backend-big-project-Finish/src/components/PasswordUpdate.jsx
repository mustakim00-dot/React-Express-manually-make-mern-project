import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Bounce, toast } from "react-toastify";
import { api } from "../api/ApiConnect";
import { useEditTodo } from "../hook/useEditTodo";
import { useShowModal } from "../hook/useShowModal";
import { useTodos } from "../hook/useTodos";
import { queryClient } from "../main";
import AddButton from "./AddButton";

function FieldInfo({ field }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em className="text-red-500">{field.state.meta.errors.join(", ")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}
const PasswordUpdate = ({ onAddTodo, darkMode }) => {
  //const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const { onClose } = useShowModal(); // Zustand hook
  const { editId } = useEditTodo(); // Zustand hook
  const todos = useTodos((state) => state.todos); // Zustand hook
  const todo = todos.find((t) => t._id === editId); // Zustand hook
  //console.log("editId", editId);
  //console.log("todos",todos);
  //console.log("todo",todo);

  const mutation = useMutation({
    mutationFn: (updatedTodo) => api.patch(`users/update-password/${editId}`, updatedTodo),
    onSuccess: (res) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onClose();
      toast(res.data.message || "Password Update successfully!", {
        position: "top-center",
        autoClose: 2000,
        // hideProgressBar: false,
        // closeOnClick: false,
        // pauseOnHover: true,
        // draggable: true,
        // progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    },
    onError: (error) => {
      toast(error.response?.data?.message || "Failed to add todo", {
        position: "top-center",
        autoClose: 2000,
        // hideProgressBar: false,
        // closeOnClick: false,
        // pauseOnHover: true,
        // draggable: true,
        // progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    },
  });

  // const handleSubmit = () => {
  //   if (inputValue.trim()) {
  //     onAddTodo(inputValue.trim());
  //     setInputValue('');
  //   }
  // };

  const handleKeyPress = (e) => {
    // if (e.key === "Enter") {
    //   handleSubmit();
    // }
  };

  const form = useForm({
    defaultValues: {
      oldPassword: todo?.password,
      newPassword: todo?.newPassword,
    },
    onSubmit: ({ value }) => {
      // if(!editId) return;
      mutation.mutate(value);
      console.log(value);
      //console.log(mutation.data.data);

      // if(mutation.isSuccess){
      // // } else if (mutation.isError) {
      // //   toast(mutation.error.response.data.message, {
      // //     position: "top-center",
      // //     autoClose: 2000,
      // //     hideProgressBar: false,
      // //     closeOnClick: false,
      // //     pauseOnHover: true,
      // //     draggable: true,
      // //     progress: undefined,
      // //     theme: "dark",
      // //     transition: Bounce,
      // //   });
      // }

      // Do something with form data
      //form.clearFieldValues("title");
      //form.clearFieldValues("description");
      form.reset();
    },
  });

  // useEffect(() => {
  //   if (todo) {
  //     form.setFieldValue("title", todo.title);
  //     form.setFieldValue("description", todo.description);
  //   }
  // },[todo])

  // const { Field } = form;

  return (
    <div className="relative">
      <div
        className={` p-2 rounded-3xl transition-all duration-300 ${
          darkMode
            ? "bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm"
            : "bg-gradient-to-r from-white/80 to-gray-50/80 backdrop-blur-sm"
        } ${isFocused ? "ring-4 ring-purple-500/30 shadow-2xl" : "shadow-lg"}`}
      >
        {/* From Field */}
        {/* {!todo ? ( <p className="text-center text-gray-400 py-4">
            ⚠️ Select a todo to edit
          </p> ) : ()} */}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            //e.stopPropagation();
            form.handleSubmit();
          }}
          className="relative flex flex-col gap-2"
        >
          <>
            {/* A type-safe field component*/}
            <form.Field
              name="oldPassword"
              validators={{
                onChange: ({ value }) =>
                  !value ? "A oldPassword is required" : undefined,
              }}
              children={(field) => {
                // Avoid hasty abstractions. Render props are great!
                return (
                  <>
                    {/* <label htmlFor={field.name}>First Name:</label> */}
                    {/* <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    /> */}

                    <input
                      type="password"
                      //value={inputValue}
                      //onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      onFocus={() => setIsFocused(true)}
                      //onBlur={() => setIsFocused(false)}
                      placeholder="✨Enter your OldPassword... "
                      className={`w-full mb-5 px-6 py-4 rounded-2xl border-2 transition-all duration-300 text-lg font-medium placeholder:font-normal ${
                        darkMode
                          ? "border-gray-600 bg-gray-800/60 text-white placeholder-gray-400 focus:border-purple-500 focus:bg-gray-800/80"
                          : "border-gray-200 bg-white/80 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:bg-white/90"
                      } focus:outline-none focus:ring-4 focus:ring-purple-500/20 backdrop-blur-sm`}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />

                    <FieldInfo field={field} />
                  </>
                );
              }}
            />
          </>

          <>
            {/* A type-safe field component*/}
            <form.Field
              name="newPassword"
              validators={{
                onChange: ({ value }) =>
                  !value ? "A newPassword is required" : undefined,
              }}
              children={(field) => {
                // Avoid hasty abstractions. Render props are great!
                return (
                  <>
                    <input
                      type="password"
                      //value={inputValue}
                      //onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      onFocus={() => setIsFocused(true)}
                      //onBlur={() => setIsFocused(false)}
                      placeholder="✨Enter your New Password... "
                      className={`w-full px-6 py-4 rounded-2xl border-2 transition-all duration-300 text-lg font-medium placeholder:font-normal ${
                        darkMode
                          ? "border-gray-600 bg-gray-800/60 text-white placeholder-gray-400 focus:border-purple-500 focus:bg-gray-800/80"
                          : "border-gray-200 bg-white/80 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:bg-white/90"
                      } focus:outline-none focus:ring-4 focus:ring-purple-500/20 backdrop-blur-sm`}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />

                    <FieldInfo field={field} />
                  </>
                );
              }}
            />
          </>

          {isFocused && (
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none animate-pulse" />
          )}

          <AddButton className=" px-[100px] py-[18px]" title="Edit Password" />
        </form>

        {/* <AddButton onClick={handleSubmit} disabled={!inputValue.trim()} /> */}
      </div>
    </div>
  );
};

export default PasswordUpdate;
