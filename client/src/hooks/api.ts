import axios, { AxiosError } from "axios";

export const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    console.log(error);
    if (error.response?.status === 406) {
      const originalRequest = error.config;
      try {
        await refreshToken();
        return api(originalRequest!);
      } catch (e) {
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);

async function refreshToken() {
  try {
    await api.get("/api/v1/auth/refresh");
  } catch (e) {
    console.log(e);
    throw e;
  }
}
