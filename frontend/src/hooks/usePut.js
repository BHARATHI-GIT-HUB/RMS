import { useState } from "react";

export const usePut = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [response, setResponse] = useState(null);

  const putData = async (path, body) => {
    console.log(path, body);

    setIsLoading(true);
    x;

    const response = await fetch(path, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      //   body: JSON.stringify(body),
      body: J,
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      //   localStorage.setItem("token", json.token);
      console.log(json);
      // setResponse(json)
    }
  };
  return { postData, postDataIssue, response, isLoading, error };
};