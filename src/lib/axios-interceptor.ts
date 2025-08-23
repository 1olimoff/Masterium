// src/lib/axios-interceptor.ts
import axios from "axios";

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;


    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Agar refresh jarayoni ketayotgan bo‘lsa, kutib turamiz
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axios(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Refresh API chaqiramiz
        await axios.post("/api/auth/refresh", {}, { withCredentials: true });

        processQueue(null);
        return axios(originalRequest); 
      } catch (err) {
        processQueue(err, null);

        if (typeof window !== "undefined") {
          window.location.href = "/";
        }
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
