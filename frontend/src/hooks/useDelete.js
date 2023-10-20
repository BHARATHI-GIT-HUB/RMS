import { useState } from "react";

export const useDelete = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [response, setResponse] = useState(null);

  const DeleteData = async (path, token) => {
    console.log(path, token);

    setIsLoading(true);

    const response = await fetch(path, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      //   localStorage.setItem("token", json.token);
      console.log(json, "onput");
      setResponse(json);
      // setResponse(json)
    }
  };
  return { DeleteData, response, isLoading, error };
};
