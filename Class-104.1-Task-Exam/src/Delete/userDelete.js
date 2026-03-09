import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Bounce, toast } from "react-toastify";
import { api } from "../api/ApiConnect";

export const userDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId) =>{
      if(!userId){
        throw new Error("User ID is required");
      }
      
     const res = await api.delete(`/users/delete-user/${userId}`);
     //console.log(res.data);
     console.log(userId);
     return res.data;
     
     

       },

    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });

      toast(res.data.message || "User deleted successfully", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
    },

    onError: (error) => {
      toast(error.response?.data?.message || "User delete failed", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
    },
  });
};
