import { useEffect, useState } from "react";

export const useGet = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [data, setData] = useState([]);

  const getData = async (path) => {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    const response = await fetch(path, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setIsLoading(false);
      setData((prevData) => [...prevData, json]);
    }
  };

  return { getData, data, isLoading, error };
};
