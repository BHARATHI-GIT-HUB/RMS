import { useEffect, useState } from "react";

export const useGet = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   if (data.length > 0) {
  //     console.log("data in useEffect:", data);
  //     setIsLoading(false);
  //   }
  // }, [data]);

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
      setIsLoading(false);
      localStorage.setItem("token", json.token);
      console.log(json, "json");
      setData((prevData) => [...prevData, json]);
      console.log(data, "data");
    }
  };

  return { getData, data, isLoading, error };
};
