import React, { useEffect } from "react";
import { Menu } from "antd";
import {
  UserOutlined,
  IdcardOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { IssueForm } from "../../components/Form";
import { TimeLine } from "../../components/TimLine";
import { EmployeeProfile } from "../../components/Profile";
import { Logout } from "../../container/Login/";

export const DepartmentMenu = (props) => {
  const { handleClick } = props;

  return (
    <Menu theme="dark" mode="inline">
      <Menu.Item
        key="1"
        icon={<IdcardOutlined />}
        label="Issue Form"
        onClick={handleClick}
      >
        Issues
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
        icon={<PoweroffOutlined />}
        label="Status"
        onClick={Logout}
      >
        Log out
      </Menu.Item>
    </Menu>
  );
};
