import React, { createContext, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import axios from "axios";

export const Context = createContext({
  isAuthenticated: false,
});

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Try to get user details for both patient and admin
        let response;
        try {
          response = await axios.get("http://localhost:4000/api/v1/user/patient/me", {
            withCredentials: true,
          });
        } catch (error) {
          // If patient request fails, try admin
          response = await axios.get("http://localhost:4000/api/v1/user/admin/me", {
            withCredentials: true,
          });
        }

        if (response.data.success) {
          setIsAuthenticated(true);
          setUser(response.data.user);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);