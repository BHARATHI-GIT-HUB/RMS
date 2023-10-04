import { useState, useEffect } from "react";

export const useAuth = (expectedRole) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // console.log(expectedRole);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        if (!token || !user || user.role !== expectedRole) {
          throw new Error("Authentication failed");
        }

        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        // Redirect to the login page or home page based on your application logic.
        // You can use a router for navigation.
        window.location.href = "/";
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [expectedRole]);

  return { isAuthenticated, isLoading };
};
