import React, { useEffect } from "react";
import { Menu } from "antd";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { IssueForm } from "../../components/Form";
import { TimeLine } from "../../components/TimLine";
import { EmployeeProfile } from "../../components/Profile";

export const MenuItem = () => {
  useEffect(() => {
    return () => {
      Content({ child: <IssueForm /> });
    };
  });
  const handleClick = (element) => {
    return () => {
      Content({ child: element });
    };
  };
  return (
    <Menu
      theme="dark"
      mode="inline"
      // selectedKeys={[selectedKey]} // Highlight the selected item
      // onSelect={handleMenuSelect} // Callback function for selecting menu items
    >
      <Menu.Item
        key="1"
        icon={<UserOutlined />}
        label="Issue Form"
        onClick={handleClick(<IssueForm />)}
      >
        Issue Form
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<VideoCameraOutlined />}
        label="Profile"
        onClick={handleClick(<EmployeeProfile />)}
      >
        Profile
      </Menu.Item>
      <Menu.Item
        key="3"
        icon={<VideoCameraOutlined />}
        label="Status"
        onClick={handleClick(<TimeLine />)}
      >
        Status
      </Menu.Item>
    </Menu>
  );
};

export const Content = ({ child }) => {
  return <>{child}</>;
};
