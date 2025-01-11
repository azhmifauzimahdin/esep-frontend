import axios from "axios";

const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "API-KEY": import.meta.env.VITE_API_KEY,
  },
});

httpRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

export default httpRequest;
