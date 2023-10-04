import React, { useEffect } from "react";
import { EmployeeMenu } from "../../components/Menu"; // Import your Employee Menu component
import { Nav } from "../../components/NavBar";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../../components/Loading";

export const EmployeeLayout = () => {
  const { isAuthenticated, isLoading } = useAuth("EMPLOYEE");

  if (isLoading) {
    return <Loading />;
  }

  return <div>{isAuthenticated && <Nav menu={EmployeeMenu} />}</div>;
};
