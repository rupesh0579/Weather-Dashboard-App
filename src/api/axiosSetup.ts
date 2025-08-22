import axios from "axios";
import useAuthStore from "../store/authStore";

export const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const weatherApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
});