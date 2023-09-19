import React, { useEffect } from "react";
import { Menu } from "antd";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { IssueForm } from "../../components/Form";
import { TimeLine } from "../../components/TimLine";
import { EmployeeProfile } from "../../components/Profile";

export const EmployeeMenu = (props) => {
  const { handleClick } = props;

  return (
    <Menu theme="dark" mode="inline">
      <Menu.Item
        key="1"
        icon={<UserOutlined />}
        label="Issue Form"
        onClick={handleClick}
      >
        Issue Form
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<VideoCameraOutlined />}
        label="Profile"
        onClick={handleClick}
      >
        Profile
      </Menu.Item>
      <Menu.Item
        key="3"
        icon={<VideoCameraOutlined />}
        label="Status"
        onClick={handleClick}
      >
        Status
      </Menu.Item>
    </Menu>
  );
};
