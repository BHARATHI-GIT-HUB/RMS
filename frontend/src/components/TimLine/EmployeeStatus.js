import React, { useEffect } from "react";
import { useGet } from "../../hooks/useGet";
import Loading from "../Loading";
import { TimeLine } from ".";
import { Alert } from "antd";

function EmployeeStatus() {
  const { getData, data, isLoading, error } = useGet();

  useEffect(() => {
    async function fetch() {
      const user = JSON.parse(localStorage.getItem("user"));
      await getData(`http://localhost:8087/api/issues/employee/${user.id}`);
    }
    fetch();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Alert message={error} type="error" />;
  }

  return (
    <>{data && data.length > 0 && <TimeLine status={data[0][0].status} />}</>
  );
}

export default EmployeeStatus;
