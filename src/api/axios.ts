import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // send cookies with every request
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔁 Centralized response error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.warn("Unauthorized – possibly not logged in.");
      // Optionally redirect to login
      // window.location.href = '/login';
    } else if (status === 403) {
      console.warn("Forbidden – not enough permissions.");
    } else if (status === 500) {
      console.error("Server error – try again later.");
    } else {
      console.error(
        "API error:",
        error.response?.data?.message || error.message
      );
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
