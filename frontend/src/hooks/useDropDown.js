import { useState } from "react";

export const useDropDown = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const dropDown = async (data, id) => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const title = data.title;
    const place = data.place;
    const description = data.description;
    const photo = data.photo;
    const employeeId = data.employeeID;
    const departmentId = data.departmentId;
    const status = data.status;

    const response = await fetch(`http://localhost:8086/api/issues/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        place,
        description,
        photo,
        employeeId,
        departmentId,
        status,
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      console.log(json);
    }
  };
  return { dropDown, isLoading, error };
};
