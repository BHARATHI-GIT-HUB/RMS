import { useState } from "react";
import axios from "axios";

export const usePost = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);

  const postData = async (path, body) => {
    console.log(body);
    setIsLoading(true);

    const response = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setResponseMessage(json);
    }
  };

  const postDataIssue = async (path, data) => {
    console.log(path, data);

    setIsLoading(true);
    const formData = new FormData();

    // Append fields to the FormData object
    formData.append("title", data.title);
    formData.append("place", data.place);
    formData.append("description", data.description);
    formData.append("employeeId", data.employeeId);
    formData.append("departmentId", data.departmentId);
    formData.append("status", data.status);
    formData.append("photo", data.photo[0].originFileObj);

    axios
      .post(path, formData)
      .then((res) => {
        setResponseMessage(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  };
  return { postData, postDataIssue, responseMessage, isLoading, error };
};
