import React from "react";
import {
  UserOutlined,
  BellOutlined,
  PoweroffOutlined,
  FormOutlined,
} from "@ant-design/icons";

export const EmployeeMenu = [
  {
    key: "1",
    label: "Issue Form",
    icon: <FormOutlined />,
    route: "/employee",
  },
  {
    key: "2",
    label: "Profile",
    icon: <UserOutlined />,
    route: "/employee/profile",
  },
  {
    key: "3",
    label: "Status",
    icon: <BellOutlined />,
    route: "/employee/status",
  },
  {
    key: "4",
    label: "Logout",
    icon: <PoweroffOutlined />,
    route: "/",
  },
];
