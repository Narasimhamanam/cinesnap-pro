import axios from "axios";
import.meta.env;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // backend URL
});

// Add token to every request (if available)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
