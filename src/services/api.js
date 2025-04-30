// import axios from "axios";

// const BASE_URL = "https://dev-portal.gps.id/backend/seen/public";

// const api = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// const endpoints = {
//   login: "/login",
//   vehicles: "/vehicle",
// };

// export { api, endpoints };
// export default api;

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// api.interceptors.response.use(
//   (response) => response.data,
//   (error) => {
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       const { status, data } = error.response;

//       if (status === 401) {
//         // Unauthorized - clear local storage and redirect to login
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         window.location.href = "/login";
//         return Promise.reject(
//           new Error("Session expired. Please login again.")
//         );
//       }

//       return Promise.reject(data.message || "An error occurred");
//     } else if (error.request) {
//       // The request was made but no response was received
//       return Promise.reject(
//         "No response from server. Please check your internet connection."
//       );
//     } else {
//       // Something happened in setting up the request
//       return Promise.reject(error.message);
//     }
//   }
// );

import axios from "axios";

const BASE_URL = "https://dev-portal.gps.id/backend/seen/public";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const endpoints = {
  login: "/login",
  vehicles: "/vehicle",
};

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Requesting:", config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

const MAX_RETRIES = 3;
const INITIAL_DELAY = 500;

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    console.log(
      "Response:",
      response.status,
      response.config.url,
      response.data
    );
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 429 &&
      originalRequest._retry < MAX_RETRIES
    ) {
      originalRequest._retry = originalRequest._retry || 0;
      originalRequest._retry++;

      const retryAfter = error.response.headers["retry-after"];
      let delay =
        (retryAfter ? parseInt(retryAfter) * 1000 : INITIAL_DELAY) ||
        INITIAL_DELAY;

      if (isNaN(delay) || delay <= 0) {
        delay = INITIAL_DELAY * Math.pow(2, originalRequest._retry);
      }

      console.warn(
        `Rate Limit Exceeded: Retrying after ${delay / 1000} seconds`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));

      return api(originalRequest);
    }

    if (error.response) {
      const { status, data, config } = error.response;
      console.error(`HTTP Error ${status} for ${config.url}:`, data);

      if (status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return Promise.reject(
          new Error("Session expired. Please login again.")
        );
      }

      return Promise.reject(data.message || "An error occurred");
    } else if (error.request) {
      console.error("No Response Error:", error.request);
      return Promise.reject(
        "No response from server. Please check your internet connection."
      );
    } else {
      console.error("Request Setup Error:", error.message);
      return Promise.reject(error.message);
    }
  }
);

export { api, endpoints };
export default api;
