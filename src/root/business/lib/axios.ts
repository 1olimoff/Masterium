import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://cdn.masterium.uz/api/v1",
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axios.post("/api/auth/refresh");
        if (refreshResponse.data.success) {
          originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.access_token}`;
          return axiosInstance(originalRequest);
        }
        window.location.href = "/login";
      } catch (refreshError) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;