import { CircleUser, Lock, Trash2 } from "lucide-react";
import { useState } from "react";
//import UserDelete from "./UserDelete";
import { userDelete } from "../Delete/userDelete";
import ModalHeader from "../components/models/ModalHeader";
//import { Modals } from "../modals/Modals";
import ModalContent from "../components/models/ModalContent";
import Modal from "../components/models/Modals";
import ButtonController from "./ButtonController";
import PasswordUpdate from "./PasswordUpdate";
//import PasswordUpdate from "./PasswordUpdate";
//import PasswordUpdate from "./PasswordUpdate";


const TodoItem = ({ todo, onToggle, onEdit, onDeleteTodo,id }) => {
  const [User, setUser] = useState(false);
  const [Password, setPassword] = useState(false);
  //const [Delete, setDelete] = useState(false);
 // console.log(todo._id);
  

  const userUpdateFn = () => {
    setUser(true);
  }

  const passwordUpdateFn = () => {
    setPassword(true);
  }

  // const userDeleteFn = () => {
  //   setDelete(true);
  // }

  // js/jsx file receive or add
  const deleteUserMutation = userDelete();
  //Button Onclick function
  const handleDelete = () => {
    console.log("Deleting user id:", todo);
   return deleteUserMutation.mutate(todo._id);
  };


  return (
    <div className="w-206 bg-white rounded-lg shadow-lg p-5 hover:shadow-xl transition duration-200">
      <div className="flex items-start gap-4">
        <div className="flex items-center h-6 mt-1">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className={`text-lg font-semibold mb-1 ${
              todo.completed ? "text-gray-400 line-through" : "text-gray-800"
            }`}
          >
            {todo._id}
          </h3>

          <h3
            className={`text-lg font-semibold mb-1 ${
              todo.completed ? "text-gray-400 line-through" : "text-gray-800"
            }`}
          >
            {todo.username}
          </h3>

          <h3
            className={`text-lg font-semibold mb-1 ${
              todo.completed ? "text-gray-400 line-through" : "text-gray-800"
            }`}
          >
            {todo.name}
          </h3>

          <h3
            className={`text-lg font-semibold mb-1 ${
              todo.completed ? "text-gray-400 line-through" : "text-gray-800"
            }`}
          >
            {todo.email}
          </h3>

          <h3
            className={`text-lg font-semibold mb-1 ${
              todo.completed ? "text-gray-400 line-through" : "text-gray-800"
            }`}
          >
            {todo.password}
          </h3>
        </div>
        <div className="flex gap-2">
          {/* {Password && <PasswordUpdate />} */}

          {/* User Button */}
          <ButtonController
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition duration-200"
            aria-label="Edit task"
            actionType={"edit"}
           id={todo._id}
          >
            <CircleUser />
          </ButtonController>

          {/* Password Button */}
          <ButtonController
          
            onClick={passwordUpdateFn}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition duration-200"
            aria-label="Edit task"
            actionType={"password"}
            id={todo._id}
          >
            <Lock />
          </ButtonController>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            disabled={deleteUserMutation.isLoading}
            //id={id}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition duration-200"
            aria-label="Delete task"
            // actionType={"Edit"}
          >
            <Trash2 />
          </button>





          
          {/* <UserDelete
            onClick={handleDelete}
            disabled={deleteUserMutation.isLoading}
            //id={id}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition duration-200"
            aria-label="Delete task"
            // actionType={"Edit"}
          >
            <Trash2 />
          </UserDelete> */}

          {/* <button
            //onClick={userDeleteFn}
           
            
          >
            
          </button> */}
 {/* {User && <UserUpdate />} */}
          <Modal>
            <ModalHeader>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                User Data input
              </h3>
            </ModalHeader>
           <ModalContent>
             {/* <UserUpdate todo={todo} /> */}
             <PasswordUpdate todo={todo} />
           </ModalContent>
          </Modal>
         

          {/* <Modal>
             <ModalHeader>
               <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                 Password Data input
               </h3>
             </ModalHeader>
            <ModalContent>
             <PasswordUpdate />
            </ModalContent>
           </Modal> */}


        </div>
      </div>
    </div>
  );
};
export default TodoItem;