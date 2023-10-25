import { useState } from "react";

export const usePut = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [response, setResponse] = useState(null);

  const putData = async (path, body) => {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    const response = await fetch(path, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setResponse(json);
    }
  };
  return { putData, response, isLoading, error };
};
