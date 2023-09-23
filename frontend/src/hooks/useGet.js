import { useEffect, useState } from "react";

export const useGet = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [data, setData] = useState([]);

  const getData = async (path) => {
    console.log(path, "path");
    setIsLoading(true);

    const response = await fetch(path, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      localStorage.setItem("token", json.token);
      setData((prevData) => [...prevData, json]);
    }
  };

  return { getData, data, isLoading, error };
};
