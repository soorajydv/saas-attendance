import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add request interceptor to dynamically get the latest token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Fetch latest token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization; // Ensure no old token is used
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
export const BACKEND_URL = import.meta.env.VITE_BACKEND_BASE_URL;
