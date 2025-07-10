import axios from "axios";
/// <reference types="node" />

// Create axios instance without baseURL initially
const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to get the correct baseURL
const getBaseURL = () => {
  if (typeof window !== "undefined") {
    // Client side
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    console.log("proceee", apiUrl);
    return apiUrl ? `${apiUrl}/api` : "/api";
  }
  // Server side - return a default
  return "/api";
};

// Request interceptor to dynamically set baseURL and attach token
axiosInstance.interceptors.request.use(
  (config) => {
    // Set baseURL dynamically for each request
    config.baseURL = getBaseURL();

    // Add token if available
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      const currentPath = window.location.pathname;
      window.location.href = `/login?redirectTo=${encodeURIComponent(currentPath)}`;
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
