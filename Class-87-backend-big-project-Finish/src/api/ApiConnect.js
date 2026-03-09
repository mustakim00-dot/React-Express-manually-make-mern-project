import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NjU2OGNmZDMxOTIwNTM5OTBkMmI3NiIsInVzZXJuYW1lIjoiemloYWQiLCJlbWFpbCI6IlppaGFkNjdAZ21haWwuY29tIiwiaWF0IjoxNzY4MzU4Mjc0LCJleHAiOjE3Njg0NDQ2NzR9.TyqbftJmrqxz9v20u5W0T7bvEzlcfPXKhsymTCslJtc`,
  },
  withCredentials: true, // Send cookies with cross-site requests
  // timeout: 2000,
});
