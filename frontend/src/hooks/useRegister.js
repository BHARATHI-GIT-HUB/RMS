import { withSuccess } from "antd/es/modal/confirm";
import { useState } from "react";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

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
        phone: data.phone,
        designation: data.designation,
      };
    } else {
      body = {
        name,
        password,
        email: data.email,
        phone: data.phone,
        department_name: data.department_name,
      };
    }

    setIsLoading(true);

    const response = await fetch(`http://localhost:8087/api/${role}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(body),
    });

    const json = await response.json();

    setIsLoading(false);

    if (!response.ok) {
      if (json.error) {
        setError(json.error);
      } else {
        setError(json);
      }
    }

    if (response.ok) {
      localStorage.setItem("token", json.token);
      setResponseMessage("User Created Sccuessfully");

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  };
  return { register, isLoading, responseMessage, error };
};
