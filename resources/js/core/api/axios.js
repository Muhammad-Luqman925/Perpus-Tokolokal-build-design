import axios from "axios";

const http = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// ✅ Tambahkan interceptor untuk menyertakan token otomatis
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Tambahkan logging error agar mudah debug
http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (import.meta.env.DEV) {
      console.error("API error:", error.response || error);
    }
    return Promise.reject(error);
  }
);

export default http;
