import React, { useState } from "react";
import { DepartmentMenu } from "../../components/Menu";
import { IssueCard } from "../../components/Card";
import { EmployeeProfile } from "../../components/Profile";
import { TimeLine } from "../../components/TimLine";
import { Nav } from "../../components/NavBar";
import { Layout, Menu, Button, theme } from "antd";

const { Header, Sider, Content } = Layout;
export function DepartmentLayout() {
  const post = [
    {
      id: "1",
      name: "sample",
      description: "sample",
      place: "",
      currstatus: "",
      photoUrl: "",
    },
    {
      id: "1",
      name: "sample",
      description: "sample",
      place: "",
      currstatus: "",
      photoUrl: "",
    },
    {
      id: "1",
      name: "sample",
      description: "sample",
      place: "",
      currstatus: "",
      photoUrl: "",
    },
  ];
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
    1: <IssueCards post={post} />,
    2: <EmployeeProfile />,
    // 3: <TimeLine />,
  };
  const [render, updateRender] = useState(1);

  const handleMenuClick = (menu) => {
    updateRender(menu.key);
  };

  return (
    <Nav menu={<DepartmentMenu handleClick={handleMenuClick} />}>
      <Content>{components[render]}</Content>;
    </Nav>
  );
}
