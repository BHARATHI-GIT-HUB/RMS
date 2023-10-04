import React, { useEffect } from "react";
import { DepartmentMenu } from "../../components/Menu"; // Import your Employee Menu component
import { Nav } from "../../components/NavBar";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../../components/Loading";

export const DepartmentLayout = () => {
  const { isAuthenticated, isLoading } = useAuth("ADMIN");
  if (isLoading) {
    return <Loading />;
  }
  return <div>{isAuthenticated && <Nav menu={DepartmentMenu} />}</div>;
};
