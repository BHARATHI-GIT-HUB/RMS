import React, { useState } from "react";
import { EmployeeMenu } from "../../components/Menu";
import { IssueForm } from "../../components/Form";
import { EmployeeProfile } from "../../components/Profile";
import { TimeLine } from "../../components/TimLine";
import { Nav } from "../../components/NavBar";
import { Layout, Menu, Button, theme } from "antd";

const { Header, Sider, Content } = Layout;
export function EmployeeLayout() {
  const components = {
    1: <IssueForm />,
    2: <EmployeeProfile />,
    3: <TimeLine />,
  };
  const [render, updateRender] = useState(1);

  const handleMenuClick = (menu) => {
    updateRender(menu.key);
  };

  return (
    <Nav menu={<EmployeeMenu handleClick={handleMenuClick} />}>
      <Content>{components[render]}</Content>;
    </Nav>
  );
}
