import React, { useState, useEffect } from "react";
import { DepartmentMenu } from "../../components/Menu";
import { IssueCard } from "../../components/Card";
import { EmployeeProfile } from "../../components/Profile";
import { TimeLine } from "../../components/TimLine";
import { Nav } from "../../components/NavBar";
import { Layout, Menu, Button, theme } from "antd";
import { useGet } from "../../hooks/useGet";
import { useAuth } from "../../hooks/useAuth";

const { Header, Sider, Content } = Layout;
export function DepartmentLayout() {
  const { getData, data, isloading, error } = useGet();
  const { isAuth, isLoading } = useAuth();

  const IssueCards = ({ post }) => {
    console.log(post, "post");
    return (
      <Content className="grid grid-cols-3 items-center gap-6 space-y-3 justify-items-center">
        {post.map((value, idx) => (
          <React.Fragment key={idx}>
            <IssueCard
              id={value.id}
              name={value.title}
              description={value.description}
              place={value.place}
              currstatus={value.status}
              photoUrl={value.photo}
            />
          </React.Fragment>
        ))}
      </Content>
    );
  };
  const components = {
    1: <IssueCards post={data} />,
    2: <EmployeeProfile />,
    // 3: <TimeLine />,
  };
  const [render, updateRender] = useState(1);

  const handleMenuClick = (menu) => {
    updateRender(menu.key);
  };

  useEffect(async () => {
    await isAuth("ADMIN");
    const user = localStorage.getItem("user");
    const data = JSON.parse(user);
    console.log(data);
    await getData(
      `http://localhost:8087/api/department/departmentissues/?id=${data.id}`
    );
  }, []);

  return (
    <Nav menu={<DepartmentMenu handleClick={handleMenuClick} />}>
      <Content>{components[render]}</Content>
    </Nav>
  );
}
