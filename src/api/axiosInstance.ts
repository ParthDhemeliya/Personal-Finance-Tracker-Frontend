// src/api/axiosInstance.ts

import axios from "axios";
console.log("AXIOS BASE URL:", process.env.NEXT_PUBLIC_API_URL);
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Use deployed backend URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      console.log("Unauthorized error:", error);
      return;
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
