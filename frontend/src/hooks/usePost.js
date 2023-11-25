import { useState } from "react";
import axios from "axios";

export const usePost = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);

  const postData = async (path, body) => {
    console.log(path, body);
    setIsLoading(true);
    const token = localStorage.getItem("token");

    axios
      .post(path, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setResponseMessage(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error response:");

        setError(err.response.data.error);
        // setError(error.response.data);
        // handleAxiosError(error);
        // console.log(error.toJSON());

        // if (error.response) {
        //   // The request was made and the server responded with a status code
        //   // that falls out of the range of 2xx
        //   console.log(error.response.data);
        //   console.log(error.response.status);
        //   console.log(error.response.headers);
        // } else if (error.request) {
        //   // The request was made but no response was received
        //   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        //   // http.ClientRequest in node.js
        //   console.log(error.request);
        // } else {
        //   // Something happened in setting up the request that triggered an Error
        //   console.log("Error", error.message);
        // }
        // console.log(error.config);

        setIsLoading(false);
      });
    // const response = await fetch(path, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: body,
    // });

    // const json = await response.json();

    // if (!response.ok) {
    //   setError(json.error);
    // }
    // if (response.ok) {
    //   setResponseMessage(json);
    // }
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
  const handleAxiosError = (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      setError(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      setError("No response received from the server.");
    } else {
      // Something happened in setting up the request that triggered an Error
      setError("An error occurred while processing the request.");
    }

    setIsLoading(false);
  };
  return { postData, postDataIssue, responseMessage, isLoading, error };
};
