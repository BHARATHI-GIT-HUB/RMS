import { useState } from "react";
import axios from "axios";

export const usePost = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);

  const postData = async (path, body) => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const response = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

    const token = localStorage.getItem("token");

    axios
      .post(path, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
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
