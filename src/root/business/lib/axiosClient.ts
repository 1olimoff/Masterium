// lib/axiosClient.ts
import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true, // Cookie yuborish
});

// Interceptor: 401 bo'lsa refresh qilib qayta urinish
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await axios.post("/api/auth/refresh", {}, { withCredentials: true });
        return api.request(error.config); // so'rovni qayta yuborish
      } catch (refreshError) {
        console.error("Refresh error:", refreshError);
        // logout qilish yoki login sahifasiga yuborish
      }
    }
    return Promise.reject(error);
  }
);

export default api;
