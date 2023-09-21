import { useEffect, useState } from "react";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    localStorage.clear();
  }, []);

  const login = async (data) => {
    const username = data.username;
    const password = data.password;
    setIsLoading(true);
    const response = await fetch("http://localhost:8087/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      localStorage.clear();
      localStorage.setItem("token", json.token);
      localStorage.setItem("user", JSON.stringify(json.userData));
      if (json.userData.role === "EMPLOYEE") {
        window.location.href = "/employee";
      } else if (json.userData.role === "ADMIN") {
        window.location.href = "/department";
      }
    }
  };
  return { login, isLoading, error };
};
