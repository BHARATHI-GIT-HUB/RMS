import { useState } from "react";

export const useDelete = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [response, setResponse] = useState(null);

  const DeleteData = async (path) => {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    const response = await fetch(path, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setIsLoading(false);

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setResponse(json);
    }
  };
  return { DeleteData, response, isLoading, error };
};
