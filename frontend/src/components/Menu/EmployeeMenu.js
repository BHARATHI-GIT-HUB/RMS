import React, { useEffect } from "react";
import { Menu } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  BellOutlined,
  PoweroffOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { IssueForm } from "../../components/Form";
import { TimeLine } from "../../components/TimLine";
import { EmployeeProfile } from "../../components/Profile";
import { Logout } from "../../container/Login/";
import Loading from "../../components/Loading";

export const EmployeeMenu = (props) => {
  const { handleClick } = props;

  return (
    <Menu theme="dark" mode="inline">
      <Menu.Item
        key="1"
        icon={<FormOutlined />}
        label="Issue Form"
        onClick={handleClick}
      >
        Issue Form
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<UserOutlined />}
        label="Profile"
        onClick={handleClick}
      >
        Profile
      </Menu.Item>
      <Menu.Item
        key="3"
        icon={<BellOutlined />}
        label="Status"
        onClick={handleClick}
      >
        Status
      </Menu.Item>
      <Menu.Item
        key="4"
        label="Status"
        icon={<PoweroffOutlined />}
        onClick={Logout}
      >
        Log out
      </Menu.Item>
    </Menu>
  );
};
