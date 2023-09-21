import { useState } from "react";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const isAuth = async (role) => {
    setIsLoading(true);
    const user = localStorage.getItem("user");
    const data = JSON.parse(user);
    setIsLoading(false);
    if (!localStorage.getItem("token") || !user || data.role !== role) {
      window.location.href = "/";
    }
  };
  return { isAuth, isLoading };
};
