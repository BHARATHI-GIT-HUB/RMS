import { useState } from "react";

export const usePost = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [response, setResponse] = useState(null);

  const postData = async (path, body) => {
    console.log(body);
    setIsLoading(true);

    const response = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type":
          "multipart/form-data; Boundary=---------------------------WebKitFormBoundaryh9UF2hFjspgvNh9T--",
      },
      body: body,
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      // localStorage.setItem("token", json.token);
      // window.location.href = "/";
    }
  };

  const postDataIssue = async (path, body) => {
    console.log(path, body);

    setIsLoading(true);

    const response = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },

      body: JSON.stringify(body),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      localStorage.setItem("token", json.token);
      console.log(json);
      // setResponse(json)
    }
  };
  return { postData, postDataIssue, response, isLoading, error };
};
