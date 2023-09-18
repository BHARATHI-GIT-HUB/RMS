import { useState } from "react";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const register = async (data, showdepartement) => {
    const role = !showdepartement ? "employee" : "department";
    console.log(data, role, showdepartement);

    const name = data.nickname;
    const password = data.password;
    let body = {};
    if (role == "employee") {
      body = {
        name,
        password,
        email: data.email,
        designation: data.designation,
      };
    } else {
      body = {
        name,
        password,
        department_name: data.department_name,
      };
    }

    setIsLoading(true);

    const response = await fetch(`http://localhost:8086/api/${role}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(body),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      localStorage.setItem("token", json.token);
      window.location.href = "/";
    }
  };
  return { register, isLoading, error };
};
