import axios from "axios";
import { createContext } from "react";

const ApiContext = createContext(null);
export function ApiProvider({ children }) {
  // Create one axios instance for the entire app
  const propertyApi = axios.create({
    baseURL: " http://localhost:4000/api/v1/",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Automatically attach token from localStorage, if present
  propertyApi.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <ApiContext.Provider value={propertyApi}>{children}</ApiContext.Provider>
  );
}

export default ApiContext;
