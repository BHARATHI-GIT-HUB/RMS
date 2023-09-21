import React, { useState, useEffect } from "react";
import { EmployeeMenu } from "../../components/Menu";
import { IssueForm } from "../../components/Form";
import { EmployeeProfile } from "../../components/Profile";
import { TimeLine } from "../../components/TimLine";
import { Nav } from "../../components/NavBar";
import { Layout, Menu, Button, theme } from "antd";
import { useGet } from "../../hooks/useGet";
import { useAuth } from "../../hooks/useAuth";

const { Header, Sider, Content } = Layout;

export function EmployeeLayout() {
  const { getData, data, isloading, error } = useGet();
  const { isAuth, isLoading } = useAuth();
  const components = {
    1: <IssueForm />,
    2: <EmployeeProfile />,
    3: <TimeLine status={data.status} />,
  };
  const [render, updateRender] = useState(1);

  const handleMenuClick = (menu) => {
    updateRender(menu.key);
  };

  useEffect(async () => {
    await isAuth("EMPLOYEE");
    await await getData("http://localhost:8087/api/issues/1");
    return () => {
      console.log("got data");
    };
  }, []);

  if (isLoading) {
    return <p>loading</p>;
  }

  return (
    <Nav menu={<EmployeeMenu handleClick={handleMenuClick} />}>
      <Content>{components[render]}</Content>
    </Nav>
  );
}
