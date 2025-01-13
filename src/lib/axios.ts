import axios from "axios";
import { API_URL } from "./constants";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("Token being sent:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log("Complete request headers:", {
    ...config.headers,
    Authorization: config.headers.Authorization,
  });
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios error:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        data: JSON.parse(error.config?.data || "{}"),
      },
    });
    return Promise.reject(error);
  }
);

export default api;
