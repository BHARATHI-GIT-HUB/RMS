import React from "react";
import {
  UserOutlined,
  PoweroffOutlined,
  IdcardOutlined,
} from "@ant-design/icons";

export const DepartmentMenu = [
  {
    key: "1",
    label: "Issues",
    icon: <IdcardOutlined />,
    route: "/department",
  },
  {
    key: "2",
    label: "Profile",
    icon: <UserOutlined />,
    route: "/department/profile",
  },
  {
    key: "4",
    label: "Logout",
    icon: <PoweroffOutlined />,
    route: "/",
  },
];
